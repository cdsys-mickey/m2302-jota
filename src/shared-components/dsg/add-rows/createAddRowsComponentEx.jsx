/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useState } from "react";
import FlexBox from "../../FlexBox";

export const createAddRowsComponentEx =
	({ translationKeys, RightComponent }) =>
	({ addRows }) => {
		const [value, setValue] = useState(1);
		const [rawValue, setRawValue] = useState(String(value));

		return (
			<div className="dsg-add-row">
				<button
					type="button"
					className="dsg-add-row-btn"
					onClick={() => addRows(value)}>
					{translationKeys.button ?? "Add"}
				</button>{" "}
				<input
					className="dsg-add-row-input"
					value={rawValue}
					onBlur={() => setRawValue(String(value))}
					type="number"
					min={1}
					onChange={(e) => {
						setRawValue(e.target.value);
						setValue(
							Math.max(
								1,
								Math.round(parseInt(e.target.value) || 0)
							)
						);
					}}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							addRows(value);
						}
					}}
				/>
				{translationKeys.unit ?? "rows"}
				{RightComponent && (
					<FlexBox flexGrow={1} justifyContent="flex-end">
						<RightComponent />
					</FlexBox>
				)}
			</div>
		);
	};
