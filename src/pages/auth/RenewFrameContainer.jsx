import { AuthContext } from "@/contexts/auth/AuthContext";
import useAppRedirect from "@/hooks/useAppRedirect";
import { FrameBox } from "@/shared-components";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useInit } from "@/shared-hooks/useInit";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import RenewFrame from "./RenewFrame";

export const RenewFrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const auth = useContext(AuthContext);
	const { changing } = auth;
	const { handleDrawerClose } = appFrame;
	const { toLogin } = useAppRedirect();
	const form = useForm({
		defaultValues: {},
	});
	const { setError } = form;

	// useEffect(() => {
	// 	handleDrawerClose();
	// }, [handleDrawerClose]);
	useInit(() => {
		handleDrawerClose();
	}, []);

	return (
		<FrameBox>
			<FormProvider {...form}>
				<form
					noValidate
					onSubmit={form.handleSubmit(
						auth.onChangeSubmit({ setError, doRedirect: true }),
						auth.onChangeSubmitError
					)}>
					<RenewFrame toLogin={toLogin} loading={changing} />
				</form>
			</FormProvider>
		</FrameBox>
	);
};

RenewFrameContainer.displayName = "RenewFrameContainer";
