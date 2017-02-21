import React from "react";
import ReactDOM from "react-dom";
import Rx from 'rxjs';

class Writer {
	constructor(target) {
			this.observable = new Rx.Subject();
			this.observable.subscribe(value => console.log(value));
		}
	}

function spy(target){
 	return class Spy extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				writer: {}// new Writer(target)
			}
		}

		componentWillReceiveProps(nextProps, nextState) {
			console.log(target.name + " (nextProps): " + Object.keys(nextProps))
		}

    render() {
      return React.createElement(target, this.props);
    }
  }
}

export default spy;
