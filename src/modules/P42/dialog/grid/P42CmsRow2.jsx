import { CheckboxEx, FlexTable, FlexTableCell, FlexTableRow, FormFieldLabel, TextFieldEx } from "@/shared-components";
import { memo } from "react";

const P42CmsRow2ViewComponent = (props) => {
	const { ...rest } = props;
	return (
		<FlexTable border={0} {...rest} >
			<FlexTableRow >
				<FlexTableCell align="right">
					<FormFieldLabel
						name="TotCmsC_N"
						label="PC端佣金小計："
						inline
					/>

				</FlexTableCell>
				<FlexTableCell w={150}>

				</FlexTableCell>
				<FlexTableCell w={125}>
					<TextFieldEx
						name="CndCmsC"
						size="small"
						dense
					/>

				</FlexTableCell>
				<FlexTableCell w={25} >

				</FlexTableCell>
				<FlexTableCell w={125} >
					<TextFieldEx
						name="CndCmsC"
						size="small"
						dense
					/>
				</FlexTableCell>
				<FlexTableCell w={25} >

				</FlexTableCell>
				<FlexTableCell w={125}>

					<TextFieldEx
						name="CarCmsC"
						size="small"
						dense
					/>
				</FlexTableCell>
				<FlexTableCell w={25} >

				</FlexTableCell>
				<FlexTableCell w={151} >

				</FlexTableCell>

				<FlexTableCell w={15} >

				</FlexTableCell>
			</FlexTableRow>
		</FlexTable>
	);
}

P42CmsRow2ViewComponent.propTypes = {

}
const P42CmsRow2View = memo(P42CmsRow2ViewComponent);
export default P42CmsRow2View;