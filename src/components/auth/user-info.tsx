import React, { Component } from "react";
import styled from "styled-components";
import { AuthStore } from "~/store/auth.store";
import { Consumer } from "reto";

const components = {
  Wrapper: styled.section``,
  UserContainer: styled.div``
};

interface UserInfoProps {}

interface UserInfoState {}

export default class UserInfo extends Component<UserInfoProps, UserInfoState> {
  public render() {
    return (
      <components.Wrapper>
        <Consumer of={AuthStore}>
          {store => this.getUserContaienr(store)}
        </Consumer>
      </components.Wrapper>
    );
  }

  public getUserContaienr({ user, logout }) {
    return <components.UserContainer>{user.nickname}</components.UserContainer>;
  }
}
