import { C05Context } from "@/contexts/C05/C05Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import C05ListRow from "./C05ListRow";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const C05ListRowContainer = (props) => {
	const c05 = useContext(C05Context);
	const { isItemLoading } = c05;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c05.listData[index], [c05.listData, index]);

	return (
		<ListRowProvider loading={loading}>
			<C05ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => c05.handleSelect(e, value)}
				{...rest}
			/>
		</ListRowProvider>
	);
};
C05ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
C05ListRowContainer.displayName = "C05ListRowContainer";
