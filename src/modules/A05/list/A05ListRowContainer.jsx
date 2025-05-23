import { useContext } from "react";
import A05ListRow from "./A05ListRow";
import { A05Context } from "@/modules/A05/A05Context";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const A05ListRowContainer = (props) => {
	const { index, ...rest } = props;

	const a05 = useContext(A05Context);
	// const { isItemLoading } = a05;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => a05.listData[index], [a05.listData, index]);
	const loading = useMemo(() => !value, [value]);

	const selected = useMemo(() => {
		return value?.FactID === a05.selectedItem?.FactID;
	}, [a05.selectedItem?.FactID, value?.FactID]);

	return (
		<ListRowProvider loading={loading}>
			<A05ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => a05.handleSelect(e, value)}
				selected={selected}
				{...rest}
			/>
		</ListRowProvider>
	);
};
A05ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
A05ListRowContainer.displayName = "A05ListRowContainer";
