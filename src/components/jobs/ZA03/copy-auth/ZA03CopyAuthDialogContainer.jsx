import { Container } from "@mui/material";
import { useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { ZA03CopyAuthContext } from "@/contexts/ZA03/ZA03CopyAuthContext";
import { DialogEx } from "@/shared-components";
import ZA03CopyAuthForm from "./ZA03CopyAuthForm";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useMemo } from "react";

export const ZA03CopyAuthDialogContainer = () => {
	const za03 = useContext(ZA03Context);
	const { height } = useWindowSize();
	const { copyAuthDialogOpen } = za03;
	const copyAuth = useContext(ZA03CopyAuthContext);
	const { setFromUser } = copyAuth;
	const forms = useForm({
		defaultValues: {},
	});
	const { reset } = forms;

	const _height = useMemo(() => {
		return height - 400
	}, [height])

	useEffect(() => {
		if (copyAuthDialogOpen) {
			reset({ fromUser: null });
			setFromUser(null);
		}
	}, [reset, setFromUser, copyAuthDialogOpen]);

	return (
		<FormProvider {...forms}>
			<form>
				<DialogEx
					dense
					disableEscapeKeyDown
					minWidth="32em"

					title="複製功能權限"
					open={za03.copyAuthDialogOpen}
					onClose={za03.cancelCopyAuth}
					onCancel={za03.cancelCopyAuth}
					onSubmit={forms.handleSubmit(
						za03.onCopyAuthSubmit,
						za03.onCopyAuthSubmitError
					)}
					contentSx={[
						{
							paddingTop: 0,
							minHeight: _height,
						},
					]}
					working={za03.copyAuthWorking}
					confirmText="複製">
					<Container maxWidth="md">
						<ZA03CopyAuthForm user={za03.itemData} />
					</Container>
				</DialogEx>
			</form>
		</FormProvider>
	);
};

ZA03CopyAuthDialogContainer.displayName = "ZA03CopyAuthDialogContainer";
