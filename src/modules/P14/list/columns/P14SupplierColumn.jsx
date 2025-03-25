import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const P14SupplierColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={10} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

P14SupplierColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P14SupplierColumn.displayName = "P14SupplierColumn";
export default P14SupplierColumn;


