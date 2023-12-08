import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList as List } from "react-window";
import LoadingTypography from "../LoadingTypography";
import { Container, styled } from "@mui/material";
import FlexBox from "@/shared-components/FlexBox";
import { Box, Paper } from "@mui/material";
import NoDataBox from "../NoDataBox";
import ErrorBox from "../ErrorBox";

const ListViewBox = styled(({ children, ...other }) => {
	return (
		<Box component={Paper} pr="2px" {...other}>
			{children}
		</Box>
	);
})(({ theme }) => ({}));

const ListViewFlexBox = styled(({ children, ...other }) => {
	return (
		<FlexBox component={Paper} pr="2px" {...other}>
			{children}
		</FlexBox>
	);
})(({ theme }) => ({}));

const InfiniteListView = memo((props) => {
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
	} = props;

	if (loading) {
		return (
			<ListViewBox>
				<Container maxWidth="xs">
					<FlexBox justifyContent="center" height={height}>
						<LoadingTypography iconSize="lg" variant="h5">
							讀取中...
						</LoadingTypography>
					</FlexBox>
				</Container>
			</ListViewBox>
		);
	}

	if (error) {
		return (
			<ListViewBox
				height={height}
				alignItems="center"
				justifyContent="center">
				<ErrorBox error={error} />
			</ListViewBox>
		);
	}
	if (loading === false && itemCount === 0) {
		return (
			<ListViewFlexBox height={height} alignItems="center">
				<NoDataBox />
			</ListViewFlexBox>
		);
	}

	return (
		<ListViewBox>
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
		</ListViewBox>
	);
});
InfiniteListView.propTypes = {
	itemCount: PropTypes.number,
	otherListProps: PropTypes.object,
	height: PropTypes.number,
	itemHeight: PropTypes.number,
	loadMoreItems: PropTypes.func,
	isItemLoaded: PropTypes.func,
	RowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
	data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	loading: PropTypes.bool,
	handleItemsRendered: PropTypes.func,
	error: PropTypes.object,
};

InfiniteListView.displayName = "InfiniteListView";
export default InfiniteListView;
