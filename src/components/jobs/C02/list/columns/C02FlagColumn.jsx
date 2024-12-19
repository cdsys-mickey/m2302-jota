import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C02FlagColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={1} {...rest} />
	);
};

C02FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C02FlagColumn.displayName = "C02FlagColumn";
export default C02FlagColumn;
