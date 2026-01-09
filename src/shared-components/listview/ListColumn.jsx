import MuiStyles from "@/shared-modules/MuiStyles";
import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useMemo } from "react";
import { ListRowContext } from "./context/ListRowContext";
import { ResponsiveGrid } from "../responsive-grid/ResponsiveGrid";

const ListColumn = (props) => {
	const { children, flex, inline, justifyContent, alignItems, onClick, responsive = false, sx = [], ...rest } = props;
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

	const GridComponent = useMemo(() => {
		return responsive ? ResponsiveGrid : Grid;
	}, [responsive])

	return (
		<GridComponent item sx={[MuiStyles.ELLIPSIS, styles, ...(Array.isArray(sx) ? sx : [sx])]}
			onClick={onClick}
			// title={title}
			{...rest}
		>
			{isLoading ? <Skeleton /> : children || ""}
		</GridComponent>
	);
}

ListColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	flex: PropTypes.bool,
	responsive: PropTypes.bool,
	inline: PropTypes.bool,
	alignItems: PropTypes.string,
	justifyContent: PropTypes.string,
	onClick: PropTypes.func,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

ListColumn.displayName = "ListViewColumn";
export default ListColumn;