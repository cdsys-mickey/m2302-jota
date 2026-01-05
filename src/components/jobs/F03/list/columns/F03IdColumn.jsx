import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const F03IdColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} md={5} sm={4} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

F03IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

F03IdColumn.displayName = "F03IdColumn";
export default F03IdColumn;

