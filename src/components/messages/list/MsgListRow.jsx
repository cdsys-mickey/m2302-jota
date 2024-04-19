import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import ChipEx from "../../../shared-components/ChipEx";
import ButtonEx from "../../../shared-components/button/ButtonEx";
import MsgIDColumn from "../columns/MsgIDColumn";
import MsgJobColumn from "../columns/MsgJobColumn";
import MsgNameColumn from "../columns/MsgNameColumn";
import MsgNewColumn from "../columns/MsgNewColumn";
import MsgTimeColumn from "../columns/MsgTimeColumn";
import { ButtonWrapper } from "../../../shared-components/button/ButtonWrapper";

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
	const { index, style, value, loading, handleGotoJob } = props;
	const unread = useMemo(() => {
		return !value?.RecdTime;
	}, [value?.RecdTime]);

	const memoisedTitle = useMemo(() => {
		return `前往 ${value?.JobID} 作業`;
	}, [value?.JobID]);

	return (
		<div style={style}>
			<HoverableListItem borderBottom>
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
						{unread && (
							<ChipEx
								severity="warning"
								size="small"
								label="待辦"
							/>
						)}
					</MsgNewColumn>
					<MsgIDColumn loading={loading}>
						<UnreadTypography unread={unread}>
							{value?.SendName}
						</UnreadTypography>
					</MsgIDColumn>
					<MsgJobColumn>
						{value?.JobID && (
							<Tooltip
								title={memoisedTitle}
								arrow
								placement="right-start">
								<ButtonWrapper onClick={handleGotoJob}>
									{value?.JobID}
								</ButtonWrapper>
							</Tooltip>
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
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	handleMarkAsRead: PropTypes.func,
	handleGotoJob: PropTypes.func,
};

MsgListRow.displayName = "MsgListRow";
export default MsgListRow;
