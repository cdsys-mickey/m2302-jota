import { useEffect } from "react";

export const useKeyEvent = (props) => {
	const { key, event = "keydown", callback } = props;

	useEffect(() => {
		const handler = function (e) {
			if (e.key === key) {
				// console.debug(`key: ${e.key}`);
				if (callback) {
					callback(e);
				} else {
					console.debug("callback not defined");
				}
			}
		};
		console.debug(`key listener for ${key} added`);
		document.addEventListener(event, handler);
		return () => {
			document.removeEventListener(event, handler);
			console.debug(`key listener for ${key} removed`);
		};
	}, [callback, event, key]);
};

export const useKeyCodeEvent = (props) => {
	const { keyCode, event = "keydown", callback } = props;

	useEffect(() => {
		const handler = function (e) {
			// console.debug(`on${event}: ${e.keyCode} `);
			if (e.keyCode === keyCode) {
				// console.debug(`${keyCode} pressed`);
				if (callback) {
					callback(e);
				} else {
					console.debug("callback not defined");
				}
			}
		};
		console.debug(`key listener for ${keyCode} added`);
		document.addEventListener(event, handler);
		return () => {
			document.removeEventListener(event, handler);
			console.debug(`key listener for ${keyCode} removed`);
		};
	}, [callback, event, keyCode]);
};

export const useEscapeDown = (callback) =>
	useKeyCodeEvent({ keyCode: 27, callback });

export const useEscapePress = (callback) =>
	useKeyCodeEvent({ keyCode: 27, event: "keypress", callback });
