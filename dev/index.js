import React from "react";
import { AppContainer } from "react-hot-loader";
import { App } from "./app";
import { render } from "react-dom";

const renderApp = () => {
	// if using react-router replace with <Routes/>
	render(<AppContainer>
          <App/>
        </AppContainer>, document.getElementById("anchor"));
}

renderApp(); // Renders App on init

if (module.hot) {
	// if using react-router replace with "./routes"
	module.hot.accept("./app", renderApp);
}
