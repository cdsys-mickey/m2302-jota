import ListColumn from "@/shared-components/listview/ListColumn";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const G08DateColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={4} {...rest} />
	);
};

G08DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G08DateColumn.displayName = "G08DateColumn";
export default G08DateColumn;


