import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B011ProdColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={6} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B011ProdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B011ProdColumn.displayName = "B011ProdColumn";
export default B011ProdColumn;

