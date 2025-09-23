import FlexBox from "@/shared-components/FlexBox";
import { Container } from "@mui/material";
import clsx from "clsx";
import PropTypes from "prop-types";
import { memo } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import ErrorBox from "../../ErrorBox";
import LoadingTypography from "../../LoadingTypography";
import NoDataBox from "../../NoDataBox";
import "./InfiniteListView.scss";
import { useRef } from "react";
import { useEffect } from "react";

const InfiniteListView = memo((props) => {
	// console.log("rendering InfiniteListView");
	const {
		itemCount,
		isItemLoaded,
		loadMoreItems,
		data,
		error,
		height = 300,
		itemHeight = 36,
		otherListProps,
		RowComponent,
		loading,
		handleItemsRendered,
		onScroll,
		scrollOffset,
		bottomReached,
		minimumBatchSize = 20,
		threshold = 20,
		saveKey,
		emptyText
	} = props;

	const infiniteLoaderRef = useRef(null);
	const hasMountedRef = useRef(false);

	useEffect(() => {
		if (hasMountedRef.current) {
			if (infiniteLoaderRef.current) {
				infiniteLoaderRef.current.resetloadMoreItemsCache();
				console.log("InfiniteLoader.resetloadMoreItemsCache()");
			}
		}
		hasMountedRef.current = true;
	}, [saveKey]);

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

	if (error) {
		return <ErrorBox error={error} height={height} />;
	}
	if (loading === false && itemCount === 0) {
		return <NoDataBox height={height} title={emptyText} />;
	}

	return (
		<InfiniteLoader
			ref={infiniteLoaderRef}
			isItemLoaded={isItemLoaded}
			itemCount={itemCount}
			loadMoreItems={loadMoreItems}
			minimumBatchSize={minimumBatchSize}
			threshold={threshold}>
			{({ onItemsRendered, ref }) => (
				<div
					className={clsx({
						"bottom-shadow": !bottomReached,
					})}>
					<List
						onScroll={onScroll}
						className={clsx("shadow", "i-listview", {
							"top-shadow": scrollOffset > 5,
						})}
						ref={ref}
						height={height}
						itemData={data}
						itemCount={itemCount}
						itemSize={itemHeight}
						onItemsRendered={handleItemsRendered(onItemsRendered)}
						{...otherListProps}>
						{RowComponent}
					</List>
				</div>
			)}
		</InfiniteLoader>
	);
});
InfiniteListView.propTypes = {
	emptyText: PropTypes.string,
	saveKey: PropTypes.string,
	itemCount: PropTypes.number,
	otherListProps: PropTypes.object,
	height: PropTypes.number,
	itemHeight: PropTypes.number,
	minimumBatchSize: PropTypes.number,
	threshold: PropTypes.number,
	scrollOffset: PropTypes.number,
	loadMoreItems: PropTypes.func,
	onScroll: PropTypes.func,
	isItemLoaded: PropTypes.func,
	RowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
	data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	loading: PropTypes.bool,
	bottomReached: PropTypes.bool,
	handleItemsRendered: PropTypes.func,
	error: PropTypes.object,
};

InfiniteListView.displayName = "InfiniteListView";
export default InfiniteListView;
