import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { useWatch } from "react-hook-form";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import Prods from "@/modules/md-prods";
import { useMemo } from "react";
import queryString from "query-string";

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

	const querystring = useMemo(() => {
		const obj = {
			tp: 50,
			...(withBomPackageName && {
				pb: 1,
			}),
		};
		return queryString.stringify(obj);
	}, [withBomPackageName]);

	const text = useMemo(() => {
		return children || Prods.getOptionLabel(value);
	}, [children, value]);

	return (
		<TypoWebApiOptionPickerContainer
			name={name}
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prods`}
			querystring={querystring}
			queryParam="qs"
			filterByServer
			queryRequired
			placeholder="關連商品"
			typeToSearchText="請輸入商品編號或名稱進行搜尋"
			getOptionLabel={Prods.getOptionLabel}
			isOptionEqualToValue={Prods.isOptionEqualToValue}
			{...rest}>
			{text}
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
