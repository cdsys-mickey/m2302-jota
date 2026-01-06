import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { BContext } from "@/contexts/B/BContext";
import { B02Context } from "@/contexts/B02/B02Context";
import { B04Context } from "@/contexts/B04/B04Context";
import { toastEx } from "shared-components/toast-ex";
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
import B02Drawer from "../B02Drawer";
import B02DialogForm from "./B02DialogForm";
import { B02DialogToolbarContainer } from "./toolbar/B02DialogToolbarContainer";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const B02DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useFormContext({
		defaultValues: {
			quotes: [],
		},
	});
	const { reset } = form;

	const b = useContext(BContext);
	const b02 = useContext(b.forNew ? B04Context : B02Context);
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
		if (b02.creating) {
			return "建立詢價單";
		} else if (b02.updating) {
			return "修改詢價單";
		} else {
			return "詢價單內容";
		}
	}, [b02.creating, b02.updating]);

	const handleClose = useMemo(() => {
		return b02.creating
			? b02.confirmQuitCreating
			: b02.updating
				? b02.confirmQuitUpdating
				: b02.reading
					? b02.cancelAction
					: null;
	}, [
		b02.cancelAction,
		b02.confirmQuitCreating,
		b02.confirmQuitUpdating,
		b02.creating,
		b02.reading,
		b02.updating,
	]);

	const handleSubmit = form.handleSubmit(
		b02.onEditorSubmit,
		b02.onEditorSubmitError
	);

	const readOnly = useMemo(() => {
		return !b02.editing || !supplier || !inqDate || !employee;
	}, [b02.editing, employee, inqDate, supplier]);

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
				minWidth: 130,
				maxWidth: 150,
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
		data: b02.grid.gridData,
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
		if (b02.itemDataReady) {
			console.log("b02 form reset", b02.itemData);
			reset(b02.itemData);
		}
	}, [b02.itemData, b02.itemDataReady]);

	return (
		<DialogEx
			ref={ref}
			title={memoisedTitle}
			// fullScreen
			responsive
			fullWidth
			maxWidth="md"
			TitleButtonsComponent={B02DialogToolbarContainer}
			open={b02.itemViewOpen}
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
						<B02DialogForm
							creating={b02.creating}
							editing={b02.editing}
							updating={b02.updating}
							readWorking={b02.readWorking}
							readError={b02.readError}
							data={b02.itemData}
							itemDataReady={b02.itemDataReady}
						/>

					</FormMetaProvider>
				</form>
			</FormProvider>
			{/* 側邊欄 */}
			<B02Drawer />
		</DialogEx>
	);
});

B02DialogContainer.displayName = "B02DialogContainer";


