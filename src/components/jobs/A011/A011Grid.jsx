import DSGLoading from "@/shared-components/dsg/DSGLoading";
import PropTypes from "prop-types";
import { memo } from "react";
import NoDataBox from "../../../shared-components/NoDataBox";
import { DSGGrid } from "@/shared-components"

const A011Grid = memo((props) => {
	const {
		gridRef,
		data,
		loading,
		height = 300,
		// METHODS
		onChange,
		...rest
	} = props;



	if (!data || data.legnth === 0) {
		return (
			<NoDataBox height={height} size="medium">
				輸入篩選條件後再按下[讀取資料]
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
			// columns={columns}
			// addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			disableContextMenu
			{...rest}
		/>
	);
});
A011Grid.propTypes = {
	readOnly: PropTypes.bool,
	gridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	isPersisted: PropTypes.func,
	// handleActiveCellChange: PropTypes.func,
};

A011Grid.displayName = "A011Grid";
export default A011Grid;
