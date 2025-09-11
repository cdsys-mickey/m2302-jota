import { ListItemIcon, ListItemText, Typography, styled } from "@mui/material";
import React, { forwardRef } from "react";

const PushMessageListItemText = forwardRef((props, ref) => {
	const { children, secondary, ...other } = props;
	return (
		<ListItemText
			ref={ref}
			secondary={
				<React.Fragment>
					<Typography
						sx={{ display: "inline" }}
						component="span"
						variant="body2"
						color="text.secondary">
						{secondary}
					</Typography>
				</React.Fragment>
			}
			{...other}
		/>
	);
});

PushMessageListItemText.displayName = "PushMessageListItemText";
export default PushMessageListItemText;
