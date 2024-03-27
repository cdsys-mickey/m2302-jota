import { memo } from "react";
import PropTypes from "prop-types";
import { Box, Skeleton, Stack } from "@mui/material";

const DSGLoading = memo((props) => {
	const {
		hideTitle = false,
		height = 300,
		variant = "rectangular",
		animation = "pulse",
	} = props;
	return (
		<Stack spacing={0.5}>
			{!hideTitle && (
				<Box>
					<Skeleton
						variant={variant}
						animation={animation}
						height={42}
					/>
				</Box>
			)}

			<Skeleton variant={variant} animation={animation} height={height} />
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
