import LoadingTypography from "@/shared-components/LoadingTypography";
import { Box, Container, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import {
	DataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import Styles from "../../../modules/md-styles";
import DSGAddRowsToolbar from "../DSGAddRowsToolbar";

const A02Grid = memo(
	forwardRef((props, ref) => {
		const {
			data,
			loading,
			height,
			// METHODS
			handleChange,
			isPersisted,
			handleActiveCellChange,
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
					title: "包裝名稱",
					grow: 4,
				},
			],
			[isPersisted]
		);

		if (loading) {
			return (
				<Container maxWidth="sm">
					<LoadingTypography>讀取中...</LoadingTypography>
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
						rowKey="CodeID"
						height={height || 300}
						value={data}
						onChange={handleChange}
						columns={columns}
						addRowsComponent={DSGAddRowsToolbar}
						disableExpandSelection
						disableContextMenu
						onActiveCellChange={handleActiveCellChange}
						// autoAddRow
					/>
				</Box>
			</Container>
		);
	})
);

A02Grid.propTypes = {
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	handleChange: PropTypes.func,
	isPersisted: PropTypes.func,
	handleActiveCellChange: PropTypes.func,
};

A02Grid.displayName = "A02Grid";
export default A02Grid;
