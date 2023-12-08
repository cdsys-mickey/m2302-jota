import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material";
import React, { forwardRef } from "react";

const ZZLoadingButtonEx = styled(
	forwardRef((props, ref) => {
		const { children, ...other } = props;
		return (
			<LoadingButton ref={ref} size="small" {...other}>
				{children}
			</LoadingButton>
		);
	})
)(({ theme }) => ({}));

export default React.memo(ZZLoadingButtonEx);
