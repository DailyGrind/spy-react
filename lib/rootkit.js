import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Client } from "./client";
import moment from "moment";
import Rx from "rxjs";


const rootkit = ( messenger, target ) => {
  let immediateChild = React.createElement("div", [], target);
  let root_node = immediateChild._owner._hostContainerInfo._node;
  return root_node;
}

export { rootkit };
