import { FormProvider, useForm } from "react-hook-form";
import DialogEx from "@/shared-components/dialog/DialogEx";
import { useContext } from "react";
import { C01Context } from "@/contexts/C01/C01Context";
import { Container } from "@mui/material";
import C01TransformForm from "./C01TransformForm";

const C01TransformToOrdersDialogContainer = () => {
	const c01 = useContext(C01Context);
	const form = useForm({
		defaultValues: {},
	});

	return (
		<FormProvider {...form}>
			<form>
				<DialogEx
					disableEscapeKeyDown
					minWidth="18em"
					title="批次形成採購單"
					open={c01.transformListDialogOpen}
					onClose={c01.cancelTransformList}
					onCancel={c01.cancelTransformList}
					onSubmit={form.handleSubmit(
						c01.onTransformListSubmit,
						c01.onTransformListSubmitError
					)}
					working={c01.transformListWorking}
					confirmText="執行">
					<Container maxWidth="md">
						<C01TransformForm />
					</Container>
				</DialogEx>
			</form>
		</FormProvider>
	);
};

C01TransformToOrdersDialogContainer.propTypes = {};

C01TransformToOrdersDialogContainer.displayName =
	"C01TransformToOrdersDialogContainer";
export default C01TransformToOrdersDialogContainer;
