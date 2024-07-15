import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const C02DeptColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={6} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

C02DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C02DeptColumn.displayName = "C02DeptColumn";
export default C02DeptColumn;
