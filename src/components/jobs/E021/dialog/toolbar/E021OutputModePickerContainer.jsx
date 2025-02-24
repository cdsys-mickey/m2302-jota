import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/StdPrint.mjs";
import { useContext } from "react";
import { E021Context } from "@/contexts/E021/E021Context";

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

E021OutputModePickerContainer.propTypes = {};

E021OutputModePickerContainer.displayName = "E021OutputModePickerContainer";



