import { D02Context } from "@/contexts/D02/D02Context";
import { DialogEx } from "@/shared-components";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import D02DialogForm from "./D02DialogForm";
import { D02DialogToolbarContainer } from "./toolbar/D02DialogToolbarContainer";
import Colors from "@/modules/Colors.mjs";
import D02Drawer from "../D02Drawer";
import { keyColumn } from "react-datasheet-grid";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useCallback } from "react";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-components";
import { useHotkeys } from "react-hotkeys-hook";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const D02DialogContainer = forwardRef((props, ref) => {
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
	const pdline = useWatch({
		name: "pdline",
		control: form.control,
	});

	const d02 = useContext(D02Context);

	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (d02.creating) {
			return "建立退料單";
		} else if (d02.updating) {
			return "修改退料單";
		} else {
			return "退料單內容";
		}
	}, [d02.creating, d02.updating]);

	const handleClose = useMemo(() => {
		return d02.creating
			? d02.confirmQuitCreating
			: d02.updating
				? d02.confirmQuitUpdating
				: d02.reading
					? d02.cancelAction
					: null;
	}, [
		d02.cancelAction,
		d02.confirmQuitCreating,
		d02.confirmQuitUpdating,
		d02.creating,
		d02.reading,
		d02.updating,
	]);

	const readOnly = useMemo(() => {
		return !d02.editing || !pdline;
	}, [d02.editing, pdline]);

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
						disableClearable: true,
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
		data: d02.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		gridMeta.setActiveCell({ row: 0, col: 0 })
	}, [gridMeta]);

	const formMeta = useFormMeta(
		`
		employee,
		RetDate,
		pdline
		`, {
		lastField: handleLastField
	}
	)

	const handleSubmit = useCallback(() => {
		if (d02.editing) {
			form.handleSubmit(
				d02.onEditorSubmit,
				d02.onEditorSubmitError
			)();
		}
	}, [d02.editing, d02.onEditorSubmit, d02.onEditorSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	useChangeTracking(() => {
		if (d02.itemDataReady) {
			console.log("d02 form reset", d02.itemData);
			reset(d02.itemData);
		}
	}, [d02.itemData, d02.itemDataReady]);

	return (
		<FormProvider {...form}>
			<DialogEx
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={D02DialogToolbarContainer}
				open={d02.itemViewOpen}
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
				<FormMetaProvider {...formMeta} gridMeta={gridMeta} readOnly={readOnly}>
					<D02DialogForm
						onSubmit={handleSubmit}
						creating={d02.creating}
						editing={d02.editing}
						updating={d02.updating}
						readWorking={d02.readWorking}
						readError={d02.readError}
						data={d02.itemData}
						itemDataReady={d02.itemDataReady}
					/>
				</FormMetaProvider>
				<D02Drawer />
			</DialogEx>
		</FormProvider>
	);
});

D02DialogContainer.displayName = "D02DialogContainer";
