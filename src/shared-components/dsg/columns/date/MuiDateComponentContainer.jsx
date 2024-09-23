import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";
import { useMemo } from "react";
import MuiDateComponent from "./MuiDateFieldComponent";


export const MuiDateComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <MuiDateComponent columnData={_columnData} {...rest} />;
};
MuiDateComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
MuiDateComponentContainer.displayName = "MuiDateComponentContainer";
