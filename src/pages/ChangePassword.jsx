import { Button, Divider, Form, message } from 'antd'
import Input from 'antd/es/input/Input';
import React from 'react'
import axiosClient from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';

const   ChangePassword =()=> {
 const [form] = Form.useForm();
 const navigate=useNavigate();
 async function onFinish(values) {
    try {
        
        const response = await axiosClient.put('/auth/change-password', values);
        message.success(response.data.message);
        form.resetFields();
        navigate("/profile");

    } catch (error) {
        
       message.error(error?.response?.data?.message);
    }
 }
    return (
        <div>
      <h4>ChangePassword</h4>
      <Divider/>
<Form
form={form}
onFinish={onFinish}
layout='vertical'
style={{ maxWidth: 400 }}
>
    <Form.Item
    name={'currentPassword'}
    label="Current Password"
    rules={[
        { required:true ,message:"Please enter your current password "},
        { min:8,message:"Password must be 8 chars minimum"},
        { max:32,message:"Password must be 32 chars max"},


        ]}>
<Input.Password placeholder='current password'/>
    </Form.Item>
     <Form.Item
    name={'newPassword'}
    label="New  Password"
    rules={[
        { required:true ,message:"Please enter your current password "},
        { min:8,message:"Password must be 8 chars minimum"},
        { max:32,message:"Password must be 32 chars max"},


        ]}>
<Input.Password placeholder='New password'/>
    </Form.Item>
     <Form.Item
    name={'confirmNewPassword'}
    label="Confirm New Password"
    rules={[
        { required:true ,message:"Please enter your current password "},
        { min:8,message:"Password must be 8 chars minimum"},
        { max:32,message:"Password must be 32 chars max"},


        ]}>
<Input.Password placeholder='Confirm New Password'/>
    </Form.Item>
    <Form.Item >
        <Button type='primary' htmlType="submit">Change Password</Button>
    </Form.Item>
</Form>
      </div>
    )
  }

export default ChangePassword