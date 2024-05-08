import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const C02FlagColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={4} sm={4} md={4} lg={1} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

C02FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C02FlagColumn.displayName = "C02FlagColumn";
export default C02FlagColumn;
