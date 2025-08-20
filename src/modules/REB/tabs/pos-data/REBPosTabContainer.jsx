import { useFormContext, useWatch } from "react-hook-form";
import REBRestoreTabView from "./REBPosTabView";
import { useMemo } from "react";
import { addMonths, startOfMonth } from "date-fns";
import Forms from "@/shared-modules/Forms.mjs";

const REBPosTabContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const cutYM = useWatch({
		name: "CutYM",
		control: form.control
	})

	const minDate = useMemo(() => {
		if (!cutYM) {
			return null;
		}

		return startOfMonth(addMonths(Forms.parseDate(`${cutYM}/01`), 1));
	}, [cutYM])

	return <REBRestoreTabView minDate={minDate}  {...rest} />
}

REBPosTabContainer.displayName = "REBPosTabContainer";
export default REBPosTabContainer;
