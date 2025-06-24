import { useContext } from "react";
import P21ListRow from "./P21ListRow";
import { P21Context } from "@/modules/P21/P21Context";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const P21ListRowContainer = (props) => {
	const { index, ...rest } = props;

	const p21 = useContext(P21Context);
	// const { isItemLoading } = p21;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => p21.listData[index], [p21.listData, index]);
	const loading = useMemo(() => !value, [value]);

	const selected = useMemo(() => {
		return value?.FactID === p21.selectedItem?.FactID;
	}, [p21.selectedItem?.FactID, value?.FactID]);

	return (
		<ListRowProvider loading={loading}>
			<P21ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => p21.handleSelect(e, value)}
				selected={selected}
				{...rest}
			/>
		</ListRowProvider>
	);
};
P21ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
P21ListRowContainer.displayName = "P21ListRowContainer";


