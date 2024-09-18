import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B011DateColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={3} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B011DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B011DateColumn.displayName = "B011DateColumn";
export default B011DateColumn;

