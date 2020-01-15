import React from "react";
import { useStore } from "reto";
import { UserStore } from "~/store/user.store";
import { Button } from "antd";
import styled from "styled-components";

const component = {
  Head: styled.div`
    width: 200px;
    background-color: #f2f2f2;
  `,
  LogOut: styled.div`
    text-align: right;
    margin: 10px auto;
    font-size: 12px;
  `
};

function UserAccount(prop) {
  const userStore = useStore(UserStore);
  return (
    <div>
      <component.Head>{userStore.userName}</component.Head>
      <component.LogOut>
        <Button type="link" onClick={() => userStore.updateUserName("")}>
          退出
        </Button>
      </component.LogOut>
    </div>
  );
}

export default UserAccount;
