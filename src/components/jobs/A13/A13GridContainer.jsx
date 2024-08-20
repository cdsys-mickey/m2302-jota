import { A13Context } from "@/contexts/A13/A13Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A13Grid from "./A13Grid";
import { useMemo } from "react";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

const A13GridContainer = () => {
	const { height } = useWindowSize();
	const a13 = useContext(A13Context);

	const onChange = useMemo(() => {
		return a13.buildGridChangeHandler({
			onCreate: a13.handleCreate,
			onUpdate: a13.handleUpdate,
			onDelete: a13.canDelete ? a13.handleConfirmDelete : null,
			onDuplicatedError: a13.handleDuplicatedError,
		})
	}, [a13]);

	const onSelectionChange = useMemo(() => {
		return a13.buildSelectionChangeHandler({});
	}, [a13]);

	return (
		<DSGContext.Provider value={{ ...a13.gridMeta }}>
			<A13Grid
				lockRows={a13.readOnly}
				gridRef={a13.setGridRef}
				data={a13.gridData}
				loading={a13.gridLoading}
				height={height - 176}
				onChange={onChange}
				onSelectionChange={onSelectionChange}
				onActiveCellChange={a13.handleActiveCellChange}
				canCreate={a13.canCreate}
			/>
		</DSGContext.Provider>
	);
};

A13GridContainer.displayName = "A13GridContainer";

export default A13GridContainer;
