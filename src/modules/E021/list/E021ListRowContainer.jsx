import { E021Context } from "@/modules/E021/E021Context";
import { ListRowProvider } from "@/shared-components/listview/context/ListRowProvider";
import PropTypes from "prop-types";
import { useCallback, useContext, useMemo } from "react";
import E021ListRow from "./E021ListRow";

export const E021ListRowContainer = (props) => {
	const e021 = useContext(E021Context);
	const { isItemLoading } = e021;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => e021.listData[index], [e021.listData, index]);
	// const formMeta = useContext(FormMetaContext);

	const handleClick = useCallback((e) => {
		// formMeta.supressEvents();
		e021.handleSelect(e, value);
	}, [e021, value]);

	return (
		<ListRowProvider loading={loading}>
			<E021ListRow
				index={index}
				// loading={loading}
				value={value}
				onClick={handleClick}
				{...rest}
			/>
		</ListRowProvider>
	);
};
E021ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
E021ListRowContainer.displayName = "E021ListRowContainer";



