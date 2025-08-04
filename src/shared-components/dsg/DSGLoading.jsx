import { memo } from "react";
import PropTypes from "prop-types";
import { Box, Skeleton, Stack } from "@mui/material";

const DSGLoading = memo((props) => {
	const {
		hideTitle = false,
		height = 300,
		variant = "rectangular",
		animation = "pulse",
		headerHeight = 34,
		rowHeight = 34,
		rows
	} = props;
	return (
		<Stack spacing={0.2}>
			{!hideTitle && (
				<Box>
					<Skeleton
						variant={variant}
						animation={animation}
						height={headerHeight}
					/>
				</Box>
			)}
			{rows ? Array.from({ length: rows }).map((_, index) => (
				<Skeleton
					key={index}
					variant={variant}
					animation={animation}
					height={height}
					style={{ marginBottom: rows > 1 ? '8px' : '0' }} // 當有多行時增加間距
				/>
			)) : <Skeleton
				variant={variant}
				animation={animation}
				height={height}
				style={{ marginBottom: rows > 1 ? '8px' : '0' }} // 當有多行時增加間距
			/>}
		</Stack>
	);
});

DSGLoading.propTypes = {
	hideTitle: PropTypes.bool,
	height: PropTypes.number,
	variant: PropTypes.string,
	animation: PropTypes.string,
};

DSGLoading.displayName = "DSGLoading";
export default DSGLoading;
