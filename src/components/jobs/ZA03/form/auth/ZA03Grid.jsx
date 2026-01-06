import { DSGGrid } from "@/shared-components";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { memo } from "react";

// const ContextMenu = createDSGContextMenuComponent({
// 	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
// });

const ZA03Grid = memo((props) => {
	const {
		uid,
		rowKey,
		readOnly,
		gridRef,
		data,
		loading,
		height = 300,
		// METHODS
		onChange,
		onSelectionChange,
		getRowClassName,
		funcDisabled,
		...rest
	} = props;


	if (loading) {
		return (
			<Container maxWidth="xl">
				{/* <LoadingTypography>讀取中...</LoadingTypography> */}
				<DSGLoading height={height} />
			</Container>
		);
	}

	if (loading == null) {
		return false;
	}

	return (
		<DSGGrid
			// lockRows={true}
			lockRows={readOnly}
			ref={gridRef}
			// rowKey="DeptID"
			// rowKey={rowKey}
			// rowKey="JobID"
			// height={height + (readOnly ? 48 : 0)}
			// height={height + 48}
			height={height}
			// rowHeight={42}
			value={data}
			onChange={onChange}
			onSelectionChange={onSelectionChange}
			// columns={columns}
			// addRowsComponent={DSGAddRowsToolbar}
			addRowsComponent={null}
			// disableExpandSelection
			disableContextMenu
			// contextMenuComponent={ContextMenu}
			rowClassName={getRowClassName}
			{...rest}
		/>
	);
});
ZA03Grid.propTypes = {
	readOnly: PropTypes.bool,
	gridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	getRowClassName: PropTypes.func,
	funcDisabled: PropTypes.func,
	onSelectionChange: PropTypes.func,
	rowKey: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
};

ZA03Grid.displayName = "ZA03Grid";
export default ZA03Grid;
