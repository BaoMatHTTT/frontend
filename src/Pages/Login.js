import React from 'react';
// import { Layout, Form, Input, Button } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { LogIn } from 'Stores/authentication/authentication.action';
// import { useNavigate } from "react-router-dom";
// import SignInScreen from "Assets/Images/signin_screen.svg"
// import Logo from "Assets/Images/logo.svg"

// const { Content, Footer } = Layout;
// const contentStyle = {
//     backgroundColor: 'white',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
// };

const SignIn = (props) => {}
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
//     const [form] = Form.useForm();

//     const onSignIn = () => {
//         const fields = form.getFieldsValue();
//         const data = {
//             username: fields.username,
//             password: fields.password
//         }
//         dispatch(LogIn(data));
//     }
//     if (isLoggedIn) {
//         navigate('/projects');
//     } else return <Layout>
//         <Content style={contentStyle}>
//             <div style={{ position: 'relative', width: '65%' }}>
//                 <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', top: '20px', left: '-40px' }}>
//                     <img src={Logo} alt="Logo" style={{ width: '35px', marginRight: '10px' }} />
//                     <h1> Florus </h1>
//                 </div>
//                 <img src={SignInScreen} alt="Sign In SVG" style={{ width: '100%' }} />
//             </div>
//             <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'flex-end',
//                 alignItems: 'space-between',
//             }}>
//                 <h1 style={{ fontSize: '30px', margin: '35px 0px' }}> Welcome to Florus! </h1>
//                 <Button shape='round' className='custom-ghost-button' size='large'>
//                     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                         <img src={'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'} alt="Google Icon" style={{ height: '20px', float: 'left' }} />
//                         <div style={{ fontSize: '0.9rem', marginLeft: '10px' }}> Sign In with Google </div>
//                     </div>
//                 </Button>
//                 <div className='or-block' style={{ display: 'flex', alignItems: 'center', margin: '25px 0px' }}>
//                     <div className='dot-line' style={{ width: '100%', height: '1px', borderTop: '1px dashed #ccc1d6' }} />
//                     <div style={{ padding: '0px 8px', fontSize: '0.75rem' }}> Or </div>
//                     <div className='dot-line' style={{ width: '100%', height: '1px', borderTop: '1px dashed #ccc1d6' }} />
//                 </div>
//                 <Form layout='vertical' autoComplete="off" requiredMark={false} form={form} onFinish={onSignIn}>
//                     <Form.Item name="username"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: 'Please input your username!',
//                             },
//                         ]}
//                     >
//                         <Input suffix={<UserOutlined />} placeholder='Username' />
//                     </Form.Item>
//                     <Form.Item name="password"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: 'Please input your password!',
//                             },
//                         ]}
//                     >
//                         <Input.Password placeholder="Password" className='input-password' />
//                     </Form.Item>
//                     <Form.Item>
//                         <div>
//                             <span style={{ color: 'gray' }}> Forgot password? </span>
//                             <Button
//                                 type='link' className='custom-link'
//                                 style={{ padding: '0' }}
//                                 onClick={() => { navigate('/password-reset') }}
//                             >
//                                 Reset Password
//                             </Button>
//                         </div>
//                     </Form.Item>
//                     <Form.Item>
//                         <Button type="primary" htmlType="submit" className='custom-button'>
//                             Sign In
//                         </Button>
//                     </Form.Item>
//                     <Form.Item>
//                         <div>
//                             <span style={{ color: 'gray' }}> Don't have any account? </span>
//                             <Button
//                                 type='link' className='custom-link'
//                                 style={{ padding: '0' }}
//                                 onClick={() => { navigate('/signup') }}
//                             >
//                                 Sign Up
//                             </Button>
//                         </div>
//                     </Form.Item>
//                 </Form>
//             </div>
//         </Content>
//         <Footer />
//     </Layout>
// }

export default SignIn;