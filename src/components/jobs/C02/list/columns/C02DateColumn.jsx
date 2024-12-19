import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C02DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={4} {...rest} />
	);
};

C02DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C02DateColumn.displayName = "C02DateColumn";
export default C02DateColumn;
