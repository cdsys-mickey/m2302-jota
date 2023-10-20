/**
 * Loading 狀態
 */
const LoadingState = Object.freeze({
	LOADING: Symbol("LOADING"),
	DONE: Symbol("DONE"),
	FAILED: Symbol("FAILED"),
});

export default LoadingState;
