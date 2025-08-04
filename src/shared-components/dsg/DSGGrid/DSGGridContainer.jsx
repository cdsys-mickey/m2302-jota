import PropTypes from "prop-types";
import { DSGGridView } from "./DSGGridView";
import { useMemo } from "react";
import CrudContext from "@/contexts/crud/CrudContext";
import { useContext } from "react";

const DSGGridContainer = ({ name, ...rest }) => {
	const { loadWorking, readWorking } = useContext(CrudContext) || {};

	const _loading = useMemo(() => {
		return loadWorking || readWorking;
	}, [loadWorking, readWorking])

	return (
		<DSGGridView
			name={name}
			loading={_loading}
			// loading={true}
			{...rest}
		/>
	)
}

DSGGridContainer.propTypes = {
	name: PropTypes.string.isRequired
}
DSGGridContainer.displayName = "DSGGridContainer";
export default DSGGridContainer;