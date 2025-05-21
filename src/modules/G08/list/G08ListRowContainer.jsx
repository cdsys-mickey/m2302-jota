import { useContext } from "react";
import G08ListRow from "./G08ListRow";
import { G08Context } from "@/modules/G08/G08Context";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const G08ListRowContainer = (props) => {
	const { index, ...rest } = props;

	const g08 = useContext(G08Context);
	// const { isItemLoading } = g08;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => g08.listData[index], [g08.listData, index]);
	const loading = useMemo(() => !value, [value]);

	const selected = useMemo(() => {
		return value?.FactID === g08.selectedItem?.FactID;
	}, [g08.selectedItem?.FactID, value?.FactID]);

	return (
		<ListRowProvider loading={loading}>
			<G08ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => g08.handleSelect(e, value)}
				selected={selected}
				{...rest}
			/>
		</ListRowProvider>
	);
};
G08ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
G08ListRowContainer.displayName = "G08ListRowContainer";


