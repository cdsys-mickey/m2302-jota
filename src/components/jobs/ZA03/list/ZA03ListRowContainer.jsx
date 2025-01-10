import { AuthContext } from "@/contexts/auth/AuthContext";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import ZA03ListRow from "./ZA03ListRow";

export const ZA03ListRowContainer = (props) => {
	const auth = useContext(AuthContext);
	const za03 = useContext(ZA03Context);
	const { isItemLoading, confirmResetPword, promptCopyAuth } = za03;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => za03.listData[index], [za03.listData, index]);

	const showAuthScope = useMemo(() => {
		return auth?.operator?.Class >= 3;
	}, [auth?.operator?.Class])

	return (
		<ZA03ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => za03.handleSelect(e, value)}
			confirmResetPword={(e) => confirmResetPword(e, value)}
			promptCopyAuth={(e) => promptCopyAuth(e, value)}
			showAuthScope={showAuthScope}
			{...rest}
		/>
	);
};
ZA03ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
ZA03ListRowContainer.displayName = "ZA03ListRowContainer";
