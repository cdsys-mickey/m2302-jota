import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const G08FlagColumn = (props) => {
	const { children, ...rest } = props;

	return (
		<ListColumn item pr={1} xs={5} {...rest} sx={{
			"& .MuiChip-root": {
				marginRight: 0.5
			}
		}}>
			{children}
		</ListColumn>
	);
};

G08FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G08FlagColumn.displayName = "G08FlagColumn";
export default G08FlagColumn;


