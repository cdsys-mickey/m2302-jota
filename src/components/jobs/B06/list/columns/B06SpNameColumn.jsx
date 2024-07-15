import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B06SpNameColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={4} sm={4} md={4} lg={4} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B06SpNameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B06SpNameColumn.displayName = "B06SpNameColumn";
export default B06SpNameColumn;
