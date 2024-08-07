import PropTypes from "prop-types";
import { useMemo } from "react";
import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import DateFnsComponent from "./DateFnsComponent";

export const DateFnsComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <DateFnsComponent columnData={_columnData} {...rest} />;
};
DateFnsComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
DateFnsComponentContainer.displayName = "DateFnsComponentContainer";
