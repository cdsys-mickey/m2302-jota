/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useState } from "react";
import FlexBox from "../../FlexBox";

const defaultTranslationKeys = {
	button: "新增",
	unit: "筆",
}

export const createAddRowsComponentEx =
	({ translationKeys = defaultTranslationKeys, hideNumberField = false, CenterComponent, RightComponent }) =>
		({ addRows }) => {
			const [value, setValue] = useState(1);
			const [rawValue, setRawValue] = useState(String(value));

			return (
				<div className="dsg-add-row">
					{/* <div style={{ display: "inline-flex" }}> */}
					<button
						type="button"
						className="dsg-add-row-btn add-control"
						onClick={() => addRows(value)}>
						{translationKeys.button ?? "新增"}
					</button>
					{!hideNumberField && (
						<>
							<input
								className="dsg-add-row-input add-control"
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
							<span className="dsg-add-row-label add-control">
								{translationKeys.unit ?? "筆"}
							</span>
						</>
					)}

					{/* </div> */}
					{RightComponent && (
						<FlexBox
							className="dsg-add-row-right"
							flexGrow={1}
							justifyContent="flex-end"
						>
							{RightComponent && <RightComponent />}
						</FlexBox>
					)}
				</div>
			);
		};
