import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const A20NameColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={12} sm={12} md={12} lg={9} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

A20NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A20NameColumn.displayName = "A20NameColumn";
export default A20NameColumn;
