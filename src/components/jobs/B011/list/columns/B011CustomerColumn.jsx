import ListColumn from "@/shared-components/listview/ListColumn";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B011CustomerColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<ListColumn pr={1} xs={9} sm={9} md={9} lg={5} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</ListColumn>
	);
};

B011CustomerColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B011CustomerColumn.displayName = "B011CustomerColumn";
export default B011CustomerColumn;

