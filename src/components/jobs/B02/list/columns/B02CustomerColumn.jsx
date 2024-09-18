import ListColumn from "@/shared-components/listview/ListColumn";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B02CustomerColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<ListColumn pr={1} xs={9} sm={9} md={9} lg={5} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</ListColumn>
	);
};

B02CustomerColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B02CustomerColumn.displayName = "B02CustomerColumn";
export default B02CustomerColumn;


