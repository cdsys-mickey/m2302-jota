import { PrintReportButton } from "@/components";
import { F01Context } from "@/modules/F01/F01Context";
import { useContext } from "react";

const F01ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const f01 = useContext(F01Context);
	const { canPrint } = f01;

	if (!canPrint) {
		return false;
	}

	return (
		<PrintReportButton
			{...rest}
		/>
	)
}

F01ExportButtonContainer.displayName = "F01ExportButtonContainer";
export default F01ExportButtonContainer;