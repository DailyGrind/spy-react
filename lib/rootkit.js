import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Client } from "./client";
import moment from "moment";
import Rx from "rxjs";


const log = (value) => console.log(value);

export const getRoot = (target) => {
  let immediateChild = React.createElement("div", [], target);
  let root = immediateChild._owner._hostContainerInfo._node;
  return root;
}

export const getInputFields = () => {
  let root = getRoot();
}
/*  eventHandlerFactory
 *  @param name the name of the synthetic event
 *  @description wraps event handler with an emitter
 *  @returns { onClick: e => {
 *										this.messenger.emit("Button [ onClick ]", data );
 *										this.props[onClick](e);
 *									} }
 *
export const eventHandlerFactory = (name, messenger, targetName, fnName props) => {
  let wrapperfn = (e) => { messenger.emit(`${name} [ ${fnName} ]`, `${e}` ); props[fnName](e); }
  // create an object key: name, value: "" <= (empty)
  let eventObject = JSON.parse(`{ "${fnName}": "" }`);
  // assign the wrapper function (wrapperfn) to the eventObject
  eventObject[Object.keys(eventObject)[0]] = wrapperfn;
  return eventObject;
}
*/
const reactLifecycleMethods = [
  "constructor",
  "componentWillMount",
  "componentDidMount",
  "componentWillReceiveProps",
  "shouldComponentUpdate",
  "componentWillUpdate",
  "render",
  "componentDidUpdate",
  "componentWillUnmount"
];

const mount = [
  "constructor",
  "componentWillMount",
  "componentDidMount"
];

const update = [
  "componentWillReceiveProps",
  "shouldComponentUpdate",
  "componentWillUpdate",
  "render",
  "componentDidUpdate"
];

const unmount = [ "componentWillUnmount" ];

const reactClassProperties = [
  "defaultProps",
  "displayName",
  "propTypes"
];

const reactInstanceProperties = [
  "props",
  "state"
];

export { reactLifecycleMethods };

export const subscribe = (properties, messenger, uuid) => {
  if(properties.length > 0) {
    properties.map( property => messenger.subscribe(`${uuid} [ ${property} ]`));
  }
}

// @TODO refactor
// export const parseProps(props) {
//   let arrayOfProps = convertToArray(props);
//   let re = /on([A-Z][a-z]+)+/
//   return arrayOfProps.filter( prop => re.test(prop) && (typeof props[prop] === "function"));
// }

export const convertToArray = (items) => {
  let arr = [];
  for(let item in items) {
    arr.push(item)
  }
  return arr;
}
