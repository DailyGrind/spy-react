import { w3cwebsocket } from "websocket";
import { Emitter } from "client/emitter";

export class Client extends w3cwebsocket {
		constructor(url, name) {
			super(url, "echo-protocol");
			this.events = [];
			this.targets = [];
			this.name = name;
			this.getUUID = (type) => type.substring(0, type.firstIndexOf(" ")).trim();
			this.getEventType = (type) => type.substring(type.lastIndexOf("[")+1, type.lastIndexOf("]")).trim();
			this.queueEvent = (type, data) => {
				let eventType = this.getEventType(type);
				if(eventType === 'add target') {
					this.targets.push(JSON.parse(data));
				}
				this.events.unshift({ type, data });
			}
			this.emitter = new Emitter();
			this.onopen = data => {
				const emptyQueue = () => {
					let loggingEvents = new Map();
					while(this.events.length > 0) {
						let e = this.events.pop();
						console.log(`${e.type}`)
						try {
							this.send(JSON.stringify(e));
						} catch(error) {
							console.error('ERROR: ' + error);
						}
					}
				}
				emptyQueue();
			};
		this.onclose = () => {
			this.emitter.emit(`websocket`, "client connection closed");
			this.emitter.dispose();
		}
		this.subscribe = (event) => {
			this.emitter.listen(event, data => this.queueEvent(event, data));
		}
		this.emit = (event, data) => this.emitter.emit(event, data);
	}
}
