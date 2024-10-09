import ListColumn from "@/shared-components/listview/ListColumn";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const E021CustomerColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<ListColumn pr={1} xs={9} sm={9} md={9} lg={8} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</ListColumn>
	);
};

E021CustomerColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E021CustomerColumn.displayName = "E021CustomerColumn";
export default E021CustomerColumn;



