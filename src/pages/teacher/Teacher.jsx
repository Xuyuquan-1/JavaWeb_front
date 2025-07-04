import React, { useState } from 'react';
import { default as ComponentSearchInput } from '/src/components/SearchInput.jsx'
import { default as ComponentHeadPicture } from '/src/components/HeadPicture.jsx';
import { default as ComponentTable } from '/src/components/TeacherTable.jsx';
import { default as ComponentDialog } from "/src/components/TeacherDialog.jsx";

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
    const [collapsed, setCollapsed] = useState(false);
    const [currentMenu, setCurrentMenu] = useState('score');
    const [searchvalue, setSearchvalue] = useState('');
    const [dialogValues, setDialogValues] = useState({});

    const onSearch = (value) => {
        setSearchvalue(value)
        //value是文本框中的内容
        console.log(searchvalue);
    }

    const MenuChange = (menuInfo) => {
        switch(menuInfo.key) {
            case '1':
                setCurrentMenu('score');
                break;
        }
        console.log("切换标签：",currentMenu);
    }

    const submitFunc = (values) => { //values是个对象
        setDialogValues(values);
        console.log("提交表单：",dialogValues);
    }

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
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
                            label: '学生成绩',
                        },
                    ]}
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
                        <ComponentSearchInput fathertext={'请输入查找内容'} onSearch={onSearch}/>
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
                    <ComponentDialog submitfunc={submitFunc} pagetype={"add"} page={currentMenu}/>
                    <ComponentTable page={currentMenu} searchvalue={searchvalue}  dialogvalues={dialogValues}/>
                </Content>

            </Layout>
        </Layout>
    );
};
export default App;