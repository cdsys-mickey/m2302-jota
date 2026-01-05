import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const F01IdColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} md={5} lg={5} xs={4} sm={4}  {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

F01IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

F01IdColumn.displayName = "F01IdColumn";
export default F01IdColumn;

