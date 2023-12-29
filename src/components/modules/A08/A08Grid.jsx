import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import DSGAddRowsToolbar from "../DSGAddRowsToolbar";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const A08Grid = memo((props) => {
	const {
		readOnly,
		setGridRef,
		data,
		loading,
		height = 300,
		// METHODS
		handleChange,
		isPersisted,
	} = props;

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"CodeID",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				disabled: isPersisted,
				title: "代碼",
			},
			{
				...keyColumn(
					"CodeData",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "客戶區域",
				grow: 4,
				disabled: readOnly,
			},
		],
		[isPersisted, readOnly]
	);

	if (loading) {
		return (
			<Container maxWidth="xs">
				<DSGLoading height={height} />
			</Container>
		);
	}

	if (!data) {
		return false;
	}

	return (
		<Container maxWidth="xs">
			<Box>
				<DynamicDataSheetGrid
					lockRows={readOnly}
					ref={setGridRef}
					rowKey="CodeID"
					height={height + (readOnly ? 48 : 0)}
					rowHeight={42}
					value={data}
					onChange={handleChange}
					columns={columns}
					addRowsComponent={DSGAddRowsToolbar}
					disableExpandSelection
					// disableContextMenu
					contextMenuComponent={ContextMenu}
					// onActiveCellChange={handleActiveCellChange}
					// autoAddRow
				/>
			</Box>
		</Container>
	);
});
A08Grid.propTypes = {
	readOnly: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	handleChange: PropTypes.func,
	isPersisted: PropTypes.func,
	handleActiveCellChange: PropTypes.func,
};

A08Grid.displayName = "A08Grid";
export default A08Grid;
