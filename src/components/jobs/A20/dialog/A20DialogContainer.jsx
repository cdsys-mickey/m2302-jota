import { A20Context } from "@/contexts/A20/A20Context";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import A20Form from "../form/A20Form";
import { A20DialogButtonsContainer } from "./buttons/A20DialogButtonsContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import Colors from "@/modules/md-colors";
import { FormMetaProvider } from "../../../../shared-contexts/form-meta/FormMetaProvider";
import MuiStyles from "@/shared-modules/sd-mui-styles";
import A20Drawer from "../A20Drawer";
import { keyColumn } from "react-datasheet-grid";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";

export const A20DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const form = useForm({
		defaultValues: {},
	});
	const { reset } = form;
	const a20 = useContext(A20Context);
	const { height } = useWindowSize();

	const title = useMemo(() => {
		if (a20.creating) {
			return "新增";
		} else if (a20.updating) {
			return "修改";
		} else {
			return "內容";
		}
	}, [a20.creating, a20.updating]);

	const scrollable = useScrollable({
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
		height: height - 100,
	});

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			a20.onEditorSubmit,
			a20.onEditorSubmitError
		)
	}, [a20.onEditorSubmit, a20.onEditorSubmitError, form])

	const prod = useWatch({
		name: "prod",
		control: form.control
	})

	const readOnly = useMemo(() => {
		return !a20.editing || !prod;
	}, [a20.editing, prod]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"sprod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "sprod",
						packageType: "m",
						// placeholder: "組合商品",
						// typeToSearchText: "請輸入商品編號或名稱進行搜尋",
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
				minWidth: 170,
				maxWidth: 170,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"SProdData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "商品名稱",
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
				minWidth: 90,
				grow: 1,
				disabled: true,
			},
			{
				...keyColumn("SProdQty", createFloatColumn(2)),
				title: "標準用量",
				minWidth: 90,
				maxWidth: 90,
				disabled: readOnly,
			},
		],
		[readOnly]
	);

	const gridMeta = useDSGMeta({
		data: a20.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		if (!prod) {
			toast.error("請先選擇商品", {
				position: "top-center",
			});
			form.setFocus("prod");
			return;
		}

		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [form, gridMeta, prod]);

	const formMeta = useFormMeta(
		`
		prod,
		ProdQty
		`,
		{
			lastField: handleLastField
		}
	);

	useEffect(() => {
		if (a20.itemDataReady) {
			console.log(`a20 form reset`, a20.itemData);
			reset(a20.itemData);
		}
	}, [a20.itemData, a20.itemDataReady, a20.readState, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				title={title}
				ref={ref}
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={A20DialogButtonsContainer}
				open={a20.itemViewOpen}
				onClose={
					a20.editing ? a20.confirmDialogClose : a20.cancelAction
				}
				// onReturn={a20.updating ? a20.confirmReturn : null}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: Colors.DIALOG_BG,
					},
				}}
				contentSx={[
					{
						minHeight: "30em",
					},
					scrollable.scroller,
				]}
				{...rest}>
				<FormMetaProvider
					{...formMeta}
					gridMeta={gridMeta}
					readOnly={readOnly}
				>
					<form {...rest} onSubmit={handleSubmit}>
						<A20Form
							ref={ref}
							editing={a20.editing}
							updating={a20.updating}
							readWorking={a20.readWorking}
							readError={a20.readError}
							data={a20.itemData}
							itemDataReady={a20.itemDataReady}
						/>
					</form>
				</FormMetaProvider>
				<A20Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogExContainer>
		</FormProvider >
	);
});

A20DialogContainer.displayName = "A20DialogContainer";
