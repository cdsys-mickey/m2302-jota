import { memo } from "react";
import {
	DataSheetGrid,
	checkboxColumn,
	textColumn,
	keyColumn,
} from "react-datasheet-grid";
import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Container, useTheme } from "@mui/material";
import { useMemo } from "react";
import Styles from "../../../modules/md-styles";
import A02GridAddRows from "./A02GridAddRows";
import LoadingTypography from "@/shared-components/LoadingTypography";

const A02Grid = memo((props) => {
	const { drawerOpen, data, loading, handleChange, ...rest } = props;
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen }),
		[drawerOpen, theme]
	);

	const columns = [
		{
			...keyColumn("CodeID", textColumn),
			title: "代碼",
		},
		{ ...keyColumn("CodeData", textColumn), title: "包裝名稱", grow: 4 },
	];

	if (loading) {
		return <LoadingTypography>讀取中...</LoadingTypography>;
	}

	return (
		<Container maxWidth="sm">
			<Box sx={boxStyles} {...rest}>
				<DataSheetGrid
					value={data}
					onChange={handleChange}
					columns={columns}
					addRowsComponent={A02GridAddRows}
					disableExpandSelection
					disableContextMenu
					autoAddRow
				/>
			</Box>
		</Container>
	);
});

A02Grid.propTypes = {};

A02Grid.displayName = "A02Grid";
export default A02Grid;
