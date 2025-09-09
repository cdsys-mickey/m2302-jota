import { useFormContext, useWatch } from "react-hook-form";
import REBSalesTabView from "./REBSalesTabView";
import { useMemo } from "react";
import Forms from "@/shared-modules/Forms.mjs";
import { addMonths, startOfMonth } from "date-fns";
import { useCallback } from "react";
import { useContext } from "react";
import { REBContext } from "../../REBContext";
import { AppContext } from "@/contexts/app/AppContext";
import Auth from "@/modules/md-auth";

const REBSalesTabContainer = (props) => {
	const { ...rest } = props;
	// const { operator } = useContext(AppContext);
	const form = useFormContext();
	const reb = useContext(REBContext);
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

	// const deptDisabled = useMemo(() => {
	// 	return operator?.Class < Auth.SCOPES.ROOT;
	// }, [operator?.Class])

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
