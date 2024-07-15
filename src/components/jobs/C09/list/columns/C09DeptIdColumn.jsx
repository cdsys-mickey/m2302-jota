import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const C09DeptIdColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={2} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

C09DeptIdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C09DeptIdColumn.displayName = "C09DeptIdColumn";
export default C09DeptIdColumn;
