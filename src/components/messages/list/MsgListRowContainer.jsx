import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import MsgListRow from "./MsgListRow";
import { MessagingContext } from "../../../contexts/MessagingContext";
import { useCallback } from "react";
import { AppFrameContext } from "../../../shared-contexts/app-frame/AppFrameContext";

export const MsgListRowContainer = (props) => {
	const messaging = useContext(MessagingContext);
	const { handleSelectById } = useContext(AppFrameContext);
	const { isItemLoading, markAsRead, handlePopoverClose } = messaging;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(
		() => messaging.listData[index],
		[messaging.listData, index]
	);

	const handleMarkAsRead = useCallback(() => {
		console.log(`handleMarkAsRead`, value?.MsgID);
		markAsRead(value?.MsgID, true);
	}, [markAsRead, value?.MsgID]);

	const handleGotoJob = useCallback(() => {
		console.log(`handleGotoJob`, value?.JobID);
		handleSelectById(value?.JobID);
	}, [handleSelectById, value?.JobID]);

	return (
		<MsgListRow
			index={index}
			loading={loading}
			value={value}
			handleMarkAsRead={handleMarkAsRead}
			handleGotoJob={handleGotoJob}
			{...rest}
		/>
	);
};
MsgListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
MsgListRowContainer.displayName = "MsgListRowContainer";
