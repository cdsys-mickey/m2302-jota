import { Box, FormLabel, Typography } from "@mui/material";
import Colors from "constants/Colors";
import React from "react";

const FieldGroupWithLabel = ({ children, label, ...rest }) => {
	return (
		<Box
			sx={[
				(theme) => ({
					"&:focus-within .field-label": {
						color: theme.palette.primary.main,
						fontWeight: 600,
					},
				}),
			]}>
			<Box pb={0.5} {...rest}>
				<FormLabel>
					<Typography
						variant="body2"
						color="text.secondary"
						className="field-label">
						{label}
					</Typography>
				</FormLabel>
			</Box>
			{children}
		</Box>
	);
};

export default FieldGroupWithLabel;
