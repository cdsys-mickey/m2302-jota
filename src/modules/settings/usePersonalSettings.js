import { AuthContext } from "@/contexts/auth/AuthContext";
import { toastEx } from "shared-components/toast-ex";
import Settings from "@/modules/settings/Settings.mjs";
import { useWebApiAsync } from "@/shared-hooks";
import { useCallback, useContext, useMemo, useState } from "react";
import useAction from "@/shared-modules/ActionState/useAction";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export const usePersonalSettings = () => {
	const { token, operator, renewLogKey } = useContext(AuthContext);
	// const [selectedTab, setSelectedTab] = useState(Settings.Tabs.CHANGE_PWORD);
	const [searchParams, setSearchParams] = useSearchParams();
	const { httpPostAsync, httpPatchAsync } = useWebApiAsync();

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

	const handleTabChange = useCallback(
		(e, newTab) => {
			// setSelectedTab(newTab);
			setSearchParams((prev) => ({
				...prev,
				tab: newTab,
			}));
		},
		[setSearchParams],
	);

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
					if (status.success) {
						renewLogKey(payload.LogKey);

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
					toastEx.error("驗證失敗", err);
					setError("ogPword", {
						type: "manual",
						message: "密碼驗證失敗",
					});
					verifyAction.fail({
						error: err,
					});
				}
			},
		[httpPostAsync, operator, renewLogKey, verifyAction],
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
					if (status.success) {
						toastEx.success("密碼已更新");
						finsihChanging();
						renewLogKey(payload.LogKey);
						reset({
							newPword: "",
							newPword2: "",
						});
					} else {
						throw error ?? new Error("未預期例外");
					}
				} catch (err) {
					toastEx.error("變更密碼失敗", err);
					failChanging(err);
				}
			},
		[
			failChanging,
			finsihChanging,
			httpPatchAsync,
			renewLogKey,
			startChanging,
			token,
		],
	);

	const onChangePwordSubmitError = useCallback((err) => {
		console.error("onChangePwordSubmitError", err);
	}, []);

	const loading = useMemo(() => {
		return verified ? changing : verifying;
	}, [changing, verified, verifying]);

	const handleDownloadPromptChange = useCallback((newValue) => {
		console.log("handleDownloadPromptChange", newValue);
		Cookies.set(Settings.Keys.COOKIE_DOWNLOAD_PROMPT, newValue ? 1 : 0);
	}, []);

	const isDownloadPromptDisabled = useCallback(() => {
		return Cookies.get(Settings.Keys.COOKIE_DOWNLOAD_PROMPT) == 0;
	}, []);

	useEffect(() => {
		if (!searchParams.has("tab")) {
			setSearchParams((prev) => ({
				...prev,
				tab: Settings.Tabs.CHANGE_PWORD,
			}));
		}
	}, [searchParams, setSearchParams]);

	return {
		searchParams,
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
		// 提示
		handleDownloadPromptChange,
		isDownloadPromptDisabled,
	};
};
