import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";
import { useInfiniteLoader } from "../shared-hooks/useInfiniteLoader";

export const useMessages = () => {
	const auth = useContext(AuthContext);

	const taskListLoader = useInfiniteLoader({
		url: "v1/my/messages",
		bearer: auth.token,
		initialFetchSize: 30,
		params: {
			ur: 1,
		},
	});

	return {
		...taskListLoader,
	};
};
