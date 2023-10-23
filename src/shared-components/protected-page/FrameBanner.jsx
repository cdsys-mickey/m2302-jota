import { PushMessagesButtonContainer } from "@/components/push-messages/PushMessagesButtonContainer";
import FlexBox from "@/shared-components/FlexBox";
import { Stack } from "@mui/material";
import { forwardRef, memo } from "react";
import ResponsiveFrameTitle from "../responsive/ResponsiveFrameTitle";
// import ResponsiveFrameMenuButton from "./ResponsiveFrameMenuButton";
import AvatarButtonContainer from "@/shared-components/avatar-button/AvatarButtonContainer";
import FrameMenuButtonContainer from "./FrameMenuButtonContainer";

const FrameBanner = memo(
	forwardRef((props, ref) => {
		const { title, alt, SearchFormComponent, ...rest } = props;

		return (
			<FlexBox ref={ref} {...rest}>
				<FlexBox
					ml={2}
					alignItems="center"
					justifyContent="flex-start"
					flex={1}>
					{/* <ResponsiveFrameMenuButton /> */}
					<FrameMenuButtonContainer />
					<ResponsiveFrameTitle alt={alt}>
						{title}
					</ResponsiveFrameTitle>
				</FlexBox>
				<FlexBox alignItems="center" flex={2} px={2}>
					{SearchFormComponent && <SearchFormComponent />}
				</FlexBox>
				<FlexBox
					alignItems="center"
					justifyContent="flex-end"
					flex={1}
					mr={1}>
					<Stack
						spacing={1}
						direction="row"
						alignItems="flex-end"
						sx={{ color: "action.active" }}>
						{/* 通知 */}
						<PushMessagesButtonContainer />
						{/* 帳號 */}
						<AvatarButtonContainer />
					</Stack>
				</FlexBox>
			</FlexBox>
		);
	})
);

FrameBanner.displayName = "FrameBanner";

export default FrameBanner;
