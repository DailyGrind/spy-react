import React, { Component } from "react";
import spy from "./../lib";

@spy
class Button extends Component {
	render() {
		return <div>
						{this.props.children}
						<button onClick={ this.props.onClick }>
							click! { this.props.count }
						</button>
					</div>;
	}
}
export { Button };
