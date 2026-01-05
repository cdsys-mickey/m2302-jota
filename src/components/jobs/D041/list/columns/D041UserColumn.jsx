import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D041UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={5} xs={4} {...rest} />
	);
};

D041UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D041UserColumn.displayName = "D041UserColumn";
export default D041UserColumn;
