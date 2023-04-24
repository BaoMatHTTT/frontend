import React, { useState, useEffect } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, message, Row, Select, Space, Switch } from 'antd';
// import type_metadata from '../../../Constants/type_metadata';
import axios from 'axios';

const { Option } = Select;
const API_URL = 'http://localhost:5000'

const CreateStreamDrawer = (props) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm()
    const [validateNameStatus, setValidateNameStatus] = useState("")
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [metadata, setMetadata] = useState({
        type_metadata: [],
    })

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onSubmitForm = () => {
        setConfirmLoading(true)
        const fields = form.getFieldValue()
        const data = fields.source_type === 'file' ? {
            project_name: props.projectName,
            source_name: fields.source_name,
            source_type: 'file',
            source_information: {
                file_id: fields.file_id,
                file_header: fields.file_header,
                file_sep: fields.file_sep,
                file_schema: fields.source_schema
            }
        } : fields.source_type === 'database' ? {
            project_name: props.projectName,
            source_name: fields.source_name,
            source_type: fields.source_type,
            source_information: {
                connection_string: fields.connection_string,
                schema: fields.source_schema
            }
        } : null

        axios.post(API_URL+'/streams', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.status === 200) {
                setConfirmLoading(false)
                setOpen(false)
                message.success(`Create stream successfully`)
                props.toggle()
            }
        }).catch(err => {
            setConfirmLoading(false)
            setOpen(false)
            message.error('Error when creating stream source. Message: ' + err.response.data);
        })
    }

    useEffect(() => {
        let endpoints = [
            { name: 'get_file', url: API_URL+`/files?project_name=${props.projectName}&page=-1&pageSize=-1`},
            { name: 'get_type_metadata', url: API_URL+'/metadata?metadata_type=schema_type' },
        ]
        axios.all(endpoints.map((endpoint) => axios.get(endpoint.url).then((response) => {
            switch (endpoint.name) {
                case 'get_file':
                    if (response.status == 200) {
                        const files = response.data
                        setFiles(files.map((file) => {
                            return {
                                id: file.id,
                                name: file.name
                            }
                        }))
                    }
                    break;
                case 'get_type_metadata': 
                    if (response.status == 200) {
                        const type_metadata = response.data
                        setMetadata({
                            ...metadata,
                            type_metadata: type_metadata.map((type) => {
                                return {
                                    name: type.name,
                                    label: type.label,
                                    description: type.description,
                                }
                            })
                        })
                    }
                    break
                default:
                    break;
            }
        }))).catch((err) => {
            console.error(err);
            message.error(err.message);
        })
    }, [])

    const checkName = () => {
        setValidateNameStatus('validating')
        axios.get(API_URL+`/check-stream-name?project_name=${props.projectName}&stream_name=${form.getFieldValue('source_name')}`)
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                const check = response.data.check;
                if (check) {
                    setValidateNameStatus("success")
                } else {
                    setValidateNameStatus("error")
                }
            } else {
                setValidateNameStatus("error")
            }
        })
        .catch(err => {
            setValidateNameStatus('error')
            console.error(err);
        })
    }
    
    const inferSchema = () => {
        const file_id = form.getFieldValue('file_id');
        const file_header = form.getFieldValue('file_header');
        const file_sep = form.getFieldValue('file_sep');
    
        axios.get(API_URL+`/infer-schema?file_id=${file_id}&file_header=${file_header}&file_sep=${file_sep}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} style={{ marginBottom: '10px', float: 'right' }}>
                Add Source
            </Button>
            <Drawer
                title="Create a new streaming source"
                width={720} onClose={onClose} open={open}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={() => { form.submit() }} type="primary" htmlType='submit' 
                                loading={confirmLoading}>
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" form={form} autoComplete='off' onFinish={onSubmitForm}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="source_name" label="Name"
                                hasFeedback={true} validateStatus={validateNameStatus}
                                rules={[{ required: true, message: 'Please enter source name' }]}
                            >
                                <Input onBlur={() => {checkName()}} placeholder="Please enter source name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="source_type" label="Type"
                                rules={[{ required: true, message: 'Please choose source type' }]}
                            >
                                <Select placeholder="Select source type" allowClear>
                                    <Option key={1} value="file">File</Option>
                                    <Option key={2} value="database">Database</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.source_type !== currentValues.source_type}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('source_type') === 'file' ? (<>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            name="file_id" label="File"
                                            rules={[{ required: true, message: 'Please choose file' }]}
                                        >
                                            <Select placeholder="Select a file to streaming" allowClear>
                                                {files.map((file, idx) => <Option key={idx} value={file.id}> {file.name} </Option>)}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="file_sep" label="File Separator"
                                            rules={[{ required: true, message: 'Please choose file separator' }]}
                                        >
                                            <Select placeholder="Select file separator" allowClear>
                                                <Option key={1} value=".">. (Dot)</Option>
                                                <Option key={2} value=",">, (Comma)</Option>
                                                <Option key={3} value=";">, (Semi Colon)</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="file_header" label="File Header"
                                            initialValue={false}
                                            valuePropName={'checked'}
                                        >
                                            <Switch />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                            ) : getFieldValue('source_type') === 'database' ? <>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            name="db_type" label="Database"
                                            rules={[{ required: true, message: 'Please choose a database to connect' }]}
                                        >
                                            <Select placeholder="Select which database type to connect" allowClear>
                                                <Option key={1} value="mongodb"> MongoDB </Option>
                                                <Option key={2} value="mysql"> MySQL </Option>
                                                <Option key={3} value="postgresql"> PostgreSQL </Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            name="db_connection_string" label="Connection string"
                                            rules={[{ required: true, message: 'Please enter a connect string to your database' }]}
                                        >
                                            <Input placeholder="Enter a connection string to your database" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </> : null
                        }
                    </Form.Item>
                    <Form.Item
                        name="source_schema" label="Schema"
                        rules={[{ required: true, message: 'Please define schema' }]}
                    >
                        <Form.List name="source_schema">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space
                                            key={key}
                                            style={{
                                                display: 'flex',
                                                marginBottom: 8
                                            }}
                                            align="baseline"
                                        >
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'field_name']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing field name',
                                                    },
                                                ]}
                                            >
                                                <Input style={{ width: 200 }} placeholder="Name" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'field_type']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing field type',
                                                    },
                                                ]}
                                            >
                                                <Select placeholder="Type" allowClear style={{ width: 200 }}>
                                                    {
                                                        metadata.type_metadata.map((type, idx) => <Option key={idx} value={type.name}>{type.label}</Option>)
                                                    }
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'field_nullable']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing nullable check on field',
                                                    },
                                                ]}
                                            >

                                                <Select placeholder="Nullable" allowClear style={{ width: 200 }}>
                                                    <Option key={1} value="True"> True </Option>
                                                    <Option key={2} value="False"> False </Option>
                                                </Select>
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add field
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default CreateStreamDrawer;