import { FrameMenuGroupHeader } from "@/components/layout/FrameMenuGroupHeader";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import { useScrollable } from "@/shared-hooks/useScrollable";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { Box, Popover } from "@mui/material";
import { blue } from "@mui/material/colors";
import { forwardRef, memo } from "react";
import { TaskListViewContainer } from "@/components/tasks/TaskListViewContainer";

const PushMessagesPopover = memo(
	forwardRef((props, ref) => {
		const {
			open,
			anchorEl,
			onClose,
			loading,
			height,
			width,
			gotoMessages,
			...rest
		} = props;
		const scrollable = useScrollable({
			height,
		});
		return (
			<Popover
				ref={ref}
				// anchorReference="anchorPosition"
				// anchorPosition={{
				// 	top: 60,
				// 	left: width,
				// }}
				sx={
					{
						// minWidth: "20em",
						// marginRight: 1,
					}
				}
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
				PaperProps={{
					height: height,
					width: 400,
				}}
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
				{/* <Box sx={[scrollable.scroller]}>
					<PushMessagesContainer />
				</Box> */}
				<Box
					sx={{
						width: 400,
					}}>
					<TaskListViewContainer />
				</Box>
				<Box pt={1}>
					<FlexBox fullWidth mb={1} px={1}>
						{/* 保留 */}
						<FlexBox flex={1} pl={1}>
							{loading && <LoadingTypography />}
						</FlexBox>
						<FlexBox>
							<ButtonWrapper
								variant="outlined"
								color="info"
								startIcon={<AllInboxIcon />}
								onClick={gotoMessages}>
								前往訊息匣
							</ButtonWrapper>
						</FlexBox>
					</FlexBox>
				</Box>
			</Popover>
		);
	})
);

PushMessagesPopover.propTypes = {};

PushMessagesPopover.displayName = "PushMessagesPopover";
export default PushMessagesPopover;
