import ListColumn from "@/shared-components/listview/ListColumn";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const A16IDColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

A16IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A16IDColumn.displayName = "A16IDColumn";
export default A16IDColumn;

