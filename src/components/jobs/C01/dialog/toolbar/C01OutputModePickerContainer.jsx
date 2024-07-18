import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/md-std-print";
import { useContext } from "react";
import { C01Context } from "@/contexts/C01/C01Context";

export const C01OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c01 = useContext(C01Context);
		const { canPrint } = c01;

		if (!canPrint) {
			return false;
		}

		return (
			<StdPrintOutputModePicker
				ref={ref}
				defaultValue={StdPrint.findById(StdPrint.OutputModes.HTML)}
				width="9rem"
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

C01OutputModePickerContainer.propTypes = {};

C01OutputModePickerContainer.displayName = "C01OutputModePickerContainer";
