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
import PushMessageListItemSecondaryAction from "./PushMessageListItemSecondaryAction";
import { format, parse } from "date-fns";
import DateTimes from "../../shared-modules/sd-date-times";

const PushMessageListItem = memo(
	forwardRef((props, ref) => {
		const {
			handleGotoJob,
			handleMarkAsRead,
			message,
			disabled,
			unread,
			...rest
		} = props;
		const title = useMemo(() => {
			return disabled
				? `本作業屬於 ${message.AbbrName}, 請先切換單位`
				: `前往 ${message?.JobID} 作業`;
		}, [disabled, message.AbbrName, message?.JobID]);

		const timestamp = useMemo(() => {
			const date = parse(
				message?.SendTime,
				DateTimes.DATEFNS_DATETIME_SECONDS,
				new Date()
			);
			return format(date, DateTimes.DATEFNS_MMDD_HHMMSS);
		}, [message?.SendTime]);

		const secondary = useMemo(() => {
			return `來自 ${message.SendName || "(未知)"} 給 ${
				message?.AbbrName
			}, ${timestamp}`;
		}, [message?.AbbrName, message.SendName, timestamp]);

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
					}}>
					<ListItemIcon sx={{ paddingTop: 1 }}>
						{message?.JobID && (
							<Tooltip title={title}>
								<Button
									variant="contained"
									// disabled={disabled}
									size="small"
									color="primary"
									onClick={disabled ? null : handleGotoJob}>
									{message?.JobID}
								</Button>
							</Tooltip>
						)}
					</ListItemIcon>
					<ListItemText
						primary={message?.MsgBody}
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
				<PushMessageListItemSecondaryAction
					pt={1}
					onMarkAsRead={unread ? handleMarkAsRead : null}
				/>
				<Divider variant="middle" />
			</HoverableListItem>
		);
	})
);
PushMessageListItem.propTypes = {
	handleGotoJob: PropTypes.func,
	handleMarkAsRead: PropTypes.func,
	text: PropTypes.string,
	JobID: PropTypes.string,
	unread: PropTypes.bool,
	message: PropTypes.object,
	disabled: PropTypes.bool,
};
PushMessageListItem.displayName = "PushMessageListItem";
export default PushMessageListItem;
