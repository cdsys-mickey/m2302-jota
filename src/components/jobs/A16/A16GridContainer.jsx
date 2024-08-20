import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A16Grid from "./A16Grid";
import { A16Context } from "@/contexts/A16/A16Context";
import { useMemo } from "react";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

const A16GridContainer = () => {
	// const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const a16 = useContext(A16Context);

	const onChange = useMemo(() => {
		return a16.buildGridChangeHandler({
			onCreate: a16.handleCreate,
			onUpdate: a16.handleUpdate,
			onPatch: a16.handlePatch,
			onDelete: a16.handleConfirmDelete,
			onDuplicatedError: a16.handleDuplicatedError,
		})
	}, [a16]);

	const onSelectionChange = useMemo(() => {
		return a16.buildSelectionChangeHandler({})
	}, [a16]);

	return (
		<DSGContext.Provider value={{ ...a16.gridMeta }}>
			<A16Grid
				readOnly={a16.readOnly}
				gridRef={a16.setGridRef}
				data={a16.gridData}
				loading={a16.gridLoading}
				onChange={onChange}
				height={height - 176}
				onSelectionChange={onSelectionChange}
				createRow={a16.createRow}
			/>
		</DSGContext.Provider>
	);
};

A16GridContainer.displayName = "A16GridContainer";

export default A16GridContainer;
