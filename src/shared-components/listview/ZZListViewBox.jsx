import { Box, Paper } from "@mui/material";
import React from "react";

import MuiStyles from "@/shared-modules/MuiStyles";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const ZZListViewBox = memo(
	forwardRef((props, ref) => {
		const {
			headerComponent,
			children,
			scrollable,
			scrollTop,
			// scrollTopStyles,
			boxStyles,
			onScroll,
			listViewRef,
			...rest
		} = props;
		const HeaderComponent = headerComponent;

		return (
			<Box ref={ref} {...rest}>
				{HeaderComponent && <HeaderComponent />}
				<Box
					component={Paper}
					sx={[
						{
							...(HeaderComponent && {
								borderTop: 0,
								borderTopLeftRadius: 0,
								borderTopRightRadius: 0,
							}),
							...MuiStyles.BOX_SHADOW_TRANSITION,
						},
						scrollable.scroller,
						scrollTop > 30 && MuiStyles.PAPER_OFFTOP_SHADOW,
						...(Array.isArray(boxStyles) ? boxStyles : [boxStyles]),
					]}
					onScroll={onScroll}>
					<Box ref={listViewRef}>{children}</Box>
				</Box>
			</Box>
		);
	})
);

ZZListViewBox.propTypes = {
	headerComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.elementType,
	]),
	children: PropTypes.node,
};

export default ZZListViewBox;
