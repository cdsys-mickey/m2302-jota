import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const C01FlagColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={4} sm={4} md={4} lg={1} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

C01FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C01FlagColumn.displayName = "C01FlagColumn";
export default C01FlagColumn;
