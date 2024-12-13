import { A14Context } from "@/contexts/A14/A14Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A14Grid from "./A14Grid";
import { useMemo } from "react";
import { DSGContext } from "../../../shared-contexts/datasheet-grid/DSGContext";

const A14GridContainer = () => {
	const { height } = useWindowSize();
	const a14 = useContext(A14Context);

	const onChange = useMemo(() => {
		return a14.buildGridChangeHandler({
			onCreate: a14.handleCreate,
			onUpdate: a14.handleUpdate,
			onDelete: a14.canDelete ? a14.handleConfirmDelete : null,
			onDuplicatedError: a14.handleDuplicatedError,
		});
	}, [a14]);

	const onSelectionChange = useMemo(() => {
		return a14.buildSelectionChangeHandler({})
	}, [a14]);

	const _height = useMemo(() => {
		return height - 182;
	}, [height])

	return (
		<DSGContext.Provider value={{ ...a14.gridMeta }}>
			<A14Grid
				lockRows={a14.readOnly}
				gridRef={a14.gridRef}
				setGridRef={a14.setGridRef}
				data={a14.gridData}
				loading={a14.gridLoading}
				height={_height}
				onChange={onChange}
				onSelectionChange={onSelectionChange}
				onActiveCellChange={a14.handleActiveCellChange}
				canCreate={a14.canCreate}
				createRow={a14.createRow}
			/>
		</DSGContext.Provider>
	);
};

A14GridContainer.displayName = "A14GridContainer";

export default A14GridContainer;
