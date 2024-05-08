import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const C03DeptColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={8} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

C03DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C03DeptColumn.displayName = "C03DeptColumn";
export default C03DeptColumn;
