import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";
import { useMemo } from "react";
import CustomerPickerComponent from "./CustomerPickerComponent";

export const CustomerPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <CustomerPickerComponent columnData={_columnData} {...rest} />;
};

CustomerPickerComponentContainer.displayName = "CustomerPickerComponentContainer";
CustomerPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
}