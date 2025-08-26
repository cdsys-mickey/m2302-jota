import { A06Context } from "@/contexts/A06/A06Context";
import Colors from "@/modules/Colors.mjs";
import { DialogEx } from "@/shared-components";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import A06DialogForm from "../form/A06DialogForm";
import { A06DialogToolbarContainer } from "./buttons/A06DialogToolbarContainer";
import A06DrawerContainer from "../A06DrawerContainer";
import { useHotkeys } from "react-hotkeys-hook";
import { FormMetaProvider } from "@/shared-components";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useCallback } from "react";

export const A06DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const _height = useMemo(() => {
		return height - 120
	}, [height])

	const scrollable = useScrollable({
		maxHeight: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});
	const form = useFormContext();
	const { reset } = form;
	const a06 = useContext(A06Context);

	const title = useMemo(() => {
		if (a06.creating) {
			return "新增";
		} else if (a06.updating) {
			return "修改";
		} else {
			return "內容";
		}
	}, [a06.creating, a06.updating]);

	const handleSubmit = useCallback(() => {
		if (a06.editing) {
			form.handleSubmit(
				a06.onEditorSubmit,
				a06.onEditorSubmitError
			)()
		}
	}, [a06.editing, a06.onEditorSubmit, a06.onEditorSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	useChangeTracking(() => {
		if (a06.itemDataReady) {
			console.log(`a06 form reset`, a06.itemData);
			reset(a06.itemData);
		}
	}, [a06.itemData, a06.itemDataReady]);

	return (

		<DialogEx
			title={title}
			ref={ref}
			responsive
			fullWidth
			maxWidth="md"
			TitleButtonsComponent={A06DialogToolbarContainer}
			open={a06.itemViewOpen}
			onClose={
				a06.editing ? a06.confirmDialogClose : a06.cancelAction
			}
			// onReturn={a06.updating ? a06.confirmReturn : null}
			sx={{
				"& .MuiDialog-paper": {
					backgroundColor: Colors.DIALOG_BG,
				},
			}}
			contentSx={[
				// {
				// 	minHeight: "30em",
				// },
				scrollable.scroller,
			]}
			{...rest}>
			<FormMetaProvider {...a06.formMeta}>
				<A06DialogForm
					ref={ref}
					onSubmit={handleSubmit}
					editing={a06.editing}
					updating={a06.updating}
					readWorking={a06.readWorking}
					readError={a06.readError}
					data={a06.itemData}
					itemDataReady={a06.itemDataReady}
				/>
			</FormMetaProvider>
			<A06DrawerContainer />
		</DialogEx>
	);
});

A06DialogContainer.displayName = "A06DialogContainer";
