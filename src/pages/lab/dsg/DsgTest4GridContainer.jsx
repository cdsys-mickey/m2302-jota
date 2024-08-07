import { useContext } from "react";
import DsgTest4Grid from "./DsgTest4Grid";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { DSGTest4Context } from "./test4/DSGTest4Context";
import { useInit } from "@/shared-hooks/useInit";
import { FormProvider, useForm } from "react-hook-form";
import { useWindowSize } from "../../../shared-hooks/useWindowSize";

export const DsgTest4GridContainer = () => {
	const dsg = useContext(DSGContext);
	const dsgTest4 = useContext(DSGTest4Context);
	const form = useForm();
	const { height } = useWindowSize();

	useInit(() => {
		const data = dsg.fillRows({
			createRow: dsgTest4.createRow,
			length: 9,
		});
		console.log("data", data);

		dsg.initGridData(data);
	}, []);

	return (
		<FormProvider {...form}>
			<DsgTest4Grid
				value={dsg.gridData}
				columns={dsg.columns}
				height={height - 260}
				gridRef={dsg.setGridRef}
				onActiveCellChange={dsg.handleActiveCellChange}
				onChange={dsgTest4.handleGridChange}
				// getNextCell={dsg.getNextCell}
				// nextCell={dsg.nextCell}
				createRow={dsgTest4.createRow}
			/>
		</FormProvider>
	);
};

DsgTest4GridContainer.displayName = "DsgTest4GridContainer";
