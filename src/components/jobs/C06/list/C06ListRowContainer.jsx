import { C06Context } from "@/contexts/C06/C06Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import C06ListRow from "./C06ListRow";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const C06ListRowContainer = (props) => {
	const c06 = useContext(C06Context);
	const { isItemLoading } = c06;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c06.listData[index], [c06.listData, index]);

	return (
		<ListRowProvider loading={loading}>
			<C06ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => c06.handleSelect(e, value)}
				{...rest}
			/>
		</ListRowProvider>
	);
};
C06ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
C06ListRowContainer.displayName = "C06ListRowContainer";
