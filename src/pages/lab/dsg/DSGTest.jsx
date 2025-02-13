import { createMuiCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createMuiCheckboxColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import OptionPickerComponent from "@/shared-components/dsg/columns/option-picker/OptionPickerComponent";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo, useState } from "react";
import {
	DataSheetGrid,
	checkboxColumn,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import { createFloatColumn } from "../../../shared-components/dsg/columns/float/createFloatColumn";

const DSGTest = memo(
	forwardRef((props, ref) => {
		const { gridRef } = props;

		const [data, setData] = useState([
			{
				active: true,
				firstName: "Elon",
				lastName: "Musk",
				abc: "A",
				SCost: "0",
			},
			{
				active: false,
				firstName: "Jeff",
				lastName: "Bezos",
				abc: "B",
				SCost: 0,
			},
		]);

		const columns = useMemo(
			() => [
				{ ...keyColumn("active", checkboxColumn), title: "Active" },
				{
					...keyColumn(
						"firstName",
						createTextColumn({
							continuousUpdates: false,
						})
					),
					title: "First name",
				},
				{
					...keyColumn(
						"lastName",
						createTextColumn({
							continuousUpdates: false,
						})
					),
					title: "Last name",
				},
				{
					...keyColumn(
						"Using_N",
						createMuiCheckboxColumn({
							trueValue: "1",
							falseValue: "0",
						})
					),
					title: "使用中",
				},
				{
					...keyColumn("SCost", createFloatColumn(2)),
					title: "調撥成本",
					grow: 1,
					// disabled: lockRows,
				},
				{
					...keyColumn(
						"abc",
						optionPickerColumn(OptionPickerComponent, {
							options: ["A", "B", "C"],
						})
					),
					title: "OptionPicker",
				},
			],
			[]
		);

		// useEffect(() => {
		// 	gridRef.current?.setActiveCell({ row: 1, col: 1 });
		// }, [gridRef]);

		return (
			<div
				ref={ref}
				style={{
					// margin: "50px",
					// padding: "50px",
					// maxWidth: "900px",
					background: "#f3f3f3",
				}}>
				<DataSheetGrid
					ref={gridRef}
					value={data}
					onChange={setData}
					columns={columns}
					height={500}
					// rowHeight={42}
					disableExpandSelection
				/>
			</div>
		);
	})
);

DSGTest.propTypes = {
	gridRef: PropTypes.object,
};

DSGTest.displayName = "DSGTest";
export default DSGTest;
