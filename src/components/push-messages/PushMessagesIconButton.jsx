import FlexBox from "@/shared-components/FlexBox";
import ButtonExView from "@/shared-components/button/ButtonExView";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Box, IconButton, Popover } from "@mui/material";
import React, { Fragment, forwardRef, memo } from "react";
import { PushMessagesContainer } from "./PushMessagesContainer";

const PushMessagesIconButton = memo(
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

PushMessagesIconButton.displayName = "PushMessagesIconButton";
export default PushMessagesIconButton;
