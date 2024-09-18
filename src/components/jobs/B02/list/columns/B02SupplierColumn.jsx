import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B02SupplierColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={10} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B02SupplierColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B02SupplierColumn.displayName = "B02SupplierColumn";
export default B02SupplierColumn;


