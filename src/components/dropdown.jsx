import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer">
                管理员
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" >
                学生
            </a>
        ),
        // icon: <SmileOutlined />,
        // disabled: true,
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" >
                教师
            </a>
        ),
        // disabled: true,
    },
];
const App = ({ permissionfunc, now }) => {
    // 处理菜单项点击
    const handleMenuClick = ({ key }) => {  // 注意这里解构出key
        console.log('点击了:', key);
        if (permissionfunc) {
            permissionfunc(key);  // 将key传递给父组件
        }
    };

    let  Mynow = null

    const SwitchPermisson = () => {
        if (now === 'student' ){
            Mynow = "学生";
        }
        else if (now === 'teacher') {
            Mynow = "教师";
        }
        else if (now === 'admin') {
            Mynow = "管理员";
        }
    }
    SwitchPermisson();

    return (
        <Dropdown
            menu={{
                items,
                onClick: handleMenuClick  // 绑定点击处理函数
            }}
        >
            <a onClick={e => e.preventDefault()}>
                <Space>
                    {Mynow}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    );
};
export default App;