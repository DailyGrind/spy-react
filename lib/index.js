import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Client } from "./client";
import moment from "moment";
import Rx from "rxjs";
import { subscribe, reactLifecycleMethods } from "./rootkit";


const log = (value) => console.log(value);

function spy(TargetComponent) {

	const SpyClass = class Spy extends TargetComponent {

		constructor(props) {
			super(props);
			this.name = TargetComponent.name;
			// @TODO use wss instead of ws
			this.lastRan = () => `last ran ${moment(Date.now()).utc().format()}`;
				if(super.shouldComponentUpdate) {
					this.shouldComponentUpdate = (nextProps, nextState) => {
						this.messenger.emit(`${this.name} [ shouldComponentUpdate ]`, this.lastRan());
						return super.shouldComponentUpdate();
					}
				}

			this.messenger = new Client("ws://localhost:8082", this.name);
			this.messenger.subscribe(`${this.name} [ websocket ]`);
			this.messenger.subscribe(`${this.name} [ overridden react lifecycle methods ]`);

			this.subscribeLifecycleMethods();
			this.messenger.emit(`${this.name} [ constructor ]`, this.lastRan());
			this.allProperties = this.reportProperties();
		}

		componentDidMount() {
			this.messenger.emit( `${this.name} [ componentDidMount ]`, this.lastRan());
			if(super.componentDidMount) return super.componentDidMount();
		}

		subscribeLifecycleMethods(){
			subscribe( reactLifecycleMethods, this.messenger, this.name );
		}

		reportProperties() {
			let p = TargetComponent.prototype;

			let properties = Object.getOwnPropertyNames(p);
			let overriddenLifecycleMethods = properties.filter(
					propertyName => reactLifecycleMethods.includes(propertyName) );
			let otherProperties = properties.filter(
					propertyName => !reactLifecycleMethods.includes(propertyName) );

			this.messenger.emit( `${this.name} [ overridden react lifecycle methods ]`,
					overriddenLifecycleMethods );

			subscribe(properties, this.messenger, this.name);
			return { properties, overriddenLifecycleMethods, otherProperties };
		}

		render() {
			this.messenger.emit(`${this.name} [ render ]`, this.lastRan());
			// return React.cloneElement(child, this.props, child.props.children);
			return super.render();
		}
	}

	SpyClass.displayName = `Spy${TargetComponent.displayName, TargetComponent.name || `Component`}`;
	return SpyClass;
}

export default spy;
