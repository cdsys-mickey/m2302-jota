import { useCallback, useState } from "react";
import { useOptions } from "../../shared-hooks/useOptions";
import queryString from "query-string";
import { useMemo } from "react";
import Auth from "../../modules/md-auth";

export const useZA03CopyAuth = ({ token, scope = Auth.SCOPES.HQ }) => {
	const [fromUser, setFromUser] = useState();

	const params = useMemo(() => {
		return {
			uid: fromUser?.UID,
			sp: scope,
		};
	}, [fromUser?.UID, scope]);

	const getOptions = useCallback((payload) => {
		return payload;
	}, []);

	const options = useOptions({
		url: "v1/ou/user/depts",
		bearer: token,
		params,
		getOptions,
	});

	return {
		fromUser,
		setFromUser,
		...options,
	};
};
