import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const ZA03DeptColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={12} sm={12} md={6} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

ZA03DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

ZA03DeptColumn.displayName = "ZA03DeptColumn";
export default ZA03DeptColumn;
