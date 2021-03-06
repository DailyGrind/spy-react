import React, { Component } from "react";
import { spy, spyOpts } from "./../lib";
import { Button } from "./button";
import spyconfig from "./spyconfig.js";

@spyOpts(spyconfig)
@spy
export class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			event: 0
		}
	}

	handleClick(){
		this.setState({
			event: this.state.event + 1
		});
	}

	render() {
		return <div>
							<input value=""></input>
							<input value=""></input>
							<Button count={ this.state.event }  onClick={ this.handleClick.bind(this) }>
								<label>Click Me!</label>
							</Button>
							<Button count={ this.state.event }  onClick={ e => this.handleClick() }>
								<label>Click Me Dos!</label>
							</Button>
					 </div>;
	}
}
