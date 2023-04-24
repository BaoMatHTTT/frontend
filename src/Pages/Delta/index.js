import React from 'react';
import { Layout } from 'antd';
import Header from '../../Components/Header'
// import DefineSilver from './Silver/addSilver';
// import DefineBronze from './dump/addBronze';
// import DrawChart from './dump/drawChart';
// import FormSilver from './Silver/FormSilver';
// import FormChart from './Chart/FormChart';
// import PreTable from './preTable';
// import CreateSilver from './Silver';
const { Content, Footer } = Layout;

const contentStyle = {
    textAlign: 'center',
    padding: '0 50px',
    margin: '16px 0 0 0'
};

const projectName = 'MBF'
const userName = 'mbf'

function DeltaTable() {
    return <Layout>
        <Header />
        <Content style={contentStyle}>
            {/* <DefineBronze/> */}
            {/* <DefineSilver/> */}
            {/* <FormSilver/> */}
            {/* <CreateSilver/> */}
        {/* <PreTable toggle={toggle} /> */}
            {/* <FormChart/> */}
            {/* <DrawChart/> */}
        </Content>
        <Footer />
    </Layout>
}

export default DeltaTable