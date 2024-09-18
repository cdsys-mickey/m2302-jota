import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B04DateColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={3} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B04DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B04DateColumn.displayName = "B04DateColumn";
export default B04DateColumn;



