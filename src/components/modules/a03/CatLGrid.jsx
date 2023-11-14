import LoadingTypography from "@/shared-components/LoadingTypography";
import { Box, Container, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import {
	DataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import DSGAddRowsToolbar from "../DSGAddRowsToolbar";
import _ from "lodash";
import DSGLoading from "@/shared-components/dsg/DSGLoading";

const CatLGrid = memo(
	forwardRef((props, ref) => {
		const {
			data,
			loading,
			height,
			// METHODS
			handleChange,
			isPersisted,
			// handleActiveCellChange,
			handleSelectionChange,
		} = props;

		const columns = useMemo(
			() => [
				{
					...keyColumn(
						"LClas",
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
					title: "大分類名稱",
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
				<Box
					sx={{
						"& .selected-row": {
							backgroundColor: "red",
						},
					}}>
					<DataSheetGrid
						ref={ref}
						rowKey="LClas"
						height={height || 300}
						value={data}
						onChange={handleChange}
						columns={columns}
						addRowsComponent={DSGAddRowsToolbar}
						disableExpandSelection
						disableContextMenu
						// onActiveCellChange={handleActiveCellChange}
						onSelectionChange={handleSelectionChange}
						// rowClassName={({ rowIndex }) =>
						// 	isSelected(rowIndex) ? "selected-row" : null
						// }
					/>
				</Box>
			</Container>
		);
	})
);

CatLGrid.propTypes = {
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	handleChange: PropTypes.func,
	isPersisted: PropTypes.func,
	handleActiveCellChange: PropTypes.func,
	handleSelectionChange: PropTypes.func,
	isSelected: PropTypes.func,
};

CatLGrid.displayName = "CatLGrid";
export default CatLGrid;
