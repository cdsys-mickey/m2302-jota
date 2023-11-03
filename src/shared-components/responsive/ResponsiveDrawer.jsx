import { Drawer } from "@mui/material";
import { useMemo } from "react";
import { memo } from "react";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import useResponsive from "@/shared-contexts/responsive/useResponsive";

/**
 * mobile 狀態 variant 會自動改成 temporary
 */
const ResponsiveDrawer = memo(
	forwardRef((props, ref) => {
		const {
			children,
			variant = "persistent",
			width = 260,
			open = false,
			...rest
		} = props;
		const { mobile } = useResponsive();

		const autoVariant = useMemo(() => {
			return mobile ? "temporary" : "persistent";
		}, [mobile]);

		return (
			<Drawer
				ref={ref}
				open={open}
				// open={autoOpen}
				variant={autoVariant || variant}
				sx={{
					width: width,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: width,
						boxSizing: "border-box",
					},
				}}
				{...rest}>
				{children}
			</Drawer>
		);
	})
);

ResponsiveDrawer.displayName = "ResponsiveDrawer";
ResponsiveDrawer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	variant: PropTypes.oneOf(["persistent", "temporary"]),
	width: PropTypes.number,
	open: PropTypes.bool,
};
export default ResponsiveDrawer;
