import FlexBox from "@/shared-components/FlexBox";
import { Stack } from "@mui/material";
import { forwardRef, memo } from "react";
import AvatarButtonContainer from "@/shared-components/avatar-button/AvatarButtonContainer";
import FrameMenuButtonContainer from "./FrameMenuButtonContainer";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ResponsiveContext } from "@/shared-contexts/responsive/ResponsiveContext";
import { DeptSwitchDialogContainer } from "@/components/account/DeptSwitchDialogContainer";
import { useMemo } from "react";
import { PushMessagesIconButtonContainer } from "@/components/push-messages/PushMessagesIconButtonContainer";
import { PushMessagesPopoverContainer } from "@/components/push-messages/PushMessagesPopoverContainer";
import FrameTitle from "./FrameTitle";

const FrameBanner = memo(
	forwardRef((props, ref) => {
		const { title, alt, children, SearchComponent, ...rest } = props;
		const { mobile } = useContext(ResponsiveContext);

		const showSearchComponent = useMemo(() => {
			return children || !!SearchComponent;
		}, [SearchComponent, children]);

		const centerFlex = useMemo(() => {
			return mobile || !!SearchComponent ? 2 : 1;
		}, [SearchComponent, mobile]);

		const leftFlex = useMemo(() => {
			return showSearchComponent ? 1 : 2;
		}, [showSearchComponent]);

		return (
			<FlexBox ref={ref} {...rest}>
				<FlexBox
					ml={-3}
					alignItems="center"
					justifyContent="flex-start"
					flex={leftFlex}>
					{/* <ResponsiveFrameMenuButton /> */}
					<FrameMenuButtonContainer />
					<FrameTitle>{title}</FrameTitle>
				</FlexBox>
				<FlexBox alignItems="center" flex={centerFlex} px={2}>
					{children}
					{SearchComponent && <SearchComponent />}
				</FlexBox>

				<FlexBox
					alignItems="center"
					justifyContent="flex-end"
					flex={1}
					mr={-3}>
					<Stack
						spacing={1}
						direction="row"
						alignItems="flex-end"
						sx={{ color: "action.active" }}>
						{/* 通知 */}
						{/* <ZZPushMessagesButtonContainer /> */}

						{/* 通知按鈕 */}
						<PushMessagesIconButtonContainer />

						{/* 通知小視窗 */}
						<PushMessagesPopoverContainer />

						{/* 帳號 */}
						<AvatarButtonContainer
							edge="end"
						/>
					</Stack>
					{/* 門市切換 */}
					<DeptSwitchDialogContainer />
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
