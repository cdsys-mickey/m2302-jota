import { D07Context } from "@/contexts/D07/D07Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import D07DialogForm from "./D07DialogForm";
import { D07DialogToolbarContainer } from "./toolbar/D07DialogToolbarContainer";
import Colors from "@/modules/md-colors";
import D07Drawer from "../D07Drawer";
import { keyColumn } from "react-datasheet-grid";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const D07DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const d07 = useContext(D07Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (d07.creating) {
			return "建立試算單";
		} else if (d07.updating) {
			return "修改試算單";
		} else {
			return "試算單內容";
		}
	}, [d07.creating, d07.updating]);

	const handleClose = useMemo(() => {
		return d07.creating
			? d07.confirmQuitCreating
			: d07.updating
				? d07.confirmQuitUpdating
				: d07.reading
					? d07.cancelAction
					: null;
	}, [
		d07.cancelAction,
		d07.confirmQuitCreating,
		d07.confirmQuitUpdating,
		d07.creating,
		d07.reading,
		d07.updating,
	]);

	const handleSubmit = form.handleSubmit(
		d07.onEditorSubmit,
		d07.onEditorSubmitError
	);

	const readOnly = useMemo(() => {
		return !d07.editing;
	}, [d07.editing]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						withStock: true,
						packageType: "m",
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
		data: d07.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const calId = useWatch({
		name: "CalID",
		control: form.control,
	});

	const calData = useWatch({
		name: "CalData",
		control: form.control,
	});

	const employee = useWatch({
		name: "employee",
		control: form.control,
	});

	const handleLastField = useCallback(() => {
		if (!calId) {
			toast.error("請先輸入試算單號", {
				position: "top-center",
			});
			form.setFocus("CalID");
			return;
		}
		if (!calData) {
			toast.error("請先輸入試算單名稱", {
				position: "top-center",
			});
			form.setFocus("CalData");
			return;
		}
		if (!employee) {
			toast.error("請先輸入編輯人員", {
				position: "top-center",
			});
			form.setFocus("employee");
			return;
		}

		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [calData, calId, employee, form, gridMeta]);

	const formMeta = useFormMeta(
		`
		CalID,
		CalData,
		employee,
		`,
		{
			lastField: handleLastField,
		}
	);

	useEffect(() => {
		if (d07.itemDataReady) {
			console.log("d07 form reset", d07.itemData);
			reset(d07.itemData);
		}
	}, [d07.itemData, d07.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={D07DialogToolbarContainer}
				open={d07.itemViewOpen}
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
					// isFieldDisabled={isFieldDisabled}
					gridMeta={gridMeta}
					readOnly={readOnly}
				>
					<D07DialogForm
						onSubmit={handleSubmit}
						creating={d07.creating}
						editing={d07.editing}
						updating={d07.updating}
						readWorking={d07.readWorking}
						readError={d07.readError}
						data={d07.itemData}
						itemDataReady={d07.itemDataReady}
					/>
				</FormMetaProvider>
				<D07Drawer />
			</DialogExContainer>
		</FormProvider>
	);
});

D07DialogContainer.displayName = "D07DialogContainer";
