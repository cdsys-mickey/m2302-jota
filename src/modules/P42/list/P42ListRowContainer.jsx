import { useContext } from "react";
import P42ListRow from "./P42ListRow";
import { P42Context } from "@/modules/P42/P42Context";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const P42ListRowContainer = (props) => {
	const { index, ...rest } = props;

	const p42 = useContext(P42Context);
	// const { isItemLoading } = p42;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => p42.listData[index], [p42.listData, index]);
	const loading = useMemo(() => !value, [value]);

	const selected = useMemo(() => {
		return value?.FactID === p42.selectedItem?.FactID;
	}, [p42.selectedItem?.FactID, value?.FactID]);

	return (
		<ListRowProvider loading={loading}>
			<P42ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => p42.handleSelect(e, value)}
				selected={selected}
				{...rest}
			/>
		</ListRowProvider>
	);
};
P42ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
P42ListRowContainer.displayName = "P42ListRowContainer";



