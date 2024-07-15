import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const D06DeptIdColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={2} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

D06DeptIdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D06DeptIdColumn.displayName = "D06DeptIdColumn";
export default D06DeptIdColumn;



