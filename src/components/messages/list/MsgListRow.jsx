import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import MsgIDColumn from "../columns/MsgIDColumn";
import MsgNameColumn from "../columns/MsgNameColumn";
import MsgTimeColumn from "../columns/MsgTimeColumn";
import { useMemo } from "react";
import PushMessageListItemSecondaryAction from "../../push-messages/PushMessageListItemSecondaryAction";
import ButtonEx from "../../../shared-components/button/ButtonEx";
import MsgJobColumn from "../columns/MsgJobColumn";

const UnreadTypography = (props) => {
	const { children, unread, ...rest } = props;
	return (
		<Typography
			variant="body2"
			color={unread ? "text.primary" : "text.secondary"}
			sx={{
				...(unread && {
					fontWeight: 600,
				}),
			}}
			{...rest}>
			{children}
		</Typography>
	);
};
UnreadTypography.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	unread: PropTypes.bool,
};

const MsgListRow = memo((props) => {
	const {
		index,
		style,
		value,
		loading,
		onClick,
		handleMarkAsRead,
		handleGotoJob,
	} = props;
	const unread = useMemo(() => {
		return value?.Unread === 0;
	}, [value?.Unread]);

	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}>
				<Grid
					container
					columns={24}
					sx={[
						{
							minHeight: "36px",
							alignItems: "center",
						},
					]}>
					<IndexColumn title={index}></IndexColumn>
					<MsgIDColumn loading={loading}>
						<UnreadTypography unread={unread}>
							{value?.SendName}
						</UnreadTypography>
					</MsgIDColumn>
					<MsgJobColumn>
						{value?.JobID && (
							<ButtonEx size="small" onClick={handleGotoJob}>
								{value?.JobID}
							</ButtonEx>
						)}
					</MsgJobColumn>
					<MsgNameColumn loading={loading}>
						<UnreadTypography unread={unread}>
							{value?.MsgBody}
						</UnreadTypography>
					</MsgNameColumn>
					<MsgTimeColumn loading={loading}>
						<UnreadTypography unread={unread}>
							{value?.SendTime}
						</UnreadTypography>
					</MsgTimeColumn>
				</Grid>
				<PushMessageListItemSecondaryAction
					onMarkAsRead={unread ? handleMarkAsRead : null}
				/>
			</HoverableListItem>
		</div>
	);
});

MsgListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	handleMarkAsRead: PropTypes.func,
};

MsgListRow.displayName = "MsgListRow";
export default MsgListRow;
