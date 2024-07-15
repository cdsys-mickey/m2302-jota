import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const D05DeptColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={5} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

D05DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D05DeptColumn.displayName = "D05DeptColumn";
export default D05DeptColumn;

