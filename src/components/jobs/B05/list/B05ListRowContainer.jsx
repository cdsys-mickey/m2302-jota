import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { B05Context } from "@/contexts/B05/B05Context";
import B05ListRow from "./B05ListRow";
import { useCallback } from "react";

export const B05ListRowContainer = (props) => {
	const b05 = useContext(B05Context);
	const { isItemLoading } = b05;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => b05.listData[index], [b05.listData, index]);

	return (
		<B05ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => b05.handleSelect(e, value)}
			// confirmResetPword={(e) => confirmResetPword(e, value)}
			// promptCopyAuth={(e) => promptCopyAuth(e, value)}
			{...rest}
		/>
	);
};
B05ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
B05ListRowContainer.displayName = "B05ListRowContainer";
