import React, {useEffect, useState} from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { default as Mydropdown } from '../../components/dropdown.jsx';
import backgroundImg from '../../assets/back.png';
import axios from "axios";
// const onFinish = values => {
//     console.log('Success:', values);
// };
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
const App = () => {

    const [Permission, setPermission] = useState('admin');
    const [values, setvalues] = useState({});

    const handlePermission = (key) => {
        if (key === '1'){
            setPermission('admin');
        }
        else if (key === '2'){
            setPermission('student');
        }
        else if (key === '3') {
            setPermission('teacher');
        }
    };

    sessionStorage.removeItem('name');

    const baseUrl = 'http://localhost:8080/untitled/';

    const applybaseUrl = 'http://localhost:5173/vitetestapp/';
    // const applybaseUrl = 'http://localhost:8080/vitetestapp/';

    useEffect(
        () => {
            //
            const submitData = async() => {
                try {
                    if(values === null)
                        return;
                    let cleanValues = {};
                    if (Permission === 'admin'){
                        cleanValues = {
                        aaccount: values.account,
                        apwd: values.pwd,
                        }
                    }
                    else if (Permission === 'teacher'){
                        cleanValues = {
                        taccount: values.account,
                        tpwd: values.pwd,
                        }
                    }
                    else if(Permission === 'student'){
                        cleanValues = {
                        saccount: values.account,
                        spwd: values.pwd,
                        }
                    }
                    console.log("values：",values);
                    console.log("cleanvalues：",cleanValues);
                    const response = await axios.post(baseUrl+'check'+`${Permission}`, cleanValues);
                    console.log("发送前Data: ",
                        cleanValues,
                        {
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8' // 明确指定编码
                            }
                        });
                    console.log("response",response);
                    if(response.data.statuscode === 0){
                        if (Permission === 'admin') {
                            sessionStorage.setItem('name', cleanValues.aaccount);
                            window.location.href = applybaseUrl+'admin.html';
                        }
                        else if (Permission === 'teacher'){
                            sessionStorage.setItem('name', cleanValues.taccount);
                            window.location.href = applybaseUrl+'teacher.html';
                        }
                        else if (Permission === 'student'){
                            sessionStorage.setItem('name', cleanValues.saccount);
                            window.location.href = applybaseUrl+'student.html';
                        }
                    }
                } catch (error) {
                    console.error('Error searching data:', error);
                    console.log("searchInput fault！！！");
                }
            }
            submitData();
        },[values]);


    const handleSubmit = (values) => {
        console.log('Received values of form: ', values);
        if (Permission === 'admin'){
            setvalues(values);
        }
        else if (Permission === 'student'){
            setvalues(values);
        }
        else if (Permission === 'teacher'){
            setvalues(values);
        }
        else {
            console.log('没有权限：Permission' , Permission);
        }
    };

    return (
    <div>
        <div style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '98vh',
            display: 'flex',
            justifyContent: 'center', // 使内容靠右
            alignItems: 'center',
            // padding: '20px'
        }}>
        <div style={{ width: '100%',
                      maxWidth: 680,
                      maxHeight: 800,
                      background: 'rgba(255, 255, 255, 0.64)',
                      borderRadius: '8px'
        }}>
        <Mydropdown permissionfunc={handlePermission} now={Permission}/>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="account"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="pwd"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </div>
        </div>
    </div>
    );
};
export default App;