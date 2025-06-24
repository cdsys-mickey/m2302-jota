import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P34BankColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={9} sx={{ display: { xs: 'none', sm: 'block' } }} {...rest} />
	);
};

P34BankColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P34BankColumn.displayName = "P34BankColumn";
export default P34BankColumn;

