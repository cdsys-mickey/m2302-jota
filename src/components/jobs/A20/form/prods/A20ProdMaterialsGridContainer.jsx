import { useContext } from "react";
import { A20Context } from "@/contexts/A20/A20Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import A20ProdMaterialsGrid from "./A20ProdMaterialsGrid";
import PropTypes from "prop-types";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";

export const A20ProdMaterialsGridContainer = (props) => {
	const { ...rest } = props;
	const a20 = useContext(A20Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);

	// const onChange = useMemo(() => {
	// 	return a20.buildGridChangeHandler({ gridMeta: formMeta.gridMeta })
	// }, [a20, formMeta.gridMeta])

	const onChange = useMemo(() => {
		return a20.buildGridChangeHandler({
			gridMeta: formMeta.gridMeta,
			onUpdateRow: a20.onUpdateRow
		})
	}, [a20, formMeta.gridMeta])

	return (
		<DSGContext.Provider value={{
			...a20.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<A20ProdMaterialsGrid
				rowKey={a20.getRowKey}
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={a20.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height - 350}
				createRow={a20.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};
A20ProdMaterialsGridContainer.propTypes = {
	store: PropTypes.bool,
};
A20ProdMaterialsGridContainer.displayName = "A20ProdMaterialsGridContainer";
