import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const A01ProdIDColumn = (props) => {
	const { loading, children, ...rest } = props;
	return (
		<Grid item pr={1} xs={12} sm={12} md={4} lg={4} {...rest}>
			{loading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

A01ProdIDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A01ProdIDColumn.displayName = "A01ProdIDColumn";
export default A01ProdIDColumn;
