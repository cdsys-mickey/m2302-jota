import { useContext } from "react";
import P34ListRow from "./P34ListRow";
import { P34Context } from "@/modules/P34/P34Context";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const P34ListRowContainer = (props) => {
	const { index, ...rest } = props;

	const p34 = useContext(P34Context);
	// const { isItemLoading } = p34;
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => p34.listData[index], [p34.listData, index]);
	const loading = useMemo(() => !value, [value]);

	const selected = useMemo(() => {
		return value?.FactID === p34.selectedItem?.FactID;
	}, [p34.selectedItem?.FactID, value?.FactID]);

	return (
		<ListRowProvider loading={loading}>
			<P34ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => p34.handleSelect(e, value)}
				selected={selected}
				{...rest}
			/>
		</ListRowProvider>
	);
};
P34ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
P34ListRowContainer.displayName = "P34ListRowContainer";

