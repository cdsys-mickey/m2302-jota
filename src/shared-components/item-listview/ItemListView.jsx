import { Box, Paper } from "@mui/material";
import React from "react";
import { useScrollable } from "@/shared-hooks/useScrollable";

import ItemListViewCache from "@/shared-components/item-listview/ItemListViewCache";
import MuiStyles from "@/shared-modules/sd-mui-styles";
import ItemListViewError from "./ItemListViewError";
import { useScrollTop } from "@/shared-hooks/useScrollTop";

const ListViewBox = ({
	data,
	header,
	children,
	scrollable,
	scrollTop,
	// scrollTopStyles,
	boxStyles,
	onScroll,
	listViewRef,
	...rest
}) => {
	return (
		<Box {...rest}>
			{header}
			<Box
				component={Paper}
				sx={[
					{
						...(header && {
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
};

const ItemListView = ({
	// PROPS
	data,
	error,
	height = 500,
	ErrorComponent = ItemListViewError,
	boxStyles,
	// toolbar,
	// children,
	header,
	HeaderComponent,
	ItemComponent,
	ItemComponentProps,
	// PaperProps,
	PaperProps,
	// PaperStyles = [],
	loading,
	// scrollTop,
	// onScroll,
	BoxComponent = Paper,
	listViewRef,
	// METHODS
	// not recommend to pass in handleSelect here
	handleSelect,
	...rest
}) => {
	const { scrollTop, onScroll } = useScrollTop({
		debounce: 20,
	});
	const scrollable = useScrollable({
		height,
		withHeader: !!header,
	});

	if (!height) {
		return (
			<ListViewBox
				header={header}
				scrollable={scrollable}
				scrollTop={scrollTop}
				boxStyles={boxStyles}
				onScroll={onScroll}
				{...PaperProps}>
				<ErrorComponent message="未指定 height" />
			</ListViewBox>
		);
	}

	if (!ItemComponent) {
		return (
			<ListViewBox
				header={header}
				scrollable={scrollable}
				scrollTop={scrollTop}
				// scrollTopStyles={scrollTopStyles}
				boxStyles={boxStyles}
				onScroll={onScroll}
				{...PaperProps}>
				<ErrorComponent message="未指定 ItemComponent" />
			</ListViewBox>
		);
	}

	if (error) {
		return (
			<ListViewBox
				header={header}
				scrollable={scrollable}
				scrollTop={scrollTop}
				// scrollTopStyles={scrollTopStyles}
				boxStyles={boxStyles}
				onScroll={onScroll}
				{...PaperProps}>
				<ErrorComponent error={error} />
			</ListViewBox>
		);
	}

	return (
		<ListViewBox
			data={data}
			header={header}
			scrollable={scrollable}
			scrollTop={scrollTop}
			boxStyles={boxStyles}
			onScroll={onScroll}
			listViewRef={listViewRef}
			{...PaperProps}>
			<ItemListViewCache
				loading={loading}
				HeaderComponent={HeaderComponent}
				ItemComponent={ItemComponent}
				ItemComponentProps={ItemComponentProps}
				data={data}
				bodySx={scrollable.body}
				// METHODS
				handleSelect={handleSelect}
				{...rest}
			/>
		</ListViewBox>
	);
};
export default React.memo(ItemListView);
