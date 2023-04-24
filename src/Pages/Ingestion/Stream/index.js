import React, { useState, useEffect } from 'react';
import { Table, Switch, Tag, Space } from 'antd';
import { SyncOutlined, MinusCircleOutlined } from '@ant-design/icons'
import CreateStreamDrawer from './CreateStreamDrawer'
import DeleteStreamModal from './DeleteStreamModal';
import axios from 'axios';

const API_URL = 'http://localhost:5000'
const StreamingSources = (props) => {
    const [streams, setStreams] = useState([])
    const [pageState, setPageState] = useState({
        page: 1,
        pageSize: 10,
    })
    const [getStreamDone, setGetStreamDone] = useState(false)
    const [triggerGetStream, setTriggerGetStream] = useState(false)

    const toggle = () => {
        setGetStreamDone(false)
        setTriggerGetStream(!triggerGetStream)
    }

    const streamColumns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Created By', dataIndex: 'created_by', key: 'created_by' },
        {
            title: 'Created Time', dataIndex: 'created_time', key: 'created_time',
            render: (time) => (new Date(time.$date)).toLocaleDateString('vi-VN')
        },
        { title: 'Bronze Name', dataIndex: 'bronze_name', key: 'bronze_name' },
        {
            title: 'Source Type', dataIndex: 'source_type', key: 'source_type',
            render: (type) => (type === 'file') ? <Tag color={'green'} key={type}> {type.toUpperCase()} </Tag>
                : <Tag color={'red'} key={type}> {type.toUpperCase()} </Tag>
        },
        {
            title: 'State', dataIndex: 'state', key: 'state',
            render: (state) => {
                if (state.toUpperCase() === 'ACTIVE') {
                    return <Tag icon={<SyncOutlined spin />} color="processing"> Running </Tag>
                } else {
                    return <Tag icon={<MinusCircleOutlined />} color="error"> Stop </Tag>
                }
            }
        },

        {
            title: 'Action', key: 'action',
            render: (_, record) => {
                return <Space size="middle">
                    <DeleteStreamModal selectedStream={record} />
                </Space>
            }
        },
    ]

    const expandedRowRender = (record, idx) => {
        const rowColumns = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Type', dataIndex: 'typ', key: 'typ' },
            { title: 'Nullable', dataIndex: 'nullable', key: 'nullable' },
        ]



        const data = record.source_type === 'file' ? record.source_information.file_schema
            : record.source_information.schema
        
        const dataSource = data.map((x, key) => {
            return {
                ...x,
                key: key
            }
        })

        return <Table columns={rowColumns} dataSource={dataSource} pagination={false} />
    }

    useEffect(() => {
        axios.get(API_URL + `/streams?project_name=${props.projectName}&page=${pageState.page}&pageSize=${pageState.pageSize}`)
            .then(response => {
                if (response.status === 200) {
                    const streams = response.data
                    setStreams(streams.map((stream, idx) => {
                        return {
                            key: idx,
                            id: stream.id,
                            name: stream.name,
                            created_by: stream.created_by,
                            created_time: stream.created_time,
                            bronze_name: stream.bronze_name,
                            state: stream.state,
                            project_name: stream.project_name,
                            version: stream.version,
                            source_type: stream.source_type,
                            source_information: stream.source_information
                        }
                    }))
                    setGetStreamDone(true)
                }
            })
    }, [triggerGetStream])

    const paginationProps = {
        position: ['topRight'],
        current: pageState.page,
        pageSize: pageState.pageSize,
        total: 100,
        onChange: (page, pageSize) => {
            setPageState({
                page: page,
                pageSize: pageSize,
            })
            toggle();
        },
    }

    const loadingProps = {
        spinning: !getStreamDone
    }

    return <>
        <h1> Streaming </h1>
        <CreateStreamDrawer projectName={props.projectName} toggle={toggle} />
        <Table columns={streamColumns}
            expandable={{ expandedRowRender }}
            dataSource={streams}
            pagination={paginationProps}
            loading={loadingProps}
        />
    </>
}

export default StreamingSources;