{
	"$schema": "lib/schema/target.js",
	"title": "TargetComponent",
	"description": "A React Component decorated with a spy",
	"type": "object",
	"properties": {
		"id": {
			"description": "id of component instance, returned by server",
			"type": "string",
			"unique": "true"
		},
		"name":  {
			"description": "component name, displayName, or 'Component'",
			"type": "string"
		},
		"methods": {
			"description": "methods defined in subclass, (lifecycle and custom)",
			"type": "array",
			"items": {
				"type": "string",
				"unique": "true"
			}
		},
		"elements": {
			"description": "the decorated component or the spy component",
			"type": "array",
			"items": {
				"description": "element declared in render method",
				"type": "string"
			}
		}
	},
	"required": ["id", "name", "elements"]
}
