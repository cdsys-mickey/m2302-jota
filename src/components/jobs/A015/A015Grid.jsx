import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import NoDataBox from "../../../shared-components/NoDataBox";
import { DSGGrid } from "../../../shared-components/dsg/DSGGrid";

const A015Grid = memo((props) => {
	const {
		gridRef,
		data,
		loading,
		height = 300,
		// METHODS
		onChange,
	} = props;



	if (!data || data.legnth === 0) {
		return (
			<NoDataBox height={height} size="medium">
				輸入篩選條件後再按下讀取
			</NoDataBox>
		);
	}

	if (loading) {
		return <DSGLoading height={height} />;
	}

	if (loading == null) {
		return false;
	}

	return (
		<DSGGrid
			lockRows
			ref={gridRef}
			rowKey="ProdID"
			// height={height + (readOnly ? 48 : 0)}
			height={height + 48}
			// rowHeight={42}
			value={data}
			onChange={onChange}
			// addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			disableContextMenu
		/>
	);
});
A015Grid.propTypes = {
	readOnly: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	isPersisted: PropTypes.func,
	// handleActiveCellChange: PropTypes.func,
};

A015Grid.displayName = "A015Grid";
export default A015Grid;
