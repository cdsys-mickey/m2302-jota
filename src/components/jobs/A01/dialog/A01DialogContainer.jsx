import { A01Context } from "@/contexts/A01/A01Context";
import A01 from "@/modules/md-a01";
import Colors from "@/modules/md-colors";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { FormManagerProvider } from "@/shared-contexts/form-manager/FormManagerProvider";
import A01Form from "../form/A01Form";
import { A01DialogToolbarContainer } from "./buttons/A01DialogToolbarContainer";
import { useCallback } from "react";

export const A01DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	// MODE 1
	const scrollable = useScrollable({
		height: height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});
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
					? "修改商品櫃位"
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
		return height - 190;
	}, [height]);

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

	const isDisabled = useCallback(
		(name) => {
			switch (name) {
				case "catM":
					return !catL;
				case "catS":
					return !catM;
				default:
					return false;
			}
		},
		[catL, catM]
	);

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
						minHeight: "30em",
					},
					scrollable.scroller,
				]}
				{...rest}>
				<FormManagerProvider
					{...a01.formManager}
					isDisabled={isDisabled}>
					<A01Form
						onSubmit={form.handleSubmit(
							a01.onEditorSubmit,
							a01.onEditorSubmitError
						)}
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
					/>
				</FormManagerProvider>
			</DialogExContainer>
		</FormProvider>
	);
});

A01DialogContainer.displayName = "A01DialogContainer";
