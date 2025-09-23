import { useState } from "react";
import { useChangeTracking } from "./useChangeTracking";

const useDebounceObject = (value, delay = 100) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useChangeTracking(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value]);
	return debouncedValue;
};

export default useDebounceObject;
