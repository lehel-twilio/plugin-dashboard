/** @jsx jsx */

import React from 'react';
import Numeral from 'numeral';
import { css, jsx } from '@emotion/core';

const numberWidget = css`
  width: 100%;
  height: 100%;
  background-color: #f18d05;
  color: #fff;
`

const title = css`
  height: 60px;
  text-align: center;
  font-size: 1.25em !important;
`

const number = css`
  font-size: 450%;
  text-align: center;
`

const text = css`
  font-size: 450%;
  text-align: center;
`

export default class NumberWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {title: 'init', number: 0};
  }

  render() {
    return (
      <div css={numberWidget}>
        <h1 css={title}>{this.props.title}</h1>
        <div css={[number, this.props.numberVisibility === 'invisible' ? 'display:none' : '']}>{Numeral(this.props.data).format(this.props.formatString)}</div>
        <div css={text}>{this.props.text}</div>
      </div>
    );
  }
}

NumberWidget.defaultProps = {
  formatString: '0.[00]a'
};
