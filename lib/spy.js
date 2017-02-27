import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Client } from "./client";
import moment from "moment";
import Rx from "rxjs";
import { subscribe, reactLifecycleMethods, log } from "./rootkit";
import { Target } from "./json-helpers/target";
import uuid from "uuid/v1";

function spy(TargetComponent) {

	const SpyClass = class Spy extends TargetComponent {
		constructor(props, context) {
			super(props);
			this.now = () => `${moment(Date.now()).utc().format()}`;

			if(context.client) {
				this.messenger = context.client;
			}

			this.getElements = this.getElements.bind(this);

			this.target = new Target(TargetComponent.name, uuid(), []);
			this.getElements();

			this.messenger.subscribe(`${this.target.id} [ add target ]`);
			this.messenger.emit(`${this.target.id} [ add target ]`, this.target.toJSON());
			this.subscribeLifecycleMethods();

			this.messenger.emit(`${this.target.id} [ constructor ]`, this.now());
			this.allProperties = this.reportProperties();

			if(super.shouldComponentUpdate) {
				this.shouldComponentUpdate = (nextProps, nextState) => {
				  this.messenger.emit(`${this.name} [ shouldComponentUpdate ]`, this.now());
					return super.shouldComponentUpdate();
				}
			}
		}

		getElements() {

			let el = super.render();
			this.target.elements.push({
				type: el.type,
				ref: el.ref,
				key: el.key
			});

			for(let child of el.props.children) {
				let element = {
					type: child.type,
					ref: child.ref,
					key: child.key
				};
				this.target.elements.push(element);
			}
		}

		componentDidMount() {
			if(super.componentDidMount) {
				this.messenger.emit( `${this.target.id} [ componentDidMount ]`, this.now());
				return super.componentDidMount();
			}
		}

		subscribeLifecycleMethods() {
			 subscribe( reactLifecycleMethods, this.messenger, this.target.id );
		}

		reportProperties() {
			let p = TargetComponent.prototype;

			let properties = Object.getOwnPropertyNames(p);
			let overriddenLifecycleMethods = properties.filter(
					propertyName => reactLifecycleMethods.includes(propertyName) );
			let otherProperties = properties.filter(
					propertyName => !reactLifecycleMethods.includes(propertyName) );

			subscribe(properties, this.messenger, this.name);
			return { properties, overriddenLifecycleMethods, otherProperties };
		}

		render() {
			this.messenger.emit(`${this.target.id} [ render ]`, this.now());
			return super.render();
		}
	}

	SpyClass.contextTypes = {
  	client: React.PropTypes.any
	};

	SpyClass.displayName = `Spy${TargetComponent.displayName, TargetComponent.name || `Component`}`;
	return SpyClass;
}

export { spy };
