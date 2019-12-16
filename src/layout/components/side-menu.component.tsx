import React, { Component } from "react";
import { Menu, Icon, Avatar, Row, Col } from "antd";
import { FlexRow } from "../../shared/components";

export default class SideMenu extends Component {
  public onMenuClick() {}
  public onUserClick() {}
  public render() {
    return (
      <section>
        {this.userContainer()}
        {this.menuContainer()}
      </section>
    );
  }

  public userContainer() {
    return (
      <Row gutter={16} type="flex" justify="start" align="middle">
        <Col span={6}>
          <Avatar size={48} icon="user" />
        </Col>
        <Col span={8}>未登录</Col>
        <Col span={3}>
          <Icon type="caret-right" />
        </Col>
      </Row>
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
          <Menu.Item key="3">下载管理</Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
  }
}
