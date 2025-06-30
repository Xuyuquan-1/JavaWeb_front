import React from 'react';
import { Button, ConfigProvider, Flex } from 'antd';

const App = ({fathercolor, fathertext}) => {
    return (
        <ConfigProvider>
                    <Button color={fathercolor} variant="solid">
                        {fathertext}
                    </Button>
        </ConfigProvider>
    );
};
export default App;