import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";
import DialogEx from "@/shared-components/dialog/DialogEx";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { grey } from "@mui/material/colors";
import PropTypes from "prop-types";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import JobMenuActionButtons from "./JobMenuActionButtons";
import { JobMenuContext } from "./JobMenuContext";
import { JobMenuFormContainer } from "./JobMenuFormContainer";

export const StdPrintDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	// const crud = useContext(CrudContext);
	const listLoaderCtx = useContext(InfiniteLoaderContext);
	const jobMenu = useContext(JobMenuContext);
	const { loadDef, printing } = jobMenu;
	const form = useForm();

	const title = useMemo(() => {
		return (jobMenu.displayName || "") + "列印";
	}, [jobMenu.displayName]);

	useEffect(() => {
		if (printing) {
			loadDef({ params: listLoaderCtx.paramsRef.current });
		}
	}, [listLoaderCtx.paramsRef, loadDef, printing]);

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
					onClose={jobMenu.cancelPrint}
					confirmText="執行"
					// onConfirm={stdPrint.handlePrint}
					onSubmit={form.handleSubmit(
						jobMenu.onSubmit,
						jobMenu.onSubmitError
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
					otherActionButtons={<JobMenuActionButtons />}
					{...rest}>
					<JobMenuFormContainer />
				</DialogEx>
			</form>
		</FormProvider>
	);
});

StdPrintDialogContainer.propTypes = {
	title: PropTypes.string,
};

StdPrintDialogContainer.displayName = "A01PrintDialogContainer";
