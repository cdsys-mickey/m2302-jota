import { FormProvider, useForm } from "react-hook-form";
import DialogEx from "@/shared-components/dialog/DialogEx";
import { useContext } from "react";
import { C01Context } from "@/contexts/C01/C01Context";
import { Container } from "@mui/material";
import C01TransformForm from "./C01TransformForm";
import { useMemo } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const C01TransformToOrderDialogContainer = () => {
	const c01 = useContext(C01Context);
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			c01.onTransformSubmit,
			c01.onTransformSubmitError
		)
	}, [c01.onTransformSubmit, c01.onTransformSubmitError, form])

	return (
		<FormProvider {...form}>
			<form>
				<DialogEx
					disableEscapeKeyDown
					minWidth="18em"
					title="形成採購單"
					open={c01.transformDialogOpen}
					onClose={c01.cancelTransform}
					onCancel={c01.cancelTransform}
					onSubmit={handleSubmit}
					working={c01.transformWorking}
					confirmText="執行">
					<Container maxWidth="md">
						<C01TransformForm />
					</Container>
				</DialogEx>
			</form>
		</FormProvider>
	);
};

C01TransformToOrderDialogContainer.propTypes = {};

C01TransformToOrderDialogContainer.displayName =
	"C01TransformToOrderDialogContainer";
export default C01TransformToOrderDialogContainer;
