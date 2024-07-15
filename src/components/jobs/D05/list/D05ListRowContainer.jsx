import { D05Context } from "@/contexts/D05/D05Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import D05ListRow from "./D05ListRow";

export const D05ListRowContainer = (props) => {
	const d05 = useContext(D05Context);
	const { isItemLoading } = d05;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => d05.listData[index], [d05.listData, index]);

	return (
		<D05ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => d05.handleSelect(e, value)}
			{...rest}
		/>
	);
};
D05ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
D05ListRowContainer.displayName = "D05ListRowContainer";

