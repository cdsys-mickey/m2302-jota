import MuiStyles from "@/shared-modules/MuiStyles";
import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useMemo } from "react";
import { ListRowContext } from "./context/ListRowContext";

const ListColumn = (props) => {
	const { children, flex, inline, justifyContent, alignItems, onClick, sx = [], ...rest } = props;
	const listRow = useContext(ListRowContext);
	const isLoading = useMemo(() => {
		return listRow?.loading && !children
	}, [children, listRow?.loading]);

	const display = useMemo(() => {
		return flex ? (inline ? "inline-flex" : "flex") : null;
	}, [flex, inline])

	const styles = useMemo(() => ({
		"&": {
			...(display && { display }),
			...(justifyContent && {
				justifyContent,
			}),
			...(alignItems && {
				alignItems,
			}),
			...(onClick && {
				cursor: "pointer"
			})
		}
	}), [alignItems, display, justifyContent, onClick])

	// const title = useMemo(() => {
	// 	return Types.isString(children) ? children : "";
	// }, [children])

	return (
		<Grid item sx={[MuiStyles.ELLIPSIS, styles, ...(Array.isArray(sx) ? sx : [sx])]}
			onClick={onClick}
			// title={title}
			{...rest}
		>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
}

ListColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	flex: PropTypes.bool,
	inline: PropTypes.bool,
	alignItems: PropTypes.bool,
	justifyContent: PropTypes.bool,
	onClick: PropTypes.func,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

ListColumn.displayName = "ListViewColumn";
export default ListColumn;