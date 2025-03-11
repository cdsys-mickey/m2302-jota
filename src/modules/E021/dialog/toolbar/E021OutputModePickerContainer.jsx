import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { E021Context } from "@/modules/E021/E021Context";
import StdPrint from "@/modules/StdPrint.mjs";
import { forwardRef, memo, useContext } from "react";

export const E021OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const e021 = useContext(E021Context);
		const { canPrint } = e021;

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

E021OutputModePickerContainer.propTypes = {};

E021OutputModePickerContainer.displayName = "E021OutputModePickerContainer";



