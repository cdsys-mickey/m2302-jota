import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import FlexGrid from "../../../../../shared-components/FlexGrid";

const C03FlagColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<FlexGrid
			item
			pr={1}
			xs={4}
			sm={4}
			md={4}
			lg={1}
			justifyContent="center"
			{...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</FlexGrid>
	);
};

C03FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C03FlagColumn.displayName = "C03FlagColumn";
export default C03FlagColumn;
