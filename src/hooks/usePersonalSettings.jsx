import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Settings from "@/modules/md-settings";
import { useCallback } from "react";
import { useAction } from "../shared-hooks/useAction";
import Cookies from "js-cookie";
import Auth from "../modules/md-auth";
import { toast } from "react-toastify";
import Errors from "../shared-modules/sd-errors";
import { useMatch } from "react-router-dom";
import { useMemo } from "react";

export const usePersonalSettings = () => {
	const { token, operator, validateCookie } = useContext(AuthContext);
	const [selectedTab, setSelectedTab] = useState(Settings.Tabs.CHANGE_PWORD);
	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
		httpPatchAsync,
	} = useWebApi();

	const [verified, setVerified] = useState(false);
	const verifyAction = useAction();
	const { working: verifying } = verifyAction;
	const changeAction = useAction();
	const {
		prompt: promptChanging,
		start: startChanging,
		finish: finsihChanging,
		fail: failChanging,
		working: changing,
		prompting: changePrompting,
	} = changeAction;

	const handleTabChange = useCallback((e, newTab) => {
		setSelectedTab(newTab);
	}, []);

	const onVerifySubmit = useCallback(
		({ setError, reset }) =>
			async (data) => {
				console.log("onVerifySubmit", data);
				console.log("operator", operator);
				verifyAction.start();
				try {
					const { status, payload, error } = await httpPostAsync({
						mode: "form",
						url: "/v1/auth/signin",
						data: {
							ac: operator.LoginName,
							pw: data.ogPword,
						},
					});
					if (status?.success) {
						Cookies.set(
							Auth.COOKIE_LOGKEY,
							payload.LogKey || "",
							Auth.COOKIE_OPTS
						);

						setVerified(true);
						verifyAction.finish();
						reset({
							newPword: "",
							newPword2: "",
						});
					} else {
						throw error || new Error("發生未預期例外");
					}
				} catch (err) {
					toast.error(Errors.getMessage("驗證失敗", err));
					setError("ogPword", {
						type: "manual",
						message: "密碼驗證失敗",
					});
					verifyAction.fail(err);
				}
			},
		[httpPostAsync, operator, verifyAction]
	);

	const onVerifySubmitError = useCallback((err) => {
		console.error("onVerifySubmitError", err);
	}, []);

	const onChangePwordSubmit = useCallback(
		({ setError, reset }) =>
			async (data) => {
				console.log("onChangePwordSubmit", data);
				if (data?.newPword !== data?.newPword2) {
					setError("newPword2", {
						type: "manual",
						message: "輸入的兩次密碼必須相同",
					});
					return;
				}

				try {
					startChanging();
					const { status, payload, error } = await httpPatchAsync({
						url: "v1/auth/change-pword",
						bearer: token,
						data: {
							newPword: data.newPword,
						},
					});
					if (status?.success) {
						toast.success("密碼已更新");
						finsihChanging();
						Cookies.set(
							Auth.COOKIE_LOGKEY,
							payload.LogKey || "",
							Auth.COOKIE_OPTS
						);
						reset({
							newPword: "",
							newPword2: "",
						});
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					toast.error(Errors.getMessage("變更密碼失敗", err));
					failChanging(err);
				}
			},
		[failChanging, finsihChanging, httpPatchAsync, startChanging, token]
	);

	const onChangePwordSubmitError = useCallback((err) => {
		console.error("onChangePwordSubmitError", err);
	}, []);

	const loading = useMemo(() => {
		return verified ? changing : verifying;
	}, [changing, verified, verifying]);

	return {
		selectedTab,
		handleTabChange,
		verified,
		// 密碼變更
		promptChanging,
		verifying,
		onVerifySubmit,
		onVerifySubmitError,
		onChangePwordSubmit,
		onChangePwordSubmitError,
		loading,
	};
};
