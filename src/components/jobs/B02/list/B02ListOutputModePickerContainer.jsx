import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { BContext } from "@/contexts/B/BContext";
import { B02Context } from "@/contexts/B02/B02Context";
import { B04Context } from "@/contexts/B04/B04Context";
import StdPrint from "@/modules/StdPrint.mjs";
import { forwardRef, memo, useContext } from "react";

export const B02ListOutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b = useContext(BContext);
		const b02 = useContext(b.forNew ? B04Context : B02Context);
		const { canPrint } = b02;

		if (!canPrint) {
			return false;
		}

		return (
			<StdPrintOutputModePicker
				ref={ref}
				defaultValue={StdPrint.findById(StdPrint.OutputModes.HTML)}
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

B02ListOutputModePickerContainer.propTypes = {};

B02ListOutputModePickerContainer.displayName = "B02ListOutputModePickerContainer";

