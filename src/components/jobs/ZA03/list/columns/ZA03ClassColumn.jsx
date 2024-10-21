import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const ZA03ClassColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={2} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

ZA03ClassColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

ZA03ClassColumn.displayName = "ZA03ClassColumn";
export default ZA03ClassColumn;
