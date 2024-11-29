import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";
import { useMemo } from "react";
import DateInputComponent from "./DateInputComponent";

export const DateInputComponentContainer = (props) => {
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
DateInputComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
DateInputComponentContainer.displayName = "DateComponentExContainer";
