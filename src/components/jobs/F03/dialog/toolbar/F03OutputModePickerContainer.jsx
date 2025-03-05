import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { F03Context } from "@/contexts/F03/F03Context";
import StdPrint from "@/modules/StdPrint.mjs";
import { forwardRef, memo, useContext } from "react";

export const F03OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c04 = useContext(F03Context);
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

F03OutputModePickerContainer.propTypes = {};

F03OutputModePickerContainer.displayName = "F03OutputModePickerContainer";

