import { Grid } from "@mui/material";
import { forwardRef, memo } from "react";

const FlexGrid = memo(
	forwardRef(
		(
			{
				children,
				sx = [],
				inline = false,
				block = false,
				justifyContent,
				alignItems,
				...rest
			},
			ref
		) => {
			return (
				<Grid
					ref={ref}
					{...rest}
					sx={[
						{
							display: block
								? "block"
								: inline
								? "inline-flex"
								: "flex",
							...(justifyContent && {
								justifyContent,
							}),
							...(alignItems && {
								alignItems,
							}),
						},
						...(Array.isArray(sx) ? sx : [sx]),
					]}>
					{children}
				</Grid>
			);
		}
	)
);

FlexGrid.displayName = "FlexGrid";

export default FlexGrid;
