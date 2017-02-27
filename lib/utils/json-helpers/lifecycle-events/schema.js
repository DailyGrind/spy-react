{
	"$schema": "lib/schema/events/lifecycle.js",
	"title": "LifecycleEvents",
	"description": "A React Component Abstract class lifecycle method overridden by a subclass",
	"type": "object",
	"properties": {
		"id": {
			"description": "unique id assigned by the client",
			"type": "integer"
		},
		"component_id": {
			"description": "component id where event originated",
			"type": "string"
		},
		"method":  {
			"description": "one of the following constructor, componentWillMount, componentDidMount, componentWillReceiveProps, shouldComponentUpdate, componentWillUpdate, render, componentDidUpdate, componentWillUnmount",
			"type": "string"
		},
		"timestamp": {
			"description": "utc timestamp in the format YYYY-MM-DDTHH:MM:SSZ i.e., '2017-02-25T03:54:29Z'",
			"type": "string"
		}
	},
	"required": [ "id", "method", "component_id", "timestamp" ]
}
