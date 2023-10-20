import { Box, CircularProgress, Typography } from "@mui/material";
import { useMemo, memo, forwardRef } from "react";

const LoadingTypography = memo(
	forwardRef((props, ref) => {
		const {
			variant = "h6",
			color = "inherit",
			IconComponent,
			children = "",
			style,
			iconSize = "md",
			...rest
		} = props;

		const progressSize = useMemo(() => {
			switch (iconSize) {
				case "sm":
					return 16;
				case "lg":
					return 28;
				case "md":
				default:
					return 20;
			}
		}, []);

		return (
			<Box
				ref={ref}
				sx={{ display: "inline-flex", alignItems: "center" }}>
				{IconComponent ? (
					<IconComponent
						sx={{
							animation: "$App-logo-spin infinite 2s linear",
							height: "4vmin",
							pointerEvents: "none",
						}}
					/>
				) : (
					<CircularProgress sx={{ mr: 1 }} size={progressSize} />
				)}
				<Typography
					variant={variant}
					color={color}
					{...rest}
					sx={[(theme) => ({ color: theme.palette.text.secondary })]}
					style={style}>
					{children}
				</Typography>
			</Box>
		);
	})
);

export default LoadingTypography;
