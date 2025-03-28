import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P14NameColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn pr={1} xs={9} sm={9} md={9} lg={10} {...rest} />
	);
};

P14NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P14NameColumn.displayName = "P14NameColumn";
export default P14NameColumn;


