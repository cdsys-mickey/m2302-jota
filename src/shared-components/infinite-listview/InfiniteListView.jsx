import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList as List } from "react-window";
import LoadingTypography from "../LoadingTypography";
import { Container } from "@mui/material";
import FlexBox from "@/shared-components/FlexBox";

const InfiniteListView = memo((props) => {
	const {
		itemCount,
		isItemLoaded,
		loadMoreItems,
		data,
		height = 300,
		itemHeight = 36,
		otherListProps,
		rowComponent,
		loading,
		handleItemsRendered,
	} = props;
	const RowComponent = rowComponent;

	if (loading) {
		return (
			<Container maxWidth="xs">
				<FlexBox justifyContent="center" height={height}>
					<LoadingTypography iconSize="lg" variant="h5">
						讀取中...
					</LoadingTypography>
				</FlexBox>
			</Container>
		);
	}
	return (
		<InfiniteLoader
			isItemLoaded={isItemLoaded}
			itemCount={itemCount}
			loadMoreItems={loadMoreItems}>
			{({ onItemsRendered, ref }) => (
				<List
					ref={ref}
					height={height}
					itemData={data}
					itemCount={itemCount}
					itemSize={itemHeight}
					onItemsRendered={handleItemsRendered(onItemsRendered)}
					{...otherListProps}>
					{RowComponent}
				</List>
			)}
		</InfiniteLoader>
	);
});
InfiniteListView.propTypes = {
	itemCount: PropTypes.number,
	otherListProps: PropTypes.object,
	height: PropTypes.number,
	itemHeight: PropTypes.number,
	loadMoreItems: PropTypes.func,
	isItemLoaded: PropTypes.func,
	rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
	data: PropTypes.array,
	loading: PropTypes.bool,
	handleItemsRendered: PropTypes.func,
};

InfiniteListView.displayName = "InfiniteListView";
export default InfiniteListView;
