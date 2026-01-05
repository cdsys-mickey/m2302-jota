import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C04SpIdColumn = (props) => {
	const { expChecking, ...rest } = props;

	return (
		<ListColumn item
			sx={{
				...(expChecking && {
					display: {
						md: "none", lg: "block"
					}
				})
			}}
			pr={1} md={3} xs={2} {...rest} />
	);
};

C04SpIdColumn.propTypes = {
	loading: PropTypes.bool,
	expChecking: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C04SpIdColumn.displayName = "C04DeptIdColumn";
export default C04SpIdColumn;
