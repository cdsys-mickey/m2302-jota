import AllInboxIcon from "@mui/icons-material/AllInbox";
import { memo } from "react";
import PropTypes from "prop-types";
import { PushMessagesContainer } from "./PushMessagesContainer";
import { Box, Popover } from "@mui/material";
import FlexBox from "../../shared-components/FlexBox";
import ButtonEx from "../../shared-components/button/ButtonEx";
import { forwardRef } from "react";
import LoadingTypography from "../../shared-components/LoadingTypography";
import { useScrollable } from "../../shared-hooks/useScrollable";

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
				<Box sx={[scrollable.scroller]}>
					<PushMessagesContainer />
				</Box>
				<Box pt={1}>
					<FlexBox fullWidth mb={1} px={1}>
						{/* 保留 */}
						<FlexBox flex={1} pl={1}>
							{loading && <LoadingTypography />}
						</FlexBox>
						<FlexBox>
							<ButtonEx
								variant="contained"
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

PushMessagesPopover.propTypes = {};

PushMessagesPopover.displayName = "PushMessagesPopover";
export default PushMessagesPopover;
