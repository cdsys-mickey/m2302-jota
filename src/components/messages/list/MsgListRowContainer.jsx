import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import MsgListRow from "./MsgListRow";
import { MessagingContext } from "../../../contexts/MessagingContext";
import { useCallback } from "react";
import { AppFrameContext } from "../../../shared-contexts/app-frame/AppFrameContext";

export const MsgListRowContainer = (props) => {
	const messaging = useContext(MessagingContext);
	// const { selectJobById } = useContext(AppFrameContext);
	const { index, ...rest } = props;
	// const { isItemLoading } = messaging;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(
		() => messaging.listData[index],
		[messaging.listData, index]
	);
	const loading = useMemo(() => !value, [value]);

	// const handleGotoJob = useCallback(() => {
	// 	console.log(`handleGotoJob`, value?.JobID);
	// 	selectJobById(value?.JobID, {
	// 		id: value?.ID,
	// 	});
	// }, [selectJobById, value?.ID, value?.JobID]);

	return (
		<MsgListRow
			index={index}
			loading={loading}
			value={value}
			handleGotoJob={() => messaging.handleGotoJob(value)}
			{...rest}
		/>
	);
};
MsgListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
MsgListRowContainer.displayName = "MsgListRowContainer";
