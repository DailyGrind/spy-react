import React, { Component } from "react";
import { spy } from "./../lib";

@spy
class Button extends Component {

	constructor(props){
		super(props)
	}
	componentDidMount() {

	}
	// shouldComponentUpdate(nextProps) {
	// 	return this.props !== nextProps;
	// }

	handleDoubleClick(e) {
		alert('double click!')
	}

	render() {

		return <div>
						{ this.props.children }
						<button onClick={ this.props.onClick } onDoubleClick={ this.handleDoubleClick }>
												click! { this.props.count }
											</button>
					</div>;
	}
}
export { Button };
