import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/StdPrint.mjs";
import { useContext } from "react";
import { E01Context } from "@/contexts/E01/E01Context";

export const E01OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const e01 = useContext(E01Context);
		const { canPrint } = e01;

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

E01OutputModePickerContainer.propTypes = {};

E01OutputModePickerContainer.displayName = "E01OutputModePickerContainer";


