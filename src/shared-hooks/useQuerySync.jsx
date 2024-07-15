import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useQuerySync = (paramName, callback) => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const newValue = params.get(paramName);
	const [currentValue, setCurrentValue] = useState();
	const [syncing, setSyncing] = useState(false);

	useEffect(() => {
		if (syncing) {
			console.log("syncing triggered");
			setSyncing(false);
			setCurrentValue(newValue);
			callback(newValue, currentValue);
		}
	}, [callback, currentValue, newValue, syncing]);

	useEffect(() => {
		console.log("newValue", newValue);
		console.log("currentValue", currentValue);
		if (newValue !== currentValue) {
			console.log(`query changed ${currentValue} → ${newValue}`);
			setSyncing(true);
		}
	}, [currentValue, newValue]);
};
