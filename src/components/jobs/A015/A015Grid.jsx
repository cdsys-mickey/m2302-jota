import { DSGGrid } from "@/shared-components";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import PropTypes from "prop-types";
import { memo } from "react";
import NoDataBox from "../../../shared-components/NoDataBox";

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
