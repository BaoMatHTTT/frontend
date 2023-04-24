import React, { useState, useEffect } from 'react';
import { Layout, Descriptions, Row, Col, Skeleton, message } from 'antd';
import Header from '../../Layouts/Header';
import { useSelector } from 'react-redux';
import PersonnelAPI from '../../API/Services/Personnel';
const { Content, Footer } = Layout;
const contentStyle = {
    textAlign: 'center',
    padding: '0 50px',
    margin: '16px 0 0 0',
    height: '550px'
};

const Account = (props) => {
    const userID = useSelector(state => state.authentication.userInformation.userID);
    const [user, setUser] = useState({});
    const [done, setDone] = useState(false);

    useEffect(() => {
        PersonnelAPI.GetPersonnelByID(userID)
        .then(response => {
            const personnel = response.data.personnel[0];
            setUser({
                personID: personnel.PERSON_ID,
                firstName: personnel.FIRST_NAME,
                lastName: personnel.LAST_NAME,
                email: personnel.EMAIL,
                rank: personnel.P_RANK,
                salary: personnel.SALARY,
                taxcode: personnel.TAXCODE,
            })
            setDone(true);
        }).catch(err => {
            message.error(err.response.data.error, 1, () => { window.location.reload(); });
        }) 
    }, [userID])
    return <Layout>
        <Header selectedKey={'0'} />
        <Content style={contentStyle}>
            <Row gutter={[0, 0]} align="middle">
                <Col span={24}>
                    <h1 className='custom-h1-header'>
                        User Information
                    </h1>
                </Col>
            </Row>
            <div className='site-layout-content'>
                <div className='site-content'>
                    { !done 
                    ? <Skeleton /> 
                    : <Descriptions>
                        <Descriptions.Item label="ID">
                            {user.personID}
                        </Descriptions.Item>
                        <Descriptions.Item label="Name">
                            {user.lastName + " " + user.firstName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {user.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Rank">
                            {user.rank}
                        </Descriptions.Item>
                        <Descriptions.Item label="Salary">
                            {user.salary}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tax Code">
                            {user.taxcode}
                        </Descriptions.Item>
                    </Descriptions>}
                </div>
            </div>
        </Content>
        <Footer />
    </Layout>
}

export default Account;