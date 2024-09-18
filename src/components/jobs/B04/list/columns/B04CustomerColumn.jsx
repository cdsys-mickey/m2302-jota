import ListColumn from "@/shared-components/listview/ListColumn";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B04CustomerColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<ListColumn pr={1} xs={9} sm={9} md={9} lg={5} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</ListColumn>
	);
};

B04CustomerColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B04CustomerColumn.displayName = "B04CustomerColumn";
export default B04CustomerColumn;



