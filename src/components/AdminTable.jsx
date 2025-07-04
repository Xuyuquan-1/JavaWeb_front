import React, {useEffect, useState} from 'react';
import {Button, Modal, Table} from 'antd';
import { createStyles } from 'antd-style';
import { default as MyButton } from './Button.jsx';
import axios from 'axios';
import {default as ComponentDialog } from './Dialog.jsx';

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

function formatDate(timestamp) {
    const date = new Date(timestamp + 8 * 60 * 60 * 1000); // 东八区调整
    return date.toISOString().split('T')[0];
}



const studentcolumns = (handleDelete, handleEdit) => [
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
        render: (_, record) => (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                    type="primary"
                    onClick={() => {
                        console.log(record.sno);
                        handleDelete(record.sno);
                    }}
                >
                    删除
                </Button>
                <ComponentDialog submitfunc={handleEdit} pagetype={"edit"} olddata={record}/>
            </div>
        )
    }
];
const teachercolumns = (handleDelete, handleEdit) => [
    {
        title: '教授学科',
        width: 150,
        dataIndex: 'cname',
        key: 'cname',
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
        render: (_, record) => (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                    type="primary"
                    onClick={() => {
                        console.log("查看教师: ",record.tno);
                        handleDelete(record.tno);
                    }}
                >
                    删除
                </Button>
                <ComponentDialog submitfunc={handleEdit} pagetype={"edit"} olddata={record}/>
            </div>
        )
    }
];

const coursecolumns = (handleDelete,handleEdit) => [
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
        render: (_, record) => (
            <div style={{ display: 'flex', gap: '8px' }}>
            <Button
                type="primary"
                onClick={() => {
                    console.log("查看课程: ",record.cno);
                    handleDelete(record.cno);
                }}
            >
                删除
            </Button>
                <ComponentDialog submitfunc={handleEdit} pagetype={"edit"} olddata={record}/>
            </div>
        )
    }
    ];

const App = ({page,searchvalue, dialogvalues}) => {
    const { styles } = useStyle();
    const [dataSource, setDataSource] = useState([]); // 替换原有的 const dataSource
    const [loading, setLoading] = useState(false); // 加载状态
    const [pageUrl, setPageUrl] = useState('http://localhost:8080/untitled/selectteacher');



    //点击搜索
    let searchText = searchvalue;
    //[teachercolumns, studentcolumns, coursecolumns]
    const [secondpage, setSecondpage] = useState(()=>teachercolumns);

    useEffect(() => {
        switch(page) {
            case 'teacher': setSecondpage(()=>teachercolumns); setPageUrl('http://localhost:8080/untitled/selectteacher'); break;
            case 'student': setSecondpage(()=>studentcolumns);setPageUrl('http://localhost:8080/untitled/selectstudent'); break;
            case 'course': setSecondpage(()=>coursecolumns); setPageUrl('http://localhost:8080/untitled/selectcourse'); break;
            default: setSecondpage(()=>teachercolumns);
        }
    }, [page]);

    // console.log("重新渲染nowpage: ",secondpage);
    let baseUrl = 'http://localhost:8080/untitled/';

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
                        if (page === 'course') {
                            return response.data.data.map((item) => ({
                                ...item,
                                csdate: formatDate(item.csdate),
                                cedate: formatDate(item.cedate),
                            }));
                        }
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
    },[secondpage,pageUrl]);

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

    const handleDelete = (no) => {
        console.log("success: handledelete",no);
        const deletedata = async() => {
            try {
                setLoading(true);
                const response = await axios.get(baseUrl+'del'+`${page}`+`?delno=${no}`);
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
        deletedata();
    }

    const handleEdit = (record) => { // record包含三个字段taccount， tpwd， ttel
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

    return (

        <Table
            className={styles.customTable}
            columns={secondpage(handleDelete, handleEdit)}
            dataSource={dataSource}
            loading={loading}
            scroll={{ x: 'max-content', y: 51 * 13 }}
            //why？注意这个
            //在antd中每个数据对象会被渲染成一行
            rowKey={record => `${page}_${record.sno || record.tno || record.cno}`}
            // 示例生成 key: "student_20250001"、"teacher_1001"、"course_3001"
        />

    );
};
export default App;