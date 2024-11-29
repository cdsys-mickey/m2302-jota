import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";
import { useMemo } from "react";
import DateInputComponent from "./DateInputMaskComponent";

export const DateInputMaskComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <DateInputComponent columnData={_columnData} {...rest} />;
};
DateInputMaskComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
DateInputMaskComponentContainer.displayName = "DateComponentExContainer";
