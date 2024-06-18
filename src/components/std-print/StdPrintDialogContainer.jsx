import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { grey } from "@mui/material/colors";
import PropTypes from "prop-types";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CrudContext from "../../contexts/crud/CrudContext";
import { StdPrintContext } from "../../contexts/std-print/StdPrintContext";
import DialogEx from "../../shared-components/dialog/DialogEx";
import StdPrintActionButtons from "./StdPrintActionButtons";
import { StdPrintFormContainer } from "./StdPrintFormContainer";
import { useWindowSize } from "../../shared-hooks/useWindowSize";

export const StdPrintDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const crud = useContext(CrudContext);
	const stdPrint = useContext(StdPrintContext);
	const { loadDef, printing } = stdPrint;
	const form = useForm();

	const title = useMemo(() => {
		return (stdPrint.displayName || "") + "列印";
	}, [stdPrint.displayName]);

	useEffect(() => {
		if (printing) {
			loadDef({ params: crud.paramsRef.current });
		}
	}, [crud.paramsRef, loadDef, printing]);

	return (
		<FormProvider {...form}>
			<form {...rest}>
				<DialogEx
					open={printing}
					// dense
					title={title}
					ref={ref}
					responsive
					fullWidth
					maxWidth="sm"
					onClose={stdPrint.cancelPrint}
					confirmText="執行"
					// onConfirm={stdPrint.handlePrint}
					onSubmit={form.handleSubmit(
						stdPrint.onSubmit,
						stdPrint.onSubmitError
					)}
					// Title
					titleSx={{
						backgroundColor: grey[100],
					}}
					// Content
					contentSx={{
						backgroundColor: grey[100],
						height: height,
						paddingBottom: 0,
					}}
					actionsSx={{
						backgroundColor: grey[100],
					}}
					buttonProps={{
						size: "small",
					}}
					confirmButtonProps={{
						endIcon: <OpenInNewIcon />,
						variant: "contained",
					}}
					otherActionButtons={<StdPrintActionButtons />}
					// otherActionButtons={
					// 	<>
					// 		<StdPrintResetButtonContainer />
					// 		<StdPrintAddAllFieldsButtonContainer />
					// 		<StdPrintRemoveAllFieldsButtonContainer />
					// 	</>
					// }
					{...rest}>
					<StdPrintFormContainer />
				</DialogEx>
			</form>
		</FormProvider>
	);
});

StdPrintDialogContainer.propTypes = {
	title: PropTypes.string,
};

StdPrintDialogContainer.displayName = "A01PrintDialogContainer";
