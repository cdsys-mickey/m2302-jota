import { useCallback, useState } from "react";
import { useDSG } from "../../shared-hooks/dsg/useDSG";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "../../shared-components/dsg/columns/text/createTextColumnEx";
import { A03Context } from "./A03Context";
import { useContext } from "react";
import { useDSGMeta } from "../../shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "../../shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGCodeEditor } from "../../shared-hooks/dsg/useDSGCodeEditor";
import { CatMContext } from "./CatMContext";
import { CatSContext } from "./CatSContext";
import { AuthContext } from "../auth/AuthContext";
import { useInit } from "../../shared-hooks/useInit";

export const useCatL = () => {
	const { token } = useContext(AuthContext);
	const a03 = useContext(A03Context);
	const catM = useContext(CatMContext);
	const catS = useContext(CatSContext);

	const grid = useDSG({
		gridId: "CatL",
		keyColumn: "LClas",
		otherColumns: "ClassData",
	});

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"LClas",
					createTextColumnEx({
						continuousUpdates: false,
						maxLength: 2
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
				title: "大分類名稱",
				grow: 5,
				disabled: a03.readOnly,
			},
		],
		[a03.readOnly, grid.isPersisted]
	);

	const gridMeta = useDSGMeta({
		columns,
		data: grid.gridData,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
	});

	const codeEditor = useDSGCodeEditor({
		displayName: "大分類",
		baseUri: "v1/prod/l-cats",
		token,
		grid,
		gridMeta,
	});

	const clear = useCallback(() => {
		grid.setGridData([], {
			reset: true,
			commit: true,
		});
		gridMeta.setSelectedRow(null);
	}, [grid, gridMeta]);

	const onRowSelectionChange = useCallback(
		(row) => {
			if (!row) {
				return;
			}
			const { rowData } = row;
			console.log(`catL.selectedRow`, rowData);
			gridMeta.setSelectedRow(row);
			a03.setLgId(rowData?.LClas);
			if (rowData?.LClas && grid.isPersisted(row)) {
				catM.codeEditor.load({
					params: {
						lgId: rowData?.LClas,
					},
					baseUri: `v1/prod/m-cats/${rowData?.LClas}`,
					supressLoading: false,
				});
				catM.gridMeta.setSelectedRow(null);
			} else {
				catM.clear();
			}
			catS.clear();
		},
		[a03, catM, catS, grid, gridMeta]
	);

	const onDeleted = useCallback(
		(rows) => {
			console.log(`${grid.gridId}.onDeleted`, rows);
			catM.clear();
			catS.clear();
		},
		[catM, catS, grid.gridId]
	);

	useInit(() => {
		codeEditor.load();
	}, []);

	return {
		grid,
		gridMeta,
		codeEditor,
		clear,
		onRowSelectionChange,
		onDeleted,
	};
};
