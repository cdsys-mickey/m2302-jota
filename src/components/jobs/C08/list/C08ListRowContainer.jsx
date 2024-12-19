import { C08Context } from "@/contexts/C08/C08Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import C08ListRow from "./C08ListRow";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const C08ListRowContainer = (props) => {
	const c08 = useContext(C08Context);
	const { isItemLoading } = c08;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c08.listData[index], [c08.listData, index]);

	return (
		<ListRowProvider loading={loading}>
			<C08ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => c08.handleSelect(e, value)}
				{...rest}
			/>
		</ListRowProvider>
	);
};
C08ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
C08ListRowContainer.displayName = "C08ListRowContainer";
