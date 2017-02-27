// a spy's target component
export class Target {
	constructor(name, id, elements) {
		this.id = id;
		this.name = name;
		this.elements = elements;
		this.methods = [];
		this.setId = id => { this.id = id };
		this.setElements = elements => { this.elements = elements };
		this.setMethods = methods => { this.methods = methods };
		this.toJSON = () => (JSON.stringify({
															id: this.id,
															name: this.name,
															elements: this.elements,
															methods: this.methods
														}));
	}
}
