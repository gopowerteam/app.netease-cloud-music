import React from "react";
import { Row, Col, Avatar, Icon, Popover, Button } from "antd";
import { UserLogin } from "./user-login";
import { Consumer } from "reto";
import { UserStore } from "~/store/user.store";
import UserAccount from "./user-info/user.account";

export class UserStatus extends React.Component {
  constructor(props) {
    super(props);
    this.onRef = this.onRef.bind(this);
  }

  private userLogin!: UserLogin;

  private onRef(ref: UserLogin) {
    this.userLogin = ref;
  }

  private onLogined(store, data) {
    store.updateUserName(data.email);
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
              {store.userName ? (
                <Popover
                  trigger="click"
                  placement="rightTop"
                  content={<UserAccount></UserAccount>}
                >
                  <Button type="link">{store.userName}</Button>
                </Popover>
              ) : (
                <div onClick={() => this.userLogin.login()}>未登录</div>
              )}
            </Col>
            <Col span={3}>
              <Icon type="caret-right" />
            </Col>
            <UserLogin
              ref={this.onRef}
              onLogined={data => this.onLogined(store, data)}
            ></UserLogin>
          </Row>
        )}
      </Consumer>
    );
  }
}
