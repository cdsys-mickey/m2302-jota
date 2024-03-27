import { useContext } from "react";
import PushMessageListItem from "./PushMessageListItem";
import { AppFrameContext } from "../../shared-contexts/app-frame/AppFrameContext";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useCallback } from "react";
import { MessagingContext } from "../../contexts/MessagingContext";

export const PushMessageListItemContainer = (props) => {
	const { message, ...rest } = props;
	const { operator } = useContext(AuthContext);
	const { selectJobById } = useContext(AppFrameContext);
	const { handlePopoverClose, markAsRead } = useContext(MessagingContext);

	const unread = useMemo(() => {
		return message.Unread === 0;
	}, [message.Unread]);

	const disabled = useMemo(() => {
		return !message?.JobID || message?.DeptID !== operator.CurDeptID;
	}, [message?.DeptID, message?.JobID, operator.CurDeptID]);

	const handleGotoJob = useCallback(() => {
		handlePopoverClose();
		selectJobById(message?.JobID);
	}, [handlePopoverClose, selectJobById, message?.JobID]);

	const handleMarkAsRead = useCallback(() => {
		console.log(`handleMarkAsRead`, message?.MsgID);
		markAsRead(message?.MsgID);
	}, [markAsRead, message?.MsgID]);

	return (
		<PushMessageListItem
			message={message}
			disabled={disabled}
			unread={unread}
			handleGotoJob={handleGotoJob}
			handleMarkAsRead={handleMarkAsRead}
			{...rest}
		/>
	);
};
PushMessageListItemContainer.propTypes = {
	message: PropTypes.object,
};
PushMessageListItemContainer.displayName = "PushMessageListItemContainer";
