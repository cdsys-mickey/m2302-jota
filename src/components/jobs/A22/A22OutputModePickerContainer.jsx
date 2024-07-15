import { useContext } from "react";
import { A22Context } from "@/contexts/A22/A22Context";
import TxtExport from "@/modules/md-txt-export";
import TxtExportOutputModePicker from "../txt-export/TxtExportOutputModePicker";

export const A22OutputModePickerContainer = () => {
	const a22 = useContext(A22Context);

	if (a22.gridLoading || !a22.gridData || a22.gridData?.length === 0) {
		return false;
	}

	return (
		<TxtExportOutputModePicker
			name="outputType"
			label="執行方式"
			defaultValue={TxtExport.getById(TxtExport.OutputModes.HTML)}
		/>
	);
};

A22OutputModePickerContainer.displayName = "A22OutputModePickerContainer";
