import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const F03DeptIdColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={2} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

F03DeptIdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

F03DeptIdColumn.displayName = "F03DeptIdColumn";
export default F03DeptIdColumn;





