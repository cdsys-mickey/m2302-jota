import { memo } from "react";
import PropTypes from "prop-types";
import { Box, List } from "@mui/material";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { PushMessageListItemContainer } from "./PushMessageListItemContainer";

const PushMessageList = memo((props) => {
	const { children, sx = [], ...rest } = props;
	return (
		<List
			sx={[
				{
					paddingTop: 0,
					width: 400,
					// width: "100%",
					// maxWidth: 400,
					// minWidth: 300,
					bgcolor: "background.paper",
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...rest}>
			{children}
		</List>
	);
});
PushMessageList.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
PushMessageList.displayName = "PushMessageList";

const UnreadMessages = memo((props) => {
	const { loading, data, ...rest } = props;
	if (loading && (!data || data.length === 0)) {
		return (
			<PushMessageList>
				<Box m={1}>
					<LoadingTypography>讀取中...</LoadingTypography>
				</Box>
			</PushMessageList>
		);
	}
	return (
		<PushMessageList>
			{data?.map((m) => (
				<PushMessageListItemContainer
					key={m.MsgID}
					message={m}
				/>
			))}
		</PushMessageList>
	);
});

UnreadMessages.propTypes = {
	data: PropTypes.array,
	loading: PropTypes.bool,
};

UnreadMessages.displayName = "PushMessages";
export default UnreadMessages;
