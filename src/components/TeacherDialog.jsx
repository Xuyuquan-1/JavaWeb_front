import {Modal, Form, Input, Button, Flex} from 'antd';
import {useEffect, useState} from "react";
// import axios from "axios";

const App = ({submitfunc,pagetype,page,olddata}) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    let text = "";

    if (pagetype === "edit") {
        text = "修改";
    }
    else if(pagetype === "add")
        text = "登记";



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
            submitfunc(values);

            setOpen(false);

        } catch (err) {
            console.log('验证失败:', err);
        }
    };

    if(pagetype === "add" && page === "score")
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
                    title="登记成绩"
                    open={open}
                    onOk={handleSubmit}
                    onCancel={() => setOpen(false)}
                    destroyOnClose
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="cname"//最后提交数据对象中的键
                            label="课程名"
                            rules={[{ required: true, message: '请输入课程名' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="sname"
                            label="学生姓名"
                            rules={[{ required: true, message: '请输入学生姓名' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="score"
                            label="成绩"
                            rules={[{ required: true, message: '请输入成绩' }]}
                        >
                            <Input />
                        </Form.Item>

                        {/* 更多表单项... */}
                    </Form>
                </Modal>
            </>
        );

    else if(pagetype === "edit" && page === "score")
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
                            name="cname"//最后提交数据对象中的键
                            label="课程名"
                            rules={[{ required: true}]}
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                            name="sname"
                            label="学生姓名"
                            rules={[{ required: true}]}
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                            name="score"
                            label="成绩"
                            rules={[{ required: true, message: '请输入成绩' }]}
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
