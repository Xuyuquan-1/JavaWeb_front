import React, {useEffect, useState} from 'react';
import { Table } from 'antd';
import { createStyles } from 'antd-style';
import { default as MyButton } from './Button.jsx';
import axios from 'axios';

const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
        customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
    };
});
const columns = [
    {
        title: '教授学科',
        width: 150,
        dataIndex: 'cno',
        key: 'cno',
        fixed: 'left',
    },
    {
        title: '账号',
        width: 150,
        dataIndex: 'taccount',
        key: 'taccount',
        fixed: 'left',
    },
    {
        title: '姓名',
        dataIndex: 'tname',
        key: 'tname',
        width: 150,
    },
    {
        title: '工号',
        dataIndex: 'tno',
        key: 'tno',
        width: 150,
    },
    {
        title: '密码',
        dataIndex: 'tpwd',
        key: 'tpwd',
        width: 150,
    },
    {
        title: '电话',
        dataIndex: 'ttel',
        key: 'ttel',
        width: 150,
    },

    {
        title: 'Action',
        key: 'end',
        fixed: 'right',
        width: 100,
        // render: () => <a>action</a>,
        render: () => <MyButton fathercolor={'blue'} fathertext={'删除'}/>,
    },
];

const App = () => {
    const { styles } = useStyle();
    const [dataSource, setDataSource] = useState([]); // 替换原有的 const dataSource
    const [loading, setLoading] = useState(false); // 加载状态

    // 获取数据的函数
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/untitled/selectteacher');
            console.log(response.data.data[0].cno);
            setDataSource([{
                key: '1',
                cno: response.data.data[0].cno,
                taccount: response.data.data[0].taccount,
                tname: response.data.data[0].tname,
                tno: response.data.data[0].tno,
                tpwd: response.data.data[0].tpwd,
                ttel: response.data.data[0].ttel,
                // tend: ""
            }]);
            console.log("datasource: ",dataSource);

            // 假设 API 返回的是数组格式数据
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // 组件挂载时获取数据
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Table
            className={styles.customTable}
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            scroll={{ x: 'max-content', y: 51 * 13 }}
        />
    );
};
export default App;