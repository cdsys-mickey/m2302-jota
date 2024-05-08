import { FormProvider, useForm } from "react-hook-form";
import DialogEx from "../../../../../shared-components/dialog/DialogEx";
import { useContext } from "react";
import { C01Context } from "../../../../../contexts/C01/C01Context";
import { Container } from "@mui/material";
import C01TransformForm from "./C01TransformForm";

const C01TransformToOrderDialogContainer = () => {
	const c01 = useContext(C01Context);
	const form = useForm({
		defaultValues: {},
	});

	return (
		<FormProvider {...form}>
			<form>
				<DialogEx
					disableEscapeKeyDown
					minWidth="32em"
					title="形成採購單"
					open={c01.transformDialogOpen}
					onClose={c01.cancelTransform}
					onCancel={c01.cancelTransform}
					onSubmit={form.handleSubmit(
						c01.onTransformSubmit,
						c01.onTransformSubmitError
					)}
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
