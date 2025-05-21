import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const G06CustColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={12} {...rest} />
	);
};

G06CustColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G06CustColumn.displayName = "G06CustColumn";
export default G06CustColumn;

