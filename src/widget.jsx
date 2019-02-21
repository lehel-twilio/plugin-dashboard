import React from 'react';

export default class BaseWidget extends React.Component {

  constructor(props) {
    super(props);
    this.timeout_id = null;
  }

  updateWidget() {
    fetch(`https://snow-zebra-3306.twil.io/get-stats`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: ``
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState(json['payload']);
      this.reschedule(json['updates_in_millis']);
    })
    .catch(error => {
      console.log(error);
      this.reschedule(1000);
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
}

BaseWidget.defaultProps = {
 width: 1,
 height: 1
};
