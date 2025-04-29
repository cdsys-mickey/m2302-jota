import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { G02Context } from "@/modules/G02/G02Context";
import { toastEx } from "@/helpers/toastEx";
import Colors from "@/modules/Colors.mjs";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useCallback, useContext, useEffect, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import G02Drawer from "../G02Drawer";
import G02DialogForm from "./G02DialogForm";
import { G02DialogToolbarContainer } from "./toolbar/G02DialogToolbarContainer";

export const G02DialogContainer = forwardRef((props, ref) => {
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

	const g02 = useContext(G02Context);
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
		if (g02.creating) {
			return "建立詢價單";
		} else if (g02.updating) {
			return "修改詢價單";
		} else {
			return "詢價單內容";
		}
	}, [g02.creating, g02.updating]);

	const handleClose = useMemo(() => {
		return g02.creating
			? g02.confirmQuitCreating
			: g02.updating
				? g02.confirmQuitUpdating
				: g02.reading
					? g02.cancelAction
					: null;
	}, [
		g02.cancelAction,
		g02.confirmQuitCreating,
		g02.confirmQuitUpdating,
		g02.creating,
		g02.reading,
		g02.updating,
	]);

	const handleSubmit = form.handleSubmit(
		g02.onEditorSubmit,
		g02.onEditorSubmitError
	);

	const readOnly = useMemo(() => {
		return !g02.editing || !supplier || !inqDate || !employee;
	}, [g02.editing, employee, inqDate, supplier]);

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
				minWidth: 180,
				maxWidth: 180,
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
				maxWidth: 120,
				disabled: readOnly,
			},
		],
		[readOnly]
	);

	const gridMeta = useDSGMeta({
		data: g02.grid.gridData,
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
		if (g02.itemDataReady) {
			console.log("g02 form reset", g02.itemData);
			reset(g02.itemData);
		}
	}, [g02.itemData, g02.itemDataReady, reset]);

	return (
		<DialogExContainer
			ref={ref}
			title={memoisedTitle}
			// fullScreen
			responsive
			fullWidth
			maxWidth="md"
			TitleButtonsComponent={G02DialogToolbarContainer}
			open={g02.itemViewOpen}
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
						<G02DialogForm
							creating={g02.creating}
							editing={g02.editing}
							updating={g02.updating}
							readWorking={g02.readWorking}
							readError={g02.readError}
							data={g02.itemData}
							itemDataReady={g02.itemDataReady}
						/>

					</FormMetaProvider>
				</form>
			</FormProvider>
			{/* 側邊欄 */}
			<G02Drawer />
		</DialogExContainer>
	);
});

G02DialogContainer.displayName = "G02DialogContainer";

