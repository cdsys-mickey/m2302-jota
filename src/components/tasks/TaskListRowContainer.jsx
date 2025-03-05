import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import TaskListRow from "./TaskListRow";
import { MessagingContext } from "@/contexts/messaging/MessagingContext";
import { PushMessagesContext } from "@/contexts/PushMessagesContext";
import { AuthContext } from "@/contexts/auth/AuthContext";

export const TaskListRowContainer = (props) => {
	const auth = useContext(AuthContext);
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

	const linkEnabled = useMemo(() => {
		return auth.operator?.CurDeptID === value?.DeptID;
	}, [auth.operator?.CurDeptID, value?.DeptID])

	return (
		<TaskListRow
			index={index}
			loading={loading}
			value={value}
			handleGotoJob={() => messaging.handleGotoJob(value)}
			linkEnabled={linkEnabled}
			{...rest}
		/>
	);
};
TaskListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
TaskListRowContainer.displayName = "TaskListRowContainer";
