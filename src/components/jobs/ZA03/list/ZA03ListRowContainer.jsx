import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import ZA03ListRow from "./ZA03ListRow";
import { useCallback } from "react";

export const ZA03ListRowContainer = (props) => {
	const za03 = useContext(ZA03Context);
	const { isItemLoading, confirmResetPword, promptCopyAuth } = za03;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => za03.listData[index], [za03.listData, index]);

	return (
		<ZA03ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => za03.handleSelect(e, value)}
			confirmResetPword={(e) => confirmResetPword(e, value)}
			promptCopyAuth={(e) => promptCopyAuth(e, value)}
			{...rest}
		/>
	);
};
ZA03ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
ZA03ListRowContainer.displayName = "ZA03ListRowContainer";
