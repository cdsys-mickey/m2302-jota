import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B011IdColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={4} sm={4} md={4} lg={4} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B011IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B011IdColumn.displayName = "B011IdColumn";
export default B011IdColumn;

