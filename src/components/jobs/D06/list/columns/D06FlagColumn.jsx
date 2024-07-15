import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const D06FlagColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={4} sm={4} md={4} lg={1} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

D06FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D06FlagColumn.displayName = "D06FlagColumn";
export default D06FlagColumn;



