import { useEffect } from "react";

const useOnMount = (callback) => {
	useEffect(() => {
		let mounted = true;
		if (mounted) {
			callback();
		}
		return () => {
			mounted = false;
		};
	}, [callback]);
};

export default useOnMount;
