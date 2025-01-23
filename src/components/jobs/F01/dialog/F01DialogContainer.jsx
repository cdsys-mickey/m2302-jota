import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { F01Context } from "@/contexts/F01/F01Context";
import { toastEx } from "@/helpers/toast-ex";
import Colors from "@/modules/md-colors";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
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
import F01Drawer from "../F01Drawer";
import F01DialogForm from "./F01DialogForm";
import { F01DialogToolbarContainer } from "./toolbar/F01DialogToolbarContainer";

export const F01DialogContainer = forwardRef((props, ref) => {
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

	const f01 = useContext(F01Context);
	const PhyID = useWatch({
		name: "PhyID",
		control: form.control
	})

	const employee = useWatch({
		name: "employee",
		control: form.control
	})
	const PhyData = useWatch({
		name: "PhyData",
		control: form.control
	})

	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (f01.creating) {
			return "建立盤點清單";
		} else if (f01.updating) {
			return "修改盤點清單";
		} else {
			return "盤點清單內容";
		}
	}, [f01.creating, f01.updating]);

	const handleClose = useMemo(() => {
		return f01.creating
			? f01.confirmQuitCreating
			: f01.updating
				? f01.confirmQuitUpdating
				: f01.reading
					? f01.cancelAction
					: null;
	}, [
		f01.cancelAction,
		f01.confirmQuitCreating,
		f01.confirmQuitUpdating,
		f01.creating,
		f01.reading,
		f01.updating,
	]);

	const handleSubmit = form.handleSubmit(
		f01.onEditorSubmit,
		f01.onEditorSubmitError
	);

	const readOnly = useMemo(() => {
		return !f01.editing || !PhyID || !PhyData || !employee;
	}, [f01.editing, PhyID, PhyData, employee]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						// packageType: "s",
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
					"ProdData_N",
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
				title: "包裝說明",
				minWidth: 120,
				maxWidth: 120,
				disabled: true,
			},

		],
		[readOnly]
	);

	const gridMeta = useDSGMeta({
		data: f01.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		if (!PhyID) {
			toastEx.error("請先輸入清單編號");
			form.setFocus("PhyID");
			return;
		}
		if (!employee) {
			toastEx.error("請先輸入製單人員");
			form.setFocus("employee");
			return;
		}
		if (!PhyData) {
			toastEx.error("請先輸入清單名稱");
			form.setFocus("PhyData");
			return;
		}
		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [PhyID, employee, PhyData, gridMeta, form]);

	const formMeta = useFormMeta(
		`
		PhyID,
		employee,
		PhyData,
		Order
		`,
		{
			lastField: handleLastField
		}
	);

	useEffect(() => {
		if (f01.itemDataReady) {
			console.log("f01 form reset", f01.itemData);
			reset(f01.itemData);
		}
	}, [f01.itemData, f01.itemDataReady, reset]);

	return (
		<DialogExContainer
			ref={ref}
			title={memoisedTitle}
			// fullScreen
			responsive
			fullWidth
			maxWidth="md"
			TitleButtonsComponent={F01DialogToolbarContainer}
			open={f01.itemViewOpen}
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
						<F01DialogForm
							creating={f01.creating}
							editing={f01.editing}
							updating={f01.updating}
							readWorking={f01.readWorking}
							readError={f01.readError}
							data={f01.itemData}
							itemDataReady={f01.itemDataReady}
						/>

					</FormMetaProvider>
				</form>
			</FormProvider>
			{/* 側邊欄 */}
			<F01Drawer />
		</DialogExContainer>
	);
});

F01DialogContainer.displayName = "F01DialogContainer";

