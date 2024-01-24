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
import { DeptSwitchDialogContainer } from "../../components/account/DeptSwitchDialogContainer";
import { useMemo } from "react";

const FrameBanner = memo(
	forwardRef((props, ref) => {
		const { title, alt, children, SearchComponent, ...rest } = props;
		const { mobile } = useContext(ResponsiveContext);

		const centerFlex = useMemo(() => {
			return mobile || !!SearchComponent ? 2 : 1;
		}, [SearchComponent, mobile]);

		return (
			<FlexBox ref={ref} {...rest}>
				<FlexBox
					ml={-2}
					alignItems="center"
					justifyContent="flex-start"
					flex={1}>
					{/* <ResponsiveFrameMenuButton /> */}
					<FrameMenuButtonContainer />
					<ResponsiveFrameTitle alt={alt}>
						{title}
					</ResponsiveFrameTitle>
				</FlexBox>
				<FlexBox alignItems="center" flex={centerFlex} px={2}>
					{children}
					{SearchComponent && <SearchComponent />}
				</FlexBox>

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
						{/* 門市切換 */}
						<DeptSwitchDialogContainer />
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
	SearchComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.elementType,
	]),
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default FrameBanner;
