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

export const useAuth = () => {
	const { toLogin, toLanding } = useAppRedirect();
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

	const loadAuthorities = useCallback(
		async (token) => {
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
							toast.warn(Messages.SESSION_EXPIRED);
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

	const validateCookie = useCallback(
		async (switching = false) => {
			console.log(`validating cookie...`);
			try {
				setState((prev) => ({
					...prev,
					validating: true,
				}));
				// 檢查 cookie
				const logKey = Cookies.get("LogKey");
				if (!logKey) {
					toast.error("您尚未登入");
					toLogin();
					return;
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/auth/token",
				});

				if (!status.success) {
					throw error;
				}

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
				toast.success(
					`${jwtPayload.entity.LoginName || "(帳號)"}/${
						jwtPayload.entity.UserName || ""
					} 已成功${switching ? "切換" : "登入"}到${
						jwtPayload.entity.CurDeptName
					}`
				);

				loadAuthorities(token);
			} catch (err) {
				console.error("token restore failed", err);
				switch (err.status) {
					case 401:
						toast.error("您的登入已逾期，請重新登入");
						break;
					default:
						toast.error("登入發生例外，請重新登入");
						break;
				}
				toLogin();
			} finally {
				setState((prev) => ({
					...prev,
					validating: false,
				}));
			}
		},
		[httpGetAsync, loadAuthorities, toLogin]
	);

	const invalidate = useCallback(() => {
		setState((prev) => ({
			...prev,
			validating: null,
		}));
	}, []);

	const handleSignOut = useCallback(async () => {
		try {
			const { status, error } = await httpGetAsync({
				url: "v1/auth/signout",
				bearer: state.token,
			});
			if (status.success) {
				Cookies.remove("LogKey");
				toLogin();
				toast.success("您已成功登出");
			} else {
				throw error || new Error("登出失敗");
			}
		} catch (err) {
			console.error("handleSignOut.failed", err);
		}
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
					url: `v1/auth/switch-dept/${newDeptId}`,
					bearer: state.token,
				});
				if (status.success) {
					validateCookie(true);
					toLanding();
					deptSwitchAction.clear();
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

	useEffect(() => {
		if (state.validating == null) {
			validateCookie();
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
	};
};
