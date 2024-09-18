import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/md-std-print";
import { useContext } from "react";
import { B02Context } from "@/contexts/B02/B02Context";

export const B02OutputModePickerContainer = memo(
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

B02OutputModePickerContainer.propTypes = {};

B02OutputModePickerContainer.displayName = "B02OutputModePickerContainer";


