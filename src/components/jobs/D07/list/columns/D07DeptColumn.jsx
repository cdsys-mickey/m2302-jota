import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const D07DeptColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={6} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

D07DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D07DeptColumn.displayName = "D07DeptColumn";
export default D07DeptColumn;



