import { createMuiCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createMuiCheckboxColumn";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo, useState } from "react";
import {
	DynamicDataSheetGrid,
	keyColumn,
	textColumn,
} from "react-datasheet-grid";
import { checkboxColumn2 } from "../../../shared-components/dsg/columns/checkbox/checkboxColumn2";
import { createOptionPickerColumn } from "../../../shared-components/dsg/columns/option-picker/createOptionPickerColumn";
import { reactSelectColumn } from "../../../shared-components/dsg/columns/react-select/reactSelectColumn";

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
						createOptionPickerColumn({
							options: ["A", "B", "C"],
						})
					),
					title: "OptionPicker",
				},
				{
					...keyColumn(
						"def",
						reactSelectColumn({
							options: [
								{
									value: "D",
									label: "D",
								},
								{
									value: "E",
									label: "E",
								},
								{
									value: "F",
									label: "F",
								},
							],
							placeholder: "請選擇...",
						})
					),
					title: "React-Select",
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
					// rowHeight={42}
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
