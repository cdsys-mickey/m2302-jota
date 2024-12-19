import { D01Context } from "@/contexts/D01/D01Context";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import D01ListRow from "./D01ListRow";

export const D01ListRowContainer = (props) => {
	const c04 = useContext(D01Context);
	const { isItemLoading } = c04;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c04.listData[index], [c04.listData, index]);

	return (
		<ListRowProvider loading={loading}>
			<D01ListRow
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
D01ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
D01ListRowContainer.displayName = "D01ListRowContainer";

