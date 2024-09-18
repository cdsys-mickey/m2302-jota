import MuiStyles from "@/shared-modules/sd-mui-styles";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";

const ListColumn = (props) => {
	const { children, ...rest } = props;
	return (
		<Grid item sx={[MuiStyles.ELLIPSIS]}  {...rest}>{children}</Grid>
	);
}

ListColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array])
}

ListColumn.displayName = "ListViewColumn";
export default ListColumn;