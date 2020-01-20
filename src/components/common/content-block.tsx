import React from "react";
import styled from "styled-components";

const components = {
  Wrapper: styled.div`
    margin: 10px 0 20px;
    .header {
      height: 35px;
      border-bottom: solid 1px #e6e6e6;
      justify-content: space-between;
      align-items: baseline;
      line-height: 30px;

      .link {
        font-size: 0.8em;
        color: gray;
        &:hover {
          color: #000;
        }
      }
    }
  `
};

type ContentProp = {
  title: string;
  onClick?: () => void;
};

export default class ContentBlock extends React.Component<ContentProp> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <components.Wrapper>
        <div className="header flex-row ">
          <h2>{this.props.title}</h2>
          <a className="link" href="#" onClick={this.props.onClick}>
            更多 >
          </a>
        </div>
        {this.props.children}
      </components.Wrapper>
    );
  }
}
