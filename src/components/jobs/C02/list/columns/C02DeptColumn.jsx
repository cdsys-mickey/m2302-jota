import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C02DeptColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={6} {...rest} />
	);
};

C02DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C02DeptColumn.displayName = "C02DeptColumn";
export default C02DeptColumn;
