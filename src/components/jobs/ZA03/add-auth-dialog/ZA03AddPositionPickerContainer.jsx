import { useContext } from "react";
import { ControlledOptionPicker } from "@/shared-components/option-picker/ControlledOptionPicker";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { useMemo } from "react";
import { useCallback } from "react";
import { FormHelperText } from "@mui/material";

export const ZA03AddPositionPickerContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	const { getSelectedRow } = za03;
	const options = useMemo(() => {
		return [0, 1];
	}, []);

	const selectedJobId = useMemo(() => {
		return getSelectedRow()?.rowData?.JobID;
	}, [getSelectedRow]);

	const getOptionLabel = useCallback(
		(option) => {
			switch (option) {
				case 1:
					return `在 ${selectedJobId} 之後`;
				default:
				case 0:
					return `在 ${selectedJobId} 之前`;
			}
		},
		[selectedJobId]
	);

	if (!selectedJobId) {
		return (
			<FormHelperText>
				*先選擇作業列之後，再使用本功能即可插入在該位置
			</FormHelperText>
		);
	}

	return (
		<ControlledOptionPicker
			variant="filled"
			options={options}
			getOptionLabel={getOptionLabel}
			defaultValue={1}
			{...rest}
		/>
	);
};

ZA03AddPositionPickerContainer.displayName = "ZA03AddPositionPickerContainer";
