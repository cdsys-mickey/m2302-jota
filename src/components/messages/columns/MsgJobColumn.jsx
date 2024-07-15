import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import FlexGrid from "../../../shared-components/FlexGrid";

const MsgJobColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<FlexGrid
			item
			pr={1}
			xs={4}
			sm={4}
			md={4}
			lg={2}
			justifyContent="center"
			{...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</FlexGrid>
	);
};

MsgJobColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

MsgJobColumn.displayName = "MsgJobColumn";
export default MsgJobColumn;
