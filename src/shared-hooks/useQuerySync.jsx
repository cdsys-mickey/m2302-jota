import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import deepEqual from "fast-deep-equal";

export const useQuerySync = (paramName, callback) => {
	const location = useLocation();
	const newValue = useMemo(() => {
		const params = new URLSearchParams(location.search);
		return params.get(paramName);
	}, [location.search, paramName])
	const [currentValue, setCurrentValue] = useState();
	const [syncing, setSyncing] = useState(false);

	useEffect(() => {
		if (syncing) {
			console.log(`querySync for [${paramName}] triggered"`);
			setSyncing(false);
			setCurrentValue(newValue);
			callback(newValue, currentValue);
		}
	}, [callback, currentValue, newValue, paramName, syncing]);

	useEffect(() => {
		console.log("newValue", newValue);
		console.log("currentValue", currentValue);
		if (!deepEqual(newValue, currentValue)) {
			console.log(`query changed ${currentValue} → ${newValue}`);
			setSyncing(true);
		}
	}, [currentValue, newValue]);
};
