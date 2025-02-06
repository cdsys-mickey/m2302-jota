import { useCallback } from "react";

const DEFAULT_OPTS = {
	target: "_blank",
	closeOnLoad: false
}

const useHttpPost = () => {
	const postTo = useCallback((url, data, opts = {}) => {
		const {
			target = DEFAULT_OPTS.target,
			closeOnLoad = DEFAULT_OPTS.closeOnLoad
		} = opts;
		var form = document.createElement("form");
		form.target = target;
		form.method = "POST";
		form.action = url;
		form.style.display = "none";

		for (var key in data) {
			var input = document.createElement("input");
			input.type = "hidden";
			input.name = key;
			input.value = data[key];
			form.appendChild(input);
		}

		var newWindow;
		if (closeOnLoad) {
			newWindow = window.open(url, target);
			newWindow.onload = () => {
				newWindow.close();
			};
		}
		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);


	}, []);

	const postToBlank = useCallback(
		(url, data, opts) => {
			postTo(url, data, {
				...opts,
				target: DEFAULT_OPTS.target,
			});
		},
		[postTo]
	);

	const postToSelf = useCallback(
		(url, data, opts) => {
			postTo(url, data, {
				...opts,
				target: "_self",
			});
		},
		[postTo]
	);

	return {
		postTo,
		postToBlank,
		postToSelf,
	};
};

export default useHttpPost;
