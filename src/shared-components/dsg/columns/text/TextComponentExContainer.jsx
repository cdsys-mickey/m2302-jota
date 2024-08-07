import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";
import { useMemo } from "react";
import TextComponentEx from "./TextComponentEx";

export const TextComponentExContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);
	return <TextComponentEx columnData={_columnData} {...rest} />;
};

TextComponentExContainer.displayName = "TextComponentExContainer";

TextComponentExContainer.propTypes = {
	columnData: PropTypes.object,
};
