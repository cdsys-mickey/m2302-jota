import { toastEx } from "@/helpers/toast-ex";
import useAppRedirect from "@/hooks/useAppRedirect";
import Messages from "@/modules/md-messages";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useAction } from "@/shared-hooks/useAction";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { decodeJwt } from "jose";
import Cookies from "js-cookie";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Auth from "../modules/md-auth";
import ActionState from "../shared-constants/action-state";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LOG_KEY = "LogKey";

export const useAuth = () => {
	const { toLogin, toLanding, toRenew } = useAppRedirect();
	const { httpGetAsync } = useWebApi();
	const dialogs = useContext(DialogsContext);
	const deptSwitchAction = useAction();
	const location = useLocation();
	const navigate = useNavigate();

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

	// const taskListLoader = useInfiniteLoader({
	// 	url: "v1/my/messages",
	// 	bearer: state.token,
	// 	initialFetchSize: 30,
	// 	params: {
	// 		ur: 1,
	// 	},
	// });

	const loadModules = useCallback(
		async ({ token }) => {
			console.log("loading authorities...");
			setAuthoritiesState((prev) => ({
				...prev,
				authoritiesLoading: true,
			}));
			try {
				const { status, payload } = await httpGetAsync({
					url: "v1/auth/modules",
					bearer: token,
				});
				if (status.success) {
					setAuthoritiesState((prev) => ({
						...prev,
						authorities: payload,
						authoritiesLoading: false,
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
		[httpGetAsync, toLogin]
	);

	const renewCookie = useCallback((logKey) => {
		Cookies.set(Auth.COOKIE_LOGKEY, logKey || "", Auth.LOCAL_COOKIE_OPTS);
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
				const { status, payload, error } = logKeyInSession ? await httpGetAsync({
					url: "v1/auth/token",
					params: {
						logKey: logKeyInSession
					}
				}) : await httpGetAsync({
					url: "v1/auth/token",
				});
				if (logKeyInSession) {
					console.log("recovering from logKey in session", logKeyInSession);
				} else {
					console.log("recovering from logKey in cookie", logKeyInCookie);
				}

				if (status.success) {
					// JOSE methods
					// ** METHOD 1 ** → no validation
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

					// ** METHOD 2 ** → requires https
					// const secret = new TextEncoder().encode(
					// 	import.meta.env.VITE_JWT_SECRET
					// );
					// const { payload: jwtPayload } = await jwtVerify(token, secret);

					// ** METHOD 3 **
					// const secret = jose.base64url.decode(
					// 	"zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI"
					// );
					// const { payload: jwtPayload } = await jose.jwtDecrypt(
					// 	token,
					// 	secret
					// );
					console.log("jwtPayload.entity", jwtPayload.entity);

					setState((prev) => ({
						...prev,
						token,
						operator: {
							...jwtPayload.entity,
							hasRoot: jwtPayload.entity?.Class >= Auth.SCOPES.ROOT,
							isRoot: jwtPayload.entity?.Class == Auth.SCOPES.ROOT,
							isHQ: jwtPayload.entity?.Class == Auth.SCOPES.HQ,
							hasHQ: jwtPayload.entity?.Class >= Auth.SCOPES.HQ,
							isBranchHQ: jwtPayload.entity?.Class == Auth.SCOPES.BRANCH_HQ,
							hasBranchHQ: jwtPayload.entity?.Class >= Auth.SCOPES.BRANCH_HQ,
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
						toastEx.success(
							`${jwtPayload.entity.LoginName || "(帳號)"} / ${jwtPayload.entity.UserName || ""
							} 已成功${switching ? "切換" : "登入"}到${jwtPayload.entity.CurDeptName
							}`
						);
					}
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
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
						toastEx.error("登入發生例外，請重新嘗試");
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
					queryParams.delete(LOG_KEY)
					navigate({ search: queryParams.toString() }, { replace: true });
				}
			}
		},
		[httpGetAsync, loadModules, navigate, toLogin, toRenew]
	);

	const invalidate = useCallback(() => {
		setState((prev) => ({
			...prev,
			validating: null,
		}));
	}, []);

	const handleSignOut = useCallback(async () => {
		try {
			await httpGetAsync({
				url: "v1/auth/signout",
				bearer: state.token,
			});
			toastEx.success("您已成功登出");
			window.close();
			toLogin();
		} catch (err) {
			console.error("handleSignOut.failed", err);
		}

	}, [httpGetAsync, toLogin, state.token]);

	const confirmSignOut = useCallback(() => {
		let logKeyInSession = sessionStorage.getItem(Auth.COOKIE_LOGKEY);
		let message = "確認要登出?";
		if (logKeyInSession) {
			message = "確定要結束視窗?";
		}
		dialogs.confirm({
			message,
			onConfirm: () => {
				handleSignOut();
			},
		});
	}, [dialogs, handleSignOut]);

	const switchDept = useCallback(async (newDept) => {
		if (!newDept) {
			toastEx.error("您尚未選擇欲切換的門市")
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
				toLanding({
					reloadAuthorities: true,
				});
				deptSwitchAction.clear();
				toastEx.success(
					`已成功切換至 ${newDept?.AbbrName || newDept?.DeptName}`
				);
			} else {
				throw error || new Error("切換單位發生未預期例外");
			}
		} catch (err) {
			console.error("onDeptSwitchSubmit.failed", err);
			toastEx.error("切換失敗，請重新登入");
			toLogin();

		}
	}, [deptSwitchAction, httpGetAsync, recoverIdentity, state.token, toLanding, toLogin]);

	const onDeptSwitchSubmit = useCallback(
		(data) => {
			console.log(`onDeptSwitchSubmit`, data);
			switchDept(data?.newDept);
		},
		[switchDept]
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
		[toLogin]
	);

	const { httpPatchAsync } = useWebApi();
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
								payload.LogKey || "",
								Auth.LOCAL_COOKIE_OPTS
							);
							toLanding({
								reloadAuthorities: true,
							});
						}
					} else {
						throw error || new Error("未預期例外");
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
		]
	);

	const onChangeSubmitError = useCallback((err) => {
		console.error("onChangeSubmitError", err);
	}, []);

	const renewLogKey = useCallback((newLogKey) => {
		sessionStorage.setItem(LOG_KEY, newLogKey);
	}, []);

	useEffect(() => {
		console.log("state.validating", state.validating);
		if (state.validating === null) {
			const queryParams = new URLSearchParams(location.search);
			const logKeyInUrl = queryParams.get(LOG_KEY);
			const logKeyInCookie = Cookies.get(Auth.COOKIE_LOGKEY);
			const logKeyInSession = sessionStorage.getItem(Auth.COOKIE_LOGKEY);

			if (logKeyInUrl) {
				renewLogKey(logKeyInUrl);
			} else if (logKeyInSession) {
				console.log("use existing sessionStorage");
			} else if (logKeyInCookie) {
				console.log("recover from COOKIE");
				renewLogKey(logKeyInCookie);
			}

			recoverIdentity({
				doRedirect: true,
				queryParams
			});
		}
	}, [state.validating, recoverIdentity, location.search, renewLogKey]);

	// useEffect(() => {
	// 	const params = new URLSearchParams(location.search);
	// 	const logKey = params.get("LogKey");

	// 	if (logKey) {
	// 		console.log("")
	// 		// 將 LogKey 寫入 sessionStorage
	// 		sessionStorage.setItem("LogKey", logKey);

	// 		// 移除 LogKey 參數並更新網址
	// 		params.delete("LogKey");
	// 		navigate({ search: params.toString() }, { replace: true });
	// 	}
	// }, [location, navigate]);

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
		renewLogKey,
		loadModules
		// ...taskListLoader,
	};
};
