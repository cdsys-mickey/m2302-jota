import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const A01ProdNameColumn = (props) => {
	const { loading, children, ...rest } = props;
	return (
		<Grid item pr={1} xs={12} sm={12} md={12} lg={9} {...rest}>
			{loading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

A01ProdNameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A01ProdNameColumn.displayName = "A01ProdNameColumn";
export default A01ProdNameColumn;
