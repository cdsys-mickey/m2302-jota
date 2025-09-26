
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, IconButton } from "@mui/material";
import { Fragment, forwardRef, memo } from "react";

const UnreadMessagesIconButton = memo(
	forwardRef((props, ref) => {
		const { onGenerateToast, togglePopoverOpen, unreadCount, ...rest } =
			props;
		return (
			<Fragment>
				<IconButton onClick={togglePopoverOpen}>
					<Badge color="secondary" badgeContent={unreadCount}>
						<NotificationsIcon />
					</Badge>
				</IconButton>
			</Fragment>
		);
	})
);

UnreadMessagesIconButton.displayName = "UnreadMessagesIconButton";
export default UnreadMessagesIconButton;
