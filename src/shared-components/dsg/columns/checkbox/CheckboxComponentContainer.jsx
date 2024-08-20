import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";
import { useMemo } from "react";
import CheckboxComponent from "./CheckboxComponent";

const CheckboxComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);
	return <CheckboxComponent columnData={_columnData} {...rest} />;
}

CheckboxComponentContainer.propTypes = {
	columnData: PropTypes.object,
}

CheckboxComponentContainer.displayName = "CheckboxComponentContainer";
export default CheckboxComponentContainer;