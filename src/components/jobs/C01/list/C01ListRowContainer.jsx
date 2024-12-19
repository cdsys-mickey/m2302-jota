import { C01Context } from "@/contexts/C01/C01Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import C01ListRow from "./C01ListRow";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const C01ListRowContainer = (props) => {
	const c01 = useContext(C01Context);
	const { isItemLoading } = c01;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c01.listData[index], [c01.listData, index]);

	return (
		<ListRowProvider loading={loading}>
			<C01ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => c01.handleSelect(e, value)}
				{...rest}
			/>
		</ListRowProvider>
	);
};
C01ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
C01ListRowContainer.displayName = "C01ListRowContainer";
