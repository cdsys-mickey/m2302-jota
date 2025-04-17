import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import Styles from "@/modules/Styles.mjs";
import LoadingBackdrop from "@/shared-components/LoadingBackdrop";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import ContainerEx from "@/shared-components/ContainerEx";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const A26Grid = memo((props) => {
	const {
		canCreate,
		lockRows,
		setGridRef,
		drawerOpen,
		data,
		loading,
		height = 300,
		// METHODS
		onChange,
		isPersisted,
		onSelectionChange,
		...rest
	} = props;
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen }),
		[drawerOpen, theme]
	);



	const gridHeight = useMemo(() => {
		return height + (lockRows || !canCreate ? 48 : 0);
	}, [canCreate, height, lockRows]);

	if (loading) {
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				{/* <LoadingTypography>讀取中...</LoadingTypography> */}
				<DSGLoading height={height} />
			</ContainerEx>
		);
	}

	if (loading == null) {
		return false;
	}

	return (
		<>
			<LoadingBackdrop open={loading} />
			{/* <Box sx={boxStyles} {...rest}> */}
			<ContainerEx maxWidth="xs" alignLeft>
				<DSGGrid
					lockRows={lockRows}
					ref={setGridRef}
					rowKey="CodeID"
					height={gridHeight}
					// rowHeight={42}
					value={data}
					onChange={onChange}
					// columns={columns}
					addRowsComponent={canCreate ? DSGAddRowsToolbar : null}
					disableExpandSelection
					contextMenuComponent={ContextMenu}
					onSelectionChange={onSelectionChange}
				// autoAddRow
				/>
			</ContainerEx>
			{/* </Box> */}
		</>
	);
});
A26Grid.propTypes = {
	lockRows: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	isPersisted: PropTypes.func,
	onSelectionChange: PropTypes.func,
};

A26Grid.displayName = "A26Grid";
export default A26Grid;
