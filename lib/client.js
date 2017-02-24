import { w3cwebsocket } from "websocket";
import { Emitter } from "./emitter";


export class Client extends w3cwebsocket {
		constructor(url, name) {
			super(url, "echo-protocol");
			this.events = [];
			this.name = name;

			this.queueEvent = (type, data) => {
				let message = `${type}: ${data}`;
				console.log(message);
				this.events.unshift({ type, data });
			}

			this.emitter = new Emitter();

		this.onopen = data => {
			this.emitter.emit(`${this.name} [ websocket ]`, "sub timestamp");
			while(this.events.length > 0) {
				let e = this.events.pop();
				let message = `${e.type}: ${e.data}`;
				this.send(message);
			}
		};

		this.onclose = () => {
			this.emitter.emit(`${this.name} [ websocket ]`, "client connection closed");
			this.emitter.dispose();
		}

		this.onmessage = e => {
		    if (typeof e.data === "string") {
					//console.log("Received: ");
		    }
		};

		this.subscribe = (event) => {
			this.emitter.listen(event, data => this.queueEvent(event, data));
		}
		this.emit = (event, data) => this.emitter.emit(event, data);
	}
}
