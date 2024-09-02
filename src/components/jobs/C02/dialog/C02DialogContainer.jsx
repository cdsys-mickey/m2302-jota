import { C02Context } from "@/contexts/C02/C02Context";
import Colors from "@/modules/md-colors";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import C02DialogForm from "./C02DialogForm";
import { C02DialogToolbarContainer } from "./toolbar/C02DialogToolbarContainer";
import { useFormMeta } from "../../../../shared-contexts/form-meta/useFormMeta";
import { useCallback } from "react";
import { FormMetaProvider } from "../../../../shared-contexts/form-meta/FormMetaProvider";

export const C02DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const c02 = useContext(C02Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c02.creating) {
			return "建立請購單";
		} else if (c02.updating) {
			return "修改請購單";
		} else {
			return "請購單內容";
		}
	}, [c02.creating, c02.updating]);

	const handleClose = useMemo(() => {
		return c02.creating
			? c02.confirmQuitCreating
			: c02.updating
				? c02.confirmQuitUpdating
				: c02.reading
					? c02.reset
					: null;
	}, [
		c02.reset,
		c02.confirmQuitCreating,
		c02.confirmQuitUpdating,
		c02.creating,
		c02.reading,
		c02.updating,
	]);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			c02.onEditorSubmit,
			c02.onEditorSubmitError
		)
	}, [c02.onEditorSubmit, c02.onEditorSubmitError, form]);

	const handleLastField = useCallback(() => {
		setTimeout(() => {
			c02.gridMeta.setActiveCell({ col: 0, row: 0 });
		});
	}, [c02.gridMeta]);

	const formMeta = useFormMeta(
		`
		RqtDate,
		employee,
		pdline,
		`, {
		lastField: handleLastField
	}
	)

	useEffect(() => {
		if (c02.itemDataReady) {
			console.log("c02 form reset", c02.itemData);
			reset(c02.itemData);
		}
	}, [c02.itemData, c02.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C02DialogToolbarContainer}
				open={c02.itemViewOpen}
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
				<FormMetaProvider {...formMeta}>
					<form onSubmit={handleSubmit}>
						<C02DialogForm
							reading={c02.reading}
							creating={c02.creating}
							editing={c02.editing}
							updating={c02.updating}
							readWorking={c02.readWorking}
							readError={c02.readError}
							data={c02.itemData}
							itemDataReady={c02.itemDataReady}
							onSubmit={handleSubmit}
						/>
					</form>
				</FormMetaProvider>
			</DialogExContainer>
		</FormProvider>
	);
});

C02DialogContainer.displayName = "C02DialogContainer";
