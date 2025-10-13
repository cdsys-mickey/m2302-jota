import { AuthContext } from "@/contexts/auth/AuthContext";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import { useCallback, useContext } from "react";

const AuthListView = (props) => {
	const { ...rest } = props;
	const { handleSessionExpired } = useContext(AuthContext);

	const handleError = useCallback((err) => {
		if (err.status == 401) {
			handleSessionExpired();
		}
	}, [handleSessionExpired]);


	return (
		<InfiniteListView
			onError={handleError}
			{...rest} />
	)
}

AuthListView.displayName = "AuthListView";
export default AuthListView;