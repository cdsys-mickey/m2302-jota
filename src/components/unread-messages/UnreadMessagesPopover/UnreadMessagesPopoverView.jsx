import { FrameMenuGroupHeader } from "@/components/FrameMenu/FrameMenuGroupHeader";
import { UnreadMessageListViewContainer } from "@/components/unread-messages/UnreadMessageListViewContainer";
import { ButtonEx } from "@/shared-components";
import { FlexBox } from "shared-components";
import LoadingTypography from "@/shared-components/LoadingTypography";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { Box, Popover } from "@mui/material";
import { blue } from "@mui/material/colors";
import { forwardRef, memo } from "react";

const UnreadMessagesPopoverView = memo(
	forwardRef((props, ref) => {
		const {
			open,
			anchorEl,
			onClose,
			loading,
			// height,
			// width,
			gotoMessages,
			...rest
		} = props;

		// const scrollable = useScrollable({
		// 	height
		// })

		return (
			<Popover
				ref={ref}
				// anchorReference="anchorPosition"
				// anchorPosition={{
				// 	top: 60,
				// 	left: width,
				// }}
				sx={{
					// minWidth: "20em",
					// marginRight: 1,

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
				slotProps={{
					paper: {
						// height: height,
						// width: 400,
					}
				}}
				// PaperProps={{
				// 	height: height,
				// 	maxHeight: 700,
				// 	width: 400,
				// }}
				{...rest}>
				<Box>
					<FrameMenuGroupHeader
						text="待辦項目"
						iconComponent={TaskAltRoundedIcon}
						py={3}
						px={2}
						bgcolor={blue[500]}
					/>
				</Box>
				<Box
					sx={[
						{
							width: 400,
						},
					]}
				>
					<UnreadMessageListViewContainer />
				</Box>
				<Box pt={1}>
					<FlexBox fullWidth mb={1} px={1}>
						{/* 保留 */}
						<FlexBox flex={1} pl={1}>
							{loading && <LoadingTypography />}
						</FlexBox>
						<FlexBox>
							<ButtonEx
								variant="outlined"
								color="info"
								startIcon={<AllInboxIcon />}
								onClick={gotoMessages}>
								前往訊息匣
							</ButtonEx>
						</FlexBox>
					</FlexBox>
				</Box>
			</Popover>
		);
	})
);

UnreadMessagesPopoverView.propTypes = {};

UnreadMessagesPopoverView.displayName = "UnreadMessagesPopoverView";
export default UnreadMessagesPopoverView;
