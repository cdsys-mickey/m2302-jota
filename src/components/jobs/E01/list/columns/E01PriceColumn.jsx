import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const E01PriceColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={3} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

E01PriceColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E01PriceColumn.displayName = "E01PriceColumn";
export default E01PriceColumn;


