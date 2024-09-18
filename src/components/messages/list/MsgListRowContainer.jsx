import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { MessagesContext } from "@/contexts/msgs/MessagesContext";
import MsgListRow from "./MsgListRow";

export const MsgListRowContainer = (props) => {
	// const messaging = useContext(MessagingContext);
	const msgs = useContext(MessagesContext);
	// const { selectJobById } = useContext(AppFrameContext);
	const { index, ...rest } = props;
	// const { isItemLoading } = messaging;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(
		() => msgs.listData[index],
		[msgs.listData, index]
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
			handleGotoJob={() => msgs.handleGotoJob(value)}
			{...rest}
		/>
	);
};
MsgListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
MsgListRowContainer.displayName = "MsgListRowContainer";
