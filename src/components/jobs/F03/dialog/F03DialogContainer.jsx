import { F03Context } from "@/contexts/F03/F03Context";
import { toastEx } from "@/helpers/toastEx";
import Colors from "@/modules/Colors.mjs";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useCallback, useContext, useEffect, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import F03Drawer from "../F03Drawer";
import F03DialogForm from "./F03DialogForm";
import { F03DialogToolbarContainer } from "./toolbar/F03DialogToolbarContainer";

export const F03DialogContainer = forwardRef((props, ref) => {
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

	const f03 = useContext(F03Context);

	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (f03.creating) {
			return "建立盤點清單";
		} else if (f03.updating) {
			return "修改盤點清單";
		} else {
			return "盤點清單內容";
		}
	}, [f03.creating, f03.updating]);

	const handleClose = useMemo(() => {
		return f03.creating
			? f03.confirmQuitCreating
			: f03.updating
				? f03.confirmQuitUpdating
				: f03.reading
					? f03.cancelAction
					: null;
	}, [
		f03.cancelAction,
		f03.confirmQuitCreating,
		f03.confirmQuitUpdating,
		f03.creating,
		f03.reading,
		f03.updating,
	]);

	const handleSubmit = form.handleSubmit(
		f03.onEditorSubmit,
		f03.onEditorSubmitError
	);

	const readOnly = useMemo(() => {
		return !f03.editing;
	}, [f03.editing]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"SProdID",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "貨品編號",
				minWidth: 120,
				maxWidth: 120,
				disabled: true,
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
				grow: 2
			},
			{
				...keyColumn(
					"PackData_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				minWidth: 60,
				maxWidth: 60,
				title: "包裝",
				disabled: true,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "數量",
				minWidth: 90,
				maxWidth: 90,
				grow: 1,
				disabled: readOnly,
				// 與 tab 衝突
				// disableKeys: true
			},
		],
		[readOnly]
	);

	const gridMeta = useDSGMeta({
		data: f03.grid.gridData,
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
			toastEx.error("請先輸入盤點清單號");
			form.setFocus("CalID");
			return;
		}
		if (!calData) {
			toastEx.error("請先輸入盤點清單名稱");
			form.setFocus("CalData");
			return;
		}
		if (!employee) {
			toastEx.error("請先輸入編輯人員");
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
		if (f03.itemDataReady) {
			console.log("f03 form reset", f03.itemData);
			reset(f03.itemData);
		}
	}, [f03.itemData, f03.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen={f03.editing}
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={F03DialogToolbarContainer}
				open={f03.itemViewOpen}
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
					<F03DialogForm
						onSubmit={handleSubmit}
						creating={f03.creating}
						editing={f03.editing}
						updating={f03.updating}
						readWorking={f03.readWorking}
						readError={f03.readError}
						data={f03.itemData}
						itemDataReady={f03.itemDataReady}
					/>
				</FormMetaProvider>
				<F03Drawer />
			</DialogExContainer>
		</FormProvider>
	);
});

F03DialogContainer.displayName = "F03DialogContainer";

