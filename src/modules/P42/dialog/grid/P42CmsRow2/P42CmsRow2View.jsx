import CmsCalcTypes from "@/components/CmsCalcTypePicker/CmsCalTypes.mjs";
import { FlexTable, FlexTableCell, FlexTableRow, FormFieldLabel, TextFieldEx } from "@/shared-components";
import { memo } from "react";

const P42CmsRow2ViewComponent = (props) => {
	const { ...rest } = props;
	return (
		<FlexTable border={0} rowHeight={29} {...rest} >
			<FlexTableRow >
				<FlexTableCell px={1}>
					{/* <FormFieldLabel
						name="CalcType"
						label="計算方式："
						inline
						stringify={CmsCalcTypes.getOptionLabel}
					/> */}

				</FlexTableCell>
				<FlexTableCell w={180} align="right" px={1}>
					<FormFieldLabel
						name="TotCmsC_N"
						label="PC端小計："
						inline
					/>

				</FlexTableCell>
				<FlexTableCell w={120}>

				</FlexTableCell>
				<FlexTableCell w={120} align="right" px={1}>
					{/* 旅行社佣金 */}
					<TextFieldEx
						typo
						name="TrvTotCmsC"
						type="number"
						variant="filled"
						size="small"
						// hideSpinButton
						dense
						inputProps={{
							style: { textAlign: 'right' }
						}}
						sx={{
							marginRight: "-14px"
						}}
					/>

				</FlexTableCell>
				<FlexTableCell w={25} >

				</FlexTableCell>
				<FlexTableCell w={120} align="right" px={1}>
					{/* 導遊佣金 */}
					<TextFieldEx
						typo
						name="CndTotCmsC"
						type="number"
						variant="filled"
						size="small"
						dense
						inputProps={{
							style: { textAlign: 'right' }
						}}
						sx={{
							marginRight: "-14px"
						}}
					/>
				</FlexTableCell>
				<FlexTableCell w={25} >

				</FlexTableCell>
				<FlexTableCell w={120} align="right" px={1}>
					{/* 司機佣金 */}
					<TextFieldEx
						typo
						name="DrvTotCmsC"
						type="number"
						variant="filled"
						size="small"
						dense
						inputProps={{
							style: { textAlign: 'right' }
						}}
						sx={{
							marginRight: "-14px"
						}}
					/>
				</FlexTableCell>
				<FlexTableCell w={25} >

				</FlexTableCell>
				<FlexTableCell w={120} >

				</FlexTableCell>

				<FlexTableCell w={13} >

				</FlexTableCell>
			</FlexTableRow>
		</FlexTable>
	);
}

P42CmsRow2ViewComponent.propTypes = {

}
const P42CmsRow2View = memo(P42CmsRow2ViewComponent);
export default P42CmsRow2View;