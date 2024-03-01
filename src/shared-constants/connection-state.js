const ConnectionState = Object.freeze({
	CONNECTED: Symbol("CONNECTED"),
	CONNECTING: Symbol("CONNECTING"),
	DISCONNECTING: Symbol("DISCONNECTING"),
	RECONNECTING: Symbol("RECONNECTING"),
	DISCONNECTED: Symbol("DISCONNECTED"),
});

export default ConnectionState;
