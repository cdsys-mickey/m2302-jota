import Styles from "@/modules/md-styles";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/auth/AuthContext";
import useAppRedirect from "../../hooks/useAppRedirect";
import { useInit } from "../../shared-hooks/useInit";
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
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	// useEffect(() => {
	// 	handleDrawerClose();
	// }, [handleDrawerClose]);
	useInit(() => {
		handleDrawerClose();
	}, []);

	return (
		<Box sx={[boxStyles]}>
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
		</Box>
	);
};

RenewFrameContainer.displayName = "RenewFrameContainer";
