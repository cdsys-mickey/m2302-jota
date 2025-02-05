import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const F03OrderNameColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={18} lg={18} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

F03OrderNameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

F03OrderNameColumn.displayName = "F03OrderNameColumn";
export default F03OrderNameColumn;

