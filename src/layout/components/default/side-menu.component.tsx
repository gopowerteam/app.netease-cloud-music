import React, { Component } from "react";
import { Menu, Row, Col } from "antd";
import menuList from "../../../assets/json/menu.json";
import { ReactSVG } from "react-svg";
import { Consumer } from "reto";
import styled from "styled-components";
import { RouterStore } from "../../../store/router.store";
import UserAuth from "~/components/auth/user-auth";

const components = {
  ComponentWrap: styled.section`
    .ant-menu-item {
      padding-left: 5px !important;
    }
    .ant-menu-item.ant-menu-item-active {
      color: #000;
      fill: #000;
    }

    .ant-menu-item.ant-menu-item-selected {
      color: red;
      fill: red;

      &::after {
        border-right-color: #a2a2a2;
      }
    }

    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
      background-color: #e2e2e2;
    }

    .ant-menu-item-group-title {
      font-size: 12px;
    }
  `,
  ReactSVG: styled(ReactSVG)`
    width: 10px;
    height: 32px;
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

  public onUserClick() {}

  public render() {
    return (
      <components.ComponentWrap>
        <UserAuth></UserAuth>
        {this.menuContainer()}
      </components.ComponentWrap>
    );
  }

  public menuContainer() {
    return (
      <Consumer of={RouterStore}>
        {routerStore => (
          <Menu
            onClick={this.onMenuClick(routerStore)}
            style={{ width: 200, background: "transparent" }}
            defaultSelectedKeys={this.getDefaultSelectKeys(routerStore)}
            mode="inline"
          >
            {this.getItemList().map(item => this.getMenuItem(item))},
            {this.getGroupList().map(item => this.getMenuGroup(item))}
          </Menu>
        )}
      </Consumer>
    );
  }

  public onMenuClick(routerStore) {
    return ({ key }) => {
      const item = menuList.find(x => x.id.toString() === key);

      if (item && item.path) {
        routerStore.history.push(item.path);
      }
    };
  }

  public getItemList() {
    return menuList.filter(x => x.level === 1 && !x.group);
  }

  public getGroupList() {
    return menuList
      .filter(x => x.group && x.level === 1)
      .reduce((result, value) => {
        let target = result.find(x => x.title === value.group);

        if (!target) {
          target = {
            title: value.group,
            path: Math.random(),
            children: []
          };
          result.push(target);
        }

        target.children.push(value);

        return result;
      }, [] as any[]);
  }

  public getDefaultSelectKeys(routerStore) {
    const { location } = routerStore;
    let target = menuList.find(x => x.path === location.pathname) as any;

    if (!target) return [];

    if (target.level !== 1) {
      target = menuList.find(x => x.id === target.parent);
    }

    return [target.id.toString()];
  }

  public getMenuGroup(group) {
    return (
      <Menu.ItemGroup key={group.title} title={group.title}>
        {group.children.map(x => this.getMenuItem(x))}
      </Menu.ItemGroup>
    );
  }

  public getMenuItem(item) {
    return (
      <Menu.Item key={item.id}>
        <Row gutter={8} align="middle" type="flex">
          <Col
            style={{ flexBasis: "40px" }}
            className="flex-row justify-content-center align-items-center"
          >
            <components.ReactSVG
              src={`icons/${item.icon}.svg`}
              beforeInjection={svg => {
                svg.setAttribute(
                  "style",
                  "height: 20px;width:20px;line-height:20px;"
                );
              }}
            />
          </Col>
          <Col style={{ fontSize: "12px" }} span={18}>
            {item.title}
          </Col>
        </Row>
      </Menu.Item>
    );
  }
}
