import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useInfiniteLoader } from "../shared-hooks/useInfiniteLoader";
import { usePopover } from "../shared-hooks/usePopover";
import { useSignalR } from "../shared-hooks/useSignalR";
import { useWebApi } from "../shared-hooks/useWebApi";
import Errors from "../shared-modules/sd-errors";

export const useMessaging = ({ token }) => {
	const { httpGetAsync, httpPutAsync, httpPatchAsync } = useWebApi();

	const popover = usePopover();

	const loader = useInfiniteLoader({
		url: "v1/app/messages",
		bearer: token,
		initialFetchSize: 50,
	});

	const [unreadState, setUnreadState] = useState({
		unreadCount: 0,
		unreadCountError: null,
		unreadCountLoading: null,
	});
	const [recentMessagesState, setRecentMessagesState] = useState({
		recentMessages: null,
		recentMessagesError: null,
		recentMessagesLoading: null,
	});

	const clearRecentMessagesLoading = useCallback(() => {
		setRecentMessagesState((prev) => ({
			...prev,
			recentMessagesLoading: null,
		}));
	}, []);

	const loadUnreadCount = useCallback(async () => {
		console.log("loadUnreadCount");
		setUnreadState((prev) => ({
			...prev,
			unreadCountLoading: true,
		}));
		try {
			const { status, payload, error } = await httpGetAsync({
				url: `v1/app/messages/count`,
				bearer: token,
			});
			if (status.success) {
				setUnreadState((prev) => ({
					...prev,
					unreadCount: payload,
					unreadCountError: null,
				}));
			} else {
				throw error || new Error("發生未預期例外");
			}
		} catch (err) {
			setUnreadState((prev) => ({
				...prev,
				unreadCountError: err,
			}));
		} finally {
			setUnreadState((prev) => ({
				...prev,
				unreadCountLoading: false,
			}));
		}
	}, [httpGetAsync, token]);

	const handlNotify = useCallback(
		(payload) => {
			console.log(`handlNotify`, payload);
			toast.info(`${payload.msgBody}\n - ${payload.sendName}`);
			loadUnreadCount();
			clearRecentMessagesLoading();
		},
		[clearRecentMessagesLoading, loadUnreadCount]
	);

	const onConnected = useCallback(() => {
		loadUnreadCount();
		clearRecentMessagesLoading();
	}, [clearRecentMessagesLoading, loadUnreadCount]);

	const onReconnected = useCallback(() => {
		loadUnreadCount();
		clearRecentMessagesLoading();
	}, [clearRecentMessagesLoading, loadUnreadCount]);

	const { connection, connectionId, connectionState, connect } = useSignalR({
		url: import.meta.env.VITE_URL_MSG_HUB,
		autoConnect: false,
		onConnected: onConnected,
		onReconnected: onReconnected,
	});

	useEffect(() => {
		if (token && connection) {
			connect();
		}
	}, [connect, connection, token]);

	const loadRecentMessages = useCallback(async () => {
		if (!token) {
			throw "token is null";
		}
		setRecentMessagesState((prev) => ({
			...prev,
			recentMessagesLoading: true,
		}));
		try {
			const { status, payload, error } = await httpGetAsync({
				bearer: token,
				url: `v1/app/messages`,
				params: {
					tp: 10,
				},
			});
			if (status.success) {
				setRecentMessagesState((prev) => ({
					...prev,
					recentMessages: payload?.data,
				}));
			} else {
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			console.error(`fetchMessages failed`, err);
			setRecentMessagesState((prev) => ({
				...prev,
				recentMessagesError: err,
			}));
		} finally {
			setRecentMessagesState((prev) => ({
				...prev,
				recentMessagesLoading: false,
			}));
		}
	}, [httpGetAsync, token]);

	const markAsRead = useCallback(
		async (msgId, reload = false) => {
			console.log(`markAsRead`, msgId);
			try {
				const { status, error } = await httpPatchAsync({
					bearer: token,
					url: "v1/app/messages/read",
					data: {
						MsgID: msgId,
					},
				});
				if (status.success) {
					loadUnreadCount();
					clearRecentMessagesLoading();
					if (reload) {
						loader.loadList({
							useLastParams: true,
							disableLoading: true,
						});
					}
				} else {
					throw error || new Error("為預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("標示已讀失敗", err));
			}
		},
		[
			clearRecentMessagesLoading,
			httpPatchAsync,
			loadUnreadCount,
			loader,
			token,
		]
	);

	useEffect(() => {
		connection?.on("notify", handlNotify);
	}, [connection, handlNotify]);

	useEffect(() => {
		const reportConnId = async () => {
			console.log(`registering connection id: ${connectionId}`);
			const { status } = await httpPutAsync({
				url: "v1/auth/register",
				bearer: token,
				data: {
					connectionId,
				},
			});
			if (status.success) {
				console.log(`connectionId ${connectionId} registered`);
			}
		};
		if (connectionId && token) {
			reportConnId();
		}
	}, [connectionId, httpPutAsync, token]);

	return {
		connectionState,
		connection,
		...loader,
		...unreadState,
		loadUnreadCount,
		...recentMessagesState,
		loadRecentMessages,
		...popover,
		markAsRead,
	};
};
