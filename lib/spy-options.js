import React, { Component } from "react";
import { Client } from "./client";
import { Target } from "./json-helpers/target";

// @TODO set up default configuration for spynode
function spyOpts(config) {
	return function(target) {
			const SpyOptions = class SpyOptions extends Component {
				constructor(props) {
					super(props);
					this.config = config;
					this.target = target;
					this.client = new Client(this.config.spynode.url);
					if(this.config.spynode.wss) this.client.subscribe(`websocket`);
				}
				getChildContext() { return { client: this.client, config: this.config }; }
				render() {
					 return React.createElement(this.target, this.props, this.props.children);
				}
			}
			SpyOptions.childContextTypes = {
				client: React.PropTypes.any,
				config: React.PropTypes.any
			};
			return SpyOptions;
  };
}

export { spyOpts };
