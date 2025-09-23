import { useCallback, useState, useMemo } from "react";
import { useHistory } from "react-router";
import LoadingState from "@/shared-constants/loading-states";

export const useRouteAction = (props) => {
	const {
		handleRedirect,
		handleAction,
		permalink = false,
		routeActions,
		// actionState,
		// setActionState,
	} = props;
	const history = useHistory();

	const [actionState, setActionState] = useState({
		// prevAction: null,
		action: null,
		actionLoading: null,
		actionTarget: null,
		actionError: null,
	});

	const [prevAction, setPrevAction] = useState();

	const contextParam = useMemo(
		() => ({
			actionState,
			setActionState,
			history,
		}),
		[actionState, history]
	);

	const handleCancel = useCallback(() => {
		setActionState({
			action: null,
			actionTarget: null,
			actionLoading: null,
		});
	}, [setActionState]);

	const handleBack = useCallback(() => {
		setActionState((prevState) => ({
			action: prevAction,
			// actionTarget: null,
			actionLoading: LoadingState.DONE,
		}));
	}, [prevAction]);

	const backAction = useCallback(() => {
		if (!prevAction) {
			throw new Error("prevAction is null!");
		}
		if (permalink) {
			if (!handleRedirect) {
				throw new Error("handleRedirect is not defined");
			}
			handleRedirect(
				prevAction,
				actionState.actionTarget?.id,
				contextParam
			);
		} else {
			handleBack();
		}
	}, [
		actionState.actionTarget?.id,
		contextParam,
		handleBack,
		handleRedirect,
		permalink,
		prevAction,
	]);

	const onAction = useCallback(
		async (action, actionTarget) => {
			setPrevAction(actionState.action);
			if (permalink) {
				if (!handleRedirect) {
					throw new Error("handleRedirect is not defined");
				}
				handleRedirect(action, actionTarget?.id, contextParam);
			} else {
				if (!handleAction) {
					throw new Error("handleAction is not defined");
				}
				handleAction(action, actionTarget, contextParam);
			}
		},
		[
			actionState.action,
			contextParam,
			handleAction,
			handleRedirect,
			permalink,
		]
	);

	const triggerAction = useCallback(
		(newAction, targetId) => {
			if (targetId && routeActions && routeActions.length > 0) {
				const action = routeActions.find(
					(s) => s.description.toLowerCase() === newAction
				);
				// 若尚未動作或是已完成動作但與新動作不同, 才觸發新動作
				if (
					action &&
					(!actionState.actionLoading ||
						(actionState.actionLoading === LoadingState.DONE &&
							actionState.action !== action))
				) {
					handleAction(
						action,
						{
							id: targetId,
						},
						contextParam
					);
				}
			} else {
				if (actionState.action) {
					handleCancel();
				}
			}
		},
		[
			actionState.action,
			actionState.actionLoading,
			contextParam,
			handleAction,
			handleCancel,
			routeActions,
		]
	);

	const cancelAction = useCallback(() => {
		setPrevAction(null);
		if (permalink) {
			if (!handleRedirect) {
				throw new Error("handleRedirect is not defined");
			}
			handleRedirect(null, null, contextParam);
		} else {
			handleCancel();
		}
	}, [contextParam, handleCancel, handleRedirect, permalink]);

	return {
		...actionState,
		setActionState,
		onAction,
		cancelAction,
		backAction,
		triggerAction,
	};
};
