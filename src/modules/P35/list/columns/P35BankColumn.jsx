import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P35BankColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={9} sx={{ display: { xs: 'none', sm: 'block' } }} {...rest} />
	);
};

P35BankColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P35BankColumn.displayName = "P35BankColumn";
export default P35BankColumn;


