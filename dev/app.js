import React, { Component } from "react";
import spy from "./../lib";
import { Button } from "./button";

@spy
export class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			event: 0
		}
	}
	onClick() {
		this.setState({
			event: this.state.event + 1
		});
	}
	render() {
		return <div>
						<Button count={ this.state.event }  onClick={ this.onClick.bind(this) }>
							<label>Click Me!</label>
						</Button>
					</div>
	}
}
