import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Flex, Typography } from 'antd';

const App = () => {
    const user = sessionStorage.getItem('name');
    const username = user; // 替换为实际用户名

    return (
        <div style={{ width: '100%' }}>
            <Flex justify="end" align="center" gap="middle">
                <Typography.Text strong>{username}</Typography.Text>
                <Avatar size={40} icon={<UserOutlined />} />
            </Flex>
        </div>
    );
};

export default App;
