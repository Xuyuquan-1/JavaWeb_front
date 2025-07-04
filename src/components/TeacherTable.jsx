import React, {useEffect, useState} from 'react';
import {Button, Table} from 'antd';
import { createStyles } from 'antd-style';
import { default as MyButton } from './Button.jsx';
import axios from 'axios';
import {default as ComponentDialog } from './TeacherDialog.jsx';

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

const scorecolumns = (handleEdit,handleDelete) => [
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
        render: (_, record) => (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                    type="primary"
                    onClick={() => {
                        console.log(record);
                        handleDelete(record);
                    }}
                >
                    删除
                </Button>
                <ComponentDialog submitfunc={handleEdit} pagetype={"edit"} page={"score"} olddata={record}/>
            </div>
        )
    },
];

const App = ({page, searchvalue, dialogvalues}) => {
    const { styles } = useStyle();
    const [dataSource, setDataSource] = useState([]); // 替换原有的 const dataSource
    const [loading, setLoading] = useState(false); // 加载状态
    const [pageUrl, setPageUrl] = useState('http://localhost:8080/untitled/selectlearn');

    //[teachercolumns, studentcolumns, coursecolumns]
    const [secondpage, setSecondpage] = useState(()=>scorecolumns);

    let searchText = searchvalue;
    const baseUrl = 'http://localhost:8080/untitled/';

    useEffect(() => {
        switch(page) {
            case 'score': setSecondpage(()=>scorecolumns); setPageUrl('http://localhost:8080/untitled/selectlearn'); break;

            default: setSecondpage(()=>scorecolumns);
        }
    }, [page]);

    // console.log("nowpage: ",secondpage);

    //搜索框的hook
    useEffect(()=> {
        //
        const searchData = async() => {
            try {
                setLoading(true);
                const response = await axios.get(pageUrl+`?searchText=${searchText}`);
                console.log("response",response);
                setDataSource(()=> {
                    return response.data.data;
                })
            } catch (error) {
                console.error('Error searching data:', error);
                console.log("searchInput fault！！！");
            } finally {
                setLoading(false);
            }
        };
        searchData();

    },[searchText]);

    //添加数据
    useEffect(
        () => {
            //
            const submitData = async() => {
                try {
                    setLoading(true);
                    const response = await axios.post(baseUrl+'add'+`${page}`, dialogvalues);
                    console.log("URL",baseUrl+'add'+`${page}`);
                    console.log("发送前Data: ",
                        dialogvalues,
                        {
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8' // 明确指定编码
                            }
                        });
                    console.log("response",response);
                    setDataSource(()=> {
                        return response.data.data;
                    })
                } catch (error) {
                    console.error('Error searching data:', error);
                    console.log("searchInput fault！！！");
                } finally {
                    setLoading(false);
                }
            }
            submitData();
        },[dialogvalues]);

    //编辑回调
    const handleEdit = (record) => { // record包含三个字段cname, sname, score
        console.log("handleEdit",record);
        const editdata = async() => {
            try {
                setLoading(true);
                const response = await axios.post(baseUrl+'edit'+`${page}`,record);
                console.log("response",response);
                setDataSource(()=> {
                    return response.data.data;
                })
            } catch (error) {
                console.error('Error editing data:', error);
                console.log("searchInput fault！！！");
            } finally {
                setLoading(false);
            }
        };
        editdata();
    }

    //删除回调
    const handleDelete = (record) => {
        console.log("success: handledelete",record);
        const deletedata = async() => {
            try {
                setLoading(true);
                const response = await axios.post(baseUrl+'del'+`${page}`, record);
                console.log("删除response",response);
                setDataSource(()=> {
                    return response.data.data;
                })
            } catch (error) {
                console.error('Error searching data:', error);
                console.log("searchInput fault！！！");
            } finally {
                setLoading(false);
            }
        };
        deletedata();
    }

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
            columns={secondpage(handleEdit,handleDelete)}
            dataSource={dataSource}
            loading={loading}
            scroll={{ x: 'max-content', y: 51 * 13 }}
            //why？注意这个
            //在antd中每个数据对象会被渲染成一行
            rowKey={record => `${record.cname}_${record.sname}`}
        />
    );
};
export default App;