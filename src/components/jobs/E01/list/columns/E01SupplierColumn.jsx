import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const E01SupplierColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={10} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

E01SupplierColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E01SupplierColumn.displayName = "E01SupplierColumn";
export default E01SupplierColumn;


