import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B02PriceColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={3} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B02PriceColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B02PriceColumn.displayName = "B02PriceColumn";
export default B02PriceColumn;


