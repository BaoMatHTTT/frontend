import React from 'react';
import './index.css';
import { Layout } from 'antd';
import Header from '../../Components/Header'
// import Files from './Files';
import StreamingSources from './Stream';
// import BatchSources from './Batch/Batch';

const { Content, Footer } = Layout;

const contentStyle = {
    textAlign: 'center',
    padding: '0 50px',
    margin: '16px 0 0 0'
};

const projectName = 'MBF'
const userName = 'mbf'

function Ingestion() {
    return <Layout>
        <Header />
        <Content style={contentStyle}>
            {/* <Files projectName={projectName} userName={userName}/> */}
            <StreamingSources projectName={projectName} userName={userName}/>
            {/* <BatchSources projectName={projectName} userName={userName}/> */}
        </Content>
        <Footer />
    </Layout>
}

export default Ingestion