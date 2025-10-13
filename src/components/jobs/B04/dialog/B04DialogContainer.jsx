import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { B04Context } from "@/contexts/B04/B04Context";
import toastEx from "@/shared-components/ToastEx/toastEx";
import Colors from "@/modules/Colors.mjs";
import { DialogEx } from "@/shared-components";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useCallback, useContext, useEffect, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import B04Drawer from "../B04Drawer";
import B04DialogForm from "./B04DialogForm";
import { B04DialogToolbarContainer } from "./toolbar/B04DialogToolbarContainer";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const B04DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useFormContext({
		defaultValues: {
			quotes: [],
		},
	});
	const { reset } = form;

	const b04 = useContext(B04Context);
	const inqDate = useWatch({
		name: "InqDate",
		control: form.control
	})

	const employee = useWatch({
		name: "employee",
		control: form.control
	})
	const supplier = useWatch({
		name: "supplier",
		control: form.control
	})

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (b04.creating) {
			return "建立詢價單";
		} else if (b04.updating) {
			return "修改詢價單";
		} else {
			return "詢價單內容";
		}
	}, [b04.creating, b04.updating]);

	const handleClose = useMemo(() => {
		return b04.creating
			? b04.confirmQuitCreating
			: b04.updating
				? b04.confirmQuitUpdating
				: b04.reading
					? b04.cancelAction
					: null;
	}, [
		b04.cancelAction,
		b04.confirmQuitCreating,
		b04.confirmQuitUpdating,
		b04.creating,
		b04.reading,
		b04.updating,
	]);

	const handleSubmit = form.handleSubmit(
		b04.onEditorSubmit,
		b04.onEditorSubmitError
	);

	const readOnly = useMemo(() => {
		return !b04.editing || !supplier || !inqDate || !employee;
	}, [b04.editing, employee, inqDate, supplier]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						packageType: "s",
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
				minWidth: 122,
				maxWidth: 140,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"SProdData_N",
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
					"SPackData_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "包裝說明",
				minWidth: 120,
				maxWidth: 120,
				disabled: true,
			},
			{
				...keyColumn("SPrice", createFloatColumn(2)),
				title: "廠商報價",
				minWidth: 120,
				// maxWidth: 120,
				disabled: readOnly,
			},
		],
		[readOnly]
	);

	const gridMeta = useDSGMeta({
		data: b04.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		if (!inqDate) {
			toastEx.error("請先輸入詢價日期");
			form.setFocus("InqDate");
			return;
		}
		if (!employee) {
			toastEx.error("請先輸入詢價人員");
			form.setFocus("employee");
			return;
		}
		if (!supplier) {
			toastEx.error("請先輸入廠商代碼");
			form.setFocus("supplier");
			return;
		}
		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [employee, form, gridMeta, inqDate, supplier]);

	const formMeta = useFormMeta(
		`
		InqDate,
		employee,
		supplier,
		`,
		{
			lastField: handleLastField
		}
	);

	useChangeTracking(() => {
		if (b04.itemDataReady) {
			console.log("b04 form reset", b04.itemData);
			reset(b04.itemData);
		}
	}, [b04.itemData, b04.itemDataReady]);

	return (
		<DialogEx
			ref={ref}
			title={memoisedTitle}
			// fullScreen
			responsive
			fullWidth
			maxWidth="md"
			TitleButtonsComponent={B04DialogToolbarContainer}
			open={b04.itemViewOpen}
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
			<FormProvider {...form}>
				<form onSubmit={handleSubmit}>
					<FormMetaProvider {...formMeta} gridMeta={gridMeta} readOnly={readOnly}>
						<B04DialogForm
							creating={b04.creating}
							editing={b04.editing}
							updating={b04.updating}
							readWorking={b04.readWorking}
							readError={b04.readError}
							data={b04.itemData}
							itemDataReady={b04.itemDataReady}
						/>

					</FormMetaProvider>
				</form>
			</FormProvider>
			{/* 側邊欄 */}
			<B04Drawer />
		</DialogEx>
	);
});

B04DialogContainer.displayName = "B04DialogContainer";



