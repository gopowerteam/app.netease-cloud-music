import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import FormItem from "antd/lib/form/FormItem";
import styled from "styled-components";

interface EmailLoginPorps extends FormComponentProps {
  onLoginSuccess: (values) => void;
}

interface EmailLoginFormProps extends EmailLoginPorps {
  email: string;
  password: string;
}

const components = {
  Warp: styled.section`
    margin: 0 auto;
    width: 200px;
    .login-button {
      margin: 10px auto;
      width: 100%;
    }
  `
};

class EmailLogin extends React.Component<EmailLoginFormProps, any> {
  constructor(props) {
    super(props);
    this.handerSubmit = this.handerSubmit.bind(this);
  }

  /**
   * 验证规则
   */
  private rules = {
    email: [{ required: true, message: "请输入你的邮箱账号" }],
    password: [{ required: true, message: "请输入你的邮箱密码" }]
  };

  private handerSubmit() {
    const { form } = this.props;
    form.validateFields((errors: any) => {
      if (!errors) this.props.onLoginSuccess(form.getFieldsValue());
    });
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <components.Warp>
        <Form>
          <FormItem>
            {getFieldDecorator("email", { rules: this.rules.email })(
              <Input
                type="email"
                placeholder={this.rules.email[0].message}
                prefix={<Icon type="mail"></Icon>}
              ></Input>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", { rules: this.rules.password })(
              <Input.Password
                placeholder={this.rules.password[0].message}
                prefix={<Icon type="lock" />}
              ></Input.Password>
            )}
          </FormItem>
        </Form>
        <Button
          className="login-button"
          type="primary"
          onClick={this.handerSubmit}
        >
          登录
        </Button>
      </components.Warp>
    );
  }
}

export default Form.create<EmailLoginPorps>()(EmailLogin);
