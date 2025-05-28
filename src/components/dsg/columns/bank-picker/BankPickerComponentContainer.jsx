import PropTypes from "prop-types";
import { useMemo } from "react";
import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import BankPickerComponent from "./BankPickerComponent";

export const BankPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <BankPickerComponent columnData={_columnData} {...rest} />;
};

BankPickerComponentContainer.displayName =
	"BankPickerComponentContainer";

BankPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
