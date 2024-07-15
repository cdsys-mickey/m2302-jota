import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const C06FlagColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={4} sm={4} md={4} lg={1} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

C06FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C06FlagColumn.displayName = "C06FlagColumn";
export default C06FlagColumn;
