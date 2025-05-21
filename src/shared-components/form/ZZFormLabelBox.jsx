import React from "react";
import FormLabelEx from "../FormLabelEx/FormLabelEx";
import { Box } from "@mui/material";

const ZZFormLabelBox = React.forwardRef(({ label, children, ...rest }, ref) => {
	return (
		<Box ref={ref}>
			<FormLabelEx {...rest}>{label}</FormLabelEx>
			<Box sx={{}}>{children}</Box>
		</Box>
	);
});

export default React.memo(ZZFormLabelBox);
