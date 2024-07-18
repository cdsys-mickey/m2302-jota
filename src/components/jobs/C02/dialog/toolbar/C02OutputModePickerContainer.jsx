import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/md-std-print";
import { useContext } from "react";
import { C02Context } from "@/contexts/C02/C02Context";

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
				defaultValue={StdPrint.findById(StdPrint.OutputModes.HTML)}
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
