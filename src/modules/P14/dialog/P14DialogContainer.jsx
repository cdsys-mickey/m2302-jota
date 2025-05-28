import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { toastEx } from "@/helpers/toastEx";
import Colors from "@/modules/Colors.mjs";
import { P14Context } from "@/modules/P14/P14Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { createCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxColumn";
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
import P14Drawer from "../P14Drawer";
import P14DialogForm from "./P14DialogForm";
import { P14DialogToolbarContainer } from "./toolbar/P14DialogToolbarContainer";
import { useHotkeys } from "react-hotkeys-hook";

export const P14DialogContainer = forwardRef((props, ref) => {
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

	const p14 = useContext(P14Context);
	const ItmID = useWatch({
		name: "ItmID",
		control: form.control
	})

	const ItmData = useWatch({
		name: "ItmData",
		control: form.control
	})

	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (p14.creating) {
			return "建立列印品項";
		} else if (p14.updating) {
			return "修改列印品項";
		} else {
			return "列印品項內容";
		}
	}, [p14.creating, p14.updating]);

	const handleClose = useMemo(() => {
		return p14.creating
			? p14.confirmQuitCreating
			: p14.updating
				? p14.confirmQuitUpdating
				: p14.reading
					? p14.cancelAction
					: null;
	}, [
		p14.cancelAction,
		p14.confirmQuitCreating,
		p14.confirmQuitUpdating,
		p14.creating,
		p14.reading,
		p14.updating,
	]);

	const handleSubmit = form.handleSubmit(
		p14.onEditorSubmit,
		p14.onEditorSubmitError
	);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const readOnly = useMemo(() => {
		return !p14.editing;
	}, [p14.editing]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						packageType: "_",
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
			...(p14.duplicating ? [
				{
					...keyColumn("Repeat_N", createTextColumnEx({
						continuousUpdates: false,
					})),
					minWidth: 38,
					maxWidth: 38,
					title: "重覆",
					disabled: true,
					cellClassName: "star",
				},
			] : []),
			...(p14.duplicating ? [
				{
					...keyColumn(
						"Force",
						createCheckboxColumn({
							size: "medium",
						})
					),
					title: "強制",
					minWidth: 40,
					maxWidth: 40,
					disabled: readOnly || p14.forceDisabled,
				}
			] : []),
			...(p14.duplicating ? [
				{
					...keyColumn(
						"OItmID_N",
						createTextColumnEx({
							continuousUpdates: false,
						})
					),
					title: "序號",
					minWidth: 40,
					maxWidth: 40,
					disabled: true,
				},
			] : []),
			...(p14.duplicating ? [
				{
					...keyColumn(
						"OItmData_N",
						createTextColumnEx({
							continuousUpdates: false,
						})
					),
					title: "品項列印名稱",
					minWidth: 120,
					maxWidth: 120,
					disabled: true,
				},
			] : []),
		],
		[p14.duplicating, p14.forceDisabled, readOnly]
	);

	const gridMeta = useDSGMeta({
		data: p14.grid.gridData,
		grid: p14.grid,
		// setGridData: p14.grid.setGridData,
		columns,
		createRow: p14.createRow,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		if (!ItmID) {
			toastEx.error("請先輸入品項編號");
			form.setFocus("ItmID");
			return;
		}
		if (!ItmData) {
			toastEx.error("請先輸入品項名稱");
			form.setFocus("ItmData");
			return;
		}
		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [ItmID, ItmData, gridMeta, form]);

	const formMeta = useFormMeta(
		`
		ItmID,
		ItmData,
		`,
		{
			lastField: handleLastField
		}
	);

	useEffect(() => {
		if (p14.itemDataReady) {
			console.log("p14 form reset", p14.itemData);
			reset(p14.itemData);
		}
	}, [p14.itemData, p14.itemDataReady, reset]);

	return (
		<DialogExContainer
			ref={ref}
			title={memoisedTitle}
			// fullScreen
			responsive
			fullWidth
			maxWidth="md"
			TitleButtonsComponent={P14DialogToolbarContainer}
			open={p14.itemViewOpen}
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
						<P14DialogForm
							creating={p14.creating}
							editing={p14.editing}
							updating={p14.updating}
							readWorking={p14.readWorking}
							readError={p14.readError}
							data={p14.itemData}
							itemDataReady={p14.itemDataReady}
						/>

					</FormMetaProvider>
				</form>
			</FormProvider>
			{/* 側邊欄 */}
			<P14Drawer />
		</DialogExContainer>
	);
});

P14DialogContainer.displayName = "P14DialogContainer";


