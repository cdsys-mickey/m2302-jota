const ActionState = Object.freeze({
	PROMPT: Symbol("PROMPT"),
	WORKING: Symbol("WORKING"),
	DONE: Symbol("DONE"),
	FAILED: Symbol("FAILED"),
});

export default ActionState;
