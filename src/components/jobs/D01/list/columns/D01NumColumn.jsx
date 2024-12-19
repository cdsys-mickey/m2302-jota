import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D01NumColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn
			flex
			justifyContent="flex-end"
			pr={1}
			xs={2}
			{...rest}
		/>
	);
};

D01NumColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D01NumColumn.displayName = "D01NumColumn";
export default D01NumColumn;
