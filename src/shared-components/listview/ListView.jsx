import { useScrollable } from "@/shared-hooks/useScrollable";
import { Paper } from "@mui/material";
import React from "react";

import ItemListViewCache from "@/shared-components/item-listview/ItemListViewCache";
import { useScrollTop } from "@/shared-hooks/useScrollTop";
import { forwardRef, memo } from "react";
import ItemListViewError from "./ItemListViewError";
import ListViewBox from "./ListViewBox";

const ItemListView = memo(
	forwardRef((props, ref) => {
		const {
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
		} = props;
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
					ref={ref}
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
					ref={ref}
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
					ref={ref}
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
				ref={ref}
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
	})
);
export default ItemListView;
