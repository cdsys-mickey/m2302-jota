import { useContext } from "react";
import P41ListRow from "./P41ListRow";
import { P41Context } from "@/modules/P41/P41Context";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const P41ListRowContainer = (props) => {
	const { index, ...rest } = props;

	const p41 = useContext(P41Context);
	// const { isItemLoading } = p41;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => p41.listData[index], [p41.listData, index]);
	const loading = useMemo(() => !value, [value]);

	const selected = useMemo(() => {
		return value?.FactID === p41.selectedItem?.FactID;
	}, [p41.selectedItem?.FactID, value?.FactID]);

	return (
		<ListRowProvider loading={loading}>
			<P41ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => p41.handleSelect(e, value)}
				selected={selected}
				{...rest}
			/>
		</ListRowProvider>
	);
};
P41ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
P41ListRowContainer.displayName = "P41ListRowContainer";



