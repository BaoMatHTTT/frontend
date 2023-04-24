import React from "react";
import { TeamOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const CompanyNavigation = (props) => {
    return <Menu
        selectedKeys={props.selectedKey}
        style={{ backgroundColor: 'inherit', float: 'left' }}
        theme="dark"
        mode="horizontal"
        items={[
            { 
                key: 1, icon: <FundProjectionScreenOutlined style={{ color: 'white' }}/>, 
                label: <Link to={`/projects`} style={{ color: 'white' }}> Project </Link>,
            }, 
            {                
                key: 2, icon: <TeamOutlined style={{ color: 'white' }} />, 
                label: <Link to={`/personnels`} style={{ color: 'white' }}> Personnel </Link>,
            }
        ]}
        />
}

export default CompanyNavigation;