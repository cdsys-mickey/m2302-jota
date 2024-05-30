import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const C09DeptColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={9} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

C09DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C09DeptColumn.displayName = "C09DeptColumn";
export default C09DeptColumn;
