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
import DSGLoading from "../../../shared-components/dsg/DSGLoading";

const CatMGrid = memo(
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
			// isSelected,
		} = props;

		const columns = useMemo(
			() => [
				{
					...keyColumn(
						"MClas",
						createTextColumn({
							continuousUpdates: false,
						})
					),
					disabled: isPersisted,
					title: "代碼",
					minWidth: 60,
				},
				{
					...keyColumn(
						"ClassData",
						createTextColumn({
							continuousUpdates: false,
						})
					),
					title: "中分類名稱",
					grow: 5,
				},
			],
			[isPersisted]
		);

		if (loading) {
			return (
				<Container maxWidth="sm">
					{/* <LoadingTypography>讀取中...</LoadingTypography> */}
					{/* {_.range(10).map((i) => (
						<Skeleton key={i} height={45} />
					))} */}
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
						rowKey="MClas"
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
						// rowClassName={(row) =>
						// 	isSelected(row) ? "row-selected" : null
						// }
					/>
				</Box>
			</Container>
		);
	})
);

CatMGrid.propTypes = {
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	handleChange: PropTypes.func,
	isPersisted: PropTypes.func,
	handleActiveCellChange: PropTypes.func,
	handleSelectionChange: PropTypes.func,
};

CatMGrid.displayName = "CatMGrid";
export default CatMGrid;
