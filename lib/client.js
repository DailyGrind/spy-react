import { w3cwebsocket } from 'websocket';
import { Emitter } from './emitter';

export class Client extends w3cwebsocket {

	constructor(target, url, data) {
		super(url, 'echo-protocol');
		this.events = [];
		this.target = target;

		this.queueEvent = (type, data) => {
			let message = `${type}: ${data}`;
			console.log(message);
			this.events.unshift({ type, data });
		}

		this.emitter = new Emitter();

		this.emitter.listen('write', data => this.queueEvent(this.target.name, data));
		this.emitter.listen('connection-opened', data => this.queueEvent('connection-opened', data));
		this.emitter.listen('connection-closed', data => this.queueEvent('connection-closed', data));

		this.onopen = data => {
			this.emitter.emit('connection-opened', 'sub timestamp');

			while(this.events.length > 0) {
				let e = this.events.pop();
				let message = `${e.type}: ${e.data}`;
				// console.log(message)
				this.send(message);
			}

		};

		this.onclose = () => {
			this.emitter.emit('connection-closed', 'client connection closed');
			this.emitter.dispose();
		}

		this.onmessage = e => {
		    if (typeof e.data === 'string') {
					console.log("Received: '" + e.data + "'");
		    }
		};

		this.emit = data => this.emitter.emit('write', data);

	}
}
