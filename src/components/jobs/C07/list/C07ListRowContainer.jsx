import { C07Context } from "@/contexts/C07/C07Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import C07ListRow from "./C07ListRow";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const C07ListRowContainer = (props) => {
	const c07 = useContext(C07Context);
	const { isItemLoading } = c07;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c07.listData[index], [c07.listData, index]);

	return (
		<ListRowProvider loading={loading}>
			<C07ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => c07.handleSelect(e, value)}
				{...rest}
			/>
		</ListRowProvider>
	);
};
C07ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
C07ListRowContainer.displayName = "C07ListRowContainer";
