export default {
	client: {
		url: "ws://localhost:8082",
		events: {
			ws: true,
			rlc: {
				implemented: true,
				all: false
			}
		}
	},
	nodes: {
		all: true
	}
}
