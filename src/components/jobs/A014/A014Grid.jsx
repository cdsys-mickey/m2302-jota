import NoDataBox from "@/shared-components/NoDataBox";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import PropTypes from "prop-types";
import { memo } from "react";
import { DSGGrid } from "@/shared-components";

const A014Grid = memo((props) => {
	const {
		// bearer,
		// readOnly,
		gridRef,
		data,
		loading,
		height = 300,
		...rest
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
			height={height}
			value={data}
			// columns={columns}
			disableExpandSelection
			disableContextMenu
			{...rest}
		/>
	);
});
A014Grid.propTypes = {
	bearer: PropTypes.string,
	readOnly: PropTypes.bool,
	gridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	isPersisted: PropTypes.func,
};

A014Grid.displayName = "A014Grid";
export default A014Grid;
