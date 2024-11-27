import { AuthContext } from "@/contexts/auth/AuthContext";
import { useInit } from "@/shared-hooks/useInit";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useContext } from "react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function useServiceStatus(opts = {}) {
	const { name } = opts;

	if (!name) {
		throw new Error("未指派服務名稱");
	}

	const { httpGetAsync, httpPatchAsync } = useWebApi();
	const { token } = useContext(AuthContext);
	const [enabled, setEnabled] = useState(false);
	const [loading, setLoading] = useState();
	const [error, setError] = useState();

	const getStatus = useCallback(async () => {
		try {
			setLoading(true);
			const { status, payload, error } = await httpGetAsync({
				url: `v1/pos/service-status/${name}`,
				bearer: token
			})
			if (status.success) {
				setLoading(false);
				setEnabled(payload["data"][0]["Using"] === "1");
			} else {
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			console.error("getStatus failed", err);
		}
	}, [httpGetAsync, name, token]);

	const updateStatus = useCallback(async (enabled) => {
		setError(null);
		try {
			const { status, error } = await httpPatchAsync({
				url: `v1/pos/service-status/${name}`,
				bearer: token,
				data: {
					enabled: enabled ? 1 : 0
				}
			})
			if (status.success) {
				setEnabled(enabled);
				if (enabled) {
					toast.success("下載服務已開放");
				} else {
					toast.warn("下載服務已鎖定");
				}
			} else {
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			console.error("updateStatus failed", err);
			setError(err);
		}
	}, [httpPatchAsync, name, token]);

	const toggle = useCallback(() => {
		updateStatus(!enabled);
	}, [enabled, updateStatus]);

	useInit(() => {
		getStatus();
	}, []);

	return {
		getStatus,
		updateStatus,
		enabled,
		loading,
		toggle,
		error
	}

}