import MuiStyles from "@/shared-modules/sd-mui-styles";
import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useMemo } from "react";
import { ListRowContext } from "./context/ListRowContext";

const ListColumn = (props) => {
	const { children, ...rest } = props;
	const listRow = useContext(ListRowContext);
	const isLoading = useMemo(() => {
		return listRow?.loading && !children
	}, [children, listRow?.loading]);
	return (
		<Grid item sx={[MuiStyles.ELLIPSIS]}  {...rest}>{isLoading ? <Skeleton /> : children || ""}</Grid>
	);
}

ListColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array])
}

ListColumn.displayName = "ListViewColumn";
export default ListColumn;