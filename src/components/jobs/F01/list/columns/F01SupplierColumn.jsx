import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const F01SupplierColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={10} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

F01SupplierColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

F01SupplierColumn.displayName = "F01SupplierColumn";
export default F01SupplierColumn;

