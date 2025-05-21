import { useContext } from "react";
import G06ListRow from "./G06ListRow";
import { G06Context } from "@/modules/G06/G06Context";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const G06ListRowContainer = (props) => {
	const { index, ...rest } = props;

	const g06 = useContext(G06Context);
	// const { isItemLoading } = g06;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => g06.listData[index], [g06.listData, index]);
	const loading = useMemo(() => !value, [value]);

	const selected = useMemo(() => {
		return value?.FactID === g06.selectedItem?.FactID;
	}, [g06.selectedItem?.FactID, value?.FactID]);

	return (
		<ListRowProvider loading={loading}>
			<G06ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => g06.handleSelect(e, value)}
				selected={selected}
				{...rest}
			/>
		</ListRowProvider>
	);
};
G06ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
G06ListRowContainer.displayName = "G06ListRowContainer";

