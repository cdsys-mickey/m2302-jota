import ListColumn from "@/shared-components/listview/ListColumn";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const A05IDColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={4} {...rest} />
	);
};

A05IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A05IDColumn.displayName = "A05IDColumn";
export default A05IDColumn;
