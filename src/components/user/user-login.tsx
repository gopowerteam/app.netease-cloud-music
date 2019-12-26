import React, { Component } from "react";
import { Modal } from "antd";
import UserLoginForm from "./user-login-form";

type LoginType = {
  visible: boolean;
};

export class UserLogin extends Component<any, LoginType> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  public render() {
    return (
      <div>
        <Modal
          title="用户登录"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <UserLoginForm></UserLoginForm>
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
