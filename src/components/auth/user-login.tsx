import React, { Component } from "react";
import styled from "styled-components";
import { Form, Input, Icon, Button, message } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { FormComponentProps } from "antd/lib/form";
import { ReactComponent as MailSvg } from "~/assets/icons/mail.svg";
import { AuthStore } from "~/store/auth.store";
import { Consumer } from "reto";
const components = {
  Wrapper: styled.section``,
  FormContainer: styled.div`
    .ant-row.ant-form-item {
      margin-bottom: 0px;
    }
    .ant-form-item-control {
      line-height: 30px;
    }
    .ant-form-explain {
      display: none;
    }

    input {
      height: 40px;
      border-radius: 0;
    }

    .email {
      .ant-input-group-addon {
        border-radius: 5px 0 0 0;
      }

      input {
        border-radius: 0 5px 0 0;
      }
    }

    .password {
      .ant-input-group-addon {
        border-radius: 0 0 0 5px;
      }

      input {
        border-radius: 0 0 5px 0;
      }
    }
  `,
  ImgContainer: styled.div`
    height: 200px;
  `,
  ActionContainer: styled.div`
    margin-top: 30px;
    margin-bottom: 30px;

    button {
      border: none;
    }
  `
};

interface UserLoginProps extends FormComponentProps {}

interface UserLoginState {}

export class UserLogin extends Component<UserLoginProps, UserLoginState> {
  /**
   * 验证规则
   */
  private rules = {
    email: [{ required: true, message: "请输入你的邮箱账号" }],
    password: [{ required: true, message: "请输入你的邮箱密码" }]
  };

  public render() {
    return (
      <components.Wrapper>
        {this.getImgContainer()}
        {this.getLoginForm()}
      </components.Wrapper>
    );
  }

  public getImgContainer() {
    return (
      <components.ImgContainer className="flex-row align-items-center justify-content-center">
        <Icon
          style={{ fontSize: 96, color: "#EB9FA0" }}
          component={MailSvg}
        ></Icon>
      </components.ImgContainer>
    );
  }

  public getLoginForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <components.FormContainer className="flex-row align-items-center justify-content-center">
        <Form>
          <FormItem className="email">
            {getFieldDecorator("email", { rules: this.rules.email })(
              <Input
                addonBefore={<Icon type="mail"></Icon>}
                type="email"
                placeholder={this.rules.email[0].message}
              ></Input>
            )}
          </FormItem>
          <FormItem className="password">
            {getFieldDecorator("password", { rules: this.rules.password })(
              <Input.Password
                addonBefore={<Icon type="lock"></Icon>}
                placeholder={this.rules.password[0].message}
              ></Input.Password>
            )}
          </FormItem>

          {this.getLoginAction()}
        </Form>
      </components.FormContainer>
    );
  }

  public getLoginAction() {
    return (
      <components.ActionContainer>
        <Consumer of={AuthStore}>
          {store => (
            <Button
              style={{
                fontSize: "16px",
                height: "40px",
                color: "#ffffff",
                backgroundColor: "#CA4436"
              }}
              block
              onClick={() => this.onLogin(store)}
            >
              登录
            </Button>
          )}
        </Consumer>
      </components.ActionContainer>
    );
  }

  private onLogin({ login }) {
    const { form } = this.props;
    form.validateFields((errors: any, values) => {
      if (!errors) {
        login(values);
      } else {
        const [{ errors: error }] = Object.values(errors);
        const [{ message: errorMsg }] = error;
        message.error(errorMsg);
      }
    });
  }
}

export default Form.create<UserLoginProps>({})(UserLogin);
