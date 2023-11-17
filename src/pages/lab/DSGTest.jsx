import { Container } from "@mui/material";
import { memo } from "react";
import PropTypes from "prop-types";
import { useRef } from "react";
import {
	DataSheetGrid,
	checkboxColumn,
	textColumn,
	keyColumn,
} from "react-datasheet-grid";
import { useState } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";

const DSGTest = memo(
	forwardRef((props, ref) => {
		const { gridRef } = props;
		// const ref = useRef(null);

		const [data, setData] = useState([
			{ active: true, firstName: "Elon", lastName: "Musk" },
			{ active: false, firstName: "Jeff", lastName: "Bezos" },
		]);

		const columns = [
			{ ...keyColumn("active", checkboxColumn), title: "Active" },
			{ ...keyColumn("firstName", textColumn), title: "First name" },
			{ ...keyColumn("lastName", textColumn), title: "Last name" },
		];

		useEffect(() => {
			gridRef.current?.setActiveCell({ row: 1, col: 1 });
		}, [gridRef]);

		return (
			<div
				style={{
					margin: "50px",
					padding: "50px",
					maxWidth: "900px",
					background: "#f3f3f3",
				}}>
				<DataSheetGrid
					// ref={ref}
					ref={gridRef}
					value={data}
					onChange={setData}
					columns={columns}
					height={200}
				/>
			</div>
		);
	})
);

DSGTest.propTypes = {};

DSGTest.displayName = "DSGTest";
export default DSGTest;
