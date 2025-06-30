import React from 'react';
import { Col, Row } from 'antd';

const style = { background: '#e3ecf8', padding: '10px 0' };

const App = ({ fathertext }) => {
    // 添加类型检查和默认值
    if (!Array.isArray(fathertext)) {
        return null; // 或者返回加载状态
    }

    return (
        <>
            {fathertext.map((outitem, outindex) => (
                <Row gutter={16} style={{ marginBottom: 10 }} key={`row-${outindex}`}>
                    {Array.isArray(outitem) &&
                        outitem.map((initem, index) => (
                            <Col className="gutter-row" span={4} key={`col-${index}`}>
                                <div style={style}>{initem},{index}</div>
                            </Col>
                        ))
                    }
                </Row>
            ))}
        </>
    );
};

export default App;
