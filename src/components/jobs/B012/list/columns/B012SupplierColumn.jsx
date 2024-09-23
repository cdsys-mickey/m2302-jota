import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B012SupplierColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={10} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B012SupplierColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B012SupplierColumn.displayName = "B012SupplierColumn";
export default B012SupplierColumn;


