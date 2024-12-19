import { D041Context } from "@/contexts/D041/D041Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import D041ListRow from "./D041ListRow";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const D041ListRowContainer = (props) => {
	const c04 = useContext(D041Context);
	const { isItemLoading } = c04;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c04.listData[index], [c04.listData, index]);

	return (
		<ListRowProvider loading={loading}>
			<D041ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => c04.handleSelect(e, value)}
				expChecking={c04.expChecking}
				{...rest}
			/>
		</ListRowProvider>
	);
};
D041ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
D041ListRowContainer.displayName = "D041ListRowContainer";



