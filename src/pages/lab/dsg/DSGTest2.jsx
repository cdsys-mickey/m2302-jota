import { prodPickerColumn } from "@/components/dsg/columns/prod-picker/prodPickerColumn";
import { DSGGrid } from "@/shared-components";
import { checkboxColumnEx } from "@/shared-components/dsg/columns/checkbox/checkboxColumnEx";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo, useState } from "react";
import {
	createTextColumn,
	keyColumn
} from "react-datasheet-grid";

const DSGTest2 = memo(
	forwardRef((props, ref) => {
		const { gridRef } = props;

		const [data, setData] = useState([
			{ active: true, firstName: "Elon", lastName: "Musk", prod: null },
			{ active: false, firstName: "Jeff", lastName: "Bezos", prod: null },
		]);

		const columns = useMemo(
			() => [
				{
					...keyColumn(
						"Using_N",
						checkboxColumnEx
					),
					title: "U",
					minWidth: 60,
				},
				{
					...keyColumn(
						"abc",
						optionPickerColumn({
							options: ["A", "B", "C"],
						})
					),
					title: "ABC",
					minWidth: 100,
				},

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
						"prod",
						prodPickerColumn({
							name: "prod",
							withStock: true,
							triggerDelay: 100,
						})
					),
					id: "SProdID",
					title: "商品",
					grow: 4,
					disabled: false,
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
				<DSGGrid
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
	gridRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	bearer: PropTypes.string,
};

DSGTest2.displayName = "DSGTest2";
export default DSGTest2;
