import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const A05IDColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={4} sm={4} md={4} lg={4} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

A05IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A05IDColumn.displayName = "A05IDColumn";
export default A05IDColumn;
