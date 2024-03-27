import { useContext } from "react";
import A06ListRow from "./A06ListRow";
import { A06Context } from "@/contexts/A06/A06Context";
import { useMemo } from "react";
import PropTypes from "prop-types";

export const A06ListRowContainer = (props) => {
	const a06 = useContext(A06Context);
	const { index, ...rest } = props;
	// const { isItemLoading } = a06;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => a06.listData[index], [a06.listData, index]);
	const loading = useMemo(() => !value, [value]);

	const selected = useMemo(() => {
		return value?.FactID === a06.selectedItem?.FactID;
	}, [a06.selectedItem?.FactID, value?.FactID]);

	return (
		<A06ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => a06.handleSelect(e, value)}
			selected={selected}
			{...rest}
		/>
	);
};
A06ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
A06ListRowContainer.displayName = "A06ListRowContainer";
