import CommonCSS from "./CommonCSS.mjs";

class Events {
	constructor(e, opts) {
		this.e = e;
		this.opts = {
			warn: false,
			...opts,
		};
	}

	preventDefaults = () => {
		this.e?.preventDefaults();
		if (this.opts.warn) {
			console.log("%cpreventDefaults", CommonCSS.CONSOLE_WARN, this.e);
		}
		return this;
	};

	stopPropagation = () => {
		this.e?.stopPropagation();
		if (this.opts.warn) {
			console.log("%cstopPropagation", CommonCSS.CONSOLE_WARN, this.e);
		}
		return this;
	};

	toString = () => {
		return this.e?.toString();
	};
}

export default Events;
