import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;

const onSearch = (value, _e, info) =>
    console.log(info === null || info === void 0 ? void 0 : info.source, value);
const App = ({fathertext}) => (
        <Search style={{width: 400 }} placeholder={fathertext} onSearch={onSearch} enterButton />

);
export default App;