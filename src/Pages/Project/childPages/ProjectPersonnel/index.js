import React, { useEffect, useState } from 'react';
import { Layout, Table, Row, Col, message } from 'antd';
import ProjectAPI from '../../../../API/Services/Project';
import Header from '../../../../Layouts/Header';
import { useParams } from 'react-router-dom';

const { Content, Footer } = Layout;
const contentStyle = {
    textAlign: 'center',
    padding: '0 50px',
    margin: '16px 0 0 0'
};

const ProjectPersonnel = (props) => {
    const { id } = useParams()
    const [personnels, setPersonnels] = useState([]);
    const [getPersonnelDone, setGetPersonnelDone] = useState(false);
    const [triggerGetPersonnel] = useState(false);

    // const toggle = () => {
    //     setGetProjectDone(false)
    //     setTriggerGetProject(!triggerGetProject)
    // }

    useEffect(() => {
        ProjectAPI.GetProjectPersonnelByID(id)
            .then((response) => {
                const personnels = response.data.personnels;
                setPersonnels(personnels.map((personnel) => ({
                    key: personnel.PERSON_ID,
                    id: personnel.PERSON_ID,
                    first_name: personnel.FIRST_NAME,
                    last_name: personnel.LAST_NAME,
                    email: personnel.EMAIL,
                    rank: personnel.P_RANK,
                    salary: personnel.SALARY,
                    taxcode: personnel.TAXCODE
                })))
                setGetPersonnelDone(true);
            }).catch(err => {
                message.error(err.response.data.error, 1, () => { window.location.reload(); });
            })
    }, [triggerGetPersonnel, id])
    
    const loadingProps = {
        spinning: !getPersonnelDone
    }

    const personnelColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
        { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Rank', dataIndex: 'rank', key: 'rank' },
        { 
            title: 'Salary', dataIndex: 'salary', key: 'salary',
            render: salary => salary.toLocaleString('vi-VN')
        },
        { title: 'Tax Code', dataIndex: 'taxcode', key: 'taxcode' },
    ]

    return <Layout>
        <Header selectedKey={'1'}/>
        <Content style={contentStyle}>
            <Row gutter={[0, 0]} align="middle">
                <Col span={24}>
                    <h1 className='custom-h1-header'>
                        Personnels
                    </h1>
                </Col>
            </Row>
            <div className='site-layout-content'>
                <div className='site-content'>
                    <Table columns={personnelColumns} dataSource={personnels} loading={loadingProps} />
                </div>
            </div>
        </Content>
        <Footer />
    </Layout>
}

export default ProjectPersonnel;