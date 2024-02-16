import ResponsiveLoadingButton from "@/shared-components/responsive/ResponsiveLoadingButton";
import { useContext } from "react";
import { A22Context } from "@/contexts/A22/A22Context";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useFormContext } from "react-hook-form";

export const A22GenReportButtonContainer = () => {
	const a22 = useContext(A22Context);
	const form = useFormContext();

	if (a22.gridLoading || !a22.gridData || a22.gridData?.length === 0) {
		return false;
	}

	return (
		<ResponsiveLoadingButton
			size="small"
			variant="contained"
			endIcon={<OpenInNewIcon />}
			color="primary"
			// onClick={a22.genReport}>
			onClick={form.handleSubmit(
				a22.onGenReportSubmit,
				a22.onGenReportSubmitError
			)}>
			執行
		</ResponsiveLoadingButton>
	);
};

A22GenReportButtonContainer.displayName = "A22GenReportButtonContainer";
