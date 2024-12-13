import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const F03UserColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={8} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

F03UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

F03UserColumn.displayName = "F03UserColumn";
export default F03UserColumn;

