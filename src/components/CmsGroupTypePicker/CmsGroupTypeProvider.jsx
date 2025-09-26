import useCmsGroupTypeAlias from "@/hooks/useCmsGroupTypeAlias";
import { useInit } from "@/shared-hooks/useInit";
import PropTypes from "prop-types";
import { useMemo } from "react";
import CmsGroupTypeContext from "./CmsGroupTypeContext";

const CmsGroupTypeProvider = ({ children, ...rest }) => {
	const [groupTypeAlias, loadGroupAliasMap] = useCmsGroupTypeAlias();

	useInit(() => {
		loadGroupAliasMap();
	}, [])

	const contextValue = useMemo(() => ({
		groupTypeAlias,
		...rest
	}), [groupTypeAlias, rest])

	return (
		<CmsGroupTypeContext.Provider value={contextValue}>
			{children}
		</CmsGroupTypeContext.Provider>
	);
};

CmsGroupTypeProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
export default CmsGroupTypeProvider