import React, { Component } from 'react';

export default class ProgressBar extends Component {
    render() {
      return <progress value={this.props.value} max="100"></progress>
    }
  }
