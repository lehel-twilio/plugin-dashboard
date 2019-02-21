/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';

import NumberWidget from './number_widget';
import TextWidget from './text_widget';

const wrapper = css`
  font-family: sans-serif;
  background-color: #616161;
  width: 100%;
  padding: 5px;
  margin: 0 auto;
  display: flex;
  flex: auto;
  flex-wrap: wrap;
`

const widget = css`
  flex-direction: row;
  width: 100%;
  display: flex;
`

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.timeout_id = 5000;
    this.state = {
      stats: ''
    }
  }

  updateWidget() {
    fetch(`${this.props.url}/get-stats`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: ``
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({
        stats: json
      });
      this.reschedule(5000);
    })
    .catch(error => {
      console.log(error);
      this.reschedule(5000);
    })
  }

  reschedule(interval) {
    if(this.timeout_id) {
      clearTimeout(this.timeout_id)
      this.timeout_id = null;
    }
    if(interval < 1000) { interval = 1000; }
    this.timeout_id = setTimeout(() => this.updateWidget(), interval)
  }

  componentDidMount() {
    this.updateWidget();
  }

  widgetRows = () => {
    //only runs the first time
    if (this.state.stats === '') {
      return( <div />);
    } else {
      const queues = Object.keys(this.state.stats);

      return (
        <div css={wrapper}>
          {queues.map((queue) =>
            <div css={widget}>
              <TextWidget name={this.state.stats[queue].name} title={this.state.stats[queue].name} />
              <NumberWidget name={this.state.stats[queue].name + '.tasksWaiting'} data={this.state.stats[queue].tasksWaiting} title='Tasks Waiting'/>
              <NumberWidget name={this.state.stats[queue].name + '.activeTasks'} data={this.state.stats[queue].activeTasks} title='Active Tasks'/>
              <NumberWidget name={this.state.stats[queue].name + '.longestWait'} text={this.state.stats[queue].longestWait} title='Longest Task Wait' numberVisibility='invisible'/>
              <NumberWidget name={this.state.stats[queue].name + '.activeAgents'} data={this.state.stats[queue].activeAgents} title='Active Workers'/>
              <NumberWidget name={this.state.stats[queue].name + '.totalAnswered'} data={this.state.stats[queue].totalAnswered} title='# Tasks Answered'/>
              <NumberWidget name={this.state.stats[queue].name + '.abandonedTasks'} data={this.state.stats[queue].abandonedTasks} title='Abandoned Tasks'/>
              <NumberWidget name={this.state.stats[queue].name + '.answeredPercent'} data={this.state.stats[queue].answeredPercent} title='Answered %' formatString='0'/>
              <NumberWidget name={this.state.stats[queue].name + '.averageSpeedOfAnswer'} data={this.state.stats[queue].averageSpeedOfAnswer} title='ASA in seconds' formatString='0'/>
            </div>
          )}
        </div>
      )
    }
  }

  render() {
    return (
      <div className='container' css={wrapper}>
        <this.widgetRows/>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    url: state.flex.config.serviceBaseUrl.slice(0,5) === 'https'
      ? (state.flex.config.serviceBaseUrl.slice(-1) === '/' ? state.flex.config.serviceBaseUrl.substring(0, state.flex.config.serviceBaseUrl.length - 1) : state.flex.config.serviceBaseUrl)
      : ('https://' + (state.flex.config.serviceBaseUrl.slice(-1) === '/' ? state.flex.config.serviceBaseUrl.substring(0, state.flex.config.serviceBaseUrl.length - 1) : state.flex.config.serviceBaseUrl)),
  }
}

export default connect(mapStateToProps)(Dashboard);
