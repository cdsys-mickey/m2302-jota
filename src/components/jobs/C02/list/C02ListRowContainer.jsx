import { C02Context } from "@/contexts/C02/C02Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import C02ListRow from "./C02ListRow";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const C02ListRowContainer = (props) => {
	const c02 = useContext(C02Context);
	const { isItemLoading } = c02;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c02.listData[index], [c02.listData, index]);

	return (
		<ListRowProvider loading={loading}>
			<C02ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={(e) => c02.handleSelect(e, value)}
				{...rest}
			/>
		</ListRowProvider>
	);
};
C02ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
C02ListRowContainer.displayName = "C02ListRowContainer";
