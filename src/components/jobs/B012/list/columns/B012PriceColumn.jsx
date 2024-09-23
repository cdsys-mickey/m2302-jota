import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B012PriceColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={3} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B012PriceColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B012PriceColumn.displayName = "B012PriceColumn";
export default B012PriceColumn;


