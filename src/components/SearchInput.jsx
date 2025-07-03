import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;

const App = ({fathertext, onSearch}) => (
        <Search style={{width: 400 }} placeholder={fathertext} onSearch={onSearch} enterButton />
);
export default App;