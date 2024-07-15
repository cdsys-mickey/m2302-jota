import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const C03CheckerColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={8} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

C03CheckerColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C03CheckerColumn.displayName = "C03CheckerColumn";
export default C03CheckerColumn;
