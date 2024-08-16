import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useInit } from "@/shared-hooks/useInit";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { AreaTypePickerComponentContainer } from "@/components/dsg/columns/area-type-picker/AreaTypePickerComponentContainer";
import A08 from "@/modules/md-a08";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useAppModule } from "./useAppModule";

export const useA08 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A08",
	});

	const grid = useDSG({
		gridId: "A08",
		keyColumn: "CodeID",
		otherColumns: "CodeData,areaType",
	});

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"CodeID",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				disabled: grid.isPersisted,
				title: "代碼",
				minWidth: 60,
				maxWidth: 60
			},
			{
				...keyColumn(
					"areaType",
					optionPickerColumn(AreaTypePickerComponentContainer, {
						name: "areaType",
						disableOpenOnInput: true,
						hideControlsOnActive: true,
						disableClearable: true,
						selectOnFocus: true,
						autoHighlight: true,
					})
				),
				title: "範圍",
				minWidth: 140,
				maxWidth: 140,
				disabled: grid.readOnly,
				grow: 1,
			},
			{
				...keyColumn(
					"CodeData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "客戶區域",
				grow: 4,
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
		baseUri: "v1/sales/customer/areas",
		token,
		grid,
		gridMeta,
		transformForReading: A08.transformForReading,
		transformForSubmitting: A08.transformForSubmitting,
	});

	useInit(() => {
		codeEditor.load();
	}, []);

	return {
		grid,
		gridMeta,
		codeEditor,
		...appModule,
	};
};
