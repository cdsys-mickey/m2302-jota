import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A16FlagColumn = (props) => {
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

A16FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A16FlagColumn.displayName = "A16FlagColumn";
export default A16FlagColumn;

