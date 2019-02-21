/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/core';

const textWidget = css`
  width: 100%;
  height: 100%;
  background-color: #00A1CB;
  color: #fff;
`

const text = css`
  font-size: 1.75em !important;
  text-align: center;
`

export default class TextWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {title: "init", text: "init"};
  }

  render() {
    return (
      <div css={textWidget}>
        <h1 css={text}>{this.props.title}</h1>
      </div>
    );
  }
}
