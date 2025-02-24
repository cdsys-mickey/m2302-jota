import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/StdPrint.mjs";
import { useContext } from "react";
import { F01Context } from "@/contexts/F01/F01Context";

export const F01OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const f01 = useContext(F01Context);
		const { canPrint } = f01;

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

F01OutputModePickerContainer.propTypes = {};

F01OutputModePickerContainer.displayName = "F01OutputModePickerContainer";

