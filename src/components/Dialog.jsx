import {Modal, Form, Input, Button, Flex} from 'antd';
import {useEffect, useState} from "react";
// import axios from "axios";

const App = ({submitfunc,pagetype, olddata}) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    let text = "";

    if (pagetype === "edit") {
        text = "修改";
    }
    else if(pagetype === "add")
        text = "增加";



    //向后端发送添加信息hook

        //
    let URL = "http://localhost:8080/untitled";

    useEffect(() => {
        if (open && pagetype === "edit" && olddata) {
            form.setFieldsValue(olddata); // 预填编辑表单
        } else if (open && pagetype === "add") {
            form.resetFields(); // 清空新增表单
        }
    }, [open, pagetype, olddata]);



    // 提交表单
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // values 包含所有表单数据（一个对象，里面有n个键值对）
            console.log('表单数据:', values);
            // 这里添加API提交逻辑
            // const searchData = async() => {
            //     try {
            //
            //         const response = await axios.get(URL);
            //         console.log("response",response);
            //
            //     } catch (error) {
            //         console.error('Error searching data:', error);
            //         console.log("searchInput fault！！！");
            //     } finally {
            //         console.log("finally");
            //     }
            //
            // };
            // await searchData();
            submitfunc(values);

            setOpen(false);

        } catch (err) {
            console.log('验证失败:', err);
        }
    };

    if(pagetype === "add")
    return (


        <>
            <Flex justify="end" gap="middle">
                <Button
                    type="primary"
                    onClick={() => setOpen(true)}
                >
                    {text}
                </Button>
            </Flex>

            <Modal
                title="新增数据"
                open={open}
                onOk={handleSubmit}
                onCancel={() => setOpen(false)}
                destroyOnClose
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="tname"//最后提交数据对象中的键
                        label="姓名"
                        rules={[{ required: true, message: '请输入姓名' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="cname"
                        label="教授学科"
                        rules={[{ required: true, message: '请输入教授学科' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="taccount"
                        label="账号"
                        rules={[{ required: true, message: '请输入账号' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tpwd"
                        label="密码"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tno"
                        label="工号"
                        rules={[{ required: true, message: '请输入工号' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="ttel"
                        label="电话"
                        rules={[{ required: true, message: '请输入电话' }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* 更多表单项... */}
                </Form>
            </Modal>
        </>
    );

    else if(pagetype === "edit")
        return (


            <>
                <Flex justify="end" gap="middle">
                    <Button
                        type="primary"
                        onClick={() => setOpen(true)}
                    >
                        {text}
                    </Button>
                </Flex>

                <Modal
                    title="新增数据"
                    open={open}
                    onOk={handleSubmit}
                    onCancel={() => setOpen(false)}
                    destroyOnClose
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="tno"//最后提交数据对象中的键
                            label="工号"
                            rules={[{ required: true}]}
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                            name="taccount"//最后提交数据对象中的键
                            label="账号"
                            rules={[{ required: true, message: '请输入账号' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="tpwd"
                            label="密码"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="ttel"
                            label="电话"
                            rules={[{ required: true, message: '请输入电话' }]}
                        >
                            <Input />
                        </Form.Item>

                        {/* 更多表单项... */}
                    </Form>
                </Modal>
            </>
        );
};

export default App;
