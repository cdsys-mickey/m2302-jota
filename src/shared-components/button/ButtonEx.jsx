import React, { forwardRef } from "react";
import { Button, styled } from "@mui/material";

const ButtonEx = styled(
	forwardRef((props, ref) => {
		const { children, ...other } = props;
		return (
			<Button ref={ref} size="small" {...other}>
				{children}
			</Button>
		);
	})
)(({ theme }) => ({}));

export default React.memo(ButtonEx);
