import CrudContext from "@/contexts/crud/CrudContext";
import { forwardRef, useContext, useMemo } from "react";
import { DSGGridView } from "./DSGGridView";

const DSGGridContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { loadWorking, readWorking } = useContext(CrudContext) || {};

	const _loading = useMemo(() => {
		return loadWorking || readWorking;
	}, [loadWorking, readWorking])

	return (
		<DSGGridView
			ref={ref}
			// name={name}
			loading={_loading}
			// loading={true}
			{...rest}
		/>
	)
});

DSGGridContainer.propTypes = {
	// name: PropTypes.string.isRequired
}
DSGGridContainer.displayName = "DSGGridContainer";
export default DSGGridContainer;