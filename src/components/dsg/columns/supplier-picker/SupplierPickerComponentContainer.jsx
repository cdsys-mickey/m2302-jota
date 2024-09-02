import PropTypes from "prop-types";
import { useMemo } from "react";
import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import SupplierPickerComponent from "./SupplierPickerComponent";

export const SupplierPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <SupplierPickerComponent columnData={_columnData} {...rest} />;
};
SupplierPickerComponentContainer.displayName = "SupplierPickerComponentContainer";
SupplierPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
