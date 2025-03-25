import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { P14Context } from "@/modules/P14/P14Context";
import P14ListRow from "./P14ListRow";
import { useCallback } from "react";

export const P14ListRowContainer = (props) => {
	const p14 = useContext(P14Context);
	const { isItemLoading } = p14;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => p14.listData[index], [p14.listData, index]);

	return (
		<P14ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => p14.handleSelect(e, value)}
			// confirmResetPword={(e) => confirmResetPword(e, value)}
			// promptCopyAuth={(e) => promptCopyAuth(e, value)}
			{...rest}
		/>
	);
};
P14ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
P14ListRowContainer.displayName = "P14ListRowContainer";


