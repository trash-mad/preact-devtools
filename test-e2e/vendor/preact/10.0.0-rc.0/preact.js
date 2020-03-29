// Preact 10.0.0-rc.0
!(function(n, l) {
	"object" == typeof exports && "undefined" != typeof module
		? l(exports)
		: "function" == typeof define && define.amd
		? define(["exports"], l)
		: l((n.preact = {}));
})(this, function(n) {
	var l,
		u,
		t,
		i,
		e = {},
		f = [],
		r = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
	function o(n, l) {
		for (var u in l) n[u] = l[u];
		return n;
	}
	function c(n) {
		var l = n.parentNode;
		l && l.removeChild(n);
	}
	function s(n, l, u) {
		var t,
			i,
			e,
			f,
			r = arguments;
		if (((l = o({}, l)), arguments.length > 3))
			for (u = [u], t = 3; t < arguments.length; t++) u.push(r[t]);
		if ((null != u && (l.children = u), null != n && null != n.defaultProps))
			for (i in n.defaultProps) void 0 === l[i] && (l[i] = n.defaultProps[i]);
		return (
			(f = l.key),
			null != (e = l.ref) && delete l.ref,
			null != f && delete l.key,
			a(n, l, f, e)
		);
	}
	function a(n, u, t, i) {
		var e = {
			type: n,
			props: u,
			key: t,
			ref: i,
			__k: null,
			__p: null,
			__b: 0,
			__e: null,
			l: null,
			__c: null,
			constructor: void 0,
		};
		return l.vnode && l.vnode(e), e;
	}
	function h(n) {
		return n.children;
	}
	function v(n) {
		if (null == n || "boolean" == typeof n) return null;
		if ("string" == typeof n || "number" == typeof n)
			return a(null, n, null, null);
		if (null != n.__e || null != n.__c) {
			var l = a(n.type, n.props, n.key, null);
			return (l.__e = n.__e), l;
		}
		return n;
	}
	function p(n, l) {
		(this.props = n), (this.context = l);
	}
	function d(n, l) {
		if (null == l) return n.__p ? d(n.__p, n.__p.__k.indexOf(n) + 1) : null;
		for (var u; l < n.__k.length; l++)
			if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
		return "function" == typeof n.type ? d(n) : null;
	}
	function y(n) {
		var l, u;
		if (null != (n = n.__p) && null != n.__c) {
			for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++)
				if (null != (u = n.__k[l]) && null != u.__e) {
					n.__e = n.__c.base = u.__e;
					break;
				}
			return y(n);
		}
	}
	function m(n) {
		!n.__d && (n.__d = !0) && 1 === u.push(n) && (l.debounceRendering || t)(w);
	}
	function w() {
		var n;
		for (
			u.sort(function(n, l) {
				return l.__v.__b - n.__v.__b;
			});
			(n = u.pop());

		)
			n.__d && n.forceUpdate(!1);
	}
	function g(n, l, u, t, i, r, o, s) {
		var a,
			h,
			p,
			y,
			m,
			w,
			g,
			b,
			_ = l.__k || k(l.props.children, (l.__k = []), v, !0),
			x = (u && u.__k) || f,
			C = x.length;
		for (
			s == e && (s = null != r ? r[0] : C ? d(u, 0) : null), h = 0;
			h < _.length;
			h++
		)
			if (null != (a = _[h] = v(_[h]))) {
				if (
					((a.__p = l),
					(a.__b = l.__b + 1),
					null === (y = x[h]) || (y && a.key == y.key && a.type === y.type))
				)
					x[h] = void 0;
				else
					for (p = 0; p < C; p++) {
						if ((y = x[p]) && a.key == y.key && a.type === y.type) {
							x[p] = void 0;
							break;
						}
						y = null;
					}
				if (
					((m = P(n, a, (y = y || e), t, i, r, o, null, s)),
					(p = a.ref) && y.ref != p && (b || (b = [])).push(p, a.__c || m, a),
					null != m)
				) {
					if ((null == g && (g = m), null != a.l)) (m = a.l), (a.l = null);
					else if (r == y || m != s || null == m.parentNode)
						n: if (null == s || s.parentNode !== n) n.appendChild(m);
						else {
							for (w = s, p = 0; (w = w.nextSibling) && p < C; p += 2)
								if (w == m) break n;
							n.insertBefore(m, s);
						}
					(s = m.nextSibling), "function" == typeof l.type && (l.l = m);
				}
			}
		if (((l.__e = g), null != r && "function" != typeof l.type))
			for (h = r.length; h--; ) null != r[h] && c(r[h]);
		for (h = C; h--; ) null != x[h] && $(x[h], x[h]);
		if (b) for (h = 0; h < b.length; h++) T(b[h], b[++h], b[++h]);
	}
	function k(n, l, u, t) {
		if ((null == l && (l = []), null == n || "boolean" == typeof n))
			t && l.push(null);
		else if (Array.isArray(n))
			for (var i = 0; i < n.length; i++) k(n[i], l, u, t);
		else l.push(u ? u(n) : n);
		return l;
	}
	function b(n, l, u, t, i) {
		var e;
		for (e in u) e in l || x(n, e, null, u[e], t);
		for (e in l)
			(i && "function" != typeof l[e]) ||
				"value" === e ||
				"checked" === e ||
				u[e] === l[e] ||
				x(n, e, l[e], u[e], t);
	}
	function _(n, l, u) {
		"-" === l[0]
			? n.setProperty(l, u)
			: (n[l] = "number" == typeof u && !1 === r.test(l) ? u + "px" : u);
	}
	function x(n, l, u, t, i) {
		var e, f, r, o, c;
		if (
			"key" ===
				(l = i
					? "className" === l
						? "class"
						: l
					: "class" === l
					? "className"
					: l) ||
			"children" === l
		);
		else if ("style" === l)
			if (((e = n.style), "string" == typeof u)) e.cssText = u;
			else {
				if (("string" == typeof t && ((e.cssText = ""), (t = null)), t))
					for (f in t) (u && f in u) || _(e, f, "");
				if (u) for (r in u) (t && u[r] === t[r]) || _(e, r, u[r]);
			}
		else if ("o" === l[0] && "n" === l[1])
			(o = l !== (l = l.replace(/Capture$/, ""))),
				(c = l.toLowerCase()),
				(l = (c in n ? c : l).slice(2)),
				u
					? (t || n.addEventListener(l, C, o), ((n.u || (n.u = {}))[l] = u))
					: n.removeEventListener(l, C, o);
		else if ("list" !== l && "tagName" !== l && !i && l in n)
			if (n.length && "value" == l)
				for (l = n.length; l--; )
					n.options[l].selected = n.options[l].value == u;
			else n[l] = null == u ? "" : u;
		else
			"function" != typeof u &&
				"dangerouslySetInnerHTML" !== l &&
				(l !== (l = l.replace(/^xlink:?/, ""))
					? null == u || !1 === u
						? n.removeAttributeNS(
								"http://www.w3.org/1999/xlink",
								l.toLowerCase(),
						  )
						: n.setAttributeNS(
								"http://www.w3.org/1999/xlink",
								l.toLowerCase(),
								u,
						  )
					: null == u || !1 === u
					? n.removeAttribute(l)
					: n.setAttribute(l, u));
	}
	function C(n) {
		return this.u[n.type](l.event ? l.event(n) : n);
	}
	function P(n, u, t, i, e, f, r, c, s) {
		var a,
			d,
			y,
			m,
			w,
			b,
			_,
			x,
			C,
			P,
			N = u.type;
		if (void 0 !== u.constructor) return null;
		(a = l.__b) && a(u);
		try {
			n: if ("function" == typeof N) {
				if (
					((x = u.props),
					(C = (a = N.contextType) && i[a.__c]),
					(P = a ? (C ? C.props.value : a.__p) : i),
					t.__c
						? (_ = (d = u.__c = t.__c).__p = d.__E)
						: (N.prototype && N.prototype.render
								? (u.__c = d = new N(x, P))
								: ((u.__c = d = new p(x, P)),
								  (d.constructor = N),
								  (d.render = z)),
						  C && C.sub(d),
						  (d.props = x),
						  d.state || (d.state = {}),
						  (d.context = P),
						  (d.__n = i),
						  (y = d.__d = !0),
						  (d.__h = [])),
					null == d.__s && (d.__s = d.state),
					null != N.getDerivedStateFromProps &&
						o(
							d.__s == d.state ? (d.__s = o({}, d.__s)) : d.__s,
							N.getDerivedStateFromProps(x, d.__s),
						),
					y)
				)
					null == N.getDerivedStateFromProps &&
						null != d.componentWillMount &&
						d.componentWillMount(),
						null != d.componentDidMount && r.push(d);
				else {
					if (
						(null == N.getDerivedStateFromProps &&
							null == c &&
							null != d.componentWillReceiveProps &&
							d.componentWillReceiveProps(x, P),
						!c &&
							null != d.shouldComponentUpdate &&
							!1 === d.shouldComponentUpdate(x, d.__s, P))
					) {
						(d.props = x),
							(d.state = d.__s),
							(d.__d = !1),
							(d.__v = u),
							(u.__e = t.__e),
							(u.__k = t.__k);
						break n;
					}
					null != d.componentWillUpdate && d.componentWillUpdate(x, d.__s, P);
				}
				for (
					m = d.props,
						w = d.state,
						d.context = P,
						d.props = x,
						d.state = d.__s,
						(a = l.__r) && a(u),
						d.__d = !1,
						d.__v = u,
						d.__P = n,
						k(
							null != (a = d.render(d.props, d.state, d.context)) &&
								a.type == h &&
								null == a.key
								? a.props.children
								: a,
							(u.__k = []),
							v,
							!0,
						),
						null != d.getChildContext && (i = o(o({}, i), d.getChildContext())),
						y ||
							null == d.getSnapshotBeforeUpdate ||
							(b = d.getSnapshotBeforeUpdate(m, w)),
						g(n, u, t, i, e, f, r, s),
						d.base = u.__e;
					(a = d.__h.pop());

				)
					a.call(d);
				y ||
					null == m ||
					null == d.componentDidUpdate ||
					d.componentDidUpdate(m, w, b),
					_ && (d.__E = d.__p = null);
			} else u.__e = j(t.__e, u, t, i, e, f, r);
			(a = l.diffed) && a(u);
		} catch (n) {
			l.__e(n, u, t);
		}
		return u.__e;
	}
	function N(n, u) {
		for (var t; (t = n.pop()); )
			try {
				t.componentDidMount();
			} catch (n) {
				l.__e(n, t.__v);
			}
		l.__c && l.__c(u);
	}
	function j(n, l, u, t, i, r, o) {
		var c,
			s,
			a,
			h,
			v = u.props,
			p = l.props;
		if (((i = "svg" === l.type || i), null == n && null != r))
			for (c = 0; c < r.length; c++)
				if (
					null != (s = r[c]) &&
					(null === l.type ? 3 === s.nodeType : s.localName === l.type)
				) {
					(n = s), (r[c] = null);
					break;
				}
		if (null == n) {
			if (null === l.type) return document.createTextNode(p);
			(n = i
				? document.createElementNS("http://www.w3.org/2000/svg", l.type)
				: document.createElement(l.type)),
				(r = null);
		}
		return (
			null === l.type
				? v !== p && (n.data = p)
				: l !== u &&
				  (null != r && (r = f.slice.call(n.childNodes)),
				  (a = (v = u.props || e).dangerouslySetInnerHTML),
				  (h = p.dangerouslySetInnerHTML),
				  null == r &&
						(h || a) &&
						((h && a && h.__html == a.__html) ||
							(n.innerHTML = (h && h.__html) || "")),
				  b(n, p, v, i, null != r),
				  h || g(n, l, u, t, "foreignObject" !== l.type && i, r, o, e),
				  null == r &&
						("value" in p &&
							void 0 !== p.value &&
							p.value !== n.value &&
							(n.value = null == p.value ? "" : p.value),
						"checked" in p &&
							void 0 !== p.checked &&
							p.checked !== n.checked &&
							(n.checked = p.checked))),
			n
		);
	}
	function T(n, u, t) {
		try {
			"function" == typeof n ? n(u) : (n.current = u);
		} catch (n) {
			l.__e(n, t);
		}
	}
	function $(n, u, t) {
		var i, e, f;
		if (
			(l.unmount && l.unmount(n),
			(i = n.ref) && T(i, null, u),
			t || "function" == typeof n.type || (t = null != (e = n.__e)),
			(n.__e = n.l = null),
			null != (i = n.__c))
		) {
			if (i.componentWillUnmount)
				try {
					i.componentWillUnmount();
				} catch (n) {
					l.__e(n, u);
				}
			i.base = i.__P = null;
		}
		if ((i = n.__k)) for (f = 0; f < i.length; f++) i[f] && $(i[f], u, t);
		null != e && c(e);
	}
	function z(n, l, u) {
		return this.constructor(n, u);
	}
	function A(n, u, t) {
		var i, r;
		l.__p && l.__p(n, u),
			(i = (t && t.__k) || u.__k),
			(n = s(h, null, [n])),
			(r = []),
			P(
				u,
				((t || u).__k = n),
				i || e,
				e,
				void 0 !== u.ownerSVGElement,
				t ? [t] : i ? null : f.slice.call(u.childNodes),
				r,
				!1,
				t || e,
			),
			N(r, n);
	}
	(l = {}),
		(p.prototype.setState = function(n, l) {
			var u =
				(this.__s !== this.state && this.__s) || (this.__s = o({}, this.state));
			("function" != typeof n || (n = n(u, this.props))) && o(u, n),
				null != n && this.__v && (l && this.__h.push(l), m(this));
		}),
		(p.prototype.forceUpdate = function(n) {
			var l,
				u,
				t,
				i = this.__v,
				e = this.__v.__e,
				f = this.__P;
			f &&
				((l = !1 !== n),
				(u = []),
				(t = P(
					f,
					i,
					o({}, i),
					this.__n,
					void 0 !== f.ownerSVGElement,
					null,
					u,
					l,
					null == e ? d(i) : e,
				)),
				N(u, i),
				t != e && y(i)),
				n && n();
		}),
		(p.prototype.render = h),
		(u = []),
		(t =
			"function" == typeof Promise
				? Promise.prototype.then.bind(Promise.resolve())
				: setTimeout),
		(l.__e = function(n, l, u) {
			for (var t; (l = l.__p); )
				if ((t = l.__c) && !t.__p)
					try {
						if (t.constructor && null != t.constructor.getDerivedStateFromError)
							t.setState(t.constructor.getDerivedStateFromError(n));
						else {
							if (null == t.componentDidCatch) continue;
							t.componentDidCatch(n);
						}
						return m((t.__E = t));
					} catch (l) {
						n = l;
					}
			throw n;
		}),
		(i = 0),
		(n.render = A),
		(n.hydrate = function(n, l) {
			(l.__k = null), A(n, l);
		}),
		(n.createElement = s),
		(n.h = s),
		(n.Fragment = h),
		(n.createRef = function() {
			return {};
		}),
		(n.Component = p),
		(n.cloneElement = function(n, l) {
			return (
				(l = o(o({}, n.props), l)),
				arguments.length > 2 && (l.children = f.slice.call(arguments, 2)),
				a(n.type, l, l.key || n.key, l.ref || n.ref)
			);
		}),
		(n.createContext = function(n) {
			var l = {},
				u = {
					__c: "__cC" + i++,
					__p: n,
					Consumer: function(n, l) {
						return n.children(l);
					},
					Provider: function(n) {
						var t,
							i = this;
						return (
							this.getChildContext ||
								((t = []),
								(this.getChildContext = function() {
									return (l[u.__c] = i), l;
								}),
								(this.shouldComponentUpdate = function(n) {
									t.some(function(l) {
										l.__P && ((l.context = n.value), m(l));
									});
								}),
								(this.sub = function(n) {
									t.push(n);
									var l = n.componentWillUnmount;
									n.componentWillUnmount = function() {
										t.splice(t.indexOf(n), 1), l && l.call(n);
									};
								})),
							n.children
						);
					},
				};
			return (u.Consumer.contextType = u), u;
		}),
		(n.toChildArray = k),
		(n._e = $),
		(n.options = l);
});
