import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B012ProdColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={5} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B012ProdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B012ProdColumn.displayName = "B012ProdColumn";
export default B012ProdColumn;


