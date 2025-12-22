import { Box, Pagination, Typography } from "@mui/material";
import React from "react";
import FlexBoxView from "./FlexBox/FlexBoxView";
import LoadingTypography from "./LoadingTypography";
import PageResultLabel from "./PageResultLabel";

/**
 * PageResult 結構如下:
 * - totalPages
 * - totalElements
 * - numberOfElements
 */
const FetchResultToolbar = (props) => {
	const {
		// loading = false,
		// LABEL PROPS
		totalElements,
		numberOfElements,
		showTotalPages,
		showElementNumber,
		// METHODS
		fetchMore,
		onPageChanging,
		onPageChanged,
		// PAGINATION PROPS
		paginationProps,
		page,
		totalPages,
	} = props;

	if (!totalPages) {
		return (
			<Box p={1}>
				<Typography variant="body2">
					{!!totalElements && `共 ${totalElements} 筆`}
				</Typography>
			</Box>
		);
	}

	return (
		<FlexBox inline alignItems="center" py={0.5}>
			{/* {!loading && ( */}
			<>
				<PageResultLabel
					// {...rest}
					page={page}
					size={10}
					totalPages={totalPages}
					totalElements={totalElements}
					numberOfElements={numberOfElements}
					showTotalPages={showTotalPages}
					showElementNumber={showElementNumber}
				/>
				<Pagination
					// 使用此方法畫面反應比較快, 先切頁數後再 fetch, 但必須另外存 page state
					page={page}
					// 使用此方法比較不會有問題, 先 fetch 後再切頁數
					// page={pageResult.page}
					count={totalPages || 0}
					// shape="rounded"
					{...paginationProps}
					onChange={async (_, v) => {
						if (onPageChanging) onPageChanging(v);
						if (fetchMore) {
							await fetchMore(v);
						} else {
							console.error(
								"fetchMore callback is not specified"
							);
						}
						if (onPageChanged) onPageChanged(v);
					}}
				/>
			</>
			{/* )} */}
			{/* {loading && <LoadingTypography variant="h6" />} */}
		</FlexBox>
	);
};

export default React.memo(FetchResultToolbar);
