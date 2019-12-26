import React, { Component } from "react";
import { Menu } from "antd";
import { UserStatus } from "./user/user-status";

export default class SideMenu extends Component {
  public onMenuClick() {}
  public onUserClick() {}
  public render() {
    return (
      <section>
        <UserStatus></UserStatus>
        {this.menuContainer()}
      </section>
    );
  }

  public menuContainer() {
    return (
      <Menu
        onClick={this.onMenuClick}
        style={{ width: 200 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <Menu.ItemGroup key="group-default">
          <Menu.Item key="1">发现音乐</Menu.Item>
          <Menu.Item key="2">私人FM</Menu.Item>
          <Menu.Item key="3">朋友</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="我的音乐">
          <Menu.Item key="4">下载管理</Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
  }
}
