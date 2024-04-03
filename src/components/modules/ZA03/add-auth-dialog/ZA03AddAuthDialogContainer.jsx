import { useContext } from "react";
import DialogEx from "../../../../shared-components/dialog/DialogEx";
import { ZA03Context } from "../../../../contexts/ZA03/ZA03Context";
import { FormProvider, useForm } from "react-hook-form";
import ZA03AddAuthForm from "./ZA03AddAuthForm";
import { Typography } from "@mui/material";
import { useEffect } from "react";

export const ZA03AddAuthDialogContainer = () => {
	const za03 = useContext(ZA03Context);
	const { startJobId, endJobId } = za03;
	const forms = useForm({
		defaultValues: {
			modules: [],
			position: 1,
		},
	});
	const { reset } = forms;

	useEffect(() => {
		if (za03.addAuthDialogOpen) {
			reset({ modules: [] });
		}
	}, [reset, za03.addAuthDialogOpen]);

	return (
		<FormProvider {...forms}>
			<form>
				<DialogEx
					minWidth="32em"
					title="新增功能權限"
					open={za03.addAuthDialogOpen}
					onClose={za03.cancelAddAuth}
					onCancel={za03.cancelAddAuth}
					onSubmit={forms.handleSubmit(
						za03.onAddAuthSubmit,
						za03.onAddAuthSubmitError
					)}
					working={za03.addAuthWorking}
					confirmText="新增">
					<ZA03AddAuthForm />
				</DialogEx>
			</form>
		</FormProvider>
	);
};

ZA03AddAuthDialogContainer.displayName = "ZA03AddAuthDialogContainer";
