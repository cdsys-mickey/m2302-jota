import PropTypes from "prop-types";
import { DSGGridView } from "./DSGGridView";
import { useMemo } from "react";
import CrudContext from "@/contexts/crud/CrudContext";
import { useContext } from "react";
import { forwardRef } from "react";

const DSGGridContainer = forwardRef((props, ref) => {
	const { name, ...rest } = props;
	const { loadWorking, readWorking } = useContext(CrudContext) || {};

	const _loading = useMemo(() => {
		return loadWorking || readWorking;
	}, [loadWorking, readWorking])

	return (
		<DSGGridView
			ref={ref}
			name={name}
			loading={_loading}
			// loading={true}
			{...rest}
		/>
	)
});

DSGGridContainer.propTypes = {
	name: PropTypes.string.isRequired
}
DSGGridContainer.displayName = "DSGGridContainer";
export default DSGGridContainer;