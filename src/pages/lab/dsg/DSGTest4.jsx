import { createMuiCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createMuiCheckboxColumn";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo, useState } from "react";
import {
	DataSheetGrid,
	checkboxColumn,
	createTextColumn,
	keyColumn,
	textColumn,
} from "react-datasheet-grid";
import { createFloatColumn } from "../../../shared-components/dsg/columns/float/createFloatColumn";
import { createOptionPickerColumn } from "@/shared-components/dsg/columns/option-picker/createOptionPickerColumn";
import { createTextColumnEx } from "../../../shared-components/dsg/columns/text/createTextColumnEx";

const DSGTest4 = memo(
	forwardRef((props, ref) => {
		const { gridRef } = props;

		const [data, setData] = useState([
			{
				firstName: "Jeff",
				lastName: "Bezos",
			},
			{},
			{},
		]);

		const columns = useMemo(
			() => [
				{
					...keyColumn(
						"firstName",
						createTextColumnEx({
							continuousUpdates: false,
						})
					),
					title: "First name",
				},
				{
					...keyColumn(
						"lastName",
						createTextColumnEx({
							continuousUpdates: false,
						})
					),
					title: "Disable",
					disabled: true,
				},
				{
					...keyColumn(
						"col3",
						createTextColumnEx({
							continuousUpdates: false,
						})
					),
					title: "Col3",
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

DSGTest4.propTypes = {
	gridRef: PropTypes.object,
};

DSGTest4.displayName = "DSGTest4";
export default DSGTest4;
