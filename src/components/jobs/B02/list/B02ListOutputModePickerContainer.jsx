import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { B02Context } from "@/contexts/B02/B02Context";
import StdPrint from "@/modules/md-std-print";
import { forwardRef, memo, useContext } from "react";

export const B02ListOutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b02 = useContext(B02Context);
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

