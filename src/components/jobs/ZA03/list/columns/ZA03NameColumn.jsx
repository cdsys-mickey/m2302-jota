import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const ZA03NameColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={9} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

ZA03NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

ZA03NameColumn.displayName = "ZA03NameColumn";
export default ZA03NameColumn;
