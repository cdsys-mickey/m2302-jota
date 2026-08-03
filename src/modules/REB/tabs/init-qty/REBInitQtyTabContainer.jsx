import { useCallback, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { REBContext } from "../../REBContext";
import REBInitQtyTabView from "./REBInitQtyTabView";

const REBInitQtyTabContainer = (props) => {
	const { ...rest } = props;

	const form = useFormContext();
	const reb = useContext(REBContext);

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
		<REBInitQtyTabView

			onDeptChange={handleDeptChange}
			// deptDisabled={deptDisabled}
			{...rest}
		/>
	)
}

REBInitQtyTabContainer.displayName = "REBInitQtyTabContainer";
export default REBInitQtyTabContainer;
