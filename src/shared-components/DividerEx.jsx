import { Divider } from "@mui/material";
import React from "react";

const DividerEx = React.forwardRef((props, ref) => {
	const { children, before, after, sx = [], ...rest } = props;
	return (
		<Divider
			ref={ref}
			sx={[
				{
					...(before && {
						"&.MuiDivider-root::before": {
							width: before,
						},
					}),
					...(after && {
						"&.MuiDivider-root::after": {
							width: after,
						},
					}),
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...rest}>
			{children}
		</Divider>
	);
});

export default React.memo(DividerEx);
