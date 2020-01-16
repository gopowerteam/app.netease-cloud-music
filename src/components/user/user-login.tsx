import React, { Component } from "react";
import { Modal } from "antd";
import EmailLogin from "./login/email-login";

type LoginType = {
  mode: string;
  visible: boolean;
};

type LoginProp = {
  onLogined: (data) => void;
};

export class UserLogin extends Component<LoginProp, LoginType> {
  constructor(props: any) {
    super(props);
    this.state = {
      mode: "用户登录",
      visible: false
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.loginSuccess = this.loginSuccess.bind(this);
  }

  private loginSuccess(values) {
    this.handleOk();
    this.props.onLogined(values);
  }

  public render() {
    return (
      <div>
        <Modal
          title={this.state.mode}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          centered
          wrapClassName="register-model"
          footer={null}
        >
          <EmailLogin onLoginSuccess={this.loginSuccess}></EmailLogin>
        </Modal>
      </div>
    );
  }

  /**
   * 打开登录页面
   */
  public login() {
    this.setState({
      visible: true
    });
  }

  private handleOk() {
    this.setState({
      visible: false
    });
  }

  private handleCancel() {
    this.setState({
      visible: false
    });
  }
}
