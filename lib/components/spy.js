import React from "react";
import uuid from "uuid/v1";
import { Client } from "client";
import { Target } from "utils/json-helpers/target";
import { subscribe, reactLifecycleMethods, log, now } from "utils/rootkit";

function spy(TargetComponent) {
	const SpyClass = class Spy extends TargetComponent {
		constructor(props, context) {
			super(props);
			this.messenger = context.client;

			if(super.shouldComponentUpdate) {
				this.shouldComponentUpdate = (nextProps, nextState) => {
					this.messenger.emit(`${this.name} [ shouldComponentUpdate ]`, now());
					return super.shouldComponentUpdate();
				}
			}
			// bind (this)
			this.getChildren = this.getChildren.bind(this);
			// create target reference
			this.target = new Target(TargetComponent.name, uuid(), []);
			this.getElements();
			this.subscribeLifecycleMethods();
			// subscribe to add target event for each instance
			this.messenger.subscribe(`${this.target.id} [ add target ]`);
			// add new target
			this.messenger.emit(`${this.target.id} [ add target ]`, this.target.toJSON());
			// emit first lifecycle method
			this.messenger.emit(`${this.target.id} [ constructor ]`, now());
			// @TODO refactor -> this.allProperties = this.reportProperties();
			this.getChildren();
		}
		// @TODO add element json helper class
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
		getChildren() {
			let el = super.render();
			console.log(el)
			// this.target.elements.push({
			// 	type: el.type,
			// 	ref: el.ref,
			// 	key: el.key
			// });
			// for(let child of el.props.children) {
			// 	let element = {
			// 		type: child.type,
			// 		ref: child.ref,
			// 		key: child.key
			// 	};
			// 	this.target.elements.push(element);
			// }
		}
		componentDidMount() {
			if(super.componentDidMount) {
				this.messenger.emit( `${this.target.id} [ componentDidMount ]`, now());
				return super.componentDidMount();
			}
		}
		subscribeLifecycleMethods() { subscribe( reactLifecycleMethods, this.messenger, this.target.id ); }
		reportProperties() {
			let p = TargetComponent.prototype,
					properties = Object.getOwnPropertyNames(p),

					overriddenLifecycleMethods = properties.filter(
					propertyName => reactLifecycleMethods.includes(propertyName) ),

					otherProperties = properties.filter(
					propertyName => !reactLifecycleMethods.includes(propertyName) );

			subscribe(properties, this.messenger, this.name);
			return { properties, overriddenLifecycleMethods, otherProperties };
		}
		render() {
			this.messenger.emit(`${this.target.id} [ render ]`, now());
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
