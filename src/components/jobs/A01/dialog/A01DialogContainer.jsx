import { A01Context } from "@/contexts/A01/A01Context";
import A01 from "@/modules/A01.mjs";
import Colors from "@/modules/md-colors";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import A01DialogForm from "../form/A01DialogForm";
import { A01DialogToolbarContainer } from "./buttons/A01DialogToolbarContainer";
import { useCallback } from "react";
import A01Drawer from "../A01Drawer";
import { ResponsiveContext } from "@/shared-contexts/responsive/ResponsiveContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import useDebounce from "@/shared-hooks/useDebounce";

export const A01DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const _height = useMemo(() => {
		return height - 120
	}, [height])
	// MODE 1
	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});
	const { mobile } = useContext(ResponsiveContext);
	// MODE 2
	// const scrollable = useScrollable({
	// 	hide: true,
	// });
	// MODE 3
	// const scrollable = useScrollable({});

	const a01 = useContext(A01Context);

	const form = useForm({
		defaultValues: {},
	});
	const { reset } = form;

	const formMeta = useFormMeta(
		`
		ProdID,
		ProdData,
		InvData,
		Barcode,
		BarPR,
		catL,
		catM,
		catS,
		typeA,
		typeB,
		taxType,
		counter,
		StdCost,
		TranCost,
		LocalCost,
		OutCost,
		SafeQty,
		Location,
		cmsType,
		bunit,
		sunit,
		iunit,
		munit,
		SRate,
		IRate,
		MRate,
		Price,
		PriceA,
		PriceB,
		PriceC,
		PriceD,
		PriceE,
		`
	);

	const title = useMemo(() => {
		if (a01.mode === A01.Mode.NEW_PROD) {
			if (a01.creating) {
				return "新增新商品";
			} else if (a01.updating) {
				return "修改新商品";
			} else {
				return "新商品內容";
			}
		} else {
			if (a01.creating) {
				return "新增商品";
			} else if (a01.updating) {
				return a01.mode === A01.Mode.STORE
					? "調整櫃位/安全存量"
					: "修改商品";
			} else {
				return "商品內容";
			}
		}
	}, [a01.creating, a01.mode, a01.updating]);

	const storeMode = useMemo(() => {
		return a01.mode === A01.Mode.STORE;
	}, [a01.mode]);

	const formHeight = useMemo(() => {
		return mobile ? height - 120 : height - 190;
	}, [height, mobile]);

	const handleClose = useMemo(() => {
		return a01.editing ? a01.confirmDialogClose : a01.reset;
	}, [a01.confirmDialogClose, a01.editing, a01.reset]);

	const catL = useWatch({
		name: "catL",
		control: form.control,
	});

	const catM = useWatch({
		name: "catM",
		control: form.control,
	});

	// const prodData = useWatch({
	// 	name: "ProdData",
	// 	control: form.control
	// })

	// const debouncedProdData = useDebounce(prodData, 800)



	const isFieldDisabled = useCallback(
		(field) => {
			if (storeMode) {
				switch (field.name) {
					case "counter":
					case "SafeQty":
					case "cmsType":
						return false;
					default:
						return true;
				}
			} else {
				switch (field.name) {
					case "catM":
						return !catL || !a01.editing;
					case "catS":
						return !catM || !a01.editing;
					default:
						return !a01.editing;
				}
			}
		},
		[a01.editing, catL, catM, storeMode]
	);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(a01.onEditorSubmit, a01.onEditorSubmitError);
	}, [a01.onEditorSubmit, a01.onEditorSubmitError, form]);

	const handleInvDataFocused = useMemo(() => {
		return a01.handleInvDataFocused({ setValue: form.setValue, getValues: form.getValues });
	}, [a01, form.getValues, form.setValue])

	useEffect(() => {
		if (a01.itemDataReady) {
			console.log(`a01 form reset`, a01.itemData);
			reset(a01.itemData);
		}
	}, [a01.itemData, a01.itemDataReady, a01.readState, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				title={title}
				ref={ref}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={A01DialogToolbarContainer}
				open={a01.itemViewOpen}
				onClose={handleClose}
				// onReturn={a01.updating ? a01.confirmReturn : null}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: Colors.DIALOG_BG,
					},
				}}
				contentSx={[
					{
						paddingTop: 0,
						// minHeight: "30em",
					},
					scrollable.scroller,
				]}
				{...rest}>
				<FormMetaProvider
					{...formMeta}
					isFieldDisabled={isFieldDisabled}>
					<A01DialogForm
						onSubmit={onSubmit}
						creating={a01.creating}
						editing={a01.editing}
						updating={a01.updating}
						readWorking={a01.readWorking}
						readError={a01.readError}
						data={a01.itemData}
						itemDataReady={a01.itemDataReady}
						storeMode={storeMode}
						selectedTab={a01.selectedTab}
						handleTabChange={a01.handleTabChange}
						height={formHeight}
						transTabDisabled={a01.transTabDisabled}
						comboTabDisabled={a01.comboTabDisabled}
						handleInvDataFocused={handleInvDataFocused}
					/>
				</FormMetaProvider>
				<A01Drawer />
			</DialogExContainer>
		</FormProvider>
	);
});

A01DialogContainer.displayName = "A01DialogContainer";
