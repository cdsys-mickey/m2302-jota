import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P21BankColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={9} sx={{ display: { xs: 'none', sm: 'block' } }} {...rest} />
	);
};

P21BankColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P21BankColumn.displayName = "P21BankColumn";
export default P21BankColumn;


