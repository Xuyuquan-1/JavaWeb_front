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

const studentcolumns = [
    {
        title: '学号',
        width: 150,
        dataIndex: 'sno',
        key: 'sno',
        fixed: 'left',
    },
    {
        title: '姓名',
        width: 150,
        dataIndex: 'sname',
        key: 'sname',
        fixed: 'left',
    },
    {
        title: '账号',
        dataIndex: 'saccount',
        key: 'saccount',
        width: 150,
    },
    {
        title: '密码',
        dataIndex: 'spwd',
        key: 'spwd',
        width: 150,
    },
    {
        title: '电话',
        dataIndex: 'stel',
        key: 'stel',
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
const teachercolumns = [
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

const coursecolumns = [
    {
        title: '课程号',
        width: 150,
        dataIndex: 'cno',
        key: 'cno',
        fixed: 'left',
    },
        {
            title: '课程名',
            width: 150,
            dataIndex: 'cname',
            key: 'cname',
            fixed: 'left',
        },
        {
            title: '开始时间',
            dataIndex: 'csdate',
            key: 'csdate',
            width: 150,
        },
        {
            title: '结束时间',
            dataIndex: 'cedate',
            key: 'cedate',
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

const App = ({page}) => {
    const { styles } = useStyle();
    const [dataSource, setDataSource] = useState([]); // 替换原有的 const dataSource
    const [loading, setLoading] = useState(false); // 加载状态
    const [pageUrl, setPageUrl] = useState('http://localhost:8080/untitled/selectteacher');

    //[teachercolumns, studentcolumns, coursecolumns]
    const [secondpage, setSecondpage] = useState(teachercolumns);

    useEffect(() => {
        switch(page) {
            case 'teacher': setSecondpage(teachercolumns); setPageUrl('http://localhost:8080/untitled/selectteacher'); break;
            case 'student': setSecondpage(studentcolumns);setPageUrl('http://localhost:8080/untitled/selectteacher'); break;
            case 'course': setSecondpage(coursecolumns); setPageUrl('http://localhost:8080/untitled/selectteacher'); break;
            default: setSecondpage(teachercolumns);
        }
    }, [page]);

    console.log("nowpage: ",secondpage);

    // 组件挂载时获取数据
    useEffect(() => {
        // 获取数据的函数
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(pageUrl);
                //赋值
                setDataSource(response.data.data);
                console.log("datasource: ",dataSource);

                // 假设 API 返回的是数组格式数据
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    },[secondpage]);

    return (
        <Table
            className={styles.customTable}
            columns={secondpage}
            dataSource={dataSource}
            loading={loading}
            scroll={{ x: 'max-content', y: 51 * 13 }}
        />
    );
};
export default App;