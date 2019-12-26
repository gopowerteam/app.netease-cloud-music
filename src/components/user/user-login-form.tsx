import React from "react";
import { Form, Input, Icon } from "antd";
import { FormComponentProps } from "antd/es/form";

interface IFormProperty extends FormComponentProps {
  userName?: string;
  passWord?: string;
}

class UserLoginForm extends React.Component<IFormProperty, any> {
  public readonly form = this.props.form;

  public render() {
    const { getFieldDecorator } = this.form;
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "请输入您的用户名" }]
          })(
            <Input prefix={<Icon type="user" />} placeholder="用户名"></Input>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("passWord", {
            rules: [{ required: true, message: "请输入密码" }]
          })(<Input prefix={<Icon type="lock" />} placeholder="密码"></Input>)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create<IFormProperty>({ name: "user-login-form" })(
  UserLoginForm
);
