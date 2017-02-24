import React, { Component } from "react";
import spy from "./../lib";

@spy({ ws: false, rcl: false })
export class Foo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
        this.displayName="Foo";
    }

    handleClick(e) {
        this.setState({
            clicked: !this.state.clicked
        });
    }

    render() {
        return <div>
                  <button className="test-button" onClick={ this.handleClick.bind(this) }/>
               </div>
    }
}
