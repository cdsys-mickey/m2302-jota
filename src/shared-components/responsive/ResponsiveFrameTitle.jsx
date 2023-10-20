import { Typography } from "@mui/material";
import React, { useMemo } from "react";
import useProtectedLayout from "@/shared-contexts/useProtectedLayout";

const ResponsiveFrameTitle = React.forwardRef(
	({ children, alt, ...rest }, ref) => {
		const { mobile } = useProtectedLayout();

		const text = useMemo(() => {
			if (alt && mobile) {
				return alt;
			}
			return children;
		}, [alt, children, mobile]);

		return (
			<Typography ref={ref} variant="h5" {...rest}>
				{text}
			</Typography>
		);
	}
);

export default React.memo(ResponsiveFrameTitle);
