import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";
import { useMemo } from "react";
import CmsTypePickerComponent from "./CmsTypePickerComponent";

export const CmsTypePickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <CmsTypePickerComponent columnData={_columnData} {...rest} />;
};

CmsTypePickerComponentContainer.displayName = "CmsTypePickerComponentContainer";
CmsTypePickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
