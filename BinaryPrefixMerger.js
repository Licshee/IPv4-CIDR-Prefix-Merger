function merger(dumper) {
	return {
		bit: null,
		parent: null,
		push:
		function push() {
			var getb = dumper.apply(this, arguments);
			var curr = this;
			var b;
			for(; ;) {
				var tmp = getb();
				if(tmp == null) {
					if(tmp !== null) return this;

					tmp = curr.parent;
					tmp[b] = null;
					reduce(tmp, b ^ 1);
					return this;
				}

				b = tmp & 1;
				if(tmp !== b) throw "Not a Bit!";

				tmp = curr[b];
				if(tmp == null) {
					if(tmp === null) return this;
					tmp = curr[b] = { parent: curr, bit: b };
				}
				curr = tmp;
			}

			function reduce(curr, b) {
				if(curr[b] !== null) return;

				b = curr.bit;
				var p = curr.parent;
				p[b] = null;
				reduce(p, b ^ 1);
			}
		}
	};
}
