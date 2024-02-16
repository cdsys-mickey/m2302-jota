import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const A01ProdNameColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={9} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

A01ProdNameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A01ProdNameColumn.displayName = "A01ProdNameColumn";
export default A01ProdNameColumn;
