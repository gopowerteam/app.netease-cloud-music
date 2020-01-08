import React, { Component } from "react";
import { Menu, Icon, Avatar, Row, Col } from "antd";
import menuList from "../../../assets/json/menu.json";
import { ReactSVG } from "react-svg";
import { Consumer } from "reto";
import styled from "styled-components";
import { MenuStore } from "../../../store/menu.store";

const components = {
  ComponentWrap: styled.section`
    .ant-menu-item.ant-menu-item-active {
      color: #000;
      fill: #000;
    }

    .ant-menu-item.ant-menu-item-selected {
      color: red;
      fill: red;
    }
  `,
  ReactSVG: styled(ReactSVG)`
    width: 28px;
    height: 28px;
  `
};

export default class SideMenu extends Component {
  private findCurrentMenu(list, key) {
    for (let item of list) {
      if (item.title === key) {
        return item;
      }

      if (item.group) {
        return this.findCurrentMenu(item.children, key);
      }
    }
  }
  public onMenuClick(menuStore) {
    return ({ key }) => {
      const target = this.findCurrentMenu(menuList, key);

      if (target) {
        menuStore.update(target);
      }
    };
  }

  public onUserClick() {}

  public render() {
    return (
      <components.ComponentWrap>
        {this.userContainer()}
        {this.menuContainer()}
      </components.ComponentWrap>
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
      <Consumer of={MenuStore}>
        {menuStore => (
          <Menu
            onClick={this.onMenuClick(menuStore)}
            style={{ width: 200, background: "transparent" }}
            defaultSelectedKeys={this.getDefaultSelectKeys(menuStore)}
            mode="inline"
          >
            {menuList.map(item =>
              item.group ? this.getMenuGroup(item) : this.getMenuItem(item)
            )}
          </Menu>
        )}
      </Consumer>
    );
  }

  public getDefaultSelectKeys(menuStore) {
    let pathname = window.location.pathname;
    pathname = pathname === "/" ? "/discover" : pathname;
    const target = menuList.find(x => x.path && pathname.startsWith(x.path));

    if (target) {
      menuStore.update(target);
    }

    return target ? [target.path || ""] : [];
  }

  public getMenuGroup(group) {
    return (
      <Menu.ItemGroup key={group.path} title={group.title}>
        {group.children.map(x => this.getMenuItem(x))}
      </Menu.ItemGroup>
    );
  }

  public getMenuItem(item) {
    return (
      <Menu.Item key={item.path}>
        <Row gutter={8} align="middle" type="flex">
          <Col
            span={6}
            className="flex-row justify-content-center align-items-center"
          >
            <components.ReactSVG
              src={`icons/${item.icon}.svg`}
              beforeInjection={svg => {
                svg.setAttribute(
                  "style",
                  "height: 25px;width:25px;line-height:25px;"
                );
              }}
            />
          </Col>
          <Col span={18}>{item.title}</Col>
        </Row>
      </Menu.Item>
    );
  }
}
