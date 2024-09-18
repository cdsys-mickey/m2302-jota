import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import TaskListRow from "./TaskListRow";
import { MessagingContext } from "../../../../contexts/messaging/MessagingContext";
import { useCallback } from "react";
import { AppFrameContext } from "../../../../shared-contexts/app-frame/AppFrameContext";
import { AuthContext } from "../../../../contexts/auth/AuthContext";
import { PushMessagesContext } from "../../../../contexts/PushMessagesContext";

export const TaskListRowContainer = (props) => {
	// const auth = useContext(AuthContext);
	// const { selectJobById } = useContext(AppFrameContext);
	const messaging = useContext(MessagingContext);
	// const { handlePopoverClose } = messaging;
	const { index, ...rest } = props;
	// const { isItemLoading } = auth;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);

	// const value = useMemo(() => auth.listData[index], [auth.listData, index]);
	const pushMessages = useContext(PushMessagesContext);
	const value = useMemo(
		() => pushMessages.listData[index],
		[pushMessages.listData, index]
	);
	const loading = useMemo(() => !value, [value]);

	// const handleGotoJob = useCallback(() => {
	// 	console.log(`handleGotoJob`, value?.JobID);
	// 	handlePopoverClose();
	// 	selectJobById(value?.JobID, {
	// 		id: value?.ID,
	// 	});
	// }, [handlePopoverClose, selectJobById, value?.ID, value?.JobID]);

	return (
		<TaskListRow
			index={index}
			loading={loading}
			value={value}
			handleGotoJob={() => messaging.handleGotoJob(value)}
			{...rest}
		/>
	);
};
TaskListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
TaskListRowContainer.displayName = "TaskListRowContainer";
