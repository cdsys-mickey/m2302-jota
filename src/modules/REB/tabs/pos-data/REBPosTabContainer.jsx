import { useFormContext, useWatch } from "react-hook-form";
import REBRestoreTabView from "./REBPosTabView";
import { useMemo } from "react";
import { addMonths, startOfMonth } from "date-fns";
import Forms from "@/shared-modules/Forms.mjs";
import { useCallback } from "react";
import { REBContext } from "../../REBContext";
import { useContext } from "react";
import Auth from "@/modules/Auth.mjs";
import { AppContext } from "@/contexts/app/AppContext";

const REBPosTabContainer = (props) => {
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
		<REBRestoreTabView
			minDate={minDate}
			onDeptChange={handleDeptChange}
			// deptDisabled={deptDisabled}
			{...rest}
		/>
	)
}

REBPosTabContainer.displayName = "REBPosTabContainer";
export default REBPosTabContainer;
