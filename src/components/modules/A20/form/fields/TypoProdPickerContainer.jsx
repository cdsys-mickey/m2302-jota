import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { useWatch } from "react-hook-form";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import Prods from "@/modules/md-prods";
import { useMemo } from "react";
import QueryString from "query-string";

const TypoProdPickerContainer = forwardRef((props, ref) => {
	const {
		name,
		children,
		label = "原料",
		withBomPackageName = false,
		...rest
	} = props;
	const { token } = useContext(AuthContext);

	const value = useWatch({
		name,
	});

	const queryString = useMemo(() => {
		const obj = {
			tp: 20,
			...(withBomPackageName && {
				pb: 1,
			}),
		};
		return QueryString.stringify(obj);
	}, [withBomPackageName]);

	return (
		<TypoWebApiOptionPickerContainer
			name={name}
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prods`}
			queryString={queryString}
			queryParam="qs"
			filterByServer
			getOptionLabel={Prods.getOptionLabel}
			isOptionEqualToValue={Prods.isOptionEqualToValue}
			{...rest}>
			{children || Prods.getOptionLabel(value)}
		</TypoWebApiOptionPickerContainer>
	);
});
TypoProdPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	withBomPackageName: PropTypes.bool,
};

TypoProdPickerContainer.displayName = "TypoProdPickerContainer";
export default TypoProdPickerContainer;
