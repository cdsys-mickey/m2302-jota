import { memo } from "react";
import {
	DataSheetGrid,
	checkboxColumn,
	textColumn,
	keyColumn,
	createTextColumn,
} from "react-datasheet-grid";
import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Container, useTheme } from "@mui/material";
import { useMemo } from "react";
import Styles from "../../../modules/md-styles";
import A02GridAddRows from "./A02GridAddRows";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { forwardRef } from "react";

const A02Grid = memo(
	forwardRef((props, ref) => {
		const {
			drawerOpen,
			data,
			loading,
			handleChange,
			handleBlur,
			height,
			// METHODS
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
					title: "包裝名稱",
					grow: 4,
				},
			],
			[isPersisted]
		);

		if (loading) {
			return <LoadingTypography>讀取中...</LoadingTypography>;
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
						onBlur={handleBlur}
						columns={columns}
						addRowsComponent={A02GridAddRows}
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

A02Grid.propTypes = {};

A02Grid.displayName = "A02Grid";
export default A02Grid;
