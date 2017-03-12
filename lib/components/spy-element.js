import React from "react";
import uuid from "uuid/v1";
import { Client } from "client";
import { Target } from "utils/json-helpers/target";
import { subscribe, reactLifecycleMethods, log, now } from "utils/rootkit";

const iterateOverAllChildren = (c) => {
	if(c) {
		if(Array.isArray(c)) {
			for( let child of c ) {
				let temp = child;
				while(temp) {
					if(temp) {
						console.log(`child (nested)\t\t ${temp.type}\n`);
					}
					temp = temp.props && temp.props.children ? temp.props.children : false;
				}
			}
		}
	} else {
		console.log(c);
	}
}

function spyElement(element, context, config) {
	let c = element.props.children;
	// if element has no children, return element
	let p = Object.assign({}, element.props, {
		key: uuid()
	});
	if(!c) return React.cloneElement(element, p);
	if(!Array.isArray(c)) return spyElement(c);
	// if the element has children
	let  children = [];
	// for each child
	for(let child of c) { children.push(spyElement(child)); }
	// return element
	return React.cloneElement(element, p, [...children]);
}

export { spyElement };
