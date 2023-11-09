import LoadingTypography from "@/shared-components/LoadingTypography";
import { Box, Container, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import {
	DataSheetGrid,
	createTextColumn,
	keyColumn,
	textColumn,
	floatColumn,
} from "react-datasheet-grid";
import Styles from "../../../modules/md-styles";
import GridAddRows from "@/components/modules/GridAddRows";
import { fixedOneFloatColumn } from "../fixedOneFloatColumn";

const A26Grid = memo(
	forwardRef((props, ref) => {
		const {
			drawerOpen,
			data,
			loading,
			height,
			// METHODS
			handleChange,
			isPersisted,
			handleActiveCellChange,
			...rest
		} = props;
		const theme = useTheme();
		const boxStyles = useMemo(
			() => Styles.ofFrameBox({ theme, drawerOpen }),
			[drawerOpen, theme]
		);

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
					title: "佣金類別",
					grow: 4,
				},
				{
					...keyColumn("Other1", fixedOneFloatColumn),
					title: "佣金比例",
					grow: 1,
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

		return (
			<Container maxWidth="sm">
				<Box sx={boxStyles} {...rest}>
					<DataSheetGrid
						ref={ref}
						rowKey="CodeID"
						height={height || 300}
						value={data}
						onChange={handleChange}
						columns={columns}
						addRowsComponent={GridAddRows}
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

A26Grid.propTypes = {
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	handleChange: PropTypes.func,
	isPersisted: PropTypes.func,
	handleActiveCellChange: PropTypes.func,
};

A26Grid.displayName = "A26Grid";
export default A26Grid;
