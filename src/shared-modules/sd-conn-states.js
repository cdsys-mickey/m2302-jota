import { HubConnectionState } from "@microsoft/signalr";

const getColor = (state) => {
	switch (state) {
		case HubConnectionState.Connected:
			return "#44b700";
		case HubConnectionState.Connecting:
			return "orange";
		case HubConnectionState.Disconnected:
		default:
			return "red";
	}
};

const ConnectionStates = {
	getColor,
};

export default ConnectionStates;
