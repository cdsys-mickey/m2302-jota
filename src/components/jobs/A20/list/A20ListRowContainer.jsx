import { useContext } from "react";
import A20ListRow from "./A20ListRow";
import { A20Context } from "@/contexts/A20/A20Context";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const A20ListRowContainer = (props) => {
	const { index, ...rest } = props;

	const a20 = useContext(A20Context);
	// const { isItemLoading } = a20;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => a20.listData[index], [a20.listData, index]);
	const loading = useMemo(() => !value, [value]);

	const selected = useMemo(() => {
		return value?.ProdID === a20.selectedItem?.ProdID;
	}, [a20.selectedItem?.ProdID, value?.ProdID]);

	return (
		<ListRowProvider loading={loading}>
			<A20ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => a20.handleSelect(e, value)}
				selected={selected}
				{...rest}
			/>
		</ListRowProvider>
	);
};
A20ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
A20ListRowContainer.displayName = "A20ListRowContainer";
