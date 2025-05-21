import { A01Context } from "@/modules/A01/A01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import A01CmsGrid from "./A01CmsGrid";

export const A01CmsGridContainer = (props) => {
	const { ...rest } = props;
	const a01 = useContext(A01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();

	const readOnly = useMemo(() => {
		return a01.cmsGridDisabled;
	}, [a01.cmsGridDisabled])

	const _height = useMemo(() => {
		return height - 288 + (readOnly ? 48 : 0)
	}, [height, readOnly])

	return (
		<DSGContext.Provider
			value={{
				...a01.cmsGrid,
				...a01.cmsMeta,
				readOnly: !a01.editing
			}}>
			<A01CmsGrid
				gridRef={a01.cmsMeta.setGridRef}
				readOnly={a01.cmsGridDisabled}
				columns={a01.cmsMeta.columns}
				data={a01.cmsGrid.gridData}
				onChange={a01.handleCmsGridChange}
				onActiveCellChange={a01.cmsMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				createRow={a01.createCmsRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};
A01CmsGridContainer.propTypes = {
	store: PropTypes.bool,
};
A01CmsGridContainer.displayName = "ProdTransGridContainer";
