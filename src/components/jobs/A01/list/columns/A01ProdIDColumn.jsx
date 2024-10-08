import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const A01ProdIDColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={4} sm={4} md={4} lg={4} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

A01ProdIDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A01ProdIDColumn.displayName = "A01ProdIDColumn";
export default A01ProdIDColumn;
