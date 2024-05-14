import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const C04DeptIdColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={2} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

C04DeptIdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C04DeptIdColumn.displayName = "C04DeptIdColumn";
export default C04DeptIdColumn;
