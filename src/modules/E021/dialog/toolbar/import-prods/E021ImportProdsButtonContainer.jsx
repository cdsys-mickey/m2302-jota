import { E021Context } from "@/modules/E021/E021Context";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import useDebounce from "@/shared-hooks/useDebounce";
import Objects from "@/shared-modules/sd-objects";
import { useContext, useEffect, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";

export const E021ImportProdsButtonContainer = (props) => {
	const { ...rest } = props;
	const criteria = useWatch();
	const e021 = useContext(E021Context);
	const {
		peekProds,
		importProdsWorking,
		ipState: { loading, totalElements },
	} = e021;

	const debouncedValues = useDebounce(criteria, 300);

	const [prevJson, setPrevJson] = useState();

	const debouncedJson = useMemo(() => {
		return JSON.stringify(debouncedValues);
	}, [debouncedValues]);

	useEffect(() => {
		if (debouncedJson !== prevJson) {
			setPrevJson(debouncedJson);
			console.log("criteria changed", debouncedValues);
			peekProds(debouncedValues);
		}
	}, [debouncedValues, prevJson, debouncedJson, peekProds]);

	const buttonText = useMemo(() => {
		return Objects.isAllPropsEmpty(criteria)
			? "請先輸入篩選條件"
			: totalElements
				? `帶入商品(目前符合${totalElements}筆)`
				: "(查無相符商品)";
	}, [criteria, totalElements]);

	const disabled = useMemo(() => {
		return !totalElements;
		// || totalElements > Constants.IMPORT_LIMIT
	}, [totalElements]);

	return (
		<ButtonWrapper
			type="submit"
			disabled={disabled}
			size="small"
			responsive
			loading={loading || importProdsWorking}
			sx={{
				fontWeight: 600,
			}}
			{...rest}>
			{buttonText}
		</ButtonWrapper>
	);
};

E021ImportProdsButtonContainer.displayName = "E021ImportProdsButtonContainer";



