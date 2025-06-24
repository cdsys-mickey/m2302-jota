import { ButtonEx } from "@/shared-components";
import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Grid, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import MsgDeptColumn from "../columns/MsgDeptColumn";
import MsgIDColumn from "../columns/MsgIDColumn";
import MsgJobColumn from "../columns/MsgJobColumn";
import MsgNameColumn from "../columns/MsgNameColumn";
import MsgNewColumn from "../columns/MsgNewColumn";
import MsgTimeColumn from "../columns/MsgTimeColumn";

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
	const { index, style, value, loading, handleGotoJob, linkEnabled } = props;
	const unread = useMemo(() => {
		return !value?.RecdTime;
	}, [value?.RecdTime]);

	const _title = useMemo(() => {
		return !linkEnabled ? "請先切換門市後再操作" : `前往 ${value?.JobID} 作業`;
	}, [linkEnabled, value?.JobID]);

	return (
		<div style={style}>
			<HoverableListItem transparent borderBottom>
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

					<MsgNewColumn loading={loading}>
						{unread ? (
							<RadioButtonUncheckedIcon
								fontSize="small"
								color="warning"
							/>
						) : (
							<CheckCircleIcon
								fontSize="small"
								color="success"
							/>
						)}
					</MsgNewColumn>
					<MsgDeptColumn >
						<UnreadTypography unread={unread}>
							{value?.AbbrName}
						</UnreadTypography>
					</MsgDeptColumn>
					<MsgJobColumn>
						{value?.JobID && (
							<Tooltip
								title={_title}
								arrow
								placement="right-start">
								<ButtonEx onClick={handleGotoJob}>
									{value?.JobID}
								</ButtonEx>
							</Tooltip>
						)}
					</MsgJobColumn>
					<MsgIDColumn loading={loading}>
						<UnreadTypography unread={unread}>
							{value?.SendName}
						</UnreadTypography>
					</MsgIDColumn>
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
				{/* <PushMessageListItemSecondaryAction
					onMarkAsRead={unread ? handleMarkAsRead : null}
				/> */}
			</HoverableListItem>
		</div>
	);
});

MsgListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	linkEnabled: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	handleMarkAsRead: PropTypes.func,
	handleGotoJob: PropTypes.func,
};

MsgListRow.displayName = "MsgListRow";
export default MsgListRow;
