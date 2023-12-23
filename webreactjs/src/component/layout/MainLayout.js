import React, { useEffect, useState } from 'react';
import {
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    DashOutlined,
    PicRightOutlined,
    UnorderedListOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown, Space } from 'antd';
import { Outlet, useNavigate } from "react-router-dom"
import { getProfile, removeStorage } from '../../share/helper';
const { Header, Sider, Content } = Layout;
const App = () => {
    var profile = getProfile();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const onLoginOut = () => {
        removeStorage();
        navigate("/login")
    }

    useEffect(()=>{
        if(profile == null){
            onLoginOut();
        }
    },[profile])

    if(profile == null){
        return null;
    }
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items = [
        {
            label: 'Profile',
            key: '/profile',
        },
        {
            label: 'Change Password',
            key: '/change_password',
        },
        {
            label: 'Setting',
            key: '/setting',
        },
        {
            label: 'Logout',
            key: '/logout',
            icon : <LogoutOutlined />,
            danger : true
        },
    ];

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={(e) => {
                        navigate(e.key)
                    }}
                    items={[
                        {
                            key: '',
                            icon: <DashOutlined />,
                            label: 'Dashboard',
                        },
                        {
                            key: '/employee',
                            icon: <UserOutlined />,
                            label: 'Employee',
                        },
                        {
                            key: '/customer',
                            icon: <UserOutlined />,
                            label: 'Customer',
                        },
                        {
                            key: '/category',
                            icon: <PicRightOutlined />,
                            label: 'Category',
                        },
                        {
                            key: '/product',
                            icon: <UnorderedListOutlined />,
                            label: 'Product',
                        },
                        {
                            key: '/role',
                            icon: <UploadOutlined />,
                            label: 'Role',
                        },
                        {
                            key: '/shift',
                            icon: <UploadOutlined />,
                            label: 'Shift',
                        },
                        {
                            key: '/shift_detils',
                            icon: <UploadOutlined />,
                            label: 'Shift Details',
                        },
                        {
                            key: '/payment_method',
                            icon: <UploadOutlined />,
                            label: 'Payment Method',
                        },
                        {
                            key: '/invoice_status',
                            icon: <UploadOutlined />,
                            label: 'Invoice Status',
                        },
                        {
                            key: '/report',
                            icon: <UploadOutlined />,
                            label: 'Report',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div
                        style={{
                            display:'flex',
                            justifyContent:'space-between'
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div style={{paddingRight:15}}>
                            <Dropdown
                                menu={{
                                    items,
                                    onClick:(e)=>{
                                        if(e.key == "/logout"){
                                            onLoginOut()
                                        }
                                    }
                                }}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        {profile?.Firstname}-{profile?.Lastname}
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>

                    </div>


                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: "90vh",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {/* Content */}
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;


// import {Outlet,Link} from "react-router-dom"
// const MainLayout = () => {

//     return (
//         <div>
//             <div
//                 style={{
//                     height:60,
//                     backgroundColor:"lightgray"
//                 }}
//             >
//                 <div>Brand Name</div>
//                 <div style={{display:'flex'}}>
//                     <Link to={"/"}><button>Home</button></Link>
//                     <Link to={"/customer"}><button>Customer</button></Link>
//                     <Link to={"/employee"}><button>Employee</button></Link>
//                     <Link to={"/role"}><button>Role</button></Link>
//                     <Link to={"/login"}><button>Login</button></Link>
//                 </div>
//             </div>

//             <div>
//                 <Outlet/>
//             </div>

//             <div style={{marginTop:100,fontSize:30}}>Footer</div>
//         </div>
//     )
// }

// export default MainLayout;