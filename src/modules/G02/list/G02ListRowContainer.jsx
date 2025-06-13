import { G02Context } from "@/modules/G02/G02Context";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import G02ListRow from "./G02ListRow";
import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";
import { useCallback } from "react";

export const G02ListRowContainer = (props) => {
	const g02 = useContext(G02Context);
	const { isItemLoading } = g02;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => g02.listData[index], [g02.listData, index]);

	const listLoader = useContext(InfiniteLoaderContext);
	const { isChecked, toggleChecked } = listLoader;
	const checked = isChecked(index);

	const handleCheckChange = useCallback((e) => {
		toggleChecked(index, e);
	}, [index, toggleChecked]);

	return (
		<ListRowProvider loading={loading}>
			<G02ListRow
				checked={checked}
				index={index}
				onCheckChange={handleCheckChange}
				onClick={handleCheckChange}
				// loading={loading}
				value={value}
				// onClick={(e) => g02.handleSelect(e, value)}
				// confirmResetPword={(e) => confirmResetPword(e, value)}
				// promptCopyAuth={(e) => promptCopyAuth(e, value)}
				{...rest}
			/>
		</ListRowProvider>
	);
};
G02ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
G02ListRowContainer.displayName = "G02ListRowContainer";

