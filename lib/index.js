import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Client } from "./client";


// spy node
function spy(target) {

	return class Spy extends Component {

		constructor(props) {
			super(props);
			this.state = {
				messenger: new Client(target, 'ws://localhost:8082')
			}
		}

		componentDidMount() {
			this.state.messenger.emit('component has mounted');
		}

		componentWillReceiveProps(nextProps, nextState) { }

    render() {
			this.state.messenger.emit('component render');
      return React.createElement(target, this.props);
    }
  }
}

export default spy;
