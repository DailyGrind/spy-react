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
	children: {
		target_all: true,
		targets: [{
			type: "",
			limit_spies: "first ten buttons"
		}],
		shared_config: true
	}
}
