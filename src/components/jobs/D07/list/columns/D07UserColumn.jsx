import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const D07UserColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={8} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

D07UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D07UserColumn.displayName = "D07UserColumn";
export default D07UserColumn;
