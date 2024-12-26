import { Typography } from "@mui/material";
import { useContext } from "react";
import { memo } from "react";
import { forwardRef } from "react";
import { useMemo } from "react";
import { ResponsiveContext } from "../../shared-contexts/responsive/ResponsiveContext";
import PropTypes from "prop-types";

const ResponsiveFrameTitle = memo(
	forwardRef((props, ref) => {
		const { children, alt, ...rest } = props;
		const { mobile } = useContext(ResponsiveContext);

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
	})
);
ResponsiveFrameTitle.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array])
}
ResponsiveFrameTitle.displayName = "ResponsiveFrameTitle";
export default ResponsiveFrameTitle;
