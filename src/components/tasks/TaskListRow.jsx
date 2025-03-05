import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import TaskJobColumn from "./columns/TaskJobColumn";
import TaskMessageColumn from "./columns/TaskMessageColumn";
import TaskDeptColumn from "./columns/TaskDeptColumn";
import { useMemo } from "react";

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
	const { index, style, value, loading, handleGotoJob, linkEnabled } = props;

	const _title = useMemo(() => {
		return !linkEnabled ? "請先切換門市後再操作" : `前往 ${value?.JobID} 作業`;
	}, [linkEnabled, value?.JobID]);

	return (
		<div style={style}>
			<HoverableListItem borderBottom hideCursor>
				<Grid
					container
					columns={24}
					sx={[
						{
							minHeight: "36px",
							alignItems: "center",
						},
					]}>
					{/* <IndexColumn title={index}></IndexColumn> */}
					<TaskJobColumn>
						{value?.JobID && (
							<Tooltip
								title={_title}
								arrow
								placement="right-start">
								<ButtonWrapper onClick={handleGotoJob} >
									{value?.JobID}
								</ButtonWrapper>
							</Tooltip>
						)}
					</TaskJobColumn>
					<TaskDeptColumn >
						<Typography variant="body2" color="success.main">
							{value?.AbbrName}
						</Typography>
					</TaskDeptColumn>
					<TaskMessageColumn>
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
	linkEnabled: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	handleMarkAsRead: PropTypes.func,
	handleGotoJob: PropTypes.func,
};

TaskListRow.displayName = "TaskListRow";
export default TaskListRow;
