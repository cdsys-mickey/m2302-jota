import { useContext } from "react";
import B06ListRow from "./B06ListRow";
import { B06Context } from "@/contexts/B06/B06Context";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const B06ListRowContainer = (props) => {
	const b06 = useContext(B06Context);
	const { index, ...rest } = props;
	// const { isItemLoading } = b06;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => b06.listData[index], [b06.listData, index]);
	const loading = useMemo(() => !value, [value]);

	const selected = useMemo(() => {
		return value?.FactID === b06.selectedItem?.FactID;
	}, [b06.selectedItem?.FactID, value?.FactID]);

	return (
		<ListRowProvider loading={loading}>
			<B06ListRow
				index={index}
				// loading={loading}
				value={value}
				// onClick={(e) => b06.handleSelect(e, value)}
				selected={selected}
				{...rest}
			/>
		</ListRowProvider>
	);
};
B06ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
B06ListRowContainer.displayName = "B06ListRowContainer";
