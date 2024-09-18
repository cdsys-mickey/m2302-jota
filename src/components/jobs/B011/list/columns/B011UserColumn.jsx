import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B011UserColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={3} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B011UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B011UserColumn.displayName = "B011UserColumn";
export default B011UserColumn;

