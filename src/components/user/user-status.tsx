import React from "react";
import { Row, Col, Avatar, Icon } from "antd";
import { UserLogin } from "./user-login";

export class UserStatus extends React.Component {
  constructor() {
    super({});
    this.onRef = this.onRef.bind(this);
  }

  private userLogin!: UserLogin;

  private onRef(ref: UserLogin) {
    this.userLogin = ref;
  }

  public render() {
    return (
      <Row gutter={16} type="flex" justify="start" align="middle">
        <Col span={6}>
          <Avatar size={48} icon="user" />
        </Col>
        <Col span={8} onClick={() => this.userLogin.login()}>
          未登录
        </Col>
        <Col span={3}>
          <Icon type="caret-right" />
        </Col>
        <UserLogin ref={this.onRef}></UserLogin>
      </Row>
    );
  }
}
