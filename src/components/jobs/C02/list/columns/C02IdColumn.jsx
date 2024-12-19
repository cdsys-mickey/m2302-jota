import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C02IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={4} {...rest} />
	);
};

C02IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C02IdColumn.displayName = "C02IdColumn";
export default C02IdColumn;
