import { options as n } from 'preact';
function r() {
	return (
		(n.t = n.debounceRendering),
		(n.debounceRendering = function(r) {
			return (n.o = r);
		}),
		function() {
			return n.o && n.o();
		}
	);
}
var t = function(n) {
		return null != n && 'function' == typeof n.then;
	},
	o = 0;
function u(u) {
	if (++o > 1) {
		var i = u();
		return t(i)
			? i.then(function() {
					--o;
			  })
			: (--o, Promise.resolve());
	}
	var f,
		c,
		l = n.requestAnimationFrame,
		v = r();
	n.requestAnimationFrame = function(n) {
		return (f = n);
	};
	var a = function() {
			for (v(); f; ) (c = f), (f = null), c(), v();
			e(), (n.requestAnimationFrame = l), --o;
		},
		d = u();
	return t(d) ? d.then(a) : (a(), Promise.resolve());
}
function e() {
	n.o && (n.o(), delete n.o),
		void 0 !== n.t
			? ((n.debounceRendering = n.t), delete n.t)
			: (n.debounceRendering = void 0);
}
export { r as setupRerender, u as act, e as teardown };
//# sourceMappingURL=testUtils.module.js.map
