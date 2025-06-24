import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useInit } from "@/shared-hooks/useInit";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import CmsAreaPickerCell from "@/components/CmsAreaPicker/CmsAreaPickerCell";
import P32 from "./P32.mjs";

export const useP32 = () => {
	const { token } = useContext(AuthContext);
	const crud = useContext(CrudContext);
	const appModule = useAppModule({
		token,
		moduleId: "P32",
	});
	const grid = useDSG({
		gridId: "P32",
		keyColumn: "CodeID",
		// otherColumns: "CodeData",
		otherColumns: `
			CodeData,
			area: {nullble: true},
		`,
	});

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"CodeID",
					createTextColumnEx({
						continuousUpdates: false,
						maxLength: 2
					})
				),
				disabled: grid.isPersisted,
				title: "代碼",
				minWidth: 60,
				maxWidth: 60,
			},

			{
				...keyColumn(
					"CodeData",
					createTextColumnEx({
						continuousUpdates: false,
						maxLength: 6
					})
				),
				title: "名稱",
				grow: 4,
				disabled: grid.readOnly,
			},

			{
				...keyColumn(
					"area",
					optionPickerColumn(CmsAreaPickerCell, {
						name: "area",
						disableOpenOnInput: true,
						// hideControlsOnActive: false,
						disableClearable: true,
						selectOnFocus: true,
						autoHighlight: true,
					})
				),
				title: "範圍",
				minWidth: 120,
				maxWidth: 120,
				disabled: grid.readOnly,
			},
		],
		[grid.isPersisted, grid.readOnly]
	);

	const gridMeta = useDSGMeta({
		columns,
		data: grid.gridData,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
	});

	const codeEditor = useDSGCodeEditor({
		baseUri: "v1/cms/cities",
		token,
		grid,
		gridMeta,
		transformForReading: P32.transformForReading,
		transformForSubmitting: P32.transformForSubmitting,
	});

	useInit(() => {
		crud.cancelAction();
		codeEditor.load();
	}, []);

	return {
		...crud,
		...appModule,
		grid,
		gridMeta,
		codeEditor,
	};
};



