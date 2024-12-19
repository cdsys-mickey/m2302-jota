import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D02NumColumn = (props) => {
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

D02NumColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D02NumColumn.displayName = "D02NumColumn";
export default D02NumColumn;

