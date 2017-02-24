import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Client } from "./client";
import moment from "moment";
import Rx from "rxjs";


function spy(TargetComponent) {

	const SPY = class Spy extends TargetComponent {

		constructor(props) {
			super(props);
			this.name = TargetComponent.name;
			this.messenger = new Client("ws://localhost:8082", this.name);
			this.messenger.subscribe(`${this.name} [ websocket ]`);
			this.messenger.subscribe(`${this.name} [ component lifecycle ]`);
		}

		render() {
			const elements = super.render();
			console.log(elements);
			return super.render();
		}
	}
	SPY.displayName = `Spy${TargetComponent.displayName, TargetComponent.name || `Component`}`;
	return SPY;
}

export default spy;
