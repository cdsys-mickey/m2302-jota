import { useContext } from "react";
import A16ListRow from "./A16ListRow";
import { A16Context } from "@/modules/A16/A16Context";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const A16ListRowContainer = (props) => {
	const { index, ...rest } = props;

	const a16 = useContext(A16Context);
	// const { isItemLoading } = a16;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => a16.listData[index], [a16.listData, index]);
	const loading = useMemo(() => !value, [value]);

	const selected = useMemo(() => {
		return value?.FactID === a16.selectedItem?.FactID;
	}, [a16.selectedItem?.FactID, value?.FactID]);

	return (
		<ListRowProvider loading={loading}>
			<A16ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => a16.handleSelect(e, value)}
				selected={selected}
				{...rest}
			/>
		</ListRowProvider>
	);
};
A16ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
A16ListRowContainer.displayName = "A16ListRowContainer";

