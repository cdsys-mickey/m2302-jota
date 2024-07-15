import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const C03UserColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={5} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

C03UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C03UserColumn.displayName = "C03UserColumn";
export default C03UserColumn;
