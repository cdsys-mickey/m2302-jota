import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B06ProdNameColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={6} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B06ProdNameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B06ProdNameColumn.displayName = "B06ProdNameColumn";
export default B06ProdNameColumn;
