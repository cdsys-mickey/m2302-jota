import { FormProvider, useForm, useWatch } from "react-hook-form";
import P37XFormView from "./P37XFormView";
import TourGroupTypes from "@/components/TourGroupTypePicker/TourGroupTypes.mjs";
import { useEffect } from "react";
import { useContext } from "react";
import P37XContext from "../P37XContext";
import { useInit } from "@/shared-hooks/useInit";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useHotkeys } from "react-hotkeys-hook";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import DSGMetaContext from "@/shared-contexts/datasheet-grid/DSGMetaContext";

const P37XFormContainer = (props) => {
	const { ...rest } = props;
	const p37x = useContext(P37XContext);
	const form = useForm({
		defaultValues: {
			GrpType: TourGroupTypes.getDefaultValue(),
		}
	});

	const readOnly = useMemo(() => {
		return p37x.grid.readOnly;
	}, [p37x.grid.readOnly])

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"SDnCp",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "≧ 下限值",
				disabled: readOnly,
				// minWidth: 120,
				// maxWidth: 130,
				grow: 1,
			},
			{
				...keyColumn(
					"SUpCp",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "≦ 上限值",
				disabled: readOnly,
				// minWidth: 120,
				// maxWidth: 130,
				grow: 1,
			},
			{
				...keyColumn(
					"SDrvCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "司機佣金(%)",
				disabled: readOnly,
				minWidth: 130,
				maxWidth: 130,
			},
			{
				...keyColumn(
					"STrvCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "旅行社佣金(%)",
				disabled: readOnly,
				minWidth: 130,
				maxWidth: 130,
			},
		],
		[readOnly]
	);

	// GRID
	const gridMeta = useDSGMeta({
		data: p37x.grid.gridData,
		columns: columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		grid: p37x.grid
	});

	const handleSubmit = form.handleSubmit(p37x.onEditorSubmit, p37x.onEditorSubmitError);
	useHotkeys(["Control+Enter"], () => {
		if (!p37x.grid.readOnly) {
			setTimeout(handleSubmit)
		}
	}, {
		enableOnFormTags: true
	})

	const tourGroupType = useWatch({
		name: "GrpType",
		control: form.control
	})

	useChangeTracking(() => {
		p37x.loadItem({ id: tourGroupType })
	}, [tourGroupType]);

	useInit(() => {
		p37x.loadItem({ id: TourGroupTypes.getDefaultValue() });
	}, []);

	const contextValue = useMemo(() => ({
		...p37x.grid,
		...gridMeta,
		readOnly: !p37x.editing
	}), [gridMeta, p37x.editing, p37x.grid])

	return (
		<FormProvider {...form}>
			<DSGMetaContext.Provider value={gridMeta}>
				<DSGContext.Provider
					value={contextValue}>
					<P37XFormView
						loadWorking={p37x.loadWorking}
						loadError={p37x.loadError}
						{...rest}
					/>
				</DSGContext.Provider>
			</DSGMetaContext.Provider>
		</FormProvider>
	);
}

P37XFormContainer.displayName = "P37XFormContainer";
export default P37XFormContainer;
