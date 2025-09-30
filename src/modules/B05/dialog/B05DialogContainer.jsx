import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { B05Context } from "@/modules/B05/B05Context";
import toastEx from "@/helpers/toastEx";
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
import B05Drawer from "../B05Drawer";
import B05DialogForm from "./B05DialogForm";
import { B05DialogToolbarContainer } from "./toolbar/B05DialogToolbarContainer";
import { useHotkeys } from "react-hotkeys-hook";

export const B05DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const _height = useMemo(() => {
		return height - 120
	}, [height])
	const form = useFormContext({
		defaultValues: {
			quotes: [],
		},
	});
	const { reset } = form;

	const b05 = useContext(B05Context);
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
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (b05.creating) {
			return "建立詢價單";
		} else if (b05.updating) {
			return "修改詢價單";
		} else {
			return "詢價單內容";
		}
	}, [b05.creating, b05.updating]);

	const handleClose = useMemo(() => {
		return b05.creating
			? b05.confirmQuitCreating
			: b05.updating
				? b05.confirmQuitUpdating
				: b05.reading
					? b05.cancelAction
					: null;
	}, [
		b05.cancelAction,
		b05.confirmQuitCreating,
		b05.confirmQuitUpdating,
		b05.creating,
		b05.reading,
		b05.updating,
	]);

	const handleSubmit = useCallback(() => {
		if (b05.editing) {
			form.handleSubmit(
				b05.onEditorSubmit,
				b05.onEditorSubmitError
			)();
		}
	}, [b05.editing, b05.onEditorSubmit, b05.onEditorSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const readOnly = useMemo(() => {
		return !b05.editing || !supplier || !inqDate || !employee;
	}, [b05.editing, employee, inqDate, supplier]);

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
		data: b05.grid.gridData,
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

	useEffect(() => {
		if (b05.itemDataReady) {
			console.log("b05 form reset", b05.itemData);
			reset(b05.itemData);
		}
	}, [b05.itemData, b05.itemDataReady, reset]);

	return (
		<DialogEx
			ref={ref}
			title={memoisedTitle}
			// fullScreen
			responsive
			fullWidth
			maxWidth="md"
			TitleButtonsComponent={B05DialogToolbarContainer}
			open={b05.itemViewOpen}
			onClose={handleClose}
			// onReturn={handleReturn}
			sx={{
				"& .MuiDialog-paper": {
					backgroundColor: Colors.DIALOG_BG,
				},
			}}
			contentSx={[
				{
					// minHeight: "30em",
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
						<B05DialogForm
							creating={b05.creating}
							editing={b05.editing}
							updating={b05.updating}
							readWorking={b05.readWorking}
							readError={b05.readError}
							data={b05.itemData}
							itemDataReady={b05.itemDataReady}
						/>

					</FormMetaProvider>
				</form>
			</FormProvider>
			{/* 側邊欄 */}
			<B05Drawer />
		</DialogEx>
	);
});

B05DialogContainer.displayName = "B05DialogContainer";
