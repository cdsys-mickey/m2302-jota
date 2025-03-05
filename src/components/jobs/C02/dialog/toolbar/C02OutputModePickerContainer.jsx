import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { C02Context } from "@/contexts/C02/C02Context";
import StdPrint from "@/modules/StdPrint.mjs";
import { forwardRef, memo, useContext } from "react";

export const C02OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c02 = useContext(C02Context);
		const { canPrint } = c02;

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

C02OutputModePickerContainer.propTypes = {};

C02OutputModePickerContainer.displayName = "C02OutputModePickerContainer";
