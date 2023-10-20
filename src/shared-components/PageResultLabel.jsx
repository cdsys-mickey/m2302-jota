import React, { useMemo } from "react";

// MUI Core
import { Box, Typography } from "@mui/material";

const PageResultLabel = (props) => {
	const {
		page,
		size,
		totalPages,
		totalElements,
		numberOfElements,
		showTotalPages = false,
		showElementNumber = false,
		variant = "body2",
		...rest
	} = props;

	const message = useMemo(() => {
		if (!totalPages) {
			return !!totalElements && `共 ${totalElements} 筆`;
		}

		let result = "";
		const start = (page - 1) * size + 1;
		const end = start + numberOfElements - 1;

		if (showElementNumber && numberOfElements && numberOfElements > 0) {
			result += `${start}-${end}`;
		}
		if (totalElements && totalElements > 0) {
			result += " 共";
		}
		if (showTotalPages && totalPages) {
			result += ` ${totalPages} 頁`;
		}
		if (totalElements && totalElements > 0) {
			result += ` ${totalElements} 筆`;
		}

		return result;
	}, [
		numberOfElements,
		page,
		showElementNumber,
		showTotalPages,
		size,
		totalElements,
		totalPages,
	]);

	// if (!totalPages) {
	// 	return (
	// 		<Box p={1}>
	// 			<Typography variant="body2">
	// 				{!!totalElements && `共 ${totalElements} 筆`}
	// 			</Typography>
	// 		</Box>
	// 	);
	// }

	// const start = useMemo(() => {
	// 	return (page - 1) * size + 1;
	// }, [page, size]);
	// const end = useMemo(() => {
	// 	return start + numberOfElements - 1;
	// }, [numberOfElements, start]);

	return (
		<Typography
			variant={variant}
			sx={{
				display: "flex",
				alignItems: "center",
			}}
			{...rest}>
			{message}
		</Typography>
	);
};

export default PageResultLabel;
