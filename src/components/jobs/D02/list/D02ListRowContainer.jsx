import { D02Context } from "@/contexts/D02/D02Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import D02ListRow from "./D02ListRow";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";

export const D02ListRowContainer = (props) => {
	const c04 = useContext(D02Context);
	const { isItemLoading } = c04;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c04.listData[index], [c04.listData, index]);

	return (
		<ListRowProvider loading={loading}>
			<D02ListRow
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
D02ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
D02ListRowContainer.displayName = "D02ListRowContainer";


