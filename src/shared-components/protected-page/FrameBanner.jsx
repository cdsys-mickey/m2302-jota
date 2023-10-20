import { PushMessagesButtonContainer } from "@/components/push-messages/PushMessagesButtonContainer";
import { AccountMenuButtonContainer } from "@/mock-components/account/AccountMenuButtonContainer";
import FlexBox from "@/shared-components/FlexBox";
import { Stack } from "@mui/material";
import { forwardRef, memo } from "react";
import ResponsiveFrameTitle from "../responsive/ResponsiveFrameTitle";
import ResponsiveMenuButton from "./ResponsiveMenuButton";

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
					<ResponsiveMenuButton />
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
						<PushMessagesButtonContainer />

						{/* <Tooltip title="王XX">
						<IconButton onClick={handleAccountClick}>
							<Avatar sx={{ width: 32, height: 32 }}>王</Avatar>
						</IconButton>
					</Tooltip>
					<MockAccountMenu
						open={!!accountAnchorEl}
						anchorEl={accountAnchorEl}
						onClose={handleAccountMenuClose}
					/> */}

						<AccountMenuButtonContainer />
					</Stack>
				</FlexBox>
			</FlexBox>
		);
	})
);

FrameBanner.displayName = "FrameBanner";

export default FrameBanner;
