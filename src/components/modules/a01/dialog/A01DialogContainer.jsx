import { A01Context } from "@/contexts/A01/A01Context";
import DialogEx from "@/shared-components/dialog/DialogEx";
import { forwardRef, useContext, useMemo } from "react";
import A01 from "../../../../modules/md-a01";
import { A01DialogTitleButtonsContainer } from "./buttons/A01DialogTitleButtonsContainer";
import { FormProvider, useForm } from "react-hook-form";
import A01Form from "../form/A01Form";
import { useEffect } from "react";
import ActionState from "../../../../shared-constants/action-state";
import { useScrollable } from "../../../../shared-hooks/useScrollable";
import { useWindowSize } from "../../../../shared-hooks/useWindowSize";
import { DialogExContainer } from "../../../../shared-components/dialog/DialogExContainer";

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
	const { setTabIndex } = a01;

	const forms = useForm({
		defaultValues: {},
	});

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

	const store = useMemo(() => {
		return a01.mode === A01.Mode.STORE;
	}, [a01.mode]);

	useEffect(() => {
		if (a01.readState === ActionState.DONE && !!a01.itemData) {
			// setTabIndex(A01.Tabs.INFO);
			console.log(`a01 form reset`, a01.itemData);
			forms.reset(a01.itemData);
		}
	}, [a01.itemData, a01.readState, forms, setTabIndex]);

	return (
		<FormProvider {...forms}>
			<DialogExContainer
				title={title}
				ref={ref}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={A01DialogTitleButtonsContainer}
				open={a01.itemViewOpen}
				onClose={
					a01.editing ? a01.confirmDialogClose : a01.cancelAction
				}
				onReturn={a01.updating ? a01.confirmReturn : null}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: "rgb(241 241 241)",
					},
				}}
				contentSx={[
					{
						minHeight: "30em",
					},
					scrollable.scroller,
				]}
				{...rest}>
				<A01Form
					onSubmit={forms.handleSubmit(
						a01.onEditorSubmit,
						a01.onEditorSubmitError
					)}
					editing={a01.editing}
					updating={a01.updating}
					readWorking={a01.readWorking}
					data={a01.itemData}
					dataLoaded={a01.itemDataLoaded}
					store={store}
					tabIndex={a01.tabIndex}
					handleTabChange={a01.handleTabChange}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

A01DialogContainer.displayName = "A01DialogContainer";
