import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D041NumColumn = (props) => {
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

D041NumColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D041NumColumn.displayName = "D041NumColumn";
export default D041NumColumn;


