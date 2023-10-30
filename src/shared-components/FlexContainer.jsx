import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Container } from "@mui/material";
import { useMemo } from "react";

const FlexContainer = memo(
	forwardRef((props, ref) => {
		const {
			children,
			justifyContent,
			alignItems,
			fullHeight = false,
			sx = [],
			...rest
		} = props;
		const styles = useMemo(
			() => ({
				display: "flex",
				...(justifyContent && {
					justifyContent,
				}),
				...(alignItems && {
					alignItems,
				}),
				...(fullHeight && {
					height: "100vh",
				}),
			}),
			[alignItems, fullHeight, justifyContent]
		);
		return (
			<Container
				ref={ref}
				sx={[styles, ...(Array.isArray(sx) ? sx : [sx])]}
				{...rest}>
				{children}
			</Container>
		);
	})
);

FlexContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	justifyContent: PropTypes.oneOf(["flex-start", "center", "flex-end"]),
	alignItems: PropTypes.oneOf(["flex-start", "center", "flex-end"]),
	fullHeight: PropTypes.bool,
};

FlexContainer.displayName = "FlexContainer";
export default FlexContainer;
