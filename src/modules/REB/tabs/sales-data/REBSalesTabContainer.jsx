import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import Forms from "@/shared-modules/Forms.mjs";
import { addMonths, startOfMonth } from "date-fns";
import { useCallback, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useREB } from "../../useREB";
import REBSalesTabView from "./REBSalesTabView";

const REBSalesTabContainer = (props) => {
	const { ...rest } = props;
	// const { operator } = useContext(AppContext);
	const form = useFormContext();
	const { reset, setValue } = form;
	const reb = useREB();
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

	const handleDeptChange = useCallback((newDept) => {
		if (newDept) {
			reb.load({
				id: newDept?.DeptID
			})
		}
	}, [reb]);

	useChangeTracking(() => {
		if (reb.itemDataReady) {
			console.log("reb form reset", reb.itemData);
			// reset(reb.itemData, { keepDefaultValues: true });
			setValue("CutYM", reb.itemData?.CutYM)
		}
	}, [reb.itemData, reb.itemDataReady]);

	return (
		<REBSalesTabView
			minDate={minDate}
			onDeptChange={handleDeptChange}
			// deptDisabled={deptDisabled}
			{...rest}
		/>
	)
}

REBSalesTabContainer.displayName = "REBSalesTabContainer";
export default REBSalesTabContainer;
