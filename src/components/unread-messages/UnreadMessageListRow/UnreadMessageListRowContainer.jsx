import { AuthContext } from "@/contexts/auth/AuthContext";
import { UnreadMessagesContext } from "@/contexts/UnreadMessagesContext";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import UnreadMessageListRowView from "./UnreadMessageListRowView";

export const UnreadMessageListRowContainer = (props) => {
	const auth = useContext(AuthContext);
	const unreadMessages = useContext(UnreadMessagesContext);
	const { index, ...rest } = props;

	// const value = useMemo(() => auth.listData[index], [auth.listData, index]);
	const pushMessages = useContext(UnreadMessagesContext);
	const value = useMemo(
		() => pushMessages.listData[index],
		[pushMessages.listData, index]
	);
	const loading = useMemo(() => !value, [value]);

	const linkEnabled = useMemo(() => {
		return auth.operator?.CurDeptID === value?.DeptID;
	}, [auth.operator?.CurDeptID, value?.DeptID])

	return (
		<UnreadMessageListRowView
			index={index}
			loading={loading}
			value={value}
			handleGotoJob={() => unreadMessages.handleGotoJob(value)}
			linkEnabled={linkEnabled}
			{...rest}
		/>
	);
};
UnreadMessageListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
UnreadMessageListRowContainer.displayName = "TaskListRowContainer";
