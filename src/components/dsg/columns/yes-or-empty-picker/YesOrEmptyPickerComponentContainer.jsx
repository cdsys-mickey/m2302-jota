import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import { useMemo } from "react";
import YesOrEmptyPickerComponent from "./YesOrEmptyPickerComponent";
import PropTypes from "prop-types";

export const YesOrEmptyPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);
	return <YesOrEmptyPickerComponent columnData={_columnData}  {...rest} />
}

YesOrEmptyPickerComponentContainer.displayName = "YesOrEmptyPickerComponentContainer";
YesOrEmptyPickerComponentContainer.propTypes = {
	columnData: PropTypes.object
}