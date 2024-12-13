import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";
import { useMemo } from "react";
import InvTakingListingPickerComponent from "./InvTakingListingPickerComponent";

export const InvTakingListingPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <InvTakingListingPickerComponent columnData={_columnData} {...rest} />;
};

InvTakingListingPickerComponentContainer.displayName = "InvTakingListingPickerComponentContainer";
InvTakingListingPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
