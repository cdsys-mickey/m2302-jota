import { useCallback } from "react";

const useSleep = (props) => {
	const sleep = useCallback((milliseconds) => {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	}, []);

	return sleep;
};

export default useSleep;
