import { AlertTitle, Box, Container } from "@mui/material";
import React, { useMemo } from "react";
import PageResult from "@/shared-classes/PageResult";
import AlertEx from "@/shared-components/AlertEx";
import ItemListViewEmpty from "./ItemListViewEmpty";
import ItemListViewError from "./ItemListViewError";
import ItemListViewInit from "./ItemListViewInit";
import ItemListViewLoading from "./ItemListViewLoading";

// const areEqual = (prev, next) => {
// 	// console.log(prev, "prev");
// 	// console.log(next, "next");
// 	console.log(prev.data === next.data, "data equals");
// 	console.log(prev.bodySx === next.bodySx, "bodySx equals");
// 	console.log(
// 		prev.ItemComponent === next.ItemComponent,
// 		"ItemComponent equals"
// 	);
// 	console.log(
// 		prev.ItemComponentProps === next.ItemComponentProps,
// 		"ItemComponentProps equals"
// 	);
// 	console.log(prev.handleSelect === next.handleSelect, "handleSelect equals");
// 	console.log(
// 		prev.InitComponent === next.InitComponent,
// 		"initComponent equals"
// 	);
// 	console.log(
// 		prev.LoadingComponent === next.LoadingComponent,
// 		"loadingComponent equals"
// 	);
// 	console.log(
// 		prev.EmptyComponent === next.EmptyComponent,
// 		"EmptyComponent equals"
// 	);

// 	if (prev.loading !== next.loading) {
// 		return false;
// 	}

// 	return true;
// };

const ItemListViewCache = ({
	data,
	pageResult,
	bodySx,
	HeaderComponent,
	HeaderComponentProps,
	ItemComponent,
	ItemComponentProps,
	loading = false,
	LoadingComponent = ItemListViewLoading,
	LoadingComponentProps,
	empty,
	EmptyComponent = ItemListViewEmpty,
	EmptyComponentProps,
	InitComponent = ItemListViewInit,
	InitComponentProps,
	error,
	ErrorComponent = ItemListViewError,
	ErrorComponentProps,
	// METHODS
	handleSelect,
}) => {
	const startingIndex = useMemo(() => {
		if (!pageResult) {
			return 0;
		}
		return PageResult.from(pageResult).getIndexNumber(0, pageResult.page);
	}, [pageResult]);

	console.debug("ItemListViewCache rendered");
	if (!ItemComponent) {
		return (
			<Container maxWidth="xs">
				<Box pt="45%">
					<AlertEx severity="warning">
						<AlertTitle>ItemListViewCache 錯誤</AlertTitle>
						未定義 itemComponent
					</AlertEx>
				</Box>
			</Container>
		);
	}

	if (loading) {
		return <LoadingComponent {...LoadingComponentProps} />;
	}

	if (!data) {
		return <InitComponent {...InitComponentProps} />;
	}

	if (data.length === 0) {
		if (empty) {
			return empty;
		}
		return <EmptyComponent {...EmptyComponentProps} />;
	}

	if (error) {
		return <ErrorComponent {...ErrorComponentProps} />;
	}

	return (
		<>
			{data && data.length > 0 && (
				<>
					{HeaderComponent && (
						<HeaderComponent {...HeaderComponentProps} />
					)}
					<Box sx={[bodySx]}>
						{data.map((row, index) => (
							<ItemComponent
								index={startingIndex + index}
								key={`item-${index}`}
								data={row}
								{...ItemComponentProps}
							/>
						))}
					</Box>
				</>
			)}
		</>
	);
};
export default React.memo(ItemListViewCache);
