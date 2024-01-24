import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const A20IDColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={12} sm={12} md={12} lg={4} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

A20IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A20IDColumn.displayName = "A20IDColumn";
export default A20IDColumn;
