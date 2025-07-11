import Colors from "@/modules/Colors.mjs";
import { P36Context } from "@/modules/P36/P36Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import MuiStyles from "@/shared-modules/MuiStyles";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import P36DialogForm from "../form/P36DialogForm";
import P36Drawer from "../P36Drawer";
import { P36DialogButtonsContainer } from "./buttons/P36DialogButtonsContainer";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const P36DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();

	const _height = useMemo(() => {
		return height - 120
	}, [height])

	const formMeta = useFormMeta(
		`
		CndID,
		CndData,
		AbbrID,
		LicNo,
		IDNo,
		BDay,
		Cel,
		Email,
		Postal,
		Addr,
		Remark,
		Assign,
		AsRemark,
		Bound,
		`
	);

	const form = useFormContext();
	const { reset } = form;
	const p36 = useContext(P36Context);

	const title = useMemo(() => {
		if (p36.creating) {
			return "新增";
		} else if (p36.updating) {
			return "修改";
		} else {
			return "內容";
		}
	}, [p36.creating, p36.updating]);

	const scrollable = useScrollable({
		maxHeight: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(p36.onEditorSubmit, p36.onEditorSubmitError);
	}, [p36.onEditorSubmit, p36.onEditorSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	useChangeTracking(() => {
		if (p36.itemDataReady) {
			console.log(`p36 form reset`, p36.itemData);
			reset(p36.itemData);
		}
	}, [p36.itemData, p36.itemDataReady]);

	return (
		<DialogExContainer
			title={title}
			ref={ref}
			// fullScreen
			responsive
			fullWidth
			maxWidth="md"
			TitleButtonsComponent={P36DialogButtonsContainer}
			open={p36.itemViewOpen}
			onClose={
				p36.editing ? p36.confirmDialogClose : p36.cancelAction
			}
			// onReturn={p36.updating ? p36.confirmReturn : null}
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
			<FormMetaProvider {...formMeta}>
				<P36DialogForm
					ref={ref}
					onSubmit={handleSubmit}
					editing={p36.editing}
					updating={p36.updating}
					readWorking={p36.readWorking}
					readError={p36.readError}
					data={p36.itemData}
					itemDataReady={p36.itemDataReady}
				/>
			</FormMetaProvider>
			<P36Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
		</DialogExContainer>
	);
});

P36DialogContainer.displayName = "P36DialogContainer";



