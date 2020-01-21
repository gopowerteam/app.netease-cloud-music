import React, { Component } from "react";
import styled from "styled-components";
import { AuthStore } from "~/store/auth.store";
import { Consumer } from "reto";
import { Avatar, Icon, Modal } from "antd";
import UserLogin from "./user-login";
import UserInfo from "./user-info";
const components = {
  Wrapper: styled.section``,
  UserContainer: styled.div`
    padding: 10px;
    & > * {
      margin-left: 10px;
    }

    .username {
      font-weight: 500;
    }
  `
};

interface UserAuthProps {}

interface UserAuthState {
  showUserLogin: boolean;
  showUserInfo: boolean;
}

export default class UserAuth extends Component<UserAuthProps, UserAuthState> {
  constructor(props) {
    super(props);
    this.state = {
      showUserInfo: false,
      showUserLogin: false
    };
  }

  public render() {
    return (
      <components.Wrapper>
        <Consumer of={AuthStore}>
          {authStore => this.getUserContainer(authStore)}
        </Consumer>
        {this.getUserLogin()}
        {this.getUserInfo()}
      </components.Wrapper>
    );
  }

  public getUserContainer({ user, login, logout }) {
    const showUserInfo = () => this.setState({ showUserInfo: true });
    const showUserLogin = () => this.setState({ showUserLogin: true });

    if (user && this.state.showUserLogin) {
      setTimeout(() => {
        this.setState({
          showUserLogin: false
        });
      });
    }

    if (!user && this.state.showUserInfo) {
      setTimeout(() => {
        this.setState({
          showUserInfo: false
        });
      });
    }

    return (
      <components.UserContainer
        className="flex-row align-items-center"
        onClick={user ? showUserInfo : showUserLogin}
      >
        {this.getUserAvatar(user)}
        {this.getUserName(user)}
        <Icon type="caret-right" />
      </components.UserContainer>
    );
  }

  public getUserAvatar(user) {
    const props = {
      icon: user ? undefined : "user",
      src: user ? user.avatarUrl : undefined
    };

    return <Avatar style={{ cursor: "pointer" }} size={40} {...props}></Avatar>;
  }

  public getUserName(user) {
    return <div className="username">{user ? user.nickname : "未登录"}</div>;
  }

  private getUserLogin() {
    return (
      <Modal
        width={350}
        footer={null}
        visible={this.state.showUserLogin}
        onCancel={() => this.setState({ showUserLogin: false })}
      >
        <UserLogin></UserLogin>
      </Modal>
    );
  }

  private getUserInfo() {
    return (
      <Modal
        width={400}
        footer={null}
        visible={this.state.showUserInfo}
        onCancel={() => this.setState({ showUserInfo: false })}
      >
        <UserInfo></UserInfo>
      </Modal>
    );
  }
}
