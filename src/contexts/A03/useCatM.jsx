import { useContext } from "react";
import { useCallback, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { A03Context } from "./A03Context";
import { useDSG } from "../../shared-hooks/dsg/useDSG";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "../../shared-components/dsg/columns/text/createTextColumnEx";
import { useDSGMeta } from "../../shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "../../shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGCodeEditor } from "../../shared-hooks/dsg/useDSGCodeEditor";
import { CatSContext } from "./CatSContext";

export const useCatM = () => {
	const { token } = useContext(AuthContext);
	const a03 = useContext(A03Context);
	const catS = useContext(CatSContext);

	const grid = useDSG({
		gridId: "CatM",
		keyColumn: "MClas",
		otherColumns: "ClassData",
	});

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"MClas",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				disabled: grid.isPersisted,
				title: "代碼",
				minWidth: 60,
			},
			{
				...keyColumn(
					"ClassData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "中分類名稱",
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
		displayName: "中分類",
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
			a03.setMdId(rowData?.MClas);
			gridMeta.setSelectedRow(row);
			if (rowData?.MClas) {
				catS.codeEditor.load({
					param: {
						mdId: rowData?.MClas,
					},
					baseUri: `v1/prod/s-cats/${a03.lgId},${rowData?.MClas}`,
					supressLoading: false,
				});
			} else {
				catS.clear();
			}
		},
		[a03, catS]
	);

	return {
		grid,
		gridMeta,
		codeEditor,
		clear,
		onRowSelectionChange,
	};
};
