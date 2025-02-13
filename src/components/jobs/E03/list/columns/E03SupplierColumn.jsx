import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const E03SupplierColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={10} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

E03SupplierColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E03SupplierColumn.displayName = "E03SupplierColumn";
export default E03SupplierColumn;




