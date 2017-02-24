import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Client } from "./client";
import moment from "moment";
import Rx from "rxjs";
import {rootkit} from "./rootkit";


const component = (target, options) => {

	return class Spy extends Component {

		constructor(props) {
			super(props);
			this.messenger = new Client("ws://localhost:8082", target.name);
			if(options && options.ws) this.messenger.subscribe(`${target.name} [ websocket ]`);
			if(options && options.rlc) this.messenger.subscribe(`${target.name} [ component lifecycle ]`);
			this.component = {}
		}

		componentDidMount() {
			let eventHandlerProps = this.getEventHandlerProps();
			this.subscribe(eventHandlerProps);
			this.messenger.emit(`${target.name} [ component lifecycle ]`, `MOUNT ${new moment(Date.now())}`);
		}

		convertToArray(items) {
			let arr = [];
			for(let item in items) {
				arr.push(item)
			}
			return arr;
		}

		/*  getEventHandlerProps
		 *  @description react"s naming convention for synthetic events
		 *  						 allows us to pick them out of props
		 *  @TODO does not yet account for callback functions passed to children
		 *				which could follow this naming convention
		 *				i.e.(onSignUp)
		 */
		getEventHandlerProps() {
			let arrayOfProps = this.convertToArray(this.props);
			let re = /on([A-Z][a-z]+)+/
			return arrayOfProps.filter( prop => re.test(prop) && (typeof this.props[prop] === "function"));
		}

		subscribe(eventHandlerProps) {
			if(eventHandlerProps.length > 0) {
				eventHandlerProps.map( prop => this.messenger.subscribe(`${target.name} [ ${prop} ]`));
			}
		}

		/*  eventHandlerFactory
		 *  @param name the name of the synthetic event
		 *  @description wraps event handler with an emitter
		 *  @returns { onClick: e => {
		 *										this.messenger.emit("Button [ onClick ]", data );
		 *										this.props[onClick](e);
		 *									} }
		 */
		eventHandlerFactory(name) {
			let wrapperfn = (e) => { this.messenger.emit(`${target.name} [ ${name} ]`, `${e.type} ${new moment(Date.now())}` ); this.props[name](e); }
			// create an object key: name, value: "" <= (empty)
			let eventObject = JSON.parse(`{ "${name}": "" }`);
			// assign the wrapper function (wrapperfn) to the eventObject
			eventObject[Object.keys(eventObject)[0]] = wrapperfn;
			return eventObject;
		}

		render() {
			this.messenger.emit(`${target.name} [ component lifecycle ]`,`RENDER ${new moment(Date.now())}`);
			// @TODO add event emitters for all dom events
			let l = this.eventHandlerFactory("onClick");
			// get target component's methods
			// and bind them to event emitters
			let props = Object.assign({}, this.props, l);
			return React.createElement(target, props, this.props.children);
		}
	}
}


// spy node
function spy(args) {

	// called without options
	if(typeof args === "function") {
		let target = args;
		let options = {
			ws: false,
			rlc: true
		}
		return component(target, options);
	}
	// called with options
	return (target, options=args) => {
		return component(target, options);
	}
}

export default spy;
