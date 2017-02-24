import React, { Component } from "react";
import spy from "./../lib";

@spy({ ws: false, rcl: false })
class Button extends Component {

	constructor(props){
		super(props)
	}

	shouldComponentUpdate(nextProps) {
		return this.props !== nextProps;
	}

	onHover(e) {
		alert('hover!')
	}

	render() {
		let button = <button onClick={ this.props.onClick } onDoubleClick={ this.onHover }>
								click! { this.props.count }
							</button>
		return <div>
						{ this.props.children }
						{button}
					</div>;
	}
}
export { Button };
