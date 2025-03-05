import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { D05Context } from "@/contexts/D05/D05Context";
import StdPrint from "@/modules/StdPrint.mjs";
import { forwardRef, memo, useContext } from "react";

export const D05OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const d05 = useContext(D05Context);
		const { canPrint } = d05;

		if (!canPrint) {
			return false;
		}

		return (
			<StdPrintOutputModePicker
				ref={ref}
				defaultValue={StdPrint.getDefaultOption()}
				width="8rem"
				required
				name="outputType"
				label=""
				dense
				disableClearable
				autoComplete
				autoSelect
				{...rest}
			/>
		);
	})
);

D05OutputModePickerContainer.propTypes = {};

D05OutputModePickerContainer.displayName = "D05OutputModePickerContainer";
