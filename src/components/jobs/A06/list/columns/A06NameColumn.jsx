import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const A06NameColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={9} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

A06NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A06NameColumn.displayName = "A06NameColumn";
export default A06NameColumn;
