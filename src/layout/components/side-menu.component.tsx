import React, { Component } from "react";
import { Menu, Icon, Avatar, Row, Col } from "antd";
import menuList from "../../assets/json/menu.json";

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
      <Row
        className="padding"
        gutter={8}
        type="flex"
        justify="start"
        align="middle"
      >
        <Col>
          <Avatar size={40} icon="user" />
        </Col>
        <Col>未登录</Col>
        <Col>
          <Icon type="caret-right" />
        </Col>
      </Row>
    );
  }

  public menuContainer() {
    return (
      <Menu
        onClick={this.onMenuClick}
        style={{ width: 200, background: "transparent" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        {menuList.map(item =>
          item.group ? this.getMenuGroup(item) : this.getMenuItem(item)
        )}
      </Menu>
    );
  }

  public getMenuGroup(group) {
    return (
      <Menu.ItemGroup key={group.title} title={group.title}>
        {group.children.map(x => this.getMenuItem(x))}
      </Menu.ItemGroup>
    );
  }

  public getMenuItem(item) {
    return <Menu.Item key={item.title}>{item.title}</Menu.Item>;
  }
}
