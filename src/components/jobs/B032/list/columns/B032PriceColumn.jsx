import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B032PriceColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={3} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B032PriceColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B032PriceColumn.displayName = "B032PriceColumn";
export default B032PriceColumn;



