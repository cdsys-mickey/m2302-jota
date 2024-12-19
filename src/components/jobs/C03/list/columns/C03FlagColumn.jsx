import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C03FlagColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn
			flex
			pr={1}
			xs={1}
			justifyContent="center"
			{...rest}
		/>
	);
};

C03FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C03FlagColumn.displayName = "C03FlagColumn";
export default C03FlagColumn;
