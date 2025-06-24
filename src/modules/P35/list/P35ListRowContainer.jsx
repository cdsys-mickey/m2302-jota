import { useContext } from "react";
import P35ListRow from "./P35ListRow";
import { P35Context } from "@/modules/P35/P35Context";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const P35ListRowContainer = (props) => {
	const { index, ...rest } = props;

	const p35 = useContext(P35Context);
	// const { isItemLoading } = p35;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => p35.listData[index], [p35.listData, index]);
	const loading = useMemo(() => !value, [value]);

	const selected = useMemo(() => {
		return value?.FactID === p35.selectedItem?.FactID;
	}, [p35.selectedItem?.FactID, value?.FactID]);

	return (
		<ListRowProvider loading={loading}>
			<P35ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => p35.handleSelect(e, value)}
				selected={selected}
				{...rest}
			/>
		</ListRowProvider>
	);
};
P35ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
P35ListRowContainer.displayName = "P35ListRowContainer";


