import React, { Component } from "react";
import spy from "./../lib";
import { Button } from "./button";

export class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			event: 0
		}
		this.handleClick = () => {
			this.setState({
				event: this.state.event + 1
			});
		}
	}

	shouldComponentUpdate(){
		return true;
	}

	render() {
		return <div>
						<Button count={ this.state.event }  onClick={ this.handleClick }>
							<label>Click Me!</label>
						</Button>
					 </div>
	}
}
