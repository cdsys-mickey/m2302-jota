import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B011SupplierColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={10} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B011SupplierColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B011SupplierColumn.displayName = "B011SupplierColumn";
export default B011SupplierColumn;

