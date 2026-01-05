import { G08Context } from "@/modules/G08/G08Context";
import Colors from "@/modules/Colors.mjs";
import { DialogEx } from "@/shared-components";
import { FormMetaProvider } from "@/shared-components";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import MuiStyles from "@/shared-modules/MuiStyles";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import G08Drawer from "../G08Drawer";
import G08DialogForm from "./G08DialogForm";
import { G08DialogButtonsContainer } from "./buttons/G08DialogButtonsContainer";
import { useHotkeys } from "react-hotkeys-hook";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useCallback } from "react";

export const G08DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();

	const _height = useMemo(() => {
		return height - 120
	}, [height])
	const form = useForm({
		defaultValues: {},
	});
	const { reset, setValue } = form;
	const g08 = useContext(G08Context);

	const title = useMemo(() => {
		if (g08.creating) {
			return "新增調整單";
		} else if (g08.updating) {
			return "修改調整單";
		} else {
			return "調整單內容";
		}
	}, [g08.creating, g08.updating]);

	const scrollable = useScrollable({
		maxHeight: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const handleSubmit = useCallback(() => {
		if (g08.editing) {
			form.handleSubmit(g08.onEditorSubmit, g08.onEditorSubmitError)();
		}
	}, [form, g08.editing, g08.onEditorSubmit, g08.onEditorSubmitError]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	useChangeTracking(() => {
		if (g08.itemDataReady) {
			console.log(`g08 form reset`, g08.itemData);
			reset(g08.itemData);
		}
	}, [g08.itemData, g08.itemDataReady]);

	const headOfficeValue = useWatch({
		name: "headOffice",
		control: form.control
	})

	const flagshipValue = useWatch({
		name: "flagship",
		control: form.control
	})

	useEffect(() => {
		if (headOfficeValue) {
			setValue("flagship", false);
		}
	}, [headOfficeValue, setValue]);

	useEffect(() => {
		if (flagshipValue) {
			setValue("headOffice", false);
		}
	}, [flagshipValue, setValue]);

	return (
		<FormProvider {...form}>
			<DialogEx
				title={title}
				ref={ref}
				// fullScreen
				responsive
				fullWidth
				maxWidth="sm"
				TitleButtonsComponent={G08DialogButtonsContainer}
				open={g08.itemViewOpen}
				onClose={
					g08.editing ? g08.confirmDialogClose : g08.cancelAction
				}
				// onReturn={g08.updating ? g08.confirmReturn : null}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: Colors.DIALOG_BG,
					},
				}}
				contentSx={[
					scrollable.scroller,
				]}
				{...rest}>
				<FormMetaProvider {...g08.formMeta}>
					<G08DialogForm
						ref={ref}
						onSubmit={handleSubmit}
						creating={g08.creating}
						editing={g08.editing}
						updating={g08.updating}
						readWorking={g08.readWorking}
						readError={g08.readError}
						data={g08.itemData}
						itemDataReady={g08.itemDataReady}

					/>
				</FormMetaProvider>
				<G08Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogEx>
		</FormProvider>
	);
});

G08DialogContainer.displayName = "G08DialogContainer";


