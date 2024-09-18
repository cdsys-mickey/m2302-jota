import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B04IdColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={4} sm={4} md={4} lg={4} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B04IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B04IdColumn.displayName = "B04IdColumn";
export default B04IdColumn;



