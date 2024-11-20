import { C04Context } from "@/contexts/C04/C04Context";
import Strings from "@/shared-modules/sd-strings";
import DSGToolbar from "@/shared-components/dsg/DSGToolbar";
import { DSGToolbarLabel } from "@/shared-components/dsg/DSGToolbarLabel";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { memo, useContext } from "react";
import { useFormContext } from "react-hook-form";

const C04ProdGridToolbarLabels = memo(() => {
	const c04 = useContext(C04Context);
	const form = useFormContext();

	return (
		<DSGToolbar>
			<DSGToolbarLabel label="外加稅額" name="TaxAmt" sx={{ minWidth: "9rem" }} />
			<DSGToolbarLabel label="總計金額" name="TotAmt" sx={{ minWidth: "9rem" }} />
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
				name="PaidAmt"
				label="已付金額："
				type="number"
				renderLabel={Strings.formatPrice}
				sx={{
					width: "9rem",

				}}
				onChange={c04.handlePaidAmtChange({ setValue: form.setValue, getValues: form.getValues })}
			/>
			<DSGToolbarLabel label="應付金額" name="PayAmt" sx={{ minWidth: "9rem" }} />

		</DSGToolbar>
	);
});
C04ProdGridToolbarLabels.displayName = "C04ProdGridToolbarLabels";
export default C04ProdGridToolbarLabels;
