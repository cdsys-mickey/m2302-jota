import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { LoadingButton } from "@mui/lab";
import { useContext, useEffect, useMemo } from "react";
import { useWatch } from "react-hook-form";
import useDebounce from "../../../shared-hooks/useDebounce";
import Objects from "../../../shared-modules/sd-objects";

export const ProdGridLoadButtonContainer = () => {
	const criteria = useWatch();
	const prodGrid = useContext(ProdGridContext);
	const { peek, totalElements, loading } = prodGrid;
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

	// }, [prodGrid, getValues]);

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

ProdGridLoadButtonContainer.displayName = "ProdGridLoadButtonContainer";
