import AllInboxIcon from "@mui/icons-material/AllInbox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Box, Button, IconButton, Popover, styled } from "@mui/material";
import React, { Fragment } from "react";
import FlexBox from "@/shared-components/FlexBox";
import ListEx from "@/shared-components/list/ListEx";
import PushMessageItem from "./PushMessageItem";
import ButtonEx from "@/shared-components/button/ButtonEx";
import { PushMessageItemContainer } from "./PushMessageItemContainer";

const Messages = styled(ListEx)(({ theme }) => ({
	width: "100%",
	maxWidth: 360,
	minWidth: 200,
	bgcolor: "background.paper",
	"& li": {
		// borderBottom: `1px solid ${grey[200]}`,
	},
}));

const PushMessagesButton = React.forwardRef((props, ref) => {
	const {
		open,
		anchorEl,
		onClose,
		data,
		onGenerateToast,
		togglePopoverOpen,
		...rest
	} = props;
	return (
		<Fragment>
			<IconButton onClick={togglePopoverOpen}>
				<Badge color="secondary" badgeContent={3}>
					<NotificationsIcon />
				</Badge>
			</IconButton>
			<Popover
				ref={ref}
				id="mouse-over-popover"
				sx={{
					minWidth: "20em",
				}}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				onClose={onClose}
				// disableRestoreFocus
				{...rest}>
				<Box>
					<Messages>
						{data?.map((m) => (
							<PushMessageItemContainer key={m.id} {...m} />
						))}
					</Messages>

					<FlexBox fullWidth mb={1} px={1}>
						<FlexBox flex={1}>
							<ButtonEx
								variant="contained"
								color="neutral"
								onClick={onGenerateToast}>
								推播測試
							</ButtonEx>
						</FlexBox>
						<FlexBox>
							<ButtonEx
								variant="contained"
								startIcon={<AllInboxIcon />}>
								前往訊息匣
							</ButtonEx>
						</FlexBox>
					</FlexBox>
				</Box>
			</Popover>
		</Fragment>
	);
});

export default React.memo(PushMessagesButton);
