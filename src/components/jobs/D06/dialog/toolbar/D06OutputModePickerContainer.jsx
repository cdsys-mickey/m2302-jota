import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { D06Context } from "@/contexts/D06/D06Context";
import StdPrint from "@/modules/StdPrint.mjs";
import { forwardRef, memo, useContext } from "react";

export const D06OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c04 = useContext(D06Context);
		const { canPrint } = c04;

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

D06OutputModePickerContainer.propTypes = {};

D06OutputModePickerContainer.displayName = "D06OutputModePickerContainer";
