import { useContext } from "react";
import { useCallback, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useDSG } from "../../shared-hooks/dsg/useDSG";
import { A03Context } from "./A03Context";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "../../shared-components/dsg/columns/text/createTextColumnEx";
import { useDSGMeta } from "../../shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "../../shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGCodeEditor } from "../../shared-hooks/dsg/useDSGCodeEditor";
import { RunCircleOutlined } from "@mui/icons-material";

export const useCatS = () => {
	const { token } = useContext(AuthContext);
	const a03 = useContext(A03Context);
	const grid = useDSG({
		gridId: "CatS",
		keyColumn: "SClas",
		otherColumns: "ClassData",
	});

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"SClas",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				disabled: grid.isPersisted,
				title: "代碼",
				grow: 1,
				minWidth: 60,
			},
			{
				...keyColumn(
					"ClassData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "小分類名稱",
				grow: 5,
				disabled: a03.readOnly,
			},
		],
		[grid.isPersisted, a03.readOnly]
	);

	const gridMeta = useDSGMeta({
		columns,
		data: grid.gridData,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
	});

	const codeEditor = useDSGCodeEditor({
		displayName: "小分類",
		baseUrl: "",
		token,
		grid,
		gridMeta,
	});

	const clear = useCallback(() => {
		grid.setGridData([], {
			reset: true,
			commit: true,
		});
	}, [grid]);

	const onRowSelectionChange = useCallback(
		(row) => {
			const { rowData } = row;
			a03.setSmId(rowData?.SClas);
			gridMeta.setSelectedRow(row);
		},
		[a03, grid]
	);

	return {
		grid,
		gridMeta,
		codeEditor,
		clear,
		onRowSelectionChange,
	};
};
