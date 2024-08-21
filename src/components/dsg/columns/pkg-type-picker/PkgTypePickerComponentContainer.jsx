import { useMemo } from "react";
import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PkgTypePickerComponent from "./PkgTypePickerComponent";
import PropTypes from "prop-types";

export const PkgTypePickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <PkgTypePickerComponent columnData={_columnData} {...rest} />
}

PkgTypePickerComponentContainer.displayName = "PkgTypePickerComponentContainer";
PkgTypePickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
}