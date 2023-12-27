import { LoadingButton } from "@mui/lab";
import { useMemo } from "react";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Objects from "../../../shared-modules/sd-objects";
import { useContext } from "react";
import { A011Context } from "../../../contexts/A011/A011Context";
import useDebounce from "../../../shared-hooks/useDebounce";
import { useCallback } from "react";

export const A011LoadButtonContainer = () => {
	const criteria = useWatch();
	const a011 = useContext(A011Context);
	const { peek, totalElements, loading } = a011;
	const debouncedValues = useDebounce(criteria, 300);

	useEffect(() => {
		console.log("criteria changed", debouncedValues);
		peek(debouncedValues);
	}, [peek, debouncedValues]);

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

	// const handleClick = useCallback(() => {
	// 	const values = getValues();

	// }, [a011, getValues]);

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

A011LoadButtonContainer.displayName = "A011LoadButtonContainer";
