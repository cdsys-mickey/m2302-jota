import { ListItemIcon, ListItemText, Typography, styled } from "@mui/material";
import React, { forwardRef } from "react";

const MessageItemText = styled(
	forwardRef((props, ref) => {
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
	})
)(({ theme }) => ({
	marginTop: 0,
	marginBottom: 0,
}));

export default React.memo(MessageItemText);
