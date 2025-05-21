import ListColumn from "@/shared-components/listview/ListColumn";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const G08IDColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

G08IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G08IDColumn.displayName = "G08IDColumn";
export default G08IDColumn;


