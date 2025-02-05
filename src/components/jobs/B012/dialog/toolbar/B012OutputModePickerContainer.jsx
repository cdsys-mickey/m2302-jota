import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/md-std-print";
import { useContext } from "react";
import { B012Context } from "@/contexts/B012/B012Context";
import { BContext } from "@/contexts/B/BContext";
import { B032Context } from "@/contexts/B032/B032Context";

export const B012OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b = useContext(BContext);
		const b012 = useContext(b.forNew ? B032Context : B012Context);
		const { canPrint } = b012;

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
				// dense
				disableClearable
				{...rest}
			/>
		);
	})
);

B012OutputModePickerContainer.propTypes = {};

B012OutputModePickerContainer.displayName = "B012OutputModePickerContainer";


