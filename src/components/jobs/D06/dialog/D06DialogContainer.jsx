import { D06Context } from "@/contexts/D06/D06Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import D06DialogForm from "./D06DialogForm";
import { D06DialogToolbarContainer } from "./toolbar/D06DialogToolbarContainer";
import Colors from "@/modules/Colors.mjs";
import D06Drawer from "../D06Drawer";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useCallback } from "react";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useHotkeys } from "react-hotkeys-hook";

export const D06DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const _height = useMemo(() => {
		return height - 120
	}, [height])
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const d06 = useContext(D06Context);

	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (d06.creating) {
			return "建立結餘單";
		} else if (d06.updating) {
			return "修改結餘單";
		} else {
			return "結餘單內容";
		}
	}, [d06.creating, d06.updating]);

	const handleClose = useMemo(() => {
		return d06.creating
			? d06.confirmQuitCreating
			: d06.updating
				? d06.confirmQuitUpdating
				: d06.reading
					? d06.cancelAction
					: null;
	}, [
		d06.cancelAction,
		d06.confirmQuitCreating,
		d06.confirmQuitUpdating,
		d06.creating,
		d06.reading,
		d06.updating,
	]);

	const handleSubmit = form.handleSubmit(
		d06.onEditorSubmit,
		d06.onEditorSubmitError
	);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const readOnly = useMemo(() => {
		return !d06.editing;
	}, [d06.editing]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						withStock: true,
						packageType: "b",
						forId: true,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
					})
				),
				title: "商品編號",
				minWidth: 160,
				maxWidth: 160,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"ProdData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "品名規格",
				disabled: true,
				grow: 2,
			},
			{
				...keyColumn(
					"PackData_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				minWidth: 60,
				title: "包裝",
				disabled: true,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly,
			},
		],
		[readOnly]
	);

	const gridMeta = useDSGMeta({
		data: d06.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {

		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [gridMeta]);

	const formMeta = useFormMeta(
		`
		employee,
		RemDate,
		InitDate,
		pdline,

		`,
		{
			lastField: handleLastField
		}
	)

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "InitDate":
					return true;
				default:
					return false;
			}
		},
		[]
	);

	useEffect(() => {
		if (d06.itemDataReady) {
			console.log("d06 form reset", d06.itemData);
			reset(d06.itemData);
		}
	}, [d06.itemData, d06.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={D06DialogToolbarContainer}
				open={d06.itemViewOpen}
				onClose={handleClose}
				// onReturn={handleReturn}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: Colors.DIALOG_BG,
					},
				}}
				contentSx={[
					{
						minHeight: "30em",
						paddingTop: 0,
						// paddingLeft: 0,
						// paddingRight: 0,
					},
					scrollable.scroller,
				]}
				{...rest}>
				<FormMetaProvider
					{...formMeta}
					isFieldDisabled={isFieldDisabled}
					gridMeta={gridMeta}
					readOnly={readOnly}
				>
					<D06DialogForm
						onSubmit={handleSubmit}
						creating={d06.creating}
						editing={d06.editing}
						updating={d06.updating}
						readWorking={d06.readWorking}
						readError={d06.readError}
						data={d06.itemData}
						itemDataReady={d06.itemDataReady}
						handleRemDateChanged={d06.handleRemDateChanged({
							setValue: form.setValue,
						})}
					// validateDate={d06.validateDate}
					/>
				</FormMetaProvider>
				<D06Drawer />
			</DialogExContainer>
		</FormProvider>
	);
});

D06DialogContainer.displayName = "D06DialogContainer";
