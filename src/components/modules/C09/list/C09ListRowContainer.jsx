import { C09Context } from "@/contexts/C09/C09Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import C09ListRow from "./C09ListRow";

export const C09ListRowContainer = (props) => {
	const c09 = useContext(C09Context);
	const { isItemLoading } = c09;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c09.listData[index], [c09.listData, index]);

	return (
		<C09ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => c09.handleSelect(e, value)}
			{...rest}
		/>
	);
};
C09ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
C09ListRowContainer.displayName = "C09ListRowContainer";
