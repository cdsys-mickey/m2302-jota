import { forwardRef, memo, useEffect, useState } from "react";
import {
	DataSheetGrid,
	checkboxColumn,
	keyColumn,
	textColumn,
} from "react-datasheet-grid";
import { createOptionPickerColumn } from "@/shared-components/dsg/columns/option-picker/createOptionPickerColumn";
import { useMemo } from "react";
import { DynamicDataSheetGrid } from "react-datasheet-grid";
import PropTypes from "prop-types";
import { createMuiCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createMuiCheckboxColumn";
import { createFloatColumn } from "../../shared-components/dsg/columns/float/createFloatColumn";
import OptionPickerColumn from "../../shared-components/dsg/columns/option-picker/OptionPickerColumn";
import { checkboxColumn2 } from "../../shared-components/dsg/columns/checkbox/checkboxColumn2";

const DSGTest3 = memo(
	forwardRef((props, ref) => {
		const { gridRef } = props;

		const [data, setData] = useState([
			{
				active: true,
				active2: false,
				firstName: "Elon",
				lastName: "Musk",
				abc: "A",
				SCost: "0",
			},
			{
				active: false,
				firstName: "Jeff",
				lastName: "Bezos",
				prod: {},
			},
			{
				active: false,
				active2: true,
				firstName: "Jeff",
				lastName: "Bezos2",
				prod: {},
			},
			{
				active: false,
				active2: true,
				firstName: "Jeff",
				lastName: "Bezos3",
				prod: {},
			},
			{
				active: false,
				active2: true,
				firstName: "Jeff",
				lastName: "Bezos4",
				prod: {},
			},
		]);

		const columns = useMemo(
			() => [
				// { ...keyColumn("active", checkboxColumn), title: "Active" },
				{ ...keyColumn("active", checkboxColumn2), title: "Active" },
				{ ...keyColumn("firstName", textColumn), title: "First name" },
				{ ...keyColumn("lastName", textColumn), title: "Last name" },
				{
					...keyColumn(
						"active2",
						createMuiCheckboxColumn({
							trueValue: "1",
							falseValue: "0",
						})
					),
					title: "Active2",
					minWidth: 60,
				},
				{
					...keyColumn(
						"abc",
						createOptionPickerColumn((props) => (
							<OptionPickerColumn
								options={["A", "B", "C"]}
								{...props}
							/>
						))
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
					margin: "50px",
					padding: "50px",
					maxWidth: "900px",
					background: "#f3f3f3",
				}}>
				<DynamicDataSheetGrid
					ref={gridRef}
					value={data}
					onChange={setData}
					columns={columns}
					height={500}
					rowHeight={42}
					disableExpandSelection
				/>
			</div>
		);
	})
);

DSGTest3.propTypes = {
	gridRef: PropTypes.object,
};

DSGTest3.displayName = "DSGTest3";
export default DSGTest3;
