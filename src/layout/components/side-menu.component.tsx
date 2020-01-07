import React, { Component } from "react";
import { Menu, Icon, Avatar, Row, Col } from "antd";
import menuList from "../../assets/json/menu.json";
import { ReactComponent as Cloud } from '../../assets/icons/cloud.svg'
import { ReactSVG } from 'react-svg'
import { Consumer } from 'reto'
import styled from "styled-components";
import { ClientStyle as Style } from 'react-css-component'
import { MenuStore } from "../../store/menu.store";

const css = /*css*/`
.ant-menu-item.ant-menu-item-active{
  color:#000;
  fill:#000;
}

.ant-menu-item.ant-menu-item-selected{
  color:red;
  fill:red;
}
`

const components = {
  ReactSVG: styled(ReactSVG)`
    width:28px;
    height:28px;
  `
}

export default class SideMenu extends Component {
  private findCurrentMenu(list, key) {
    for (let item of list) {
      if (item.title === key) {
        return item
      }

      if (item.group) {
        return this.findCurrentMenu(item.children, key)
      }
    }
  }
  public onMenuClick(menuStore) {
    return ({ key }) => {
      const target = this.findCurrentMenu(menuList, key)

      if (target) {
        menuStore.update(target)
      }

    }
  }
  public onUserClick() { }

  public render() {
    return (
      <section>
        {this.userContainer()}
        {this.menuContainer()}
        <Style css={css}>  </Style>
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
      <Consumer of={MenuStore}>
        {menuStore => (
          <Menu
            onClick={this.onMenuClick(menuStore)}
            style={{ width: 200, background: "transparent" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
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

  public getMenuGroup(group) {
    return (
      <Menu.ItemGroup key={group.title} title={group.title}>
        {group.children.map(x => this.getMenuItem(x))}
      </Menu.ItemGroup>
    );
  }

  public getMenuItem(item) {
    return <Menu.Item key={item.title}>
      <Row gutter={8} align="middle" type="flex">
        <Col span={6} className="flex-row justify-content-center align-items-center">
          <components.ReactSVG src={`icons/${item.icon}.svg`} beforeInjection={svg => {
            svg.setAttribute('style', 'height: 25px;width:25px;line-height:25px;')
          }} />
        </Col>
        <Col span={18}>
          {item.title}
        </Col>
      </Row>
    </Menu.Item >;
  }
}
