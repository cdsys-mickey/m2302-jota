import React from "react";
import { Box, Typography } from "@mui/material";
import FlexBox from "@/shared-components/FlexBox";
import ButtonEx from "@/shared-components/button/ButtonEx";

const PushMessageContent = React.forwardRef((props, ref) => {
	const {
		// FROM React Toastify
		toastProps,
		// PROPS
		primary,
		secondary,
		job,
		onSelectJob,
		onPopoverClose,
	} = props;
	return (
		<div>
			<FlexBox fullWidth inline>
				<FlexBox flex={1}>
					<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
						{primary}
					</Typography>
				</FlexBox>
				{job && (
					<FlexBox>
						<ButtonEx
							onClick={() => {
								onPopoverClose();
								onSelectJob(job);
							}}>
							前往{job}
						</ButtonEx>
					</FlexBox>
				)}
			</FlexBox>

			<Typography variant="body2">{secondary}</Typography>
		</div>
	);
});

export default React.memo(PushMessageContent);
