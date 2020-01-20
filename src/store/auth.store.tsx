import React from "react";
import { useState } from "react";
import { Provider as StoreProvider } from "reto";
import { LoginService } from "~/services/login.service";
import { RequestParams } from "~/core/http";

const loginService = new LoginService();

export interface User {
  avatarUrl: string;
  backgroundUrl: string;
  birthday: number;
  city: number;
  description: string;
  detailDescription: string;
  followeds: number;
  follows: number;
  gender: number;
  mutual: boolean;
  nickname: string;
  playlistCount: number;
  province: number;
  userId: number;
  userType: number;
  vipType: number;
}

export function AuthStore() {
  const _userKey = "$user";
  const _userValue = localStorage.getItem(_userKey);
  const [user, updateUser] = useState<User>(
    _userValue ? JSON.parse(_userValue) : null
  );

  /**
   * 用户登录
   * @param param0
   */
  function login({ email, password }) {
    loginService
      .login(
        new RequestParams({
          email,
          password
        })
      )
      .subscribe(({ profile }) => {
        updateUser(profile);
        localStorage.setItem(_userKey, JSON.stringify(profile));
      });
  }

  function logout() {}

  return {
    user,
    login,
    logout
  };
}

export const AuthStoreProvider = props => {
  return <StoreProvider of={AuthStore}>{props.children}</StoreProvider>;
};
