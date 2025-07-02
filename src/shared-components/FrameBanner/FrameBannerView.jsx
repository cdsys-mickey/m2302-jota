import { DeptSwitchButton, FrameTitle } from "@/components";
import { DeptSwitchDialogContainer } from "@/components/account/DeptSwitchDialogContainer";
import { PushMessagesIconButtonContainer } from "@/components/push-messages/PushMessagesIconButtonContainer";
import { PushMessagesPopoverContainer } from "@/components/push-messages/PushMessagesPopoverContainer";
import FlexBox from "@/shared-components/FlexBox";
import AvatarButtonContainer from "@/shared-components/protected-page/AvatarButtonContainer";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";

const FrameBannerView = memo(
	forwardRef((props, ref) => {
		const { title, alt, children, SearchComponent, dense, ...rest } = props;

		const showSearchComponent = useMemo(() => {
			return children || !!SearchComponent;
		}, [SearchComponent, children]);

		const centerFlex = useMemo(() => {
			return dense || !!SearchComponent ? 2 : 1;
		}, [SearchComponent, dense]);

		const leftFlex = useMemo(() => {
			return showSearchComponent ? 1.1 : 2;
		}, [showSearchComponent]);

		return (
			<FlexBox ref={ref} {...rest}>
				<FlexBox

					flex={leftFlex}>

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
						alignItems="center"
						sx={{ color: "action.active" }}>
						{/* 通知 */}
						{/* <ZZPushMessagesButtonContainer /> */}

						{/* 通知按鈕 */}
						<PushMessagesIconButtonContainer />

						{/* 通知小視窗 */}
						<PushMessagesPopoverContainer />

						{/* 切換單位 */}
						{!dense && (<DeptSwitchButton
							// size="small"
							variant="standard"
							dense
						/>)}


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

FrameBannerView.displayName = "FrameBannerView";
FrameBannerView.propTypes = {
	title: PropTypes.string,
	alt: PropTypes.string,
	dense: PropTypes.bool,
	SearchComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.elementType,
	]),
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default FrameBannerView;
