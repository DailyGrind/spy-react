import Rx from "rxjs";

export class Emitter {

	constructor(target) {
		this.subjects = {};
	}

	getSubjects() {
		return this.subjects;
	}
	
	emit(event, data) {
		this.subjects[event] || (this.subjects[event] = new Rx.Subject());
		this.subjects[event].next(data);
	}

	listen(event, handler) {
	    this.subjects[event] || (this.subjects[event] = new Rx.Subject());
	    return this.subjects[event].subscribe(handler);
	}

	dispose() {
	    const subjects = this.subjects;
	    for (let subscription in subjects) {
	        if (subscription) {
	          subjects[subscription].dispose();
	        }
	    }
	    this.subjects = {};
	}
}
