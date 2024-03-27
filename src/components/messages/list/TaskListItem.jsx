import HoverableListItem from "@/shared-components/HoverableListItem";
import {
	Button,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";

import { format, parse } from "date-fns";
import DateTimes from "../../shared-modules/sd-date-times";
import { grey } from "@mui/material/colors";

const TaskListItem = memo(
	forwardRef((props, ref) => {
		const { handleGotoJob, value, disabled, unread, ...rest } = props;
		const title = useMemo(() => {
			return disabled
				? `本作業屬於 ${value.AbbrName}, 請先切換單位`
				: `前往 ${value?.JobID} 作業`;
		}, [disabled, value.AbbrName, value?.JobID]);

		const timestamp = useMemo(() => {
			const date = parse(
				value?.SendTime,
				DateTimes.DATEFNS_DATETIME_SECONDS,
				new Date()
			);
			return format(date, DateTimes.DATEFNS_MMDD_HHMMSS);
		}, [value?.SendTime]);

		const secondary = useMemo(() => {
			return `來自 ${value.SendName || "(未知)"} 給 ${
				value?.AbbrName
			}, ${timestamp}`;
		}, [value?.AbbrName, value.SendName, timestamp]);

		return (
			<HoverableListItem ref={ref} {...rest}>
				<ListItem
					sx={{
						paddingRight: 6,
						display: "flex",
						alignItems: "flex-start",
						paddingLeft: 1,
						paddingTop: 0,
						paddingBottom: 0,
						...(!unread && {
							backgroundColor: grey[100],
						}),
					}}>
					<ListItemIcon sx={{ paddingTop: 1 }}>
						{value?.JobID && (
							<Tooltip title={title}>
								<Button
									// variant="contained"
									// disabled={disabled}
									size="small"
									color="primary"
									onClick={disabled ? null : handleGotoJob}>
									{value?.JobID}
								</Button>
							</Tooltip>
						)}
					</ListItemIcon>
					<ListItemText
						primary={value?.MsgBody}
						secondary={secondary}
						primaryTypographyProps={{
							...(unread && {
								fontWeight: 600,
							}),
						}}
						sx={{
							marginLeft: 1,
						}}
					/>
				</ListItem>
				{/* <PushMessageListItemSecondaryAction
					pt={1}
					onMarkAsRead={unread ? handleMarkAsRead : null}
				/> */}
				<Divider variant="middle" />
			</HoverableListItem>
		);
	})
);
TaskListItem.propTypes = {
	handleGotoJob: PropTypes.func,
	handleMarkAsRead: PropTypes.func,
	text: PropTypes.string,
	JobID: PropTypes.string,
	unread: PropTypes.bool,
	value: PropTypes.object,
	disabled: PropTypes.bool,
};
TaskListItem.displayName = "TaskListItem";
export default TaskListItem;
