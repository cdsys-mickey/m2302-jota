import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const C07FlagColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={4} sm={4} md={4} lg={1} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

C07FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

C07FlagColumn.displayName = "C07FlagColumn";
export default C07FlagColumn;
