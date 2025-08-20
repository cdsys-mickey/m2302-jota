import { useFormContext, useWatch } from "react-hook-form";
import REBSalesTabView from "./REBSalesTabView";
import { useMemo } from "react";
import Forms from "@/shared-modules/Forms.mjs";
import { addMonths, startOfMonth } from "date-fns";

const REBSalesTabContainer = (props) => {
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

	return <REBSalesTabView minDate={minDate} {...rest} />
}

REBSalesTabContainer.displayName = "REBSalesTabContainer";
export default REBSalesTabContainer;
