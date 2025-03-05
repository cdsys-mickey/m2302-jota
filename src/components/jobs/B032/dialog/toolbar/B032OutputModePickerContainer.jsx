import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/StdPrint.mjs";
import { useContext } from "react";
import { B032Context } from "@/contexts/B032/B032Context";
import { B012Context } from "@/contexts/B012/B012Context";
import { BContext } from "@/contexts/B/BContext";

export const B032OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b = useContext(BContext);
		const b032 = useContext(b.forNew ? B032Context : B012Context);
		const { canPrint } = b032;

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

B032OutputModePickerContainer.propTypes = {};

B032OutputModePickerContainer.displayName = "B032OutputModePickerContainer";



