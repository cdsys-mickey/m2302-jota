import { memo } from "react";
import PropTypes from "prop-types";
import { Box, Skeleton, Stack } from "@mui/material";
import _ from "lodash";

const DSGLoading = memo((props) => {
	const { height, variant = "rectangular", animation = "pulse" } = props;
	return (
		<Stack spacing={1} sx={{ height }}>
			<Box mb={0.5}>
				<Skeleton variant="rectangular" animation="wave" height={42} />
			</Box>
			{_.range(3).map((i) => (
				<Skeleton
					variant={variant}
					animation={animation}
					key={i}
					height={28}
				/>
			))}
		</Stack>
	);
});

DSGLoading.propTypes = {
	height: PropTypes.number,
	variant: PropTypes.string,
	animation: PropTypes.string,
};

DSGLoading.displayName = "DSGLoading";
export default DSGLoading;
