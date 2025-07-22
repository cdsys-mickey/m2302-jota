import { G06Context } from "@/modules/G06/G06Context";
import Colors from "@/modules/Colors.mjs";
import { DialogEx } from "@/shared-components";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import G06DialogForm from "../form/G06DialogForm";
import { G06DialogButtonsContainer } from "./buttons/G06DialogButtonsContainer";
import { FormMetaProvider } from "@/shared-components";
import G06Drawer from "../G06Drawer";
import MuiStyles from "@/shared-modules/MuiStyles";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const G06DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();

	const _height = useMemo(() => {
		return height - 120
	}, [height])

	const formMeta = useFormMeta(
		`
		FactID,
		FactData,
		AbbrName,
		Boss,
		Contact,
		Tel,
		Uniform,
		PayGroup,
		bank,
		BankAcct,
		CompAddr,
		CompTel,
		CompFax,
		TaxType,
		FactAddr,
		FactTel,
		FactFax,
		mainProd,
		remark
		`
	);

	const forms = useForm({
		defaultValues: {},
	});
	const { reset } = forms;
	const g06 = useContext(G06Context);

	const title = useMemo(() => {
		if (g06.creating) {
			return "新增";
		} else if (g06.updating) {
			return "修改收款資料";
		} else {
			return "收款資料內容";
		}
	}, [g06.creating, g06.updating]);

	const scrollable = useScrollable({
		maxHeight: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const handleSubmit = useMemo(() => {
		return forms.handleSubmit(g06.onEditorSubmit, g06.onEditorSubmitError);
	}, [g06.onEditorSubmit, g06.onEditorSubmitError, forms]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	useChangeTracking(() => {
		if (g06.itemDataReady) {
			console.log(`g06 form reset`, g06.itemData);
			reset(g06.itemData);
		}
	}, [g06.itemData, g06.itemDataReady, g06.readState]);

	return (
		<FormProvider {...forms}>
			<DialogEx
				title={title}
				ref={ref}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={G06DialogButtonsContainer}
				open={g06.itemViewOpen}
				onClose={
					g06.editing ? g06.confirmDialogClose : g06.cancelAction
				}
				// onReturn={g06.updating ? g06.confirmReturn : null}
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
					<G06DialogForm
						ref={ref}
						onSubmit={handleSubmit}
						editing={g06.editing}
						updating={g06.updating}
						readWorking={g06.readWorking}
						readError={g06.readError}
						data={g06.itemData}
						itemDataReady={g06.itemDataReady}
					/>
				</FormMetaProvider>
				<G06Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogEx>
		</FormProvider>
	);
});

G06DialogContainer.displayName = "G06DialogContainer";

