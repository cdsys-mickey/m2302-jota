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
import { checkboxColumn2 } from "../../shared-components/dsg/columns/checkbox/CheckboxComponent";

const DSGTest3 = memo(
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
				// { ...keyColumn("active", checkboxColumn), title: "Active" },
				{ ...keyColumn("active", checkboxColumn2), title: "Active" },
				{ ...keyColumn("firstName", textColumn), title: "First name" },
				{ ...keyColumn("lastName", textColumn), title: "Last name" },
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
