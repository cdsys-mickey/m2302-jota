import { createMuiCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createMuiCheckboxColumn";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo, useState } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
	textColumn,
} from "react-datasheet-grid";
import Depts from "@/modules/md-depts";
import Prods from "@/modules/md-prods";
import { createWebApiOptionPickerColumn } from "@/shared-components/dsg/columns/option-picker/createWebApiOptionPickerColumn";
import { createOptionPickerColumn } from "@/shared-components/dsg/columns/option-picker/createOptionPickerColumn";

const DSGTest2 = memo(
	forwardRef((props, ref) => {
		const { gridRef, bearer } = props;

		const [data, setData] = useState([
			{ active: true, firstName: "Elon", lastName: "Musk" },
			{ active: false, firstName: "Jeff", lastName: "Bezos" },
		]);

		const columns = useMemo(
			() => [
				{
					...keyColumn(
						"firstName",
						createTextColumn({
							continuousUpdates: false,
						})
					),
					title: "First name",
					grow: 3,
					minWidth: 120,
				},
				{
					...keyColumn(
						"Using_N",
						createMuiCheckboxColumn({
							trueValue: "1",
							falseValue: "0",
						})
					),
					title: "U",
					minWidth: 60,
				},
				{
					...keyColumn(
						"abc",
						createOptionPickerColumn({
							options: ["A", "B", "C"],
						})
					),
					title: "ABC",
					minWidth: 100,
				},
				{
					...keyColumn(
						"dept",
						createWebApiOptionPickerColumn({
							url: "v1/ou/depts",
							bearer: bearer,
							getOptionLabel: Depts.getOptionLabel,
							isOptionEqualToValue: Depts.isOptionEqualToValue,
							getData: (p) => p["data"],
						})
					),
					title: "門市",
					grow: 6,
				},
				{
					...keyColumn(
						"prod",
						createWebApiOptionPickerColumn({
							url: "v1/prods",
							querystring: "tp=20",
							bearer: bearer,
							queryParam: "qs",
							getOptionLabel: Prods.getOptionLabel,
							isOptionEqualToValue: Prods.isOptionEqualToValue,
							filterByServer: true,
							getData: (p) => p["data"],
						})
					),
					title: "商品",
					grow: 8,
				},
			],
			[bearer]
		);

		// useEffect(() => {
		// 	gridRef.current?.setActiveCell({ row: 1, col: 1 });
		// }, [gridRef]);

		return (
			<div
				ref={ref}
				style={
					{
						// margin: "50px",
						// padding: "50px",
						// paddingLeft: "10px",
						// paddingRight: "10px",
						// maxWidth: "900px",
						// background: "#f3f3f3",
					}
				}>
				<DynamicDataSheetGrid
					ref={gridRef}
					value={data}
					onChange={setData}
					columns={columns}
					height={500}
					// rowHeight={42}
				/>
			</div>
		);
	})
);

DSGTest2.propTypes = {
	gridRef: PropTypes.func,
	bearer: PropTypes.string,
};

DSGTest2.displayName = "DSGTest2";
export default DSGTest2;
