import { useContext } from "react";
import P36ListRow from "./P36ListRow";
import { P36Context } from "@/modules/P36/P36Context";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const P36ListRowContainer = (props) => {
	const { index, ...rest } = props;

	const p36 = useContext(P36Context);
	// const { isItemLoading } = p36;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => p36.listData[index], [p36.listData, index]);
	const loading = useMemo(() => !value, [value]);

	const selected = useMemo(() => {
		return value?.FactID === p36.selectedItem?.FactID;
	}, [p36.selectedItem?.FactID, value?.FactID]);

	return (
		<ListRowProvider loading={loading}>
			<P36ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => p36.handleSelect(e, value)}
				selected={selected}
				{...rest}
			/>
		</ListRowProvider>
	);
};
P36ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
P36ListRowContainer.displayName = "P36ListRowContainer";



