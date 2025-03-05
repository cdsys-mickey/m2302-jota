import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { B04Context } from "@/contexts/B04/B04Context";
import StdPrint from "@/modules/StdPrint.mjs";
import { forwardRef, memo, useContext } from "react";

export const B04ListOutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b04 = useContext(B04Context);
		const { canPrint } = b04;

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
				{...rest}
			/>
		);
	})
);

B04ListOutputModePickerContainer.propTypes = {};

B04ListOutputModePickerContainer.displayName = "B04ListOutputModePickerContainer";


