import { PushMessagesButtonContainer } from "@/components/push-messages/PushMessagesButtonContainer";
import FlexBox from "@/shared-components/FlexBox";
import { Stack } from "@mui/material";
import { forwardRef, memo } from "react";
import ResponsiveFrameTitle from "../responsive/ResponsiveFrameTitle";
// import ResponsiveFrameMenuButton from "./ResponsiveFrameMenuButton";
import AvatarButtonContainer from "@/shared-components/avatar-button/AvatarButtonContainer";
import FrameMenuButtonContainer from "./FrameMenuButtonContainer";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ResponsiveContext } from "../../shared-contexts/responsive/ResponsiveContext";

const FrameBanner = memo(
	forwardRef((props, ref) => {
		const { title, alt, children, ...rest } = props;
		const { mobile } = useContext(ResponsiveContext);
		const SearchComponent = children;

		return (
			<FlexBox ref={ref} {...rest}>
				<FlexBox
					ml={-2}
					alignItems="center"
					justifyContent="flex-start"
					flex={SearchComponent ? 1 : 2}>
					{/* <ResponsiveFrameMenuButton /> */}
					<FrameMenuButtonContainer />
					<ResponsiveFrameTitle alt={alt}>
						{title}
					</ResponsiveFrameTitle>
				</FlexBox>

				{SearchComponent ? (
					<FlexBox alignItems="center" flex={mobile ? 2 : 1} px={2}>
						<SearchComponent />
					</FlexBox>
				) : null}

				<FlexBox
					alignItems="center"
					justifyContent="flex-end"
					flex={1}
					mr={-2}>
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
FrameBanner.propTypes = {
	title: PropTypes.string,
	alt: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
};

export default FrameBanner;
