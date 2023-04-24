import { AutoComplete, Typography, Drawer } from 'antd';
import React, { useState, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Button, Form, Input, Select, Space } from 'antd';
import axios from 'axios';
// import SchemaTable from '../../../Components/Schema/SchemaTable';
// import PreTable from '../preTable';

const { Title, Text } = Typography;


const tailLayout = {
  labelCol: { offset: 0, span: 6 },
  // wrapperCol: { offset: 0, span: 20 },
  labelAlign: 'left'
};

const { Option } = Select;

const renderItem = (title) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
    </div>
  ),
});
const math = [
  {
    label: 'math',
    options: [renderItem('sum'), renderItem('count')],
  },
  {
    label: 'boolean',
    options: [renderItem('&&\n\t'), renderItem('||\n\t')],
  }
];

const FormSilver = (props) => {
  const [form] = Form.useForm();
  const [tables, setTable] = useState([]);
  const sourceTable = Form.useWatch('sourceTable', form);
  const joinedTable = Form.useWatch('joinedTable', form);
  const options = math
  // + tables.map((table)=> ({  //([sourceTable] + joinedTable)
  //   label: table.name,
  //   options: table.schema.map((field => renderItem(field.fieldname))) //[renderItem('A'), renderItem('B')],
  // }))

  const [moreDetail, setMoreDetail] = useState(false);
  const toggleMoreDetail = () => {
    setMoreDetail(!moreDetail)
  }

  const onFinish = (values) => {
    console.log('Received values of form:', values);
    axios.post('/create_silver', {
      tableName: form.getFieldValue('tableName'),
      projectName: form.getFieldValue('project'),
      description: form.getFieldValue('description'),
      sourceTable: form.getFieldValue(['sourceTable', 'name']),
      typ: form.getFieldValue('type'),

    })
    //   {
    //     "sourceTable": {
    //         "description": "",
    //         "name": "SUM_CHARGE_BY_CODE",
    //         "project": "MBF",
    //         "schema": [
    //             {
    //                 "description": "",
    //                 "name": "CODE",
    //                 "nullable": true,
    //                 "typ": "String"
    //             },
    //             {
    //                 "description": "",
    //                 "name": "CHARGE_PRICE",
    //                 "nullable": true,
    //                 "typ": "Float"
    //             }
    //         ],
    //         "typ": "bronze"
    //     },
    //     "joinedTable": [
    //         {
    //             "description": "",
    //             "name": "DK_GOI_T1",
    //             "project": "MBF",
    //             "schema": [
    //                 {
    //                     "description": "",
    //                     "name": "HASH_ISDN",
    //                     "nullable": true,
    //                     "typ": "STRING"
    //                 },
    //                 {
    //                     "description": "",
    //                     "name": "CODE",
    //                     "nullable": true,
    //                     "typ": "STRING"
    //                 },
    //                 {
    //                     "description": "",
    //                     "name": "CHARGE_PRICE",
    //                     "nullable": true,
    //                     "typ": "INT"
    //                 },
    //                 {
    //                     "description": "",
    //                     "name": "NGAY_DK",
    //                     "nullable": true,
    //                     "typ": "STRING"
    //                 },
    //                 {
    //                     "description": "",
    //                     "name": "REG_CODE",
    //                     "nullable": true,
    //                     "typ": "STRING"
    //                 }
    //             ],
    //             "typ": "bronze",
    //             "onA": "CODE",
    //             "onB": "CODE"
    //         }
    //     ]
    // }


  };
  // const handleChange = () => {
  //   form.setFieldsValue({
  //     sights: [],
  //   });
  // };
  const alias = (idx) => String.fromCharCode(idx + 'B'.charCodeAt(0))
  const SelectTableDropdown = (values, onChangeTable) => {
    // console.log(values, onChangeTable);
    if (values === undefined)
      return null;
    const items = values.map((table, index) => ({
      value: index,
      label: table.name
    }))
    return (
      <>
        <Select
          showSearch
          //   placeholder="Bảng dữ liệu"
          optionFilterProp="children"
          onChange={onChangeTable}
          //   onSearch={onSearch}
          // filterOption={(input, option) =>
          //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          // }
          options={items}
        //   defaultValue={props.value}
        />
      </>)
  };
  const SelectFieldDropdown = (values, onChange, multiple = false) => {
    let items = [{ value: '', label: '' }]
    if (values !== undefined)

      items = values['schema'].map(field => ({
        value: field.name,
        label: values.alias.concat('.', field.name)
      }))
    return (
      <>
        <Select
          mode={multiple ? "multiple" : null}
          showSearch
          //   placeholder="Bảng dữ liệu"
          optionFilterProp="children"
          onChange={onChange}
          //   onSearch={onSearch}
          // filterOption={(input, option) =>
          //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          // }
          options={items}
        // defaultValue={value}
        />
      </>)
  };
  useEffect(() => {
    const projectName = 'MBF';
    form.setFieldValue('project', projectName);
    form.setFieldValue('description', '');
    form.setFieldValue('type', 'bronze');
    setTable([{
      "description": "",
      "name": "SUM_CHARGE_BY_CODE",
      "project": "MBF",
      "schema": [
        {
          "description": "",
          "name": "CODE",
          "nullable": true,
          "typ": "String"
        },
        {
          "description": "",
          "name": "CHARGE_PRICE",
          "nullable": true,
          "typ": "Float"
        }
      ],
      "typ": "bronze"
    }])


    // axios.get('/tables/metadata?project_name='+projectName).then(
    //     (res)=>{
    //         console.log(res);
    //         setTable(res.data);
    //     }
    // ).catch((err) => {
    //     console.error(err);
    //     message.error(err.message);
    // })
  }, [])


  return (
    <>
      <Form
        form={form}
        name="create silver"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        {...tailLayout}
        autoComplete="off"
      >
        <Form.Item
          name="tableName"
          label="Create New Table"
          rules={[
            {
              required: false,
              message: 'Thông tin bảng dữ liệu mới',
            },
          ]}
        >
          <Input onChange={(e) => { form.setFieldValue('newTable', tables[e]) }} />


        </Form.Item>
        <Form.Item
          name="sourceTable"
          label="Source table A"
          rules={[
            {
              required: false,
              message: 'Chọn bảng dữ liệu gốc',
            },
          ]}
        >
          {SelectTableDropdown(tables, (e) => {
            form.setFieldValue('sourceTable', tables[e]);
            form.setFieldValue(['sourceTable', 'alias'], 'A')
          })}
        </Form.Item>

        <Form.List name="joinedTable" >
          {(fields, { add, remove }) => (
            <>
              {/* <Space direction="vertical"> */}

              {fields.map((field) => (
                <Form.Item name={['joinedTable', field.name]} label={"Join " + alias(field.name)}
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                  }>
                  <Space key={field.key} align="baseline">
                    {SelectTableDropdown(tables, (e) => { form.setFieldValue(['joinedTable', field.name], tables[e]); form.setFieldValue(['joinedTable', field.name, 'alias'], alias(field.name)) })}

                    <Text > On</Text>
                    {SelectFieldDropdown(sourceTable, (e) => form.setFieldValue(['joinedTable', field.name, 'onA'], e))}
                    =
                    {SelectFieldDropdown(joinedTable[field.name], (e) => form.setFieldValue(['joinedTable', field.name, 'onB'], e))}
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>

                </Form.Item>
              ))}
              <Form.Item wrapperCol={{ offset: 6 }}>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add table to join
                </Button>
              </Form.Item>
              {/* </Space> */}
            </>
          )}
        </Form.List>


        <Form.Item
          name="selectedFields"
          label="Fields"
          rules={[
            {
              required: false,
              message: 'Chọn dữ liệu hiển thị',
            },
          ]}
        >

          {SelectFieldDropdown(sourceTable, (e) => form.setFieldValue([sourceTable.name, 'selectedFields',], e), true)}
          {joinedTable ? joinedTable.map((table, idx) => (
            SelectFieldDropdown(table, (e) => {
              form.setFieldValue(['joinedTable', idx, 'selectedFields'], e)
            }, true)
          )) : null}
        </Form.Item >




        <Form.List name="newCol" >
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, idx) => (

                <Form.Item name={['newCol', field.name]}
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                  }
                  wrapperCol={{ offset: 6 }}
                >
                  {/* <Space
                      key={field.key}
                      style={{
                        // display: 'flex',
                        marginBottom: 8
                      }}
                      align="baseline"> */}
                  <AutoComplete dropdownMatchSelectWidth={500}
                    options={options}
                    filterOption={true}
                    onChange={(e) => { form.setFieldValue(['newCol', field.name], e) }} />
                  <MinusCircleOutlined onClick={() => remove(field.name)} />

                {/* </Space> */}
                 </Form.Item>
          ))}
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              New Column
            </Button>
          </Form.Item>
        </>
          )}
      </Form.List>


      <Form.Item
        name="filter"
        label="Filter"
        rules={[
          {
            required: false,
            message: 'Lọc dữ liệu',
          },
        ]}
      >
        <AutoComplete dropdownMatchSelectWidth={500}
          options={options}
          filterOption={true}
          onChange={(e) => { form.setFieldValue(['filter'], e) }}
        />
      </Form.Item >
      {
        !moreDetail ? <></> :
          <Form.Item
            name="groupby"
            label="Group By"
            rules={[
              {
                required: false,
                message: 'Gom dữ liệu',
              },
            ]}
          >

            {(joinedTable ? [sourceTable].concat(joinedTable) : [sourceTable]).map((table) => (
              SelectFieldDropdown(table, (e) => { form.setFieldValue(['groupby'], table.alias + '.' + e) }, true)
            ))}
          </Form.Item >
      }


      <Form.Item >
        <Button onClick={toggleMoreDetail}>{!moreDetail ? 'More Detail' : 'Less Detail'}</Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        {/* <Button type="primary" onClick={props.schema}>
          Schema
        </Button> */}
      </Form.Item>
    </Form>


          {/* <PreTable/> */ }
          </>

  );
};
export default FormSilver;