import { useWatch } from "react-hook-form";
import useDebounce from "../../../../../../shared-hooks/useDebounce";
import { useContext } from "react";
import { B05Context } from "../../../../../../contexts/B05/B05Context";
import { useState } from "react";
import { useMemo } from "react";

export const B05LoadProdsButtonContainer = (props) => {
	const { ...rest } = props;
	const criteria = useWatch();
	const b05 = useContext(B05Context);
	const { peek, totalElements, loading } = prodGrid;

	const debouncedValues = useDebounce(criteria, 300);

	const [prevJson, setPrevJson] = useState();

	const debouncedJson = useMemo(() => {
		return JSON.stringify(debouncedValues);
	}, [debouncedValues]);

	useEffect(() => {
		if (debouncedJson !== prevJson) {
			setPrevJson(debouncedJson);
			console.log("criteria changed", debouncedValues);
			peek(debouncedValues);
		}
	}, [peek, debouncedValues, prevJson, debouncedJson]);

	const buttonText = useMemo(() => {
		return Objects.isAllPropsEmpty(criteria)
			? "請先輸入篩選條件"
			: totalElements
			? `讀取資料(目前符合${totalElements}筆)`
			: "(查無相符商品)";
	}, [criteria, totalElements]);

	const disabled = useMemo(() => {
		return !totalElements;
	}, [totalElements]);

	return (
		<LoadingButton
			type="submit"
			disabled={disabled}
			size="small"
			loading={loading}
			sx={{
				fontWeight: 600,
			}}
			{...rest}>
			{buttonText}
		</LoadingButton>
	);
};

B05LoadProdsButtonContainer.displayName = "B05LoadProdsButtonContainer";
