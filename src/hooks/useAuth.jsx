import useAppRedirect from "@/hooks/useAppRedirect";
import Messages from "@/modules/md-messages";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { decodeJwt } from "jose";
import Cookies from "js-cookie";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useAction } from "@/shared-hooks/useAction";
import { useMemo } from "react";
import ActionState from "../shared-constants/action-state";
import Auth from "../modules/md-auth";
import Errors from "../shared-modules/sd-errors";
import { useInfiniteLoader } from "../shared-hooks/useInfiniteLoader";

export const useAuth = () => {
	const { toLogin, toLanding, toRenew } = useAppRedirect();
	const { httpGetAsync } = useWebApi();
	const dialogs = useContext(DialogsContext);
	const deptSwitchAction = useAction();

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

	const loadAuthorities = useCallback(
		async ({ token }) => {
			console.log("loading authorities...");
			setAuthoritiesState((prev) => ({
				...prev,
				authoritiesLoading: true,
			}));
			try {
				const { status, payload } = await httpGetAsync({
					url: "v1/auth/authorities",
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
							toast.error(Messages.SESSION_EXPIRED);
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
		Cookies.set(Auth.COOKIE_LOGKEY, logKey || "", Auth.COOKIE_OPTS);
	}, []);

	const validateCookie = useCallback(
		async ({ switching = false, doRedirect = false } = {}) => {
			console.log(`validating cookie...`);
			try {
				setState((prev) => ({
					...prev,
					validating: true,
				}));
				// 檢查 cookie
				const logKey = Cookies.get(Auth.COOKIE_LOGKEY);
				if (!logKey) {
					toast.error("您尚未登入");
					if (doRedirect) {
						toLogin();
					}
					return;
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/auth/token",
				});

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
					// console.log("jwtPayload", jwtPayload);

					setState((prev) => ({
						...prev,
						token,
						operator: jwtPayload.entity,
						roles: jwtPayload.roles,
					}));

					loadAuthorities({ token });

					if (jwtPayload.entity.MustChange === "1") {
						throw {
							status: 426,
						};
					}
					if (doRedirect) {
						toast.success(
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
						toast.error("請重設您的密碼");
						toRenew();
						break;
					case 401:
						toast.error("您的連線階段已逾期，請重新登入");
						if (doRedirect) {
							toLogin();
						}
						break;
					default:
						toast.error("登入發生例外，請重新嘗試");
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
			}
		},
		[httpGetAsync, loadAuthorities, toLogin, toRenew]
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
			toast.success("您已成功登出");
			Cookies.remove(Auth.COOKIE_LOGKEY);
		} catch (err) {
			console.error("handleSignOut.failed", err);
		}
		toLogin();
	}, [httpGetAsync, toLogin, state.token]);

	const confirmSignOut = useCallback(() => {
		dialogs.confirm({
			message: "確認要登出?",
			onConfirm: () => {
				handleSignOut();
			},
		});
	}, [dialogs, handleSignOut]);

	const onDeptSwitchSubmit = useCallback(
		async (data) => {
			console.log(`onDeptSwitchSubmit`, data);
			const newDeptId = data?.newDept?.DeptID;
			try {
				deptSwitchAction.start();
				const { status, error } = await httpGetAsync({
					url: "v1/auth/switch-dept",
					bearer: state.token,
					params: {
						id: newDeptId,
					},
				});
				if (status.success) {
					validateCookie({ switching: true, doRedirect: false });
					toLanding({
						reloadAuthorities: true,
					});
					deptSwitchAction.clear();
					toast.success(
						`已成功切換至 ${data?.newDept?.DeptName || data?.newDept?.AbbrName
						}`
					);
				} else {
					throw error || new Error("切換單位發生未預期例外");
				}
			} catch (err) {
				console.error("onDeptSwitchSubmit.failed", err);
				toast.error(`切換單位異常`);
			}
		},
		[deptSwitchAction, httpGetAsync, state.token, toLanding, validateCookie]
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
						toast.success("密碼已更新");
						finsihChanging();
						if (doRedirect) {
							Cookies.set(
								Auth.COOKIE_LOGKEY,
								payload.LogKey || "",
								Auth.COOKIE_OPTS
							);
							// validateCookie({
							// 	doRedirect: false,
							// });
							toLanding({
								reloadAuthorities: true,
							});
						}
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					toast.error(Errors.getMessage("變更密碼失敗", err));
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

	useEffect(() => {
		console.log("state.validating", state.validating);
		if (state.validating === null) {
			validateCookie({
				doRedirect: true,
			});
		}
	}, [state.validating, validateCookie]);

	return {
		...state,
		...authoritiesState,
		// METHODS
		validateCookie,
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
		loadAuthorities,
		// 變更密碼
		promptChanging,
		startChanging,
		failChanging,
		changing,
		onChangeSubmit,
		onChangeSubmitError,
		changePrompting,
		// ...taskListLoader,
	};
};
