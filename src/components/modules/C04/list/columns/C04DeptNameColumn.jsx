import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import MuiStyles from "../../../../../shared-modules/sd-mui-styles";

const C04DeptNameColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid
			item
			pr={1}
			xs={9}
			sm={9}
			md={9}
			lg={4}
			sx={[MuiStyles.ELLIPSIS]}
			{...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

C04DeptNameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C04DeptNameColumn.displayName = "C04DeptNameColumn";
export default C04DeptNameColumn;
