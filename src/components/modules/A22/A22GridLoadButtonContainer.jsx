import { LoadingButton } from "@mui/lab";
import { useContext, useEffect, useMemo } from "react";
import { useWatch } from "react-hook-form";
import useDebounce from "@/shared-hooks/useDebounce";
import Objects from "@/shared-modules/sd-objects";
import { A22Context } from "@/contexts/A22/A22Context";
import { useState } from "react";

export const A22GridLoadButtonContainer = () => {
	const criteria = useWatch();
	const a22 = useContext(A22Context);
	const { peek, totalElements, loading } = a22;
	const debouncedValues = useDebounce(criteria, 300);
	const [prevJson, setPrevJson] = useState();
	const debouncedJson = useMemo(() => {
		return JSON.stringify(debouncedValues);
	}, [debouncedValues]);

	// useEffect(() => {
	// 	if (
	// 		Objects.isAnyPropNotEmpty(
	// 			debouncedValues,
	// 			"prod1,prod2,catL,catM,catS"
	// 		)
	// 	) {
	// 		console.log("criteria changed", debouncedValues);
	// 		peek(debouncedValues);
	// 	}
	// }, [peek, debouncedValues]);
	useEffect(() => {
		if (debouncedJson !== prevJson) {
			setPrevJson(debouncedJson);
			console.log("criteria changed", debouncedValues);
			peek(debouncedValues);
		}
	}, [peek, debouncedValues, prevJson, debouncedJson]);

	const buttonText = useMemo(() => {
		return Objects.isAllPropsEmpty(criteria, "prod1,prod2,catL,catM,catS")
			? "請先輸入篩選條件"
			: totalElements
			? `讀取資料(目前符合${totalElements}筆)`
			: "(查無相符商品)";
	}, [criteria, totalElements]);

	const disabled = useMemo(() => {
		return !totalElements;
	}, [totalElements]);

	// const handleClick = useCallback(() => {
	// 	const values = getValues();

	// }, [a22, getValues]);

	return (
		<LoadingButton
			type="submit"
			variant="contained"
			color="warning"
			disabled={disabled}
			size="small"
			loading={loading}
			sx={{
				fontWeight: 600,
			}}
			// fullWidth
			// onClick={handleClick}
		>
			{buttonText}
		</LoadingButton>
	);
};

A22GridLoadButtonContainer.displayName = "A22GridLoadButtonContainer";
