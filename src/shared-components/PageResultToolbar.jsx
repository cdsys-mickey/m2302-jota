import { Pagination } from "@mui/material";
import React from "react";
import { FlexBox } from "shared-components";
import LoadingTypography from "./LoadingTypography";
import PageResultLabel from "./PageResultLabel";

/**
 * PageResult 結構如下:
 * - totalPages
 * - totalElements
 * - numberOfElements
 */
const PageResultToolbar = (props) => {
	const {
		loading = false,
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
		...rest
	} = props;

	return (
		<FlexBox inline alignItems="center">
			{!loading && (
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
			)}
			{loading && <LoadingTypography variant="h6" />}
		</FlexBox>
	);
};

export default React.memo(PageResultToolbar);
