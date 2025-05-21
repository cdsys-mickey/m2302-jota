import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const G08CustColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={12} {...rest} />
	);
};

G08CustColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G08CustColumn.displayName = "G08CustColumn";
export default G08CustColumn;


