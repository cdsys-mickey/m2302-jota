import { Box, Paper } from "@mui/material";
import React from "react";
import { useScrollable } from "@/shared-hooks/useScrollable";

import ItemListViewCache from "@/shared-components/item-listview/ItemListViewCache";
import MuiStyles from "@/shared-modules/sd-mui-styles";
import ItemListViewError from "./ItemListViewError";
import { useScrollTop } from "@/shared-hooks/useScrollTop";
import { memo } from "react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

const ListViewBox = memo(
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

ListViewBox.propTypes = {
	headerComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.elementType,
	]),
	children: PropTypes.node,
};

export default ListViewBox;
