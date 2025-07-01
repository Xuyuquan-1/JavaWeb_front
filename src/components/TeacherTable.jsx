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

const scorecolumns = [
    {
        title: '课程名',
        width: 150,
        dataIndex: 'cname',
        key: 'cname',
        fixed: 'left',
    },
    {
        title: '学生姓名',
        width: 150,
        dataIndex: 'sname',
        key: 'sname',
        fixed: 'left',
    },
    {
        title: '成绩',
        dataIndex: 'score',
        key: 'score',
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
    const [pageUrl, setPageUrl] = useState('http://localhost:8080/untitled/selectlearn');

    //[teachercolumns, studentcolumns, coursecolumns]
    const [secondpage, setSecondpage] = useState(scorecolumns);

    useEffect(() => {
        switch(page) {
            case 'score': setSecondpage(scorecolumns); setPageUrl('http://localhost:8080/untitled/selectlearn'); break;

            default: setSecondpage(scorecolumns);
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
                setDataSource(
                    // response.data.data
                    ()=> {
                        return response.data.data;
                    }
                );
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
            //why？注意这个
            //在antd中每个数据对象会被渲染成一行
            rowKey={record => record.sname + record.cname}
        />
    );
};
export default App;