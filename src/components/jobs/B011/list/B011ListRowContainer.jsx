import { B011Context } from "@/contexts/B011/B011Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import B011ListRow from "./B011ListRow";

export const B011ListRowContainer = (props) => {
	const b011 = useContext(B011Context);
	const { isItemLoading } = b011;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => b011.listData[index], [b011.listData, index]);

	return (
		<B011ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => b011.handleSelect(e, value)}
			handleSelectDate={(e) => b011.handleSelectDate(e, value)}
			{...rest}
		/>
	);
};
B011ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
B011ListRowContainer.displayName = "B011ListRowContainer";

