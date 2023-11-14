import LoadingTypography from "@/shared-components/LoadingTypography";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import {
	DataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import DSGAddRowsToolbar from "../DSGAddRowsToolbar";
import DSGLoading from "../../../shared-components/dsg/DSGLoading";

const CatSGrid = memo(
	forwardRef((props, ref) => {
		const {
			data,
			loading,
			height,
			// METHODS
			handleChange,
			isPersisted,
			handleSelectionChange,
		} = props;

		const columns = useMemo(
			() => [
				{
					...keyColumn(
						"SClas",
						createTextColumn({
							continuousUpdates: false,
						})
					),
					disabled: isPersisted,
					title: "代碼",
					grow: 1,
					minWidth: 60,
				},
				{
					...keyColumn(
						"ClassData",
						createTextColumn({
							continuousUpdates: false,
						})
					),
					title: "小分類名稱",
					grow: 5,
				},
			],
			[isPersisted]
		);

		if (loading) {
			return (
				<Container maxWidth="sm">
					{/* <LoadingTypography>讀取中...</LoadingTypography> */}
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
					<DataSheetGrid
						ref={ref}
						rowKey="SClas"
						height={height || 300}
						value={data}
						onChange={handleChange}
						columns={columns}
						addRowsComponent={DSGAddRowsToolbar}
						disableExpandSelection
						disableContextMenu
						// onActiveCellChange={handleActiveCellChange}
						onSelectionChange={handleSelectionChange}
						// autoAddRow
					/>
				</Box>
			</Container>
		);
	})
);

CatSGrid.propTypes = {
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	handleChange: PropTypes.func,
	isPersisted: PropTypes.func,
	handleSelectionChange: PropTypes.func,
};

CatSGrid.displayName = "CatSGrid";
export default CatSGrid;
