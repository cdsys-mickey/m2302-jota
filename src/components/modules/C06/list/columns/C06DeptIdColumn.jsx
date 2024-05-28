import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const C06DeptIdColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={2} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

C06DeptIdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C06DeptIdColumn.displayName = "C06DeptIdColumn";
export default C06DeptIdColumn;
