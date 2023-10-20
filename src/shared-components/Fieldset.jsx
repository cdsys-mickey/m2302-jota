import { FormLabel } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";

const FieldsetBox = styled(Box)(({ theme }) => ({
	margin: 0,
	borderWidth: 1,
	borderColor: "#bebebe",
	borderStyle: "solid",
	borderRadius: theme.shape.borderRadius,
	"& legend": {
		fontSize: theme.spacing(1),
		paddingLeft: "0.5em",
		paddingRight: "0.5em",
	},
}));

const Fieldset = ({ label, children, labelProps, sx = [] }) => {
	return (
		<FieldsetBox
			component="fieldset"
			sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}>
			{label && (
				<FormLabel component="legend" {...labelProps}>
					{label}
				</FormLabel>
			)}

			{children}
		</FieldsetBox>
	);
};

export default Fieldset;
