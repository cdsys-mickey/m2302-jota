import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B05UserColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={5} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B05UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B05UserColumn.displayName = "B05UserColumn";
export default B05UserColumn;