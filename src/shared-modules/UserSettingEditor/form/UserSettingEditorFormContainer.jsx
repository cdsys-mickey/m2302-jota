import TourGroupTypes from "@/components/TourGroupTypePicker/TourGroupTypes.mjs";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import DSGMetaContext from "@/shared-contexts/datasheet-grid/DSGMetaContext";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useInit } from "@/shared-hooks/useInit";
import { useContext, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import UserSettingEditorContext from "../context/UserSettingEditorContext";
import UserSettingEditorFormView from "./UserSettingEditorFormView";

const UserSettingEditorFormContainer = (props) => {
	const { ...rest } = props;
	const userSettingEditor = useContext(UserSettingEditorContext);
	const form = useForm({
		defaultValues: {

		}
	});

	const readOnly = useMemo(() => {
		return userSettingEditor.grid.readOnly;
	}, [userSettingEditor.grid.readOnly])

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"id",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "項目",
				disabled: true,
				minWidth: 70,
				maxWidth: 70,
			},
			{
				...keyColumn(
					"label",
					createTextColumnEx({
						// alignRight: true
					})
				),
				title: "名稱",
				disabled: readOnly,
				grow: 1,
			},
		],
		[readOnly]
	);

	// GRID
	const gridMeta = useDSGMeta({
		data: userSettingEditor.grid.gridData,
		columns: columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		grid: userSettingEditor.grid
	});

	const handleSubmit = form.handleSubmit(userSettingEditor.onEditorSubmit, userSettingEditor.onEditorSubmitError);
	useHotkeys(["Control+Enter"], () => {
		if (!userSettingEditor.grid.readOnly) {
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
		userSettingEditor.loadItem({ id: tourGroupType })
	}, [tourGroupType]);

	useInit(() => {
		userSettingEditor.loadItem({ id: TourGroupTypes.getDefaultValue() });
	}, []);

	const contextValue = useMemo(() => ({
		...userSettingEditor.grid,
		...gridMeta,
		readOnly: !userSettingEditor.editing
	}), [gridMeta, userSettingEditor.editing, userSettingEditor.grid])

	return (
		<FormProvider {...form}>
			<DSGMetaContext.Provider value={gridMeta}>
				<DSGContext.Provider
					value={contextValue}>
					<UserSettingEditorFormView
						loadWorking={userSettingEditor.loadWorking}
						loadError={userSettingEditor.loadError}
						{...rest}
					/>
				</DSGContext.Provider>
			</DSGMetaContext.Provider>
		</FormProvider>
	);
}

UserSettingEditorFormContainer.displayName = "UserSettingEditorFormContainer";
export default UserSettingEditorFormContainer;
