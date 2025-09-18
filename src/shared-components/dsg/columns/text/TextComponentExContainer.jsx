import PropTypes from "prop-types";
import TextComponentEx from "./TextComponentEx";

export const TextComponentExContainer = (props) => {
	const { columnData, ...rest } = props;
	// const cellControls = useCellControls();

	// const _columnData = useMemo(() => {
	// 	return {
	// 		...columnData,
	// 		...cellControls,
	// 	};
	// }, [cellControls, columnData]);
	// return <TextComponentEx columnData={_columnData} {...rest} />;
	return <TextComponentEx columnData={columnData} {...rest} />;
};

TextComponentExContainer.displayName = "TextComponentExContainer";

TextComponentExContainer.propTypes = {
	columnData: PropTypes.object,
};
