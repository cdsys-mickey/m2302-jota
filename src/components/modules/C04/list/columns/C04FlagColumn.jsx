import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const C04FlagColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={4} sm={4} md={4} lg={1} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

C04FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C04FlagColumn.displayName = "C04FlagColumn";
export default C04FlagColumn;
