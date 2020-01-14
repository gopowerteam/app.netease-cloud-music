import React from "react";
import { Row, Col, Avatar, Icon } from "antd";
import { UserLogin } from "./user-login";
import { Consumer } from "reto";
import { UserStore } from "~/store/user.store";

export class UserStatus extends React.Component {
  constructor(props) {
    super(props);
    this.onRef = this.onRef.bind(this);
    this.onLogined = this.onLogined.bind(this);
  }

  private userLogin!: UserLogin;

  private onRef(ref: UserLogin) {
    this.userLogin = ref;
  }

  private onLogined(data) {}

  public getStatus(store) {
    return (
      <div>
        <div>{store.userName}</div>
      </div>
    );
  }

  public loginButton() {
    return <div onClick={() => this.userLogin.login()}>未登录</div>;
  }

  public render() {
    return (
      <Consumer of={UserStore}>
        {store => (
          <Row type="flex" justify="start" align="middle">
            <Col offset={1} span={5}>
              <Avatar size={32} icon="user" />
            </Col>
            <Col span={15} className="text-center">
              {/* {store.userName ? { this.getStatus(store)} : this.loginButton()} */}
              {this.loginButton()}
            </Col>
            <Col span={3}>
              <Icon type="caret-right" />
            </Col>
            <UserLogin ref={this.onRef} onLogined={this.onLogined}></UserLogin>
          </Row>
        )}
      </Consumer>
    );
  }
}
