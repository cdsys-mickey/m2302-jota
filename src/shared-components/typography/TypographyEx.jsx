import { Box, CircularProgress, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo, memo, forwardRef } from "react";
import TypographyExBase from "./TypographyExBase";

const TypographyEx = memo(
	forwardRef((props, ref) => {
		const {
			loading,
			variant,
			IconComponent,
			children,
			iconSize = "md",
			slotProps,
			...rest
		} = props;

		const progressSize = useMemo(() => {
			switch (iconSize) {
				case "sm":
					return 16;
				case "lg":
					return 24;
				case "md":
				default:
					return 20;
			}
		}, [iconSize]);

		const _variant = useMemo(() => {
			return (loading && !variant) ? "h6" : variant;
		}, [loading, variant])

		if (loading == null) {
			return (
				<TypographyExBase
					variant={variant}
					{...slotProps?.typo}
					{...rest}
				>
					{children}
				</TypographyExBase>
			)
		}

		return (
			<Box
				ref={ref}
				sx={{ display: "inline-flex", alignItems: "center" }}>
				{IconComponent ? (
					<IconComponent
						sx={[{
							animation: "$App-logo-spin infinite 2s linear",
							height: "4vmin",
							pointerEvents: "none",
							...slotProps?.icon
						}]}
					/>
				) : (
					<CircularProgress sx={{ mr: 1, ...slotProps?.icon }} size={progressSize} />
				)}
				<TypographyExBase
					variant={_variant}
					{...slotProps?.typo}
					{...rest}
				>
					{children}
				</TypographyExBase>
			</Box>
		);
	})
);
TypographyEx.propTypes = {
	variant: PropTypes.string,
	iconSize: PropTypes.string,
	color: PropTypes.string,
	loading: PropTypes.bool,
	slotProps: PropTypes.object,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	emptyText: PropTypes.string,
	IconComponent: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func])
}
export default TypographyEx;
