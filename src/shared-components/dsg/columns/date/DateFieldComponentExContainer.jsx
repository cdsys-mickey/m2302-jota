import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";
import { useMemo } from "react";
import DateFieldComponentEx from "./DateFieldComponentEx";


export const DateFieldComponentExContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <DateFieldComponentEx columnData={_columnData} {...rest} />;
};
DateFieldComponentExContainer.propTypes = {
	columnData: PropTypes.object,
};
DateFieldComponentExContainer.displayName = "DateComponentExContainer";
