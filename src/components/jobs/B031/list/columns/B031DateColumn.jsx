import { Grid, Skeleton, Tooltip } from "@mui/material";
import { orange } from "@mui/material/colors";
import PropTypes from "prop-types";
import { useMemo } from "react";

const B031DateColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	const memoisedTitle = useMemo(() => {
		return (!isLoading && children) ? `只帶出 ${children} 的詢價記錄` : "";
	}, [children, isLoading])
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={3} sx={{
			"&:hover": {
				color: orange[600],
			}
		}}{...rest}>
			<Tooltip title={memoisedTitle}>
				{isLoading ? <Skeleton /> : children || ""}
			</Tooltip>
		</Grid>
	);
};

B031DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B031DateColumn.displayName = "B031DateColumn";
export default B031DateColumn;

