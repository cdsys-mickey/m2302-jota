import { AuthContext } from "@/contexts/auth/AuthContext";
import Auth from "@/modules/Auth.mjs";
import { useInit } from "@/shared-hooks/useInit";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useState } from "react";

export const useAppModule = (props = {}) => {
	const { token } = useContext(AuthContext);
	const { moduleId } = props;

	const [error, setError] = useState();
	const [state, setState] = useState({
		moduleAuthorityLoading: null,
		moduleAuthority: null,
		canRead: false,
		canCreate: false,
		canUpdate: false,
		canPrint: false,
		canDelete: false,
		canManage: false,
		canReview: false,
		canReject: false,
		canRun: false,
		canExport: false,
		canImport: false,
	});
	const { httpGetAsync } = useWebApi();

	const getModuleAuthority = useCallback(async () => {
		setState((prev) => ({
			...prev,
			moduleAuthorityLoading: true,
		}));
		try {
			const { status, payload, error } = await httpGetAsync({
				url: `v1/auth/authorities/${moduleId}`,
				bearer: token,
			});
			if (status.success) {
				setState((prev) => ({
					...prev,
					moduleAuthority: payload,
					...Auth.transformPayloadToAuthority(payload),
				}));
			} else {
				throw error || new Error(`讀取 ${moduleId} 模組權限失敗`);
			}
		} catch (err) {
			console.error(err);
			setError(err);
		} finally {
			setState((prev) => ({
				...prev,
				moduleAuthorityLoading: false,
			}));
		}
	}, [httpGetAsync, moduleId, token]);

	useInit(() => {
		getModuleAuthority();
	}, []);

	return {
		...state,
		getModuleAuthority,
		error,
	};
};
