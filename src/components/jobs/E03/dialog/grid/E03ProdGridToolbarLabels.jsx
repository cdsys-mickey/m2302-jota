import { E03Context } from "@/contexts/E03/E03Context";
import DSGToolbar from "@/shared-components/dsg/DSGToolbar";
import { DSGToolbarLabel } from "@/shared-components/dsg/DSGToolbarLabel";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import Strings from "@/shared-modules/sd-strings";
import { memo, useContext } from "react";
import { useFormContext } from "react-hook-form";

const E03ProdGridToolbarLabels = memo(() => {
	const e03 = useContext(E03Context);
	const form = useFormContext();

	return (
		<DSGToolbar>
			<DSGToolbarLabel label="銷退" name="RetAmt" sx={{ minWidth: "9rem" }} />
			<DSGToolbarLabel label="稅額" name="TaxAmt" sx={{ minWidth: "9rem" }} />
			<DSGToolbarLabel label="總計" name="TotAmt" sx={{ minWidth: "9rem" }} />
			{/* <DSGToolbarLabel label="已收" name="RecdAmt" sx={{ minWidth: "9rem" }} /> */}
			<TextFieldWrapper
				typo
				slotProps={{
					label: {
						flex: true,
						inline: true,
						sx: {
							minWidth: "9rem"
						},
						labelProps: {
							variant: "body1",
						}
					},
				}}
				inline
				dense
				name="RfdAmt"
				label="已退："
				type="number"
				renderLabel={Strings.formatPrice}
				sx={{
					width: "9rem",

				}}
				onChange={e03.handleRfdAmtChange({ setValue: form.setValue, getValues: form.getValues })}
			/>
			<DSGToolbarLabel label="應收減額" name="RedAmt" sx={{ minWidth: "9rem" }} />

		</DSGToolbar>
	);
});
E03ProdGridToolbarLabels.displayName = "E03ProdGridToolbarLabels";
export default E03ProdGridToolbarLabels;

