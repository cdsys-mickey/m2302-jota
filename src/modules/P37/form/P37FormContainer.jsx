import { FormProvider, useForm, useWatch } from "react-hook-form";
import P37FormView from "./P37FormView";
import TourGroupTypes from "@/components/TourGroupTypePicker/TourGroupTypes.mjs";
import { useEffect } from "react";
import { useContext } from "react";
import P37Context from "../P37Context";
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

const P37FormContainer = (props) => {
	const { ...rest } = props;
	const p37 = useContext(P37Context);
	const form = useForm({
		defaultValues: {
			GrpType: TourGroupTypes.getDefaultValue(),
		}
	});

	const readOnly = useMemo(() => {
		return p37.grid.readOnly;
	}, [p37.grid.readOnly])

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
		data: p37.grid.gridData,
		columns: columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		grid: p37.grid
	});

	const handleSubmit = form.handleSubmit(p37.onEditorSubmit, p37.onEditorSubmitError);
	useHotkeys(["Control+Enter"], () => {
		if (!p37.grid.readOnly) {
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
		p37.loadItem({ id: tourGroupType })
	}, [tourGroupType]);

	useInit(() => {
		p37.loadItem({ id: TourGroupTypes.getDefaultValue() });
	}, []);

	const contextValue = useMemo(() => ({
		...p37.grid,
		...gridMeta,
		readOnly: !p37.editing
	}), [gridMeta, p37.editing, p37.grid])

	return (
		<FormProvider {...form}>
			<DSGMetaContext.Provider value={gridMeta}>
				<DSGContext.Provider
					value={contextValue}>
					<P37FormView
						loadWorking={p37.loadWorking}
						loadError={p37.loadError}
						{...rest}
					/>
				</DSGContext.Provider>
			</DSGMetaContext.Provider>
		</FormProvider>
	);
}

P37FormContainer.displayName = "P37FormContainer";
export default P37FormContainer;