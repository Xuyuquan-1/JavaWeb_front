import React from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import axios from 'axios';

const App = () => {


    const handleClick = async () => {
        try {
            const response = await axios.get('http://localhost:8080/untitled/serialtest', {
                // 如果需要跨域携带凭证（如 cookies），可以设置：
                // withCredentials: true,
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('请求失败:', error);
        }
    };


    return (
        <ConfigProvider>
            <Space>
                <Button size="large" onClick={handleClick}>发送请求</Button>
            </Space>
        </ConfigProvider>
    );
};

import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('button1')).render(
    <App />
)
export default App;