import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import TaskJobColumn from "./columns/TaskJobColumn";
import TaskMessageColumn from "./columns/TaskMessageColumn";

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

const TaskListRow = memo((props) => {
	const { index, style, value, loading, handleGotoJob } = props;

	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={handleGotoJob}>
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
					<TaskJobColumn>
						{value?.JobID && (
							<ButtonWrapper onClick={handleGotoJob}>
								{value?.JobID}
							</ButtonWrapper>
						)}
					</TaskJobColumn>
					<TaskMessageColumn loading={loading}>
						<Typography variant="body2">
							{value?.MsgBody}
						</Typography>
					</TaskMessageColumn>
				</Grid>
			</HoverableListItem>
		</div>
	);
});

TaskListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	handleMarkAsRead: PropTypes.func,
	handleGotoJob: PropTypes.func,
};

TaskListRow.displayName = "TaskListRow";
export default TaskListRow;
