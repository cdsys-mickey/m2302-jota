import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A16GGrid from "./A16GGrid";
import { A16GContext } from "@/contexts/A16G/A16GContext";
import { useMemo } from "react";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

const A16GGridContainer = () => {
	// const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const a16g = useContext(A16GContext);

	const onChange = useMemo(() => {
		return a16g.buildGridChangeHandler({
			onCreate: a16g.handleCreate,
			onUpdate: a16g.handleUpdate,
			onPatch: a16g.handlePatch,
			onDelete: a16g.handleConfirmDelete,
			onDuplicatedError: a16g.handleDuplicatedError,
		})
	}, [a16g]);

	const onSelectionChange = useMemo(() => {
		return a16g.buildSelectionChangeHandler({})
	}, [a16g]);

	return (
		<DSGContext.Provider value={{ ...a16g.gridMeta }}>
			<A16GGrid
				readOnly={a16g.readOnly}
				gridRef={a16g.setGridRef}
				data={a16g.gridData}
				loading={a16g.gridLoading}
				onChange={onChange}
				height={height - 176}
				onSelectionChange={onSelectionChange}
				createRow={a16g.createRow}
			/>
		</DSGContext.Provider>
	);
};

A16GGridContainer.displayName = "A16GGridContainer";

export default A16GGridContainer;

