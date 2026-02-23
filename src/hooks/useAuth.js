import { AppContext } from "@/contexts/app/AppContext";
import { MessagingContext } from "@/contexts/messaging/MessagingContext";
import consoleEx from "@/helpers/consoleEx";
import { toastEx } from "shared-components/toast-ex";
import useAppRedirect from "@/hooks/useAppRedirect";
import Messages from "@/modules/md-messages";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useWebApiAsync } from "@/shared-hooks";
import useAction from "@/shared-modules/ActionState/useAction";
import { decodeJwt } from "jose";
import Cookies from "js-cookie";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../modules/Auth.mjs";
import ActionState from "../shared-modules/ActionState/ActionState";
import { SharedOptionsContext } from "@/shared-components/option-picker/SharedOptionsContext";
import { ConfigContext } from "shared-components/config";

const LOG_KEY = "LogKey";

const DEFAULT_SWITCH_DEPT_OPTS = {
	toLanding: true,
};

export const useAuth = () => {
	const { toLogin, toLanding, toRenew } = useAppRedirect();
	const { httpGetAsync, httpPutAsync } = useWebApiAsync();
	const dialogs = useContext(DialogsContext);
	const config = useContext(ConfigContext);
	const deptSwitchAction = useAction();
	const location = useLocation();
	const navigate = useNavigate();
	const app = useContext(AppContext);
	const messaging = useContext(MessagingContext);
	const { connectionId } = messaging;
	const sharedOptions = useContext(SharedOptionsContext);

	// const logKeyInUrl = useMemo(() => {
	// 	const params = new URLSearchParams(location.search);
	// 	return params.get(LOG_KEY);
	// }, [location.search])

	const [state, setState] = useState({
		// AUTHENTICATE
		validating: null,
		operator: null,
		token: null,
		roles: null,
		error: null,
	});

	const [authoritiesState, setAuthoritiesState] = useState({
		authorities: null,
		authoritiesError: null,
		authoritiesLoading: null,
	});

	const debugEnabled = useMemo(() => {
		return (
			Cookies.get(Auth.COOKIE_IMPERSONATE) == 1 || state.operator?.hasRoot
		);
	}, [state.operator?.hasRoot]);

	const loadModules = useCallback(
		async ({ token }) => {
			console.log("loading authorities...");
			setAuthoritiesState((prev) => ({
				...prev,
				authoritiesLoading: true,
			}));
			try {
				const { status, payload } = await httpGetAsync({
					url: "v2/auth/modules",
					bearer: token,
				});
				if (status.success) {
					setAuthoritiesState((prev) => ({
						...prev,
						authorities: payload.data ?? payload,
						authoritiesLoading: false,
						hiddenAuthoritiesCount: payload.hiddenCount,
					}));
				} else {
					switch (status.code) {
						case 401:
							toastEx.error(Messages.SESSION_EXPIRED);
							toLogin();
					}
				}
			} catch (err) {
				console.error("loadAuthorities", err);
				setAuthoritiesState((prev) => ({
					...prev,
					authoritiesLoading: false,
				}));
			}
		},
		[httpGetAsync, toLogin],
	);

	const renewCookie = useCallback((logKey) => {
		Cookies.set(Auth.COOKIE_LOGKEY, logKey || "", Auth.ROOT_COOKIE_OPTS);
	}, []);

	const recoverIdentity = useCallback(
		async ({ queryParams, switching = false, doRedirect = false } = {}) => {
			console.log(`recoverIdentity...`);
			setState((prev) => ({
				...prev,
				validating: true,
			}));
			let logKeyInSession = sessionStorage.getItem(Auth.COOKIE_LOGKEY);
			let logKeyInCookie = Cookies.get(Auth.COOKIE_LOGKEY);
			const logKey = logKeyInSession || logKeyInCookie;
			if (!logKey) {
				toastEx.error("您尚未登入");
				if (doRedirect) {
					toLogin();
				}
				return;
			}

			try {
				// 檢查 cookie
				const { status, payload, error } = await httpGetAsync({
					url: "v1/auth/token",
					params: {
						logKey: logKey,
					},
				});

				if (logKeyInSession) {
					console.log(
						"recovering from logKey in session",
						logKeyInSession,
					);
				} else {
					console.log(
						"recovering from logKey in cookie",
						logKeyInCookie,
					);
				}
				if (status.success) {
					sharedOptions.resetOptions({ excludes: ["dept-switch"] });

					const token = payload.token;
					const jwtPayload = decodeJwt(token);
					console.log("jwtPayload", jwtPayload);

					const expDate = new Date(jwtPayload.exp * 1000);

					// 檢查 token 是否已過期
					if (Date.now() > expDate) {
						console.log("token expired");
					} else {
						console.log("token is valid");
					}

					console.log("jwtPayload.entity", jwtPayload.entity);

					setState((prev) => ({
						...prev,
						token,
						operator: {
							...jwtPayload.entity,
							hasRoot:
								jwtPayload.entity?.Class >= Auth.SCOPES.ROOT,
							isRoot:
								jwtPayload.entity?.Class == Auth.SCOPES.ROOT,
							hasSys: jwtPayload.entity?.Class >= Auth.SCOPES.SYS,
							isSys: jwtPayload.entity?.Class == Auth.SCOPES.SYS,
							isHQ: jwtPayload.entity?.Class == Auth.SCOPES.HQ,
							hasHQ: jwtPayload.entity?.Class >= Auth.SCOPES.HQ,
							isBranchHQ:
								jwtPayload.entity?.Class ==
								Auth.SCOPES.BRANCH_HQ,
							hasBranchHQ:
								jwtPayload.entity?.Class >=
								Auth.SCOPES.BRANCH_HQ,
						},
						roles: jwtPayload.roles,
					}));

					loadModules({ token });

					if (jwtPayload.entity.MustChange === "1") {
						throw {
							status: 426,
						};
					}
					if (doRedirect) {
						const spawn = sessionStorage.getItem(Auth.COOKIE_SPAWN);

						toastEx.success(
							`${jwtPayload.entity.LoginName || "(帳號)"}/${
								jwtPayload.entity.UserName || ""
							}${spawn ? "以視窗模式" : ""}成功${
								switching ? "切換" : "登入"
							}到${jwtPayload.entity.CurDeptName}`,
						);
					}
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				Cookies.remove(Auth.COOKIE_LOGKEY, Auth.ROOT_COOKIE_OPTS);
				Cookies.remove(Auth.COOKIE_LOGKEY, Auth.AUTH_COOKIE_OPTS);
				sessionStorage.removeItem(Auth.COOKIE_LOGKEY);

				console.error("token restore failed", err);
				switch (err.status) {
					case 426:
						toastEx.error("您的帳號目前為鎖定狀態，請重設您的密碼");
						toRenew();
						break;
					case 401:
						if (doRedirect) {
							toLogin();
						}
						break;
					default:
						toastEx.error("登入發生例外", err);
						if (doRedirect) {
							toLogin();
						}
						break;
				}
			} finally {
				setState((prev) => ({
					...prev,
					validating: false,
				}));
				if (queryParams && queryParams.get(LOG_KEY)) {
					queryParams.delete(LOG_KEY);
					navigate(
						{ search: queryParams.toString() },
						{ replace: true },
					);
				}
			}
		},
		[httpGetAsync, loadModules, navigate, sharedOptions, toLogin, toRenew],
	);

	useEffect(() => {
		const handleRegister = async () => {
			console.log(
				`connectionId ${connectionId} connected, registering to LogKey ${state.operator?.LoginName}(${state.operator?.LogKey})`,
			);
			const { status } = await httpPutAsync({
				url: "v1/auth/register",
				bearer: state.token,
				data: {
					connectionId,
				},
			});
			if (status.success) {
				console.log(`\tsuccess.`);
			} else {
				consoleEx.error("\tfailed");
			}
		};
		if (connectionId && state.operator?.LogKey) {
			handleRegister();
		}
	}, [
		connectionId,
		httpPutAsync,
		state.operator?.LogKey,
		state.operator?.LoginName,
		state.token,
	]);

	const invalidate = useCallback(() => {
		setState((prev) => ({
			...prev,
			validating: null,
		}));
	}, []);

	const handleSignOut = useCallback(
		async ({ spawn = false }) => {
			try {
				await httpGetAsync({
					url: "v1/auth/signout",
					bearer: state.token,
				});
				toastEx.success("您已成功登出");
				if (spawn) {
					window.close();
				}
				sessionStorage.removeItem(Auth.COOKIE_SPAWN);
				toLogin();
			} catch (err) {
				console.error("handleSignOut.failed", err);
			}
		},
		[httpGetAsync, toLogin, state.token],
	);

	const confirmSignOut = useCallback(() => {
		const spawn = sessionStorage.getItem(Auth.COOKIE_SPAWN) == 1;
		let message = "確認要登出?";
		if (spawn) {
			message = "確定要結束視窗?";
		}
		dialogs.confirm({
			message,
			onConfirm: () => {
				handleSignOut({ spawn });
			},
		});
	}, [dialogs, handleSignOut]);

	const switchDept = useCallback(
		async (newDept, opts = DEFAULT_SWITCH_DEPT_OPTS) => {
			if (!newDept) {
				toastEx.error("您尚未選擇欲切換的門市");
			}
			try {
				deptSwitchAction.start();
				const { status, error } = await httpGetAsync({
					url: "v1/auth/switch-dept",
					bearer: state.token,
					params: {
						id: newDept?.DeptID,
					},
				});
				if (status.success) {
					recoverIdentity({ switching: true, doRedirect: false });
					if (opts.toLanding) {
						toLanding({
							reloadAuthorities: true,
						});
					}

					toastEx.success(
						`已成功切換至 ${newDept?.AbbrName || newDept?.DeptName}`,
					);
				} else {
					throw error || new Error("切換單位發生未預期例外");
				}
			} catch (err) {
				console.error("onDeptSwitchSubmit.failed", err);
				toastEx.error("登入已逾期，請重新登入");
				toLogin();
			} finally {
				deptSwitchAction.clear();
			}
		},
		[
			deptSwitchAction,
			httpGetAsync,
			recoverIdentity,
			state.token,
			toLanding,
			toLogin,
		],
	);

	const onDeptSwitchSubmit = useCallback(
		(data) => {
			console.log(`onDeptSwitchSubmit`, data);
			switchDept(data?.newDept);
		},
		[switchDept],
	);

	const onDeptSwitchSubmitError = useCallback((err) => {
		console.error(`onDeptSwitchSubmitError`, err);
	}, []);

	const promptDeptSwitch = useCallback(() => {
		deptSwitchAction.prompt();
	}, [deptSwitchAction]);

	const deptSwitching = useMemo(() => {
		return deptSwitchAction.state === ActionState.PROMPT;
	}, [deptSwitchAction.state]);

	const deptSwitchWorking = useMemo(() => {
		return deptSwitchAction.state === ActionState.WORKING;
	}, [deptSwitchAction.state]);

	const cancelDeptSwitch = useCallback(() => {
		deptSwitchAction.clear();
	}, [deptSwitchAction]);

	const handleError = useCallback(
		(err) => {
			console.error(`onError`, err);
			if (err?.status === 401) {
				toLogin();
			}
		},
		[toLogin],
	);

	const { httpPatchAsync } = useWebApiAsync();
	const changeAction = useAction();
	const {
		prompt: promptChanging,
		start: startChanging,
		finish: finsihChanging,
		fail: failChanging,
		working: changing,
		prompting: changePrompting,
	} = changeAction;

	const onChangeSubmit = useCallback(
		({ setError, doRedirect }) =>
			async (data) => {
				console.log("onChangeSubmit", data);
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
						bearer: state.token,
						data: {
							newPword: data.newPword,
						},
					});
					if (status.success) {
						toastEx.success("密碼已更新");
						finsihChanging();
						if (doRedirect) {
							Cookies.set(
								Auth.COOKIE_LOGKEY,
								payload.LogKey ?? "",
								Auth.ROOT_COOKIE_OPTS,
							);
							toLanding({
								reloadAuthorities: true,
							});
						}
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
			startChanging,
			state.token,
			toLanding,
		],
	);

	const onChangeSubmitError = useCallback((err) => {
		console.error("onChangeSubmitError", err);
	}, []);

	const renewLogKeyInSession = useCallback((newLogKey) => {
		sessionStorage.setItem(LOG_KEY, newLogKey);
	}, []);

	const handleSessionExpired = useCallback(() => {
		toLogin();
		toastEx.warn("您的登入已逾期，請重新登入");
	}, [toLogin]);

	const validateLogKey = useCallback(
		async (logKey) => {
			const _logKey = logKey || state?.operator?.LogKey;
			if (!_logKey) {
				return false;
			}
			try {
				const { status, error } = await httpGetAsync({
					url: "v1/auth/current-by-query",
					bearer: state.token,
					params: {
						LogKey: _logKey,
					},
				});
				if (status.success) {
					return true;
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				console.error("validateLogKey failed", err);
				return false;
			}
		},
		[httpGetAsync, state?.operator?.LogKey, state.token],
	);

	useEffect(() => {
		console.log("state.validating", state.validating);
		if (state.validating === null) {
			const queryParams = new URLSearchParams(location.search);
			const logKeyInUrl = queryParams.get(LOG_KEY);
			const logKeyInCookie = Cookies.get(Auth.COOKIE_LOGKEY);
			// const logKeyInSession = sessionStorage.getItem(Auth.COOKIE_LOGKEY);

			if (logKeyInUrl) {
				sessionStorage.setItem(Auth.COOKIE_SPAWN, 1);
				renewLogKeyInSession(logKeyInUrl);
			} else {
				sessionStorage.setItem(Auth.COOKIE_SPAWN, 0);
				if (logKeyInCookie) {
					console.log("recover from COOKIE");
					renewLogKeyInSession(logKeyInCookie);
				}
			}

			recoverIdentity({
				doRedirect: true,
				queryParams,
			});
		}
	}, [
		state.validating,
		recoverIdentity,
		location.search,
		renewLogKeyInSession,
	]);

	return {
		...state,
		...authoritiesState,
		// METHODS
		recoverIdentity,
		invalidate,
		confirmSignOut,
		// 切換帳號
		onDeptSwitchSubmit,
		onDeptSwitchSubmitError,
		deptSwitching,
		cancelDeptSwitch,
		promptDeptSwitch,
		deptSwitchWorking,
		handleError,
		renewCookie,
		loadAuthorities: loadModules,
		// 變更密碼
		promptChanging,
		startChanging,
		failChanging,
		changing,
		onChangeSubmit,
		onChangeSubmitError,
		changePrompting,
		switchDept,
		renewLogKey: renewLogKeyInSession,
		loadModules,
		debugEnabled,
		// ...taskListLoader,
		handleSessionExpired,
		validateLogKey,
	};
};
