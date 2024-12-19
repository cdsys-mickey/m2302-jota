import { E01Context } from "@/contexts/E01/E01Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import E01ListRow from "./E01ListRow";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const E01ListRowContainer = (props) => {
	const e01 = useContext(E01Context);
	const { isItemLoading } = e01;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => e01.listData[index], [e01.listData, index]);

	return (
		<ListRowProvider loading={loading}>
			<E01ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => e01.handleSelect(e, value)}
				{...rest}
			/>
		</ListRowProvider>
	);
};
E01ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
E01ListRowContainer.displayName = "E01ListRowContainer";


