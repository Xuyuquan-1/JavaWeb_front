import React, { useState } from 'react';
import { default as ComponentSearchInput } from '/src/components/SearchInput.jsx'
import { default as ComponentHeadPicture } from '/src/components/HeadPicture.jsx';
import { default as ComponentGridMessage } from '/src/components/GridMessage.jsx';
import {default as ComponentTable } from '/src/components/AdminTable.jsx';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Button, Flex, Layout, Menu, theme} from 'antd';

const { Header, Sider, Content } = Layout;
const App = () => {
    // ['teacher', 'student', 'course'];
    const [currentMenu, setCurrentMenu] = useState('teacher')
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const MenuChange = (menuInfo) => {
        switch(menuInfo.key) {
            case '1':
                setCurrentMenu('teacher');
                break;
            case '2':
                setCurrentMenu('student');
                break;
            case '3':
                setCurrentMenu('course');
                break;
        }
        console.log("切换标签：",currentMenu);
    }

    return (
        <Layout style={{ minHeight: '98vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: '教师',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: '学生',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: '课程信息',
                        },
                    ]}
                    onClick={MenuChange}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Flex align={'center'}>
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
                        <ComponentSearchInput fathertext={'请输入查找内容'}/>
                            <ComponentHeadPicture />
                    </Flex>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {/*<ComponentGridMessage fathertext={[*/}
                    {/*    ['11','12','13','14','15','16'],*/}
                    {/*    ['21','22','23','24','25','26'],*/}
                    {/*    ['31','32','33','34','35','36']]}/>*/}
                    <ComponentTable page={currentMenu}/>
                </Content>

            </Layout>
        </Layout>
    );
};
export default App;