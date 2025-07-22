import { CheckboxEx, FlexTable, FlexTableCell, FlexTableRow, FormFieldLabel } from "@/shared-components";
import { memo } from "react";

const P42CmsRow1ViewComponent = (props) => {
	const { ...rest } = props;
	return (
		<FlexTable border={0} mr="3px" {...rest}>
			<FlexTableRow alignItems="center" justifyContent="flex-end">
				{/* 旅行社佣金小計+導遊佣金小計+司機佣金小計 */}
				<FlexTableCell flex={1} align="right">
					<FormFieldLabel
						name="TotCms_N"
						label="小計："
						inline
					/>
				</FlexTableCell>
				{/* 消費總額 */}
				<FlexTableCell w={150} align="right">
					<FormFieldLabel
						name="SalAmt"
						// label="小計"
						inline
					/>
				</FlexTableCell>
				{/* 旅行社佣金小計 */}
				<FlexTableCell w={125} align="right">
					<FormFieldLabel
						name="TrvCms"
						// label="小計"
						inline
					/>
				</FlexTableCell>
				<FlexTableCell w={25} >
					<CheckboxEx
						typo
						// variant="outlined"
						fullWidth
						dense
						// shrink
						// label="已發"
						name="TrvPay"
						defaultValue={false}
						size="small"
						slotProps={{
							label: {
								slotProps: {
									typography: {
										variant: "subtitle2"
									}
								},
								inline: true
							},
						}}
					/>
				</FlexTableCell>
				{/* 導遊佣金小計 */}
				<FlexTableCell w={125} align="right">
					<FormFieldLabel
						name="CndCms"
						// label="小計"
						inline
					/>
				</FlexTableCell>
				<FlexTableCell w={25} align="right">
					<CheckboxEx
						typo
						// variant="outlined"
						fullWidth
						dense
						// shrink
						// label="已發"
						name="CndPay"
						defaultValue={false}
						size="small"
						slotProps={{
							label: {
								slotProps: {
									typography: {
										variant: "subtitle2"
									}
								},
								inline: true
							},
						}}
					/>
				</FlexTableCell>
				{/* 司機佣金小計 */}
				<FlexTableCell w={125} align="right">
					<FormFieldLabel
						name="CarCms"
						// label="小計"
						inline
					/>
				</FlexTableCell>
				<FlexTableCell w={25} align="right">
					<CheckboxEx
						typo
						fullWidth
						dense
						name="CarPay"
						defaultValue={false}
						size="small"
						slotProps={{
							label: {
								slotProps: {
									typography: {
										variant: "subtitle2"
									}
								},
								inline: true
							},
						}}
					/>
				</FlexTableCell>

				{/* PC總額小計 */}
				<FlexTableCell w={150} align="right">
					<FormFieldLabel
						name="PCTotAmt"
						// label="小計"
						inline
					/>

				</FlexTableCell>
			</FlexTableRow>
		</FlexTable>
	);
}

P42CmsRow1ViewComponent.propTypes = {

}
const P42CmsRow1View = memo(P42CmsRow1ViewComponent);
export default P42CmsRow1View;