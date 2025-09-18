import { A22Context } from "@/contexts/A22/A22Context";
import { ButtonEx } from "@/shared-components";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";

export const A22GenReportButtonContainer = () => {
	const a22 = useContext(A22Context);
	const form = useFormContext();

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			a22.onGenReportSubmit,
			a22.onGenReportSubmitError
		);
	}, [a22, form])
	// const handleClick = useCallback((e) => {
	// 	return form.handleSubmit(
	// 		payload => a22.onGenReportSubmit(payload, e),
	// 		a22.onGenReportSubmitError
	// 	)();
	// }, [a22, form])

	if (a22.gridLoading || !a22.gridData || a22.gridData?.length === 0) {
		return false;
	}

	return (
		<ButtonEx
			size="small"
			variant="contained"
			endIcon={<OpenInNewIcon />}
			color="primary"
			onClick={handleSubmit}
		// onClick={handleClick}
		>
			執行
		</ButtonEx>
	);
};

A22GenReportButtonContainer.displayName = "A22GenReportButtonContainer";
