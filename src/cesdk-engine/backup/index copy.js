var getOrCreateSymbol = (symbolName, existingSymbol) =>
  (existingSymbol = Symbol[symbolName])
    ? existingSymbol
    : Symbol.for("Symbol." + symbolName);

var throwTypeError = (err) => {
  throw TypeError(err);
};

var definePropertyIfAbsent = (object, property, value) =>
  property in object
    ? Object.defineProperty(object, property, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: value,
      })
    : (object[property] = value);

var defineFunctionName = (func, name) =>
  Object.defineProperty(func, "name", { value: name, configurable: true });
var createLazyModule = (module, exportsCache) =>
  function () {
    return (
      exportsCache ||
        (0, module[Object.getOwnPropertyNames(module)[0]])(
          (exportsCache = { exports: {} }).exports,
          exportsCache
        ),
      exportsCache.exports
    );
  };
var cloneWithPrototypeAndProperties = (
  sourceObject,
  isESModule,
  clonedObject
) => (
  (clonedObject =
    null != sourceObject
      ? Object.create(Object.getPrototypeOf(sourceObject))
      : {}),
  ((target, source, excludeKey, descriptor) => {
    if ((source && "object" == typeof source) || "function" == typeof source)
      for (let property of Object.getOwnPropertyNames(source))
        Object.prototype.hasOwnProperty.call(target, property) ||
          property === excludeKey ||
          Object.defineProperty(target, property, {
            get: () => source[property],
            enumerable:
              !(descriptor = Object.getOwnPropertyDescriptor(
                source,
                property
              )) || descriptor.enumerable,
          });
    return target;
  })(
    !isESModule && sourceObject && sourceObject.__esModule
      ? clonedObject
      : Object.defineProperty(clonedObject, "default", {
          value: sourceObject,
          enumerable: true,
        }),
    sourceObject
  )
);

var createMetadataArray = (target) => [
  ,
  ,
  ,
  Object.create(target?.[getOrCreateSymbol("metadata")] ?? null),
];

var memberTypes = [
  "class",
  "method",
  "getter",
  "setter",
  "accessor",
  "field",
  "value",
  "get",
  "set",
];

var validateFunction = (input) =>
  void 0 !== input && "function" != typeof input
    ? throwTypeError("Function expected")
    : input;

var createMemberDescriptor = (
  memberTypeIndex,
  memberName,
  initializer,
  metadata,
  initializersList
) => ({
  kind: memberTypes[memberTypeIndex],
  name: memberName,
  metadata: metadata,
  addInitializer: (e) =>
    initializer._
      ? throwTypeError("Already initialized")
      : initializersList.push(validateFunction(e || null)),
});

var assignMetadata = (metadata, target) =>
  definePropertyIfAbsent(target, getOrCreateSymbol("metadata"), metadata[3]);

var executeInitializers = (initializers, flags, context, initialValue) => {
  for (var o = 0, i = initializers[flags >> 1], a = i && i.length; o < a; o++)
    1 & flags
      ? i[o].call(context)
      : (initialValue = i[o].call(context, initialValue));
  return initialValue;
};

var defineMember = (
  elements,
  flags,
  memberName,
  methodArray,
  classInstance,
  memberAccess
) => {
  var memberDescriptor,
    propertyDescriptor,
    accessDescriptor,
    memberValue,
    privateMember,
    memberType = 7 & flags,
    isStatic = !!(8 & flags),
    isPrivate = !!(16 & flags),
    elementIndex =
      memberType > 3
        ? elements.length + 1
        : memberType
        ? isStatic
          ? 1
          : 2
        : 0,
    memberTypeDescriptor = memberTypes[memberType + 5],
    isArrayInit = memberType > 3 && (elements[elementIndex - 1] = []),
    propertyArray = elements[elementIndex] || (elements[elementIndex] = []),
    memberDefinition =
      memberType &&
      (!isPrivate && !isStatic && (classInstance = classInstance.prototype),
      memberType < 5 &&
        (memberType > 3 || !isPrivate) &&
        Object.getOwnPropertyDescriptor(
          memberType < 4
            ? classInstance
            : {
                get [memberName]() {
                  return accessPrivateField(this, memberAccess);
                },
                set [memberName](e) {
                  return writePrivateField(this, memberAccess, e);
                },
              },
          memberName
        ));
  memberType
    ? isPrivate &&
      memberType < 4 &&
      defineFunctionName(
        memberAccess,
        (memberType > 2 ? "set " : memberType > 1 ? "get " : "") + memberName
      )
    : defineFunctionName(classInstance, memberName);
  for (var index = methodArray.length - 1; index >= 0; index--)
    (memberValue = createMemberDescriptor(
      memberType,
      memberName,
      (accessDescriptor = {}),
      elements[3],
      propertyArray
    )),
      memberType &&
        ((memberValue.static = isStatic),
        (memberValue.private = isPrivate),
        (privateMember = memberValue.access =
          {
            has: isPrivate
              ? (elem) => isObjectMember(classInstance, elem)
              : (elem) => memberName in elem,
          }),
        3 ^ memberType &&
          (privateMember.get = isPrivate
            ? (elem) =>
                (1 ^ memberType ? accessPrivateField : accessPrivateMethod)(
                  elem,
                  classInstance,
                  4 ^ memberType ? memberAccess : memberDefinition.get
                )
            : (elem) => elem[memberName]),
        memberType > 2 &&
          (privateMember.set = isPrivate
            ? (elem, value) =>
                writePrivateField(
                  elem,
                  classInstance,
                  value,
                  4 ^ memberType ? memberAccess : memberDefinition.set
                )
            : (elem, value) => (elem[memberName] = value))),
      (propertyDescriptor = (0, methodArray[index])(
        memberType
          ? memberType < 4
            ? isPrivate
              ? memberAccess
              : memberDefinition[memberTypeDescriptor]
            : memberType > 4
            ? void 0
            : { get: memberDefinition.get, set: memberDefinition.set }
          : classInstance,
        memberValue
      )),
      (accessDescriptor._ = 1),
      4 ^ memberType || void 0 === propertyDescriptor
        ? validateFunction(propertyDescriptor) &&
          (memberType > 4
            ? isArrayInit.unshift(propertyDescriptor)
            : memberType
            ? isPrivate
              ? (memberAccess = propertyDescriptor)
              : (memberDefinition[memberTypeDescriptor] = propertyDescriptor)
            : (classInstance = propertyDescriptor))
        : "object" != typeof propertyDescriptor || null === propertyDescriptor
        ? throwTypeError("Object expected")
        : (validateFunction((memberDescriptor = propertyDescriptor.get)) &&
            (memberDefinition.get = memberDescriptor),
          validateFunction((memberDescriptor = propertyDescriptor.set)) &&
            (memberDefinition.set = memberDescriptor),
          validateFunction((memberDescriptor = propertyDescriptor.init)) &&
            isArrayInit.unshift(memberDescriptor));
  return (
    memberType || assignMetadata(elements, classInstance),
    memberDefinition &&
      Object.defineProperty(classInstance, memberName, memberDefinition),
    isPrivate
      ? 4 ^ memberType
        ? memberAccess
        : memberDefinition
      : classInstance
  );
};

var defineProperty = (target, propertyKey, value) =>
  definePropertyIfAbsent(
    target,
    "symbol" != typeof propertyKey ? propertyKey + "" : propertyKey,
    value
  );

var validatePropertyAccess = (targetObject, propertyDescriptor, action) =>
  propertyDescriptor.has(targetObject) || throwTypeError("Cannot " + action);

var isObjectMember = (object, member) =>
  Object(member) !== member
    ? throwTypeError('Cannot use the "in" operator on this value')
    : object.has(member);

var accessPrivateField = (instance, fieldDescriptor, fallback) => (
  validatePropertyAccess(instance, fieldDescriptor, "read from private field"),
  fallback ? fallback.call(instance) : fieldDescriptor.get(instance)
);

var addPrivateMember = (instance, privateMembersSet, value) =>
  privateMembersSet.has(instance)
    ? throwTypeError("Cannot add the same private member more than once")
    : privateMembersSet instanceof WeakSet
    ? privateMembersSet.add(instance)
    : privateMembersSet.set(instance, value);

var writePrivateField = (target, property, value, setter) => (
  validatePropertyAccess(target, property, "write to private field"),
  setter ? setter.call(target, value) : property.set(target, value),
  value
);

var accessPrivateMethod = (target, method, result) => (
  validatePropertyAccess(target, method, "access private method"), result
);

var lodashIsObject = createLazyModule({
  "../../../node_modules/lodash/isObject.js"(module, exports) {
    exports.exports = function (value) {
      var type = typeof value;
      return null != value && ("object" == type || "function" == type);
    };
  },
});
var plodashFreeGlobal = createLazyModule({
  "../../../node_modules/lodash/_freeGlobal.js"(e, t) {
    var r =
      "object" == typeof global && global && global.Object === Object && global;
    t.exports = r;
  },
});
var ploadashRoot = createLazyModule({
  "../../../node_modules/lodash/_root.js"(e, t) {
    var r = plodashFreeGlobal(),
      n = "object" == typeof self && self && self.Object === Object && self,
      o = r || n || Function("return this")();
    t.exports = o;
  },
});
var lodashNow = createLazyModule({
  "../../../node_modules/lodash/now.js"(e, t) {
    var r = ploadashRoot();
    t.exports = function () {
      return r.Date.now();
    };
  },
});
var plodashTrimmedEndIndex = createLazyModule({
  "../../../node_modules/lodash/_trimmedEndIndex.js"(e, t) {
    var r = /\s/;
    t.exports = function (e) {
      for (var t = e.length; t-- && r.test(e.charAt(t)); );
      return t;
    };
  },
});
var plodashBaseTrim = createLazyModule({
    "../../../node_modules/lodash/_baseTrim.js"(e, t) {
      var r = plodashTrimmedEndIndex(),
        n = /^\s+/;
      t.exports = function (e) {
        return e ? e.slice(0, r(e) + 1).replace(n, "") : e;
      };
    },
  }),
  plodashSymbol = createLazyModule({
    "../../../node_modules/lodash/_Symbol.js"(e, t) {
      var r = ploadashRoot().Symbol;
      t.exports = r;
    },
  }),
  plodashGetRawTag = createLazyModule({
    "../../../node_modules/lodash/_getRawTag.js"(e, t) {
      var r = plodashSymbol(),
        n = Object.prototype,
        o = n.hasOwnProperty,
        i = n.toString,
        a = r ? r.toStringTag : void 0;
      t.exports = function (e) {
        var t = o.call(e, a),
          r = e[a];
        try {
          e[a] = void 0;
          var n = !0;
        } catch (e) {}
        var s = i.call(e);
        return n && (t ? (e[a] = r) : delete e[a]), s;
      };
    },
  }),
  plodashObjectToString = createLazyModule({
    "../../../node_modules/lodash/_objectToString.js"(e, t) {
      var r = Object.prototype.toString;
      t.exports = function (e) {
        return r.call(e);
      };
    },
  }),
  plodashBaseGetTag = createLazyModule({
    "../../../node_modules/lodash/_baseGetTag.js"(e, t) {
      var r = plodashSymbol(),
        n = plodashGetRawTag(),
        o = plodashObjectToString(),
        i = r ? r.toStringTag : void 0;
      t.exports = function (e) {
        return null == e
          ? void 0 === e
            ? "[object Undefined]"
            : "[object Null]"
          : i && i in Object(e)
          ? n(e)
          : o(e);
      };
    },
  }),
  lodashIsObjectLike = createLazyModule({
    "../../../node_modules/lodash/isObjectLike.js"(e, t) {
      t.exports = function (e) {
        return null != e && "object" == typeof e;
      };
    },
  }),
  lodashIsSymbol = createLazyModule({
    "../../../node_modules/lodash/isSymbol.js"(e, t) {
      var r = plodashBaseGetTag(),
        n = lodashIsObjectLike();
      t.exports = function (e) {
        return "symbol" == typeof e || (n(e) && "[object Symbol]" == r(e));
      };
    },
  }),
  lodashToNumber = createLazyModule({
    "../../../node_modules/lodash/toNumber.js"(e, t) {
      var r = plodashBaseTrim(),
        n = lodashIsObject(),
        o = lodashIsSymbol(),
        i = /^[-+]0x[0-9a-f]+$/i,
        a = /^0b[01]+$/i,
        s = /^0o[0-7]+$/i,
        u = parseInt;
      t.exports = function (e) {
        if ("number" == typeof e) return e;
        if (o(e)) return NaN;
        if (n(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;
          e = n(t) ? t + "" : t;
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = r(e);
        var c = a.test(e);
        return c || s.test(e) ? u(e.slice(2), c ? 2 : 8) : i.test(e) ? NaN : +e;
      };
    },
  }),
  lodashDebounce = createLazyModule({
    "../../../node_modules/lodash/debounce.js"(e, t) {
      var r = lodashIsObject(),
        n = lodashNow(),
        o = lodashToNumber(),
        i = Math.max,
        a = Math.min;
      t.exports = function (e, t, s) {
        var u,
          c,
          l,
          d,
          h,
          f,
          p = 0,
          m = !1,
          g = !1,
          v = !0;
        if ("function" != typeof e) throw new TypeError("Expected a function");
        function y(t) {
          var r = u,
            n = c;
          return (u = c = void 0), (p = t), (d = e.apply(n, r));
        }
        function b(e) {
          var r = e - f;
          return void 0 === f || r >= t || r < 0 || (g && e - p >= l);
        }
        function w() {
          var e = n();
          if (b(e)) return _(e);
          h = setTimeout(
            w,
            (function (e) {
              var r = t - (e - f);
              return g ? a(r, l - (e - p)) : r;
            })(e)
          );
        }
        function _(e) {
          return (h = void 0), v && u ? y(e) : ((u = c = void 0), d);
        }
        function E() {
          var e = n(),
            r = b(e);
          if (((u = arguments), (c = this), (f = e), r)) {
            if (void 0 === h)
              return (function (e) {
                return (p = e), (h = setTimeout(w, t)), m ? y(e) : d;
              })(f);
            if (g) return clearTimeout(h), (h = setTimeout(w, t)), y(f);
          }
          return void 0 === h && (h = setTimeout(w, t)), d;
        }
        return (
          (t = o(t) || 0),
          r(s) &&
            ((m = !!s.leading),
            (l = (g = "maxWait" in s) ? i(o(s.maxWait) || 0, t) : l),
            (v = "trailing" in s ? !!s.trailing : v)),
          (E.cancel = function () {
            void 0 !== h && clearTimeout(h), (p = 0), (u = f = c = h = void 0);
          }),
          (E.flush = function () {
            return void 0 === h ? d : _(n());
          }),
          E
        );
      };
    },
  }),
  plodashListCacheClear = createLazyModule({
    "../../../node_modules/lodash/_listCacheClear.js"(e, t) {
      t.exports = function () {
        (this.__data__ = []), (this.size = 0);
      };
    },
  }),
  lodashEq = createLazyModule({
    "../../../node_modules/lodash/eq.js"(e, t) {
      t.exports = function (e, t) {
        return e === t || (e != e && t != t);
      };
    },
  }),
  plodashAssocIndexOf = createLazyModule({
    "../../../node_modules/lodash/_assocIndexOf.js"(e, t) {
      var r = lodashEq();
      t.exports = function (e, t) {
        for (var n = e.length; n--; ) if (r(e[n][0], t)) return n;
        return -1;
      };
    },
  }),
  plodashListCacheDelete = createLazyModule({
    "../../../node_modules/lodash/_listCacheDelete.js"(e, t) {
      var r = plodashAssocIndexOf(),
        n = Array.prototype.splice;
      t.exports = function (e) {
        var t = this.__data__,
          o = r(t, e);
        return (
          !(o < 0) &&
          (o == t.length - 1 ? t.pop() : n.call(t, o, 1), --this.size, !0)
        );
      };
    },
  }),
  plodashListCacheGet = createLazyModule({
    "../../../node_modules/lodash/_listCacheGet.js"(e, t) {
      var r = plodashAssocIndexOf();
      t.exports = function (e) {
        var t = this.__data__,
          n = r(t, e);
        return n < 0 ? void 0 : t[n][1];
      };
    },
  }),
  plodashListCacheHas = createLazyModule({
    "../../../node_modules/lodash/_listCacheHas.js"(e, t) {
      var r = plodashAssocIndexOf();
      t.exports = function (e) {
        return r(this.__data__, e) > -1;
      };
    },
  }),
  plodashListCacheSet = createLazyModule({
    "../../../node_modules/lodash/_listCacheSet.js"(e, t) {
      var r = plodashAssocIndexOf();
      t.exports = function (e, t) {
        var n = this.__data__,
          o = r(n, e);
        return o < 0 ? (++this.size, n.push([e, t])) : (n[o][1] = t), this;
      };
    },
  }),
  plodashListCache = createLazyModule({
    "../../../node_modules/lodash/_ListCache.js"(e, t) {
      var r = plodashListCacheClear(),
        n = plodashListCacheDelete(),
        o = plodashListCacheGet(),
        i = plodashListCacheHas(),
        a = plodashListCacheSet();
      function s(e) {
        var t = -1,
          r = null == e ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
          var n = e[t];
          this.set(n[0], n[1]);
        }
      }
      (s.prototype.clear = r),
        (s.prototype.delete = n),
        (s.prototype.get = o),
        (s.prototype.has = i),
        (s.prototype.set = a),
        (t.exports = s);
    },
  }),
  plodashStackClear = createLazyModule({
    "../../../node_modules/lodash/_stackClear.js"(e, t) {
      var r = plodashListCache();
      t.exports = function () {
        (this.__data__ = new r()), (this.size = 0);
      };
    },
  }),
  plodashStackDelete = createLazyModule({
    "../../../node_modules/lodash/_stackDelete.js"(e, t) {
      t.exports = function (e) {
        var t = this.__data__,
          r = t.delete(e);
        return (this.size = t.size), r;
      };
    },
  }),
  plodashStackGet = createLazyModule({
    "../../../node_modules/lodash/_stackGet.js"(e, t) {
      t.exports = function (e) {
        return this.__data__.get(e);
      };
    },
  }),
  plodashStackHas = createLazyModule({
    "../../../node_modules/lodash/_stackHas.js"(e, t) {
      t.exports = function (e) {
        return this.__data__.has(e);
      };
    },
  }),
  lodashIsFunction = createLazyModule({
    "../../../node_modules/lodash/isFunction.js"(e, t) {
      var r = plodashBaseGetTag(),
        n = lodashIsObject();
      t.exports = function (e) {
        if (!n(e)) return !1;
        var t = r(e);
        return (
          "[object Function]" == t ||
          "[object GeneratorFunction]" == t ||
          "[object AsyncFunction]" == t ||
          "[object Proxy]" == t
        );
      };
    },
  }),
  plodashCoreJsData = createLazyModule({
    "../../../node_modules/lodash/_coreJsData.js"(e, t) {
      var r = ploadashRoot()["__core-js_shared__"];
      t.exports = r;
    },
  }),
  plodashIsMasked = createLazyModule({
    "../../../node_modules/lodash/_isMasked.js"(e, t) {
      var r,
        n = plodashCoreJsData(),
        o = (r = /[^.]+$/.exec((n && n.keys && n.keys.IE_PROTO) || ""))
          ? "Symbol(src)_1." + r
          : "";
      t.exports = function (e) {
        return !!o && o in e;
      };
    },
  }),
  plodashToSource = createLazyModule({
    "../../../node_modules/lodash/_toSource.js"(e, t) {
      var r = Function.prototype.toString;
      t.exports = function (e) {
        if (null != e) {
          try {
            return r.call(e);
          } catch (e) {}
          try {
            return e + "";
          } catch (e) {}
        }
        return "";
      };
    },
  }),
  plodashBaseIsNative = createLazyModule({
    "../../../node_modules/lodash/_baseIsNative.js"(e, t) {
      var r = lodashIsFunction(),
        n = plodashIsMasked(),
        o = lodashIsObject(),
        i = plodashToSource(),
        a = /^\[object .+?Constructor\]$/,
        s = Function.prototype,
        u = Object.prototype,
        c = s.toString,
        l = u.hasOwnProperty,
        d = RegExp(
          "^" +
            c
              .call(l)
              .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                "$1.*?"
              ) +
            "$"
        );
      t.exports = function (e) {
        return !(!o(e) || n(e)) && (r(e) ? d : a).test(i(e));
      };
    },
  }),
  plodashGetValue = createLazyModule({
    "../../../node_modules/lodash/_getValue.js"(e, t) {
      t.exports = function (e, t) {
        return null == e ? void 0 : e[t];
      };
    },
  }),
  plodashGetNative = createLazyModule({
    "../../../node_modules/lodash/_getNative.js"(e, t) {
      var r = plodashBaseIsNative(),
        n = plodashGetValue();
      t.exports = function (e, t) {
        var o = n(e, t);
        return r(o) ? o : void 0;
      };
    },
  }),
  plodashMap = createLazyModule({
    "../../../node_modules/lodash/_Map.js"(e, t) {
      var r = plodashGetNative()(ploadashRoot(), "Map");
      t.exports = r;
    },
  }),
  plodashNativeCreate = createLazyModule({
    "../../../node_modules/lodash/_nativeCreate.js"(e, t) {
      var r = plodashGetNative()(Object, "create");
      t.exports = r;
    },
  }),
  plodashHashClear = createLazyModule({
    "../../../node_modules/lodash/_hashClear.js"(e, t) {
      var r = plodashNativeCreate();
      t.exports = function () {
        (this.__data__ = r ? r(null) : {}), (this.size = 0);
      };
    },
  }),
  plodashHashDelete = createLazyModule({
    "../../../node_modules/lodash/_hashDelete.js"(e, t) {
      t.exports = function (e) {
        var t = this.has(e) && delete this.__data__[e];
        return (this.size -= t ? 1 : 0), t;
      };
    },
  }),
  plodashHashGet = createLazyModule({
    "../../../node_modules/lodash/_hashGet.js"(e, t) {
      var r = plodashNativeCreate(),
        n = Object.prototype.hasOwnProperty;
      t.exports = function (e) {
        var t = this.__data__;
        if (r) {
          var o = t[e];
          return "__lodash_hash_undefined__" === o ? void 0 : o;
        }
        return n.call(t, e) ? t[e] : void 0;
      };
    },
  }),
  plodashHashHas = createLazyModule({
    "../../../node_modules/lodash/_hashHas.js"(e, t) {
      var r = plodashNativeCreate(),
        n = Object.prototype.hasOwnProperty;
      t.exports = function (e) {
        var t = this.__data__;
        return r ? void 0 !== t[e] : n.call(t, e);
      };
    },
  }),
  plodashHashSet = createLazyModule({
    "../../../node_modules/lodash/_hashSet.js"(e, t) {
      var r = plodashNativeCreate();
      t.exports = function (e, t) {
        var n = this.__data__;
        return (
          (this.size += this.has(e) ? 0 : 1),
          (n[e] = r && void 0 === t ? "__lodash_hash_undefined__" : t),
          this
        );
      };
    },
  }),
  plodashHash = createLazyModule({
    "../../../node_modules/lodash/_Hash.js"(e, t) {
      var r = plodashHashClear(),
        n = plodashHashDelete(),
        o = plodashHashGet(),
        i = plodashHashHas(),
        a = plodashHashSet();
      function s(e) {
        var t = -1,
          r = null == e ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
          var n = e[t];
          this.set(n[0], n[1]);
        }
      }
      (s.prototype.clear = r),
        (s.prototype.delete = n),
        (s.prototype.get = o),
        (s.prototype.has = i),
        (s.prototype.set = a),
        (t.exports = s);
    },
  }),
  plodashMapCacheClear = createLazyModule({
    "../../../node_modules/lodash/_mapCacheClear.js"(e, t) {
      var r = plodashHash(),
        n = plodashListCache(),
        o = plodashMap();
      t.exports = function () {
        (this.size = 0),
          (this.__data__ = {
            hash: new r(),
            map: new (o || n)(),
            string: new r(),
          });
      };
    },
  }),
  plodashIsKeyable = createLazyModule({
    "../../../node_modules/lodash/_isKeyable.js"(e, t) {
      t.exports = function (e) {
        var t = typeof e;
        return "string" == t || "number" == t || "symbol" == t || "boolean" == t
          ? "__proto__" !== e
          : null === e;
      };
    },
  }),
  plodashGetMapData = createLazyModule({
    "../../../node_modules/lodash/_getMapData.js"(e, t) {
      var r = plodashIsKeyable();
      t.exports = function (e, t) {
        var n = e.__data__;
        return r(t) ? n["string" == typeof t ? "string" : "hash"] : n.map;
      };
    },
  }),
  plodashMapCacheDelete = createLazyModule({
    "../../../node_modules/lodash/_mapCacheDelete.js"(e, t) {
      var r = plodashGetMapData();
      t.exports = function (e) {
        var t = r(this, e).delete(e);
        return (this.size -= t ? 1 : 0), t;
      };
    },
  }),
  plodashMapCacheGet = createLazyModule({
    "../../../node_modules/lodash/_mapCacheGet.js"(e, t) {
      var r = plodashGetMapData();
      t.exports = function (e) {
        return r(this, e).get(e);
      };
    },
  }),
  plodashMapCacheHas = createLazyModule({
    "../../../node_modules/lodash/_mapCacheHas.js"(e, t) {
      var r = plodashGetMapData();
      t.exports = function (e) {
        return r(this, e).has(e);
      };
    },
  }),
  plodashMapCacheSet = createLazyModule({
    "../../../node_modules/lodash/_mapCacheSet.js"(e, t) {
      var r = plodashGetMapData();
      t.exports = function (e, t) {
        var n = r(this, e),
          o = n.size;
        return n.set(e, t), (this.size += n.size == o ? 0 : 1), this;
      };
    },
  }),
  plodashMapCache = createLazyModule({
    "../../../node_modules/lodash/_MapCache.js"(e, t) {
      var r = plodashMapCacheClear(),
        n = plodashMapCacheDelete(),
        o = plodashMapCacheGet(),
        i = plodashMapCacheHas(),
        a = plodashMapCacheSet();
      function s(e) {
        var t = -1,
          r = null == e ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
          var n = e[t];
          this.set(n[0], n[1]);
        }
      }
      (s.prototype.clear = r),
        (s.prototype.delete = n),
        (s.prototype.get = o),
        (s.prototype.has = i),
        (s.prototype.set = a),
        (t.exports = s);
    },
  }),
  plodashStackSet = createLazyModule({
    "../../../node_modules/lodash/_stackSet.js"(e, t) {
      var r = plodashListCache(),
        n = plodashMap(),
        o = plodashMapCache();
      t.exports = function (e, t) {
        var i = this.__data__;
        if (i instanceof r) {
          var a = i.__data__;
          if (!n || a.length < 199)
            return a.push([e, t]), (this.size = ++i.size), this;
          i = this.__data__ = new o(a);
        }
        return i.set(e, t), (this.size = i.size), this;
      };
    },
  }),
  plodashStack = createLazyModule({
    "../../../node_modules/lodash/_Stack.js"(e, t) {
      var r = plodashListCache(),
        n = plodashStackClear(),
        o = plodashStackDelete(),
        i = plodashStackGet(),
        a = plodashStackHas(),
        s = plodashStackSet();
      function u(e) {
        var t = (this.__data__ = new r(e));
        this.size = t.size;
      }
      (u.prototype.clear = n),
        (u.prototype.delete = o),
        (u.prototype.get = i),
        (u.prototype.has = a),
        (u.prototype.set = s),
        (t.exports = u);
    },
  }),
  plodashSetCacheAdd = createLazyModule({
    "../../../node_modules/lodash/_setCacheAdd.js"(e, t) {
      t.exports = function (e) {
        return this.__data__.set(e, "__lodash_hash_undefined__"), this;
      };
    },
  }),
  plodashSetCacheHas = createLazyModule({
    "../../../node_modules/lodash/_setCacheHas.js"(e, t) {
      t.exports = function (e) {
        return this.__data__.has(e);
      };
    },
  }),
  plodashSetCache = createLazyModule({
    "../../../node_modules/lodash/_SetCache.js"(e, t) {
      var r = plodashMapCache(),
        n = plodashSetCacheAdd(),
        o = plodashSetCacheHas();
      function i(e) {
        var t = -1,
          n = null == e ? 0 : e.length;
        for (this.__data__ = new r(); ++t < n; ) this.add(e[t]);
      }
      (i.prototype.add = i.prototype.push = n),
        (i.prototype.has = o),
        (t.exports = i);
    },
  }),
  plodashArraySome = createLazyModule({
    "../../../node_modules/lodash/_arraySome.js"(e, t) {
      t.exports = function (e, t) {
        for (var r = -1, n = null == e ? 0 : e.length; ++r < n; )
          if (t(e[r], r, e)) return !0;
        return !1;
      };
    },
  }),
  plodashCacheHas = createLazyModule({
    "../../../node_modules/lodash/_cacheHas.js"(e, t) {
      t.exports = function (e, t) {
        return e.has(t);
      };
    },
  }),
  plodashEqualArrays = createLazyModule({
    "../../../node_modules/lodash/_equalArrays.js"(e, t) {
      var r = plodashSetCache(),
        n = plodashArraySome(),
        o = plodashCacheHas();
      t.exports = function (e, t, i, a, s, u) {
        var c = 1 & i,
          l = e.length,
          d = t.length;
        if (l != d && !(c && d > l)) return !1;
        var h = u.get(e),
          f = u.get(t);
        if (h && f) return h == t && f == e;
        var p = -1,
          m = !0,
          g = 2 & i ? new r() : void 0;
        for (u.set(e, t), u.set(t, e); ++p < l; ) {
          var v = e[p],
            y = t[p];
          if (a) var b = c ? a(y, v, p, t, e, u) : a(v, y, p, e, t, u);
          if (void 0 !== b) {
            if (b) continue;
            m = !1;
            break;
          }
          if (g) {
            if (
              !n(t, function (e, t) {
                if (!o(g, t) && (v === e || s(v, e, i, a, u))) return g.push(t);
              })
            ) {
              m = !1;
              break;
            }
          } else if (v !== y && !s(v, y, i, a, u)) {
            m = !1;
            break;
          }
        }
        return u.delete(e), u.delete(t), m;
      };
    },
  }),
  plodashUint8Array = createLazyModule({
    "../../../node_modules/lodash/_Uint8Array.js"(e, t) {
      var r = ploadashRoot().Uint8Array;
      t.exports = r;
    },
  }),
  plodashMapToArray = createLazyModule({
    "../../../node_modules/lodash/_mapToArray.js"(e, t) {
      t.exports = function (e) {
        var t = -1,
          r = Array(e.size);
        return (
          e.forEach(function (e, n) {
            r[++t] = [n, e];
          }),
          r
        );
      };
    },
  }),
  plodashSetToArray = createLazyModule({
    "../../../node_modules/lodash/_setToArray.js"(e, t) {
      t.exports = function (e) {
        var t = -1,
          r = Array(e.size);
        return (
          e.forEach(function (e) {
            r[++t] = e;
          }),
          r
        );
      };
    },
  }),
  plodashEqualByTag = createLazyModule({
    "../../../node_modules/lodash/_equalByTag.js"(e, t) {
      var r = plodashSymbol(),
        n = plodashUint8Array(),
        o = lodashEq(),
        i = plodashEqualArrays(),
        a = plodashMapToArray(),
        s = plodashSetToArray(),
        u = r ? r.prototype : void 0,
        c = u ? u.valueOf : void 0;
      t.exports = function (e, t, r, u, l, d, h) {
        switch (r) {
          case "[object DataView]":
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            (e = e.buffer), (t = t.buffer);
          case "[object ArrayBuffer]":
            return !(e.byteLength != t.byteLength || !d(new n(e), new n(t)));
          case "[object Boolean]":
          case "[object Date]":
          case "[object Number]":
            return o(+e, +t);
          case "[object Error]":
            return e.name == t.name && e.message == t.message;
          case "[object RegExp]":
          case "[object String]":
            return e == t + "";
          case "[object Map]":
            var f = a;
          case "[object Set]":
            var p = 1 & u;
            if ((f || (f = s), e.size != t.size && !p)) return !1;
            var m = h.get(e);
            if (m) return m == t;
            (u |= 2), h.set(e, t);
            var g = i(f(e), f(t), u, l, d, h);
            return h.delete(e), g;
          case "[object Symbol]":
            if (c) return c.call(e) == c.call(t);
        }
        return !1;
      };
    },
  }),
  plodashArrayPush = createLazyModule({
    "../../../node_modules/lodash/_arrayPush.js"(e, t) {
      t.exports = function (e, t) {
        for (var r = -1, n = t.length, o = e.length; ++r < n; ) e[o + r] = t[r];
        return e;
      };
    },
  }),
  lodashIsArray = createLazyModule({
    "../../../node_modules/lodash/isArray.js"(e, t) {
      var r = Array.isArray;
      t.exports = r;
    },
  }),
  plodashBaseGetAllKeys = createLazyModule({
    "../../../node_modules/lodash/_baseGetAllKeys.js"(e, t) {
      var r = plodashArrayPush(),
        n = lodashIsArray();
      t.exports = function (e, t, o) {
        var i = t(e);
        return n(e) ? i : r(i, o(e));
      };
    },
  }),
  plodashArrayFilter = createLazyModule({
    "../../../node_modules/lodash/_arrayFilter.js"(e, t) {
      t.exports = function (e, t) {
        for (
          var r = -1, n = null == e ? 0 : e.length, o = 0, i = [];
          ++r < n;

        ) {
          var a = e[r];
          t(a, r, e) && (i[o++] = a);
        }
        return i;
      };
    },
  }),
  lodashStubArray = createLazyModule({
    "../../../node_modules/lodash/stubArray.js"(e, t) {
      t.exports = function () {
        return [];
      };
    },
  }),
  plodashGetSymbols = createLazyModule({
    "../../../node_modules/lodash/_getSymbols.js"(e, t) {
      var r = plodashArrayFilter(),
        n = lodashStubArray(),
        o = Object.prototype.propertyIsEnumerable,
        i = Object.getOwnPropertySymbols,
        a = i
          ? function (e) {
              return null == e
                ? []
                : ((e = Object(e)),
                  r(i(e), function (t) {
                    return o.call(e, t);
                  }));
            }
          : n;
      t.exports = a;
    },
  }),
  plodashBaseTimes = createLazyModule({
    "../../../node_modules/lodash/_baseTimes.js"(e, t) {
      t.exports = function (e, t) {
        for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
        return n;
      };
    },
  }),
  plodashBaseIsArguments = createLazyModule({
    "../../../node_modules/lodash/_baseIsArguments.js"(e, t) {
      var r = plodashBaseGetTag(),
        n = lodashIsObjectLike();
      t.exports = function (e) {
        return n(e) && "[object Arguments]" == r(e);
      };
    },
  }),
  lodashIsArguments = createLazyModule({
    "../../../node_modules/lodash/isArguments.js"(e, t) {
      var r = plodashBaseIsArguments(),
        n = lodashIsObjectLike(),
        o = Object.prototype,
        i = o.hasOwnProperty,
        a = o.propertyIsEnumerable,
        s = r(
          (function () {
            return arguments;
          })()
        )
          ? r
          : function (e) {
              return n(e) && i.call(e, "callee") && !a.call(e, "callee");
            };
      t.exports = s;
    },
  }),
  lodashStubFalse = createLazyModule({
    "../../../node_modules/lodash/stubFalse.js"(e, t) {
      t.exports = function () {
        return !1;
      };
    },
  }),
  lodashIsBuffer = createLazyModule({
    "../../../node_modules/lodash/isBuffer.js"(e, t) {
      var r = ploadashRoot(),
        n = lodashStubFalse(),
        o = "object" == typeof e && e && !e.nodeType && e,
        i = o && "object" == typeof t && t && !t.nodeType && t,
        a = i && i.exports === o ? r.Buffer : void 0,
        s = (a ? a.isBuffer : void 0) || n;
      t.exports = s;
    },
  }),
  plodashIsIndex = createLazyModule({
    "../../../node_modules/lodash/_isIndex.js"(e, t) {
      var r = /^(?:0|[1-9]\d*)$/;
      t.exports = function (e, t) {
        var n = typeof e;
        return (
          !!(t = null == t ? 9007199254740991 : t) &&
          ("number" == n || ("symbol" != n && r.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
        );
      };
    },
  }),
  lodashIsLength = createLazyModule({
    "../../../node_modules/lodash/isLength.js"(e, t) {
      t.exports = function (e) {
        return (
          "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991
        );
      };
    },
  }),
  plodashBaseIsTypedArray = createLazyModule({
    "../../../node_modules/lodash/_baseIsTypedArray.js"(e, t) {
      var r = plodashBaseGetTag(),
        n = lodashIsLength(),
        o = lodashIsObjectLike(),
        i = {};
      (i["[object Float32Array]"] =
        i["[object Float64Array]"] =
        i["[object Int8Array]"] =
        i["[object Int16Array]"] =
        i["[object Int32Array]"] =
        i["[object Uint8Array]"] =
        i["[object Uint8ClampedArray]"] =
        i["[object Uint16Array]"] =
        i["[object Uint32Array]"] =
          !0),
        (i["[object Arguments]"] =
          i["[object Array]"] =
          i["[object ArrayBuffer]"] =
          i["[object Boolean]"] =
          i["[object DataView]"] =
          i["[object Date]"] =
          i["[object Error]"] =
          i["[object Function]"] =
          i["[object Map]"] =
          i["[object Number]"] =
          i["[object Object]"] =
          i["[object RegExp]"] =
          i["[object Set]"] =
          i["[object String]"] =
          i["[object WeakMap]"] =
            !1),
        (t.exports = function (e) {
          return o(e) && n(e.length) && !!i[r(e)];
        });
    },
  }),
  plodashBaseUnary = createLazyModule({
    "../../../node_modules/lodash/_baseUnary.js"(e, t) {
      t.exports = function (e) {
        return function (t) {
          return e(t);
        };
      };
    },
  }),
  plodashNodeUtil = createLazyModule({
    "../../../node_modules/lodash/_nodeUtil.js"(e, t) {
      var r = plodashFreeGlobal(),
        n = "object" == typeof e && e && !e.nodeType && e,
        o = n && "object" == typeof t && t && !t.nodeType && t,
        i = o && o.exports === n && r.process,
        a = (function () {
          try {
            var e = o && o.require && o.require("util").types;
            return e || (i && i.binding && i.binding("util"));
          } catch (e) {}
        })();
      t.exports = a;
    },
  }),
  lodashIsTypedArray = createLazyModule({
    "../../../node_modules/lodash/isTypedArray.js"(e, t) {
      var r = plodashBaseIsTypedArray(),
        n = plodashBaseUnary(),
        o = plodashNodeUtil(),
        i = o && o.isTypedArray,
        a = i ? n(i) : r;
      t.exports = a;
    },
  }),
  plodashArrayLikeKeys = createLazyModule({
    "../../../node_modules/lodash/_arrayLikeKeys.js"(e, t) {
      var r = plodashBaseTimes(),
        n = lodashIsArguments(),
        o = lodashIsArray(),
        i = lodashIsBuffer(),
        a = plodashIsIndex(),
        s = lodashIsTypedArray(),
        u = Object.prototype.hasOwnProperty;
      t.exports = function (e, t) {
        var c = o(e),
          l = !c && n(e),
          d = !c && !l && i(e),
          h = !c && !l && !d && s(e),
          f = c || l || d || h,
          p = f ? r(e.length, String) : [],
          m = p.length;
        for (var g in e)
          (!t && !u.call(e, g)) ||
            (f &&
              ("length" == g ||
                (d && ("offset" == g || "parent" == g)) ||
                (h &&
                  ("buffer" == g || "byteLength" == g || "byteOffset" == g)) ||
                a(g, m))) ||
            p.push(g);
        return p;
      };
    },
  }),
  plodashIsPrototype = createLazyModule({
    "../../../node_modules/lodash/_isPrototype.js"(e, t) {
      var r = Object.prototype;
      t.exports = function (e) {
        var t = e && e.constructor;
        return e === (("function" == typeof t && t.prototype) || r);
      };
    },
  }),
  plodashOverArg = createLazyModule({
    "../../../node_modules/lodash/_overArg.js"(e, t) {
      t.exports = function (e, t) {
        return function (r) {
          return e(t(r));
        };
      };
    },
  }),
  plodashNativeKeys = createLazyModule({
    "../../../node_modules/lodash/_nativeKeys.js"(e, t) {
      var r = plodashOverArg()(Object.keys, Object);
      t.exports = r;
    },
  }),
  plodashBaseKeys = createLazyModule({
    "../../../node_modules/lodash/_baseKeys.js"(e, t) {
      var r = plodashIsPrototype(),
        n = plodashNativeKeys(),
        o = Object.prototype.hasOwnProperty;
      t.exports = function (e) {
        if (!r(e)) return n(e);
        var t = [];
        for (var i in Object(e))
          o.call(e, i) && "constructor" != i && t.push(i);
        return t;
      };
    },
  }),
  lodashIsArrayLike = createLazyModule({
    "../../../node_modules/lodash/isArrayLike.js"(e, t) {
      var r = lodashIsFunction(),
        n = lodashIsLength();
      t.exports = function (e) {
        return null != e && n(e.length) && !r(e);
      };
    },
  }),
  lodashKeys = createLazyModule({
    "../../../node_modules/lodash/keys.js"(e, t) {
      var r = plodashArrayLikeKeys(),
        n = plodashBaseKeys(),
        o = lodashIsArrayLike();
      t.exports = function (e) {
        return o(e) ? r(e) : n(e);
      };
    },
  }),
  plodashGetAllKeys = createLazyModule({
    "../../../node_modules/lodash/_getAllKeys.js"(e, t) {
      var r = plodashBaseGetAllKeys(),
        n = plodashGetSymbols(),
        o = lodashKeys();
      t.exports = function (e) {
        return r(e, o, n);
      };
    },
  }),
  plodashEqualObjects = createLazyModule({
    "../../../node_modules/lodash/_equalObjects.js"(e, t) {
      var r = plodashGetAllKeys(),
        n = Object.prototype.hasOwnProperty;
      t.exports = function (e, t, o, i, a, s) {
        var u = 1 & o,
          c = r(e),
          l = c.length;
        if (l != r(t).length && !u) return !1;
        for (var d = l; d--; ) {
          var h = c[d];
          if (!(u ? h in t : n.call(t, h))) return !1;
        }
        var f = s.get(e),
          p = s.get(t);
        if (f && p) return f == t && p == e;
        var m = !0;
        s.set(e, t), s.set(t, e);
        for (var g = u; ++d < l; ) {
          var v = e[(h = c[d])],
            y = t[h];
          if (i) var b = u ? i(y, v, h, t, e, s) : i(v, y, h, e, t, s);
          if (!(void 0 === b ? v === y || a(v, y, o, i, s) : b)) {
            m = !1;
            break;
          }
          g || (g = "constructor" == h);
        }
        if (m && !g) {
          var w = e.constructor,
            _ = t.constructor;
          w == _ ||
            !("constructor" in e) ||
            !("constructor" in t) ||
            ("function" == typeof w &&
              w instanceof w &&
              "function" == typeof _ &&
              _ instanceof _) ||
            (m = !1);
        }
        return s.delete(e), s.delete(t), m;
      };
    },
  }),
  plodashDataView = createLazyModule({
    "../../../node_modules/lodash/_DataView.js"(e, t) {
      var r = plodashGetNative()(ploadashRoot(), "DataView");
      t.exports = r;
    },
  }),
  plodashPromise = createLazyModule({
    "../../../node_modules/lodash/_Promise.js"(e, t) {
      var r = plodashGetNative()(ploadashRoot(), "Promise");
      t.exports = r;
    },
  }),
  plodashSet = createLazyModule({
    "../../../node_modules/lodash/_Set.js"(e, t) {
      var r = plodashGetNative()(ploadashRoot(), "Set");
      t.exports = r;
    },
  }),
  plodashWeakMap = createLazyModule({
    "../../../node_modules/lodash/_WeakMap.js"(e, t) {
      var r = plodashGetNative()(ploadashRoot(), "WeakMap");
      t.exports = r;
    },
  }),
  plodashGetTag = createLazyModule({
    "../../../node_modules/lodash/_getTag.js"(e, t) {
      var r = plodashDataView(),
        n = plodashMap(),
        o = plodashPromise(),
        i = plodashSet(),
        a = plodashWeakMap(),
        s = plodashBaseGetTag(),
        u = plodashToSource(),
        c = "[object Map]",
        l = "[object Promise]",
        d = "[object Set]",
        h = "[object WeakMap]",
        f = "[object DataView]",
        p = u(r),
        m = u(n),
        g = u(o),
        v = u(i),
        y = u(a),
        b = s;
      ((r && b(new r(new ArrayBuffer(1))) != f) ||
        (n && b(new n()) != c) ||
        (o && b(o.resolve()) != l) ||
        (i && b(new i()) != d) ||
        (a && b(new a()) != h)) &&
        (b = function (e) {
          var t = s(e),
            r = "[object Object]" == t ? e.constructor : void 0,
            n = r ? u(r) : "";
          if (n)
            switch (n) {
              case p:
                return f;
              case m:
                return c;
              case g:
                return l;
              case v:
                return d;
              case y:
                return h;
            }
          return t;
        }),
        (t.exports = b);
    },
  }),
  plodashBaseIsEqualDeep = createLazyModule({
    "../../../node_modules/lodash/_baseIsEqualDeep.js"(e, t) {
      var r = plodashStack(),
        n = plodashEqualArrays(),
        o = plodashEqualByTag(),
        i = plodashEqualObjects(),
        a = plodashGetTag(),
        s = lodashIsArray(),
        u = lodashIsBuffer(),
        c = lodashIsTypedArray(),
        l = "[object Arguments]",
        d = "[object Array]",
        h = "[object Object]",
        f = Object.prototype.hasOwnProperty;
      t.exports = function (e, t, p, m, g, v) {
        var y = s(e),
          b = s(t),
          w = y ? d : a(e),
          _ = b ? d : a(t),
          E = (w = w == l ? h : w) == h,
          C = (_ = _ == l ? h : _) == h,
          S = w == _;
        if (S && u(e)) {
          if (!u(t)) return !1;
          (y = !0), (E = !1);
        }
        if (S && !E)
          return (
            v || (v = new r()),
            y || c(e) ? n(e, t, p, m, g, v) : o(e, t, w, p, m, g, v)
          );
        if (!(1 & p)) {
          var k = E && f.call(e, "__wrapped__"),
            x = C && f.call(t, "__wrapped__");
          if (k || x) {
            var T = k ? e.value() : e,
              A = x ? t.value() : t;
            return v || (v = new r()), g(T, A, p, m, v);
          }
        }
        return !!S && (v || (v = new r()), i(e, t, p, m, g, v));
      };
    },
  }),
  plodashBaseIsEqual = createLazyModule({
    "../../../node_modules/lodash/_baseIsEqual.js"(e, t) {
      var r = plodashBaseIsEqualDeep(),
        n = lodashIsObjectLike();
      t.exports = function e(t, o, i, a, s) {
        return (
          t === o ||
          (null == t || null == o || (!n(t) && !n(o))
            ? t != t && o != o
            : r(t, o, i, a, e, s))
        );
      };
    },
  }),
  lodashIsEqual = createLazyModule({
    "../../../node_modules/lodash/isEqual.js"(e, t) {
      var r = plodashBaseIsEqual();
      t.exports = function (e, t) {
        return r(e, t);
      };
    },
  }),
  lodashToFinite = createLazyModule({
    "../../../node_modules/lodash/toFinite.js"(e, t) {
      var r = lodashToNumber(),
        n = 1 / 0;
      t.exports = function (e) {
        return e
          ? (e = r(e)) === n || e === -1 / 0
            ? 17976931348623157e292 * (e < 0 ? -1 : 1)
            : e == e
            ? e
            : 0
          : 0 === e
          ? e
          : 0;
      };
    },
  }),
  lodashToInteger = createLazyModule({
    "../../../node_modules/lodash/toInteger.js"(e, t) {
      var r = lodashToFinite();
      t.exports = function (e) {
        var t = r(e),
          n = t % 1;
        return t == t ? (n ? t - n : t) : 0;
      };
    },
  }),
  lodashBefore = createLazyModule({
    "../../../node_modules/lodash/before.js"(e, t) {
      var r = lodashToInteger();
      t.exports = function (e, t) {
        var n;
        if ("function" != typeof t) throw new TypeError("Expected a function");
        return (
          (e = r(e)),
          function () {
            return (
              --e > 0 && (n = t.apply(this, arguments)),
              e <= 1 && (t = void 0),
              n
            );
          }
        );
      };
    },
  }),
  lodashOnce = createLazyModule({
    "../../../node_modules/lodash/once.js"(e, t) {
      var r = lodashBefore();
      t.exports = function (e) {
        return r(2, e);
      };
    },
  }),
  ft = createLazyModule({
    "../../../node_modules/base64-js/index.js"(e) {
      (e.byteLength = function (e) {
        var t = a(e),
          r = t[0],
          n = t[1];
        return (3 * (r + n)) / 4 - n;
      }),
        (e.toByteArray = function (e) {
          var t,
            r,
            i = a(e),
            s = i[0],
            u = i[1],
            c = new o(
              (function (e, t, r) {
                return (3 * (t + r)) / 4 - r;
              })(0, s, u)
            ),
            l = 0,
            d = u > 0 ? s - 4 : s;
          for (r = 0; r < d; r += 4)
            (t =
              (n[e.charCodeAt(r)] << 18) |
              (n[e.charCodeAt(r + 1)] << 12) |
              (n[e.charCodeAt(r + 2)] << 6) |
              n[e.charCodeAt(r + 3)]),
              (c[l++] = (t >> 16) & 255),
              (c[l++] = (t >> 8) & 255),
              (c[l++] = 255 & t);
          2 === u &&
            ((t = (n[e.charCodeAt(r)] << 2) | (n[e.charCodeAt(r + 1)] >> 4)),
            (c[l++] = 255 & t));
          1 === u &&
            ((t =
              (n[e.charCodeAt(r)] << 10) |
              (n[e.charCodeAt(r + 1)] << 4) |
              (n[e.charCodeAt(r + 2)] >> 2)),
            (c[l++] = (t >> 8) & 255),
            (c[l++] = 255 & t));
          return c;
        }),
        (e.fromByteArray = function (e) {
          for (
            var t, n = e.length, o = n % 3, i = [], a = 16383, u = 0, c = n - o;
            u < c;
            u += a
          )
            i.push(s(e, u, u + a > c ? c : u + a));
          1 === o
            ? ((t = e[n - 1]), i.push(r[t >> 2] + r[(t << 4) & 63] + "=="))
            : 2 === o &&
              ((t = (e[n - 2] << 8) + e[n - 1]),
              i.push(r[t >> 10] + r[(t >> 4) & 63] + r[(t << 2) & 63] + "="));
          return i.join("");
        });
      var t,
        r = [],
        n = [],
        o = "undefined" != typeof Uint8Array ? Uint8Array : Array,
        i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (t = 0, 64; t < 64; ++t) (r[t] = i[t]), (n[i.charCodeAt(t)] = t);
      function a(e) {
        var t = e.length;
        if (t % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var r = e.indexOf("=");
        return -1 === r && (r = t), [r, r === t ? 0 : 4 - (r % 4)];
      }
      function s(e, t, n) {
        for (var o, i, a = [], s = t; s < n; s += 3)
          (o =
            ((e[s] << 16) & 16711680) +
            ((e[s + 1] << 8) & 65280) +
            (255 & e[s + 2])),
            a.push(
              r[((i = o) >> 18) & 63] +
                r[(i >> 12) & 63] +
                r[(i >> 6) & 63] +
                r[63 & i]
            );
        return a.join("");
      }
      (n["-".charCodeAt(0)] = 62), (n["_".charCodeAt(0)] = 63);
    },
  }),
  pt = createLazyModule({
    "../../../node_modules/ieee754/index.js"(e) {
      (e.read = function (e, t, r, n, o) {
        var i,
          a,
          s = 8 * o - n - 1,
          u = (1 << s) - 1,
          c = u >> 1,
          l = -7,
          d = r ? o - 1 : 0,
          h = r ? -1 : 1,
          f = e[t + d];
        for (
          d += h, i = f & ((1 << -l) - 1), f >>= -l, l += s;
          l > 0;
          i = 256 * i + e[t + d], d += h, l -= 8
        );
        for (
          a = i & ((1 << -l) - 1), i >>= -l, l += n;
          l > 0;
          a = 256 * a + e[t + d], d += h, l -= 8
        );
        if (0 === i) i = 1 - c;
        else {
          if (i === u) return a ? NaN : (1 / 0) * (f ? -1 : 1);
          (a += Math.pow(2, n)), (i -= c);
        }
        return (f ? -1 : 1) * a * Math.pow(2, i - n);
      }),
        (e.write = function (e, t, r, n, o, i) {
          var a,
            s,
            u,
            c = 8 * i - o - 1,
            l = (1 << c) - 1,
            d = l >> 1,
            h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            f = n ? 0 : i - 1,
            p = n ? 1 : -1,
            m = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
          for (
            t = Math.abs(t),
              isNaN(t) || t === 1 / 0
                ? ((s = isNaN(t) ? 1 : 0), (a = l))
                : ((a = Math.floor(Math.log(t) / Math.LN2)),
                  t * (u = Math.pow(2, -a)) < 1 && (a--, (u *= 2)),
                  (t += a + d >= 1 ? h / u : h * Math.pow(2, 1 - d)) * u >= 2 &&
                    (a++, (u /= 2)),
                  a + d >= l
                    ? ((s = 0), (a = l))
                    : a + d >= 1
                    ? ((s = (t * u - 1) * Math.pow(2, o)), (a += d))
                    : ((s = t * Math.pow(2, d - 1) * Math.pow(2, o)), (a = 0)));
            o >= 8;
            e[r + f] = 255 & s, f += p, s /= 256, o -= 8
          );
          for (
            a = (a << o) | s, c += o;
            c > 0;
            e[r + f] = 255 & a, f += p, a /= 256, c -= 8
          );
          e[r + f - p] |= 128 * m;
        });
    },
  }),
  mt = createLazyModule({
    "../../../node_modules/buffer/index.js"(e) {
      var t = ft(),
        r = pt(),
        n =
          "function" == typeof Symbol && "function" == typeof Symbol.for
            ? Symbol.for("nodejs.util.inspect.custom")
            : null;
      (e.Buffer = a),
        (e.SlowBuffer = function (e) {
          +e != e && (e = 0);
          return a.alloc(+e);
        }),
        (e.INSPECT_MAX_BYTES = 50);
      var o = 2147483647;
      function i(e) {
        if (e > o)
          throw new RangeError(
            'The value "' + e + '" is invalid for option "size"'
          );
        var t = new Uint8Array(e);
        return Object.setPrototypeOf(t, a.prototype), t;
      }
      function a(e, t, r) {
        if ("number" == typeof e) {
          if ("string" == typeof t)
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          return c(e);
        }
        return s(e, t, r);
      }
      function s(e, t, r) {
        if ("string" == typeof e)
          return (function (e, t) {
            ("string" == typeof t && "" !== t) || (t = "utf8");
            if (!a.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
            var r = 0 | f(e, t),
              n = i(r),
              o = n.write(e, t);
            o !== r && (n = n.slice(0, o));
            return n;
          })(e, t);
        if (ArrayBuffer.isView(e))
          return (function (e) {
            if (U(e, Uint8Array)) {
              var t = new Uint8Array(e);
              return d(t.buffer, t.byteOffset, t.byteLength);
            }
            return l(e);
          })(e);
        if (null == e)
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
              typeof e
          );
        if (U(e, ArrayBuffer) || (e && U(e.buffer, ArrayBuffer)))
          return d(e, t, r);
        if (
          "undefined" != typeof SharedArrayBuffer &&
          (U(e, SharedArrayBuffer) || (e && U(e.buffer, SharedArrayBuffer)))
        )
          return d(e, t, r);
        if ("number" == typeof e)
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        var n = e.valueOf && e.valueOf();
        if (null != n && n !== e) return a.from(n, t, r);
        var o = (function (e) {
          if (a.isBuffer(e)) {
            var t = 0 | h(e.length),
              r = i(t);
            return 0 === r.length || e.copy(r, 0, 0, t), r;
          }
          if (void 0 !== e.length)
            return "number" != typeof e.length || $(e.length) ? i(0) : l(e);
          if ("Buffer" === e.type && Array.isArray(e.data)) return l(e.data);
        })(e);
        if (o) return o;
        if (
          "undefined" != typeof Symbol &&
          null != Symbol.toPrimitive &&
          "function" == typeof e[Symbol.toPrimitive]
        )
          return a.from(e[Symbol.toPrimitive]("string"), t, r);
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
            typeof e
        );
      }
      function u(e) {
        if ("number" != typeof e)
          throw new TypeError('"size" argument must be of type number');
        if (e < 0)
          throw new RangeError(
            'The value "' + e + '" is invalid for option "size"'
          );
      }
      function c(e) {
        return u(e), i(e < 0 ? 0 : 0 | h(e));
      }
      function l(e) {
        for (
          var t = e.length < 0 ? 0 : 0 | h(e.length), r = i(t), n = 0;
          n < t;
          n += 1
        )
          r[n] = 255 & e[n];
        return r;
      }
      function d(e, t, r) {
        if (t < 0 || e.byteLength < t)
          throw new RangeError('"offset" is outside of buffer bounds');
        if (e.byteLength < t + (r || 0))
          throw new RangeError('"length" is outside of buffer bounds');
        var n;
        return (
          (n =
            void 0 === t && void 0 === r
              ? new Uint8Array(e)
              : void 0 === r
              ? new Uint8Array(e, t)
              : new Uint8Array(e, t, r)),
          Object.setPrototypeOf(n, a.prototype),
          n
        );
      }
      function h(e) {
        if (e >= o)
          throw new RangeError(
            "Attempt to allocate Buffer larger than maximum size: 0x" +
              o.toString(16) +
              " bytes"
          );
        return 0 | e;
      }
      function f(e, t) {
        if (a.isBuffer(e)) return e.length;
        if (ArrayBuffer.isView(e) || U(e, ArrayBuffer)) return e.byteLength;
        if ("string" != typeof e)
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
              typeof e
          );
        var r = e.length,
          n = arguments.length > 2 && !0 === arguments[2];
        if (!n && 0 === r) return 0;
        for (var o = !1; ; )
          switch (t) {
            case "ascii":
            case "latin1":
            case "binary":
              return r;
            case "utf8":
            case "utf-8":
              return O(e).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * r;
            case "hex":
              return r >>> 1;
            case "base64":
              return I(e).length;
            default:
              if (o) return n ? -1 : O(e).length;
              (t = ("" + t).toLowerCase()), (o = !0);
          }
      }
      function p(e, t, r) {
        var n = !1;
        if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return "";
        if (((void 0 === r || r > this.length) && (r = this.length), r <= 0))
          return "";
        if ((r >>>= 0) <= (t >>>= 0)) return "";
        for (e || (e = "utf8"); ; )
          switch (e) {
            case "hex":
              return A(this, t, r);
            case "utf8":
            case "utf-8":
              return S(this, t, r);
            case "ascii":
              return x(this, t, r);
            case "latin1":
            case "binary":
              return T(this, t, r);
            case "base64":
              return C(this, t, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return P(this, t, r);
            default:
              if (n) throw new TypeError("Unknown encoding: " + e);
              (e = (e + "").toLowerCase()), (n = !0);
          }
      }
      function m(e, t, r) {
        var n = e[t];
        (e[t] = e[r]), (e[r] = n);
      }
      function g(e, t, r, n, o) {
        if (0 === e.length) return -1;
        if (
          ("string" == typeof r
            ? ((n = r), (r = 0))
            : r > 2147483647
            ? (r = 2147483647)
            : r < -2147483648 && (r = -2147483648),
          $((r = +r)) && (r = o ? 0 : e.length - 1),
          r < 0 && (r = e.length + r),
          r >= e.length)
        ) {
          if (o) return -1;
          r = e.length - 1;
        } else if (r < 0) {
          if (!o) return -1;
          r = 0;
        }
        if (("string" == typeof t && (t = a.from(t, n)), a.isBuffer(t)))
          return 0 === t.length ? -1 : v(e, t, r, n, o);
        if ("number" == typeof t)
          return (
            (t &= 255),
            "function" == typeof Uint8Array.prototype.indexOf
              ? o
                ? Uint8Array.prototype.indexOf.call(e, t, r)
                : Uint8Array.prototype.lastIndexOf.call(e, t, r)
              : v(e, [t], r, n, o)
          );
        throw new TypeError("val must be string, number or Buffer");
      }
      function v(e, t, r, n, o) {
        var i,
          a = 1,
          s = e.length,
          u = t.length;
        if (
          void 0 !== n &&
          ("ucs2" === (n = String(n).toLowerCase()) ||
            "ucs-2" === n ||
            "utf16le" === n ||
            "utf-16le" === n)
        ) {
          if (e.length < 2 || t.length < 2) return -1;
          (a = 2), (s /= 2), (u /= 2), (r /= 2);
        }
        function c(e, t) {
          return 1 === a ? e[t] : e.readUInt16BE(t * a);
        }
        if (o) {
          var l = -1;
          for (i = r; i < s; i++)
            if (c(e, i) === c(t, -1 === l ? 0 : i - l)) {
              if ((-1 === l && (l = i), i - l + 1 === u)) return l * a;
            } else -1 !== l && (i -= i - l), (l = -1);
        } else
          for (r + u > s && (r = s - u), i = r; i >= 0; i--) {
            for (var d = !0, h = 0; h < u; h++)
              if (c(e, i + h) !== c(t, h)) {
                d = !1;
                break;
              }
            if (d) return i;
          }
        return -1;
      }
      function y(e, t, r, n) {
        r = Number(r) || 0;
        var o = e.length - r;
        n ? (n = Number(n)) > o && (n = o) : (n = o);
        var i = t.length;
        n > i / 2 && (n = i / 2);
        for (var a = 0; a < n; ++a) {
          var s = parseInt(t.substr(2 * a, 2), 16);
          if ($(s)) return a;
          e[r + a] = s;
        }
        return a;
      }
      function b(e, t, r, n) {
        return j(O(t, e.length - r), e, r, n);
      }
      function w(e, t, r, n) {
        return j(
          (function (e) {
            for (var t = [], r = 0; r < e.length; ++r)
              t.push(255 & e.charCodeAt(r));
            return t;
          })(t),
          e,
          r,
          n
        );
      }
      function _(e, t, r, n) {
        return j(I(t), e, r, n);
      }
      function E(e, t, r, n) {
        return j(
          (function (e, t) {
            for (
              var r, n, o, i = [], a = 0;
              a < e.length && !((t -= 2) < 0);
              ++a
            )
              (n = (r = e.charCodeAt(a)) >> 8),
                (o = r % 256),
                i.push(o),
                i.push(n);
            return i;
          })(t, e.length - r),
          e,
          r,
          n
        );
      }
      function C(e, r, n) {
        return 0 === r && n === e.length
          ? t.fromByteArray(e)
          : t.fromByteArray(e.slice(r, n));
      }
      function S(e, t, r) {
        r = Math.min(e.length, r);
        for (var n = [], o = t; o < r; ) {
          var i,
            a,
            s,
            u,
            c = e[o],
            l = null,
            d = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
          if (o + d <= r)
            switch (d) {
              case 1:
                c < 128 && (l = c);
                break;
              case 2:
                128 == (192 & (i = e[o + 1])) &&
                  (u = ((31 & c) << 6) | (63 & i)) > 127 &&
                  (l = u);
                break;
              case 3:
                (i = e[o + 1]),
                  (a = e[o + 2]),
                  128 == (192 & i) &&
                    128 == (192 & a) &&
                    (u = ((15 & c) << 12) | ((63 & i) << 6) | (63 & a)) >
                      2047 &&
                    (u < 55296 || u > 57343) &&
                    (l = u);
                break;
              case 4:
                (i = e[o + 1]),
                  (a = e[o + 2]),
                  (s = e[o + 3]),
                  128 == (192 & i) &&
                    128 == (192 & a) &&
                    128 == (192 & s) &&
                    (u =
                      ((15 & c) << 18) |
                      ((63 & i) << 12) |
                      ((63 & a) << 6) |
                      (63 & s)) > 65535 &&
                    u < 1114112 &&
                    (l = u);
            }
          null === l
            ? ((l = 65533), (d = 1))
            : l > 65535 &&
              ((l -= 65536),
              n.push(((l >>> 10) & 1023) | 55296),
              (l = 56320 | (1023 & l))),
            n.push(l),
            (o += d);
        }
        return (function (e) {
          var t = e.length;
          if (t <= k) return String.fromCharCode.apply(String, e);
          var r = "",
            n = 0;
          for (; n < t; )
            r += String.fromCharCode.apply(String, e.slice(n, (n += k)));
          return r;
        })(n);
      }
      (e.kMaxLength = o),
        (a.TYPED_ARRAY_SUPPORT = (function () {
          try {
            var e = new Uint8Array(1),
              t = {
                foo: function () {
                  return 42;
                },
              };
            return (
              Object.setPrototypeOf(t, Uint8Array.prototype),
              Object.setPrototypeOf(e, t),
              42 === e.foo()
            );
          } catch (e) {
            return !1;
          }
        })()),
        a.TYPED_ARRAY_SUPPORT ||
          "undefined" == typeof console ||
          "function" != typeof console.error ||
          console.error(
            "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
          ),
        Object.defineProperty(a.prototype, "parent", {
          enumerable: !0,
          get: function () {
            if (a.isBuffer(this)) return this.buffer;
          },
        }),
        Object.defineProperty(a.prototype, "offset", {
          enumerable: !0,
          get: function () {
            if (a.isBuffer(this)) return this.byteOffset;
          },
        }),
        (a.poolSize = 8192),
        (a.from = function (e, t, r) {
          return s(e, t, r);
        }),
        Object.setPrototypeOf(a.prototype, Uint8Array.prototype),
        Object.setPrototypeOf(a, Uint8Array),
        (a.alloc = function (e, t, r) {
          return (function (e, t, r) {
            return (
              u(e),
              e <= 0
                ? i(e)
                : void 0 !== t
                ? "string" == typeof r
                  ? i(e).fill(t, r)
                  : i(e).fill(t)
                : i(e)
            );
          })(e, t, r);
        }),
        (a.allocUnsafe = function (e) {
          return c(e);
        }),
        (a.allocUnsafeSlow = function (e) {
          return c(e);
        }),
        (a.isBuffer = function (e) {
          return null != e && !0 === e._isBuffer && e !== a.prototype;
        }),
        (a.compare = function (e, t) {
          if (
            (U(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
            U(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
            !a.isBuffer(e) || !a.isBuffer(t))
          )
            throw new TypeError(
              'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
            );
          if (e === t) return 0;
          for (
            var r = e.length, n = t.length, o = 0, i = Math.min(r, n);
            o < i;
            ++o
          )
            if (e[o] !== t[o]) {
              (r = e[o]), (n = t[o]);
              break;
            }
          return r < n ? -1 : n < r ? 1 : 0;
        }),
        (a.isEncoding = function (e) {
          switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }),
        (a.concat = function (e, t) {
          if (!Array.isArray(e))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === e.length) return a.alloc(0);
          var r;
          if (void 0 === t)
            for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
          var n = a.allocUnsafe(t),
            o = 0;
          for (r = 0; r < e.length; ++r) {
            var i = e[r];
            if (U(i, Uint8Array))
              o + i.length > n.length
                ? a.from(i).copy(n, o)
                : Uint8Array.prototype.set.call(n, i, o);
            else {
              if (!a.isBuffer(i))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              i.copy(n, o);
            }
            o += i.length;
          }
          return n;
        }),
        (a.byteLength = f),
        (a.prototype._isBuffer = !0),
        (a.prototype.swap16 = function () {
          var e = this.length;
          if (e % 2 != 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var t = 0; t < e; t += 2) m(this, t, t + 1);
          return this;
        }),
        (a.prototype.swap32 = function () {
          var e = this.length;
          if (e % 4 != 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var t = 0; t < e; t += 4)
            m(this, t, t + 3), m(this, t + 1, t + 2);
          return this;
        }),
        (a.prototype.swap64 = function () {
          var e = this.length;
          if (e % 8 != 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var t = 0; t < e; t += 8)
            m(this, t, t + 7),
              m(this, t + 1, t + 6),
              m(this, t + 2, t + 5),
              m(this, t + 3, t + 4);
          return this;
        }),
        (a.prototype.toString = function () {
          var e = this.length;
          return 0 === e
            ? ""
            : 0 === arguments.length
            ? S(this, 0, e)
            : p.apply(this, arguments);
        }),
        (a.prototype.toLocaleString = a.prototype.toString),
        (a.prototype.equals = function (e) {
          if (!a.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
          return this === e || 0 === a.compare(this, e);
        }),
        (a.prototype.inspect = function () {
          var t = "",
            r = e.INSPECT_MAX_BYTES;
          return (
            (t = this.toString("hex", 0, r)
              .replace(/(.{2})/g, "$1 ")
              .trim()),
            this.length > r && (t += " ... "),
            "<Buffer " + t + ">"
          );
        }),
        n && (a.prototype[n] = a.prototype.inspect),
        (a.prototype.compare = function (e, t, r, n, o) {
          if (
            (U(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
            !a.isBuffer(e))
          )
            throw new TypeError(
              'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                typeof e
            );
          if (
            (void 0 === t && (t = 0),
            void 0 === r && (r = e ? e.length : 0),
            void 0 === n && (n = 0),
            void 0 === o && (o = this.length),
            t < 0 || r > e.length || n < 0 || o > this.length)
          )
            throw new RangeError("out of range index");
          if (n >= o && t >= r) return 0;
          if (n >= o) return -1;
          if (t >= r) return 1;
          if (this === e) return 0;
          for (
            var i = (o >>>= 0) - (n >>>= 0),
              s = (r >>>= 0) - (t >>>= 0),
              u = Math.min(i, s),
              c = this.slice(n, o),
              l = e.slice(t, r),
              d = 0;
            d < u;
            ++d
          )
            if (c[d] !== l[d]) {
              (i = c[d]), (s = l[d]);
              break;
            }
          return i < s ? -1 : s < i ? 1 : 0;
        }),
        (a.prototype.includes = function (e, t, r) {
          return -1 !== this.indexOf(e, t, r);
        }),
        (a.prototype.indexOf = function (e, t, r) {
          return g(this, e, t, r, !0);
        }),
        (a.prototype.lastIndexOf = function (e, t, r) {
          return g(this, e, t, r, !1);
        }),
        (a.prototype.write = function (e, t, r, n) {
          if (void 0 === t) (n = "utf8"), (r = this.length), (t = 0);
          else if (void 0 === r && "string" == typeof t)
            (n = t), (r = this.length), (t = 0);
          else {
            if (!isFinite(t))
              throw new Error(
                "Buffer.write(string, encoding, offset[, length]) is no longer supported"
              );
            (t >>>= 0),
              isFinite(r)
                ? ((r >>>= 0), void 0 === n && (n = "utf8"))
                : ((n = r), (r = void 0));
          }
          var o = this.length - t;
          if (
            ((void 0 === r || r > o) && (r = o),
            (e.length > 0 && (r < 0 || t < 0)) || t > this.length)
          )
            throw new RangeError("Attempt to write outside buffer bounds");
          n || (n = "utf8");
          for (var i = !1; ; )
            switch (n) {
              case "hex":
                return y(this, e, t, r);
              case "utf8":
              case "utf-8":
                return b(this, e, t, r);
              case "ascii":
              case "latin1":
              case "binary":
                return w(this, e, t, r);
              case "base64":
                return _(this, e, t, r);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return E(this, e, t, r);
              default:
                if (i) throw new TypeError("Unknown encoding: " + n);
                (n = ("" + n).toLowerCase()), (i = !0);
            }
        }),
        (a.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0),
          };
        });
      var k = 4096;
      function x(e, t, r) {
        var n = "";
        r = Math.min(e.length, r);
        for (var o = t; o < r; ++o) n += String.fromCharCode(127 & e[o]);
        return n;
      }
      function T(e, t, r) {
        var n = "";
        r = Math.min(e.length, r);
        for (var o = t; o < r; ++o) n += String.fromCharCode(e[o]);
        return n;
      }
      function A(e, t, r) {
        var n = e.length;
        (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
        for (var o = "", i = t; i < r; ++i) o += q[e[i]];
        return o;
      }
      function P(e, t, r) {
        for (var n = e.slice(t, r), o = "", i = 0; i < n.length - 1; i += 2)
          o += String.fromCharCode(n[i] + 256 * n[i + 1]);
        return o;
      }
      function F(e, t, r) {
        if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
        if (e + t > r)
          throw new RangeError("Trying to access beyond buffer length");
      }
      function L(e, t, r, n, o, i) {
        if (!a.isBuffer(e))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (t > o || t < i)
          throw new RangeError('"value" argument is out of bounds');
        if (r + n > e.length) throw new RangeError("Index out of range");
      }
      function R(e, t, r, n, o, i) {
        if (r + n > e.length) throw new RangeError("Index out of range");
        if (r < 0) throw new RangeError("Index out of range");
      }
      function B(e, t, n, o, i) {
        return (
          (t = +t),
          (n >>>= 0),
          i || R(e, 0, n, 4),
          r.write(e, t, n, o, 23, 4),
          n + 4
        );
      }
      function D(e, t, n, o, i) {
        return (
          (t = +t),
          (n >>>= 0),
          i || R(e, 0, n, 8),
          r.write(e, t, n, o, 52, 8),
          n + 8
        );
      }
      (a.prototype.slice = function (e, t) {
        var r = this.length;
        (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
          (t = void 0 === t ? r : ~~t) < 0
            ? (t += r) < 0 && (t = 0)
            : t > r && (t = r),
          t < e && (t = e);
        var n = this.subarray(e, t);
        return Object.setPrototypeOf(n, a.prototype), n;
      }),
        (a.prototype.readUintLE = a.prototype.readUIntLE =
          function (e, t, r) {
            (e >>>= 0), (t >>>= 0), r || F(e, t, this.length);
            for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256); )
              n += this[e + i] * o;
            return n;
          }),
        (a.prototype.readUintBE = a.prototype.readUIntBE =
          function (e, t, r) {
            (e >>>= 0), (t >>>= 0), r || F(e, t, this.length);
            for (var n = this[e + --t], o = 1; t > 0 && (o *= 256); )
              n += this[e + --t] * o;
            return n;
          }),
        (a.prototype.readUint8 = a.prototype.readUInt8 =
          function (e, t) {
            return (e >>>= 0), t || F(e, 1, this.length), this[e];
          }),
        (a.prototype.readUint16LE = a.prototype.readUInt16LE =
          function (e, t) {
            return (
              (e >>>= 0),
              t || F(e, 2, this.length),
              this[e] | (this[e + 1] << 8)
            );
          }),
        (a.prototype.readUint16BE = a.prototype.readUInt16BE =
          function (e, t) {
            return (
              (e >>>= 0),
              t || F(e, 2, this.length),
              (this[e] << 8) | this[e + 1]
            );
          }),
        (a.prototype.readUint32LE = a.prototype.readUInt32LE =
          function (e, t) {
            return (
              (e >>>= 0),
              t || F(e, 4, this.length),
              (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                16777216 * this[e + 3]
            );
          }),
        (a.prototype.readUint32BE = a.prototype.readUInt32BE =
          function (e, t) {
            return (
              (e >>>= 0),
              t || F(e, 4, this.length),
              16777216 * this[e] +
                ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
            );
          }),
        (a.prototype.readIntLE = function (e, t, r) {
          (e >>>= 0), (t >>>= 0), r || F(e, t, this.length);
          for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256); )
            n += this[e + i] * o;
          return n >= (o *= 128) && (n -= Math.pow(2, 8 * t)), n;
        }),
        (a.prototype.readIntBE = function (e, t, r) {
          (e >>>= 0), (t >>>= 0), r || F(e, t, this.length);
          for (var n = t, o = 1, i = this[e + --n]; n > 0 && (o *= 256); )
            i += this[e + --n] * o;
          return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i;
        }),
        (a.prototype.readInt8 = function (e, t) {
          return (
            (e >>>= 0),
            t || F(e, 1, this.length),
            128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
          );
        }),
        (a.prototype.readInt16LE = function (e, t) {
          (e >>>= 0), t || F(e, 2, this.length);
          var r = this[e] | (this[e + 1] << 8);
          return 32768 & r ? 4294901760 | r : r;
        }),
        (a.prototype.readInt16BE = function (e, t) {
          (e >>>= 0), t || F(e, 2, this.length);
          var r = this[e + 1] | (this[e] << 8);
          return 32768 & r ? 4294901760 | r : r;
        }),
        (a.prototype.readInt32LE = function (e, t) {
          return (
            (e >>>= 0),
            t || F(e, 4, this.length),
            this[e] |
              (this[e + 1] << 8) |
              (this[e + 2] << 16) |
              (this[e + 3] << 24)
          );
        }),
        (a.prototype.readInt32BE = function (e, t) {
          return (
            (e >>>= 0),
            t || F(e, 4, this.length),
            (this[e] << 24) |
              (this[e + 1] << 16) |
              (this[e + 2] << 8) |
              this[e + 3]
          );
        }),
        (a.prototype.readFloatLE = function (e, t) {
          return (
            (e >>>= 0), t || F(e, 4, this.length), r.read(this, e, !0, 23, 4)
          );
        }),
        (a.prototype.readFloatBE = function (e, t) {
          return (
            (e >>>= 0), t || F(e, 4, this.length), r.read(this, e, !1, 23, 4)
          );
        }),
        (a.prototype.readDoubleLE = function (e, t) {
          return (
            (e >>>= 0), t || F(e, 8, this.length), r.read(this, e, !0, 52, 8)
          );
        }),
        (a.prototype.readDoubleBE = function (e, t) {
          return (
            (e >>>= 0), t || F(e, 8, this.length), r.read(this, e, !1, 52, 8)
          );
        }),
        (a.prototype.writeUintLE = a.prototype.writeUIntLE =
          function (e, t, r, n) {
            ((e = +e), (t >>>= 0), (r >>>= 0), n) ||
              L(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
            var o = 1,
              i = 0;
            for (this[t] = 255 & e; ++i < r && (o *= 256); )
              this[t + i] = (e / o) & 255;
            return t + r;
          }),
        (a.prototype.writeUintBE = a.prototype.writeUIntBE =
          function (e, t, r, n) {
            ((e = +e), (t >>>= 0), (r >>>= 0), n) ||
              L(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
            var o = r - 1,
              i = 1;
            for (this[t + o] = 255 & e; --o >= 0 && (i *= 256); )
              this[t + o] = (e / i) & 255;
            return t + r;
          }),
        (a.prototype.writeUint8 = a.prototype.writeUInt8 =
          function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || L(this, e, t, 1, 255, 0),
              (this[t] = 255 & e),
              t + 1
            );
          }),
        (a.prototype.writeUint16LE = a.prototype.writeUInt16LE =
          function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || L(this, e, t, 2, 65535, 0),
              (this[t] = 255 & e),
              (this[t + 1] = e >>> 8),
              t + 2
            );
          }),
        (a.prototype.writeUint16BE = a.prototype.writeUInt16BE =
          function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || L(this, e, t, 2, 65535, 0),
              (this[t] = e >>> 8),
              (this[t + 1] = 255 & e),
              t + 2
            );
          }),
        (a.prototype.writeUint32LE = a.prototype.writeUInt32LE =
          function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || L(this, e, t, 4, 4294967295, 0),
              (this[t + 3] = e >>> 24),
              (this[t + 2] = e >>> 16),
              (this[t + 1] = e >>> 8),
              (this[t] = 255 & e),
              t + 4
            );
          }),
        (a.prototype.writeUint32BE = a.prototype.writeUInt32BE =
          function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || L(this, e, t, 4, 4294967295, 0),
              (this[t] = e >>> 24),
              (this[t + 1] = e >>> 16),
              (this[t + 2] = e >>> 8),
              (this[t + 3] = 255 & e),
              t + 4
            );
          }),
        (a.prototype.writeIntLE = function (e, t, r, n) {
          if (((e = +e), (t >>>= 0), !n)) {
            var o = Math.pow(2, 8 * r - 1);
            L(this, e, t, r, o - 1, -o);
          }
          var i = 0,
            a = 1,
            s = 0;
          for (this[t] = 255 & e; ++i < r && (a *= 256); )
            e < 0 && 0 === s && 0 !== this[t + i - 1] && (s = 1),
              (this[t + i] = (((e / a) >> 0) - s) & 255);
          return t + r;
        }),
        (a.prototype.writeIntBE = function (e, t, r, n) {
          if (((e = +e), (t >>>= 0), !n)) {
            var o = Math.pow(2, 8 * r - 1);
            L(this, e, t, r, o - 1, -o);
          }
          var i = r - 1,
            a = 1,
            s = 0;
          for (this[t + i] = 255 & e; --i >= 0 && (a *= 256); )
            e < 0 && 0 === s && 0 !== this[t + i + 1] && (s = 1),
              (this[t + i] = (((e / a) >> 0) - s) & 255);
          return t + r;
        }),
        (a.prototype.writeInt8 = function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || L(this, e, t, 1, 127, -128),
            e < 0 && (e = 255 + e + 1),
            (this[t] = 255 & e),
            t + 1
          );
        }),
        (a.prototype.writeInt16LE = function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || L(this, e, t, 2, 32767, -32768),
            (this[t] = 255 & e),
            (this[t + 1] = e >>> 8),
            t + 2
          );
        }),
        (a.prototype.writeInt16BE = function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || L(this, e, t, 2, 32767, -32768),
            (this[t] = e >>> 8),
            (this[t + 1] = 255 & e),
            t + 2
          );
        }),
        (a.prototype.writeInt32LE = function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || L(this, e, t, 4, 2147483647, -2147483648),
            (this[t] = 255 & e),
            (this[t + 1] = e >>> 8),
            (this[t + 2] = e >>> 16),
            (this[t + 3] = e >>> 24),
            t + 4
          );
        }),
        (a.prototype.writeInt32BE = function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || L(this, e, t, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            (this[t] = e >>> 24),
            (this[t + 1] = e >>> 16),
            (this[t + 2] = e >>> 8),
            (this[t + 3] = 255 & e),
            t + 4
          );
        }),
        (a.prototype.writeFloatLE = function (e, t, r) {
          return B(this, e, t, !0, r);
        }),
        (a.prototype.writeFloatBE = function (e, t, r) {
          return B(this, e, t, !1, r);
        }),
        (a.prototype.writeDoubleLE = function (e, t, r) {
          return D(this, e, t, !0, r);
        }),
        (a.prototype.writeDoubleBE = function (e, t, r) {
          return D(this, e, t, !1, r);
        }),
        (a.prototype.copy = function (e, t, r, n) {
          if (!a.isBuffer(e))
            throw new TypeError("argument should be a Buffer");
          if (
            (r || (r = 0),
            n || 0 === n || (n = this.length),
            t >= e.length && (t = e.length),
            t || (t = 0),
            n > 0 && n < r && (n = r),
            n === r)
          )
            return 0;
          if (0 === e.length || 0 === this.length) return 0;
          if (t < 0) throw new RangeError("targetStart out of bounds");
          if (r < 0 || r >= this.length)
            throw new RangeError("Index out of range");
          if (n < 0) throw new RangeError("sourceEnd out of bounds");
          n > this.length && (n = this.length),
            e.length - t < n - r && (n = e.length - t + r);
          var o = n - r;
          return (
            this === e && "function" == typeof Uint8Array.prototype.copyWithin
              ? this.copyWithin(t, r, n)
              : Uint8Array.prototype.set.call(e, this.subarray(r, n), t),
            o
          );
        }),
        (a.prototype.fill = function (e, t, r, n) {
          if ("string" == typeof e) {
            if (
              ("string" == typeof t
                ? ((n = t), (t = 0), (r = this.length))
                : "string" == typeof r && ((n = r), (r = this.length)),
              void 0 !== n && "string" != typeof n)
            )
              throw new TypeError("encoding must be a string");
            if ("string" == typeof n && !a.isEncoding(n))
              throw new TypeError("Unknown encoding: " + n);
            if (1 === e.length) {
              var o = e.charCodeAt(0);
              (("utf8" === n && o < 128) || "latin1" === n) && (e = o);
            }
          } else
            "number" == typeof e
              ? (e &= 255)
              : "boolean" == typeof e && (e = Number(e));
          if (t < 0 || this.length < t || this.length < r)
            throw new RangeError("Out of range index");
          if (r <= t) return this;
          var i;
          if (
            ((t >>>= 0),
            (r = void 0 === r ? this.length : r >>> 0),
            e || (e = 0),
            "number" == typeof e)
          )
            for (i = t; i < r; ++i) this[i] = e;
          else {
            var s = a.isBuffer(e) ? e : a.from(e, n),
              u = s.length;
            if (0 === u)
              throw new TypeError(
                'The value "' + e + '" is invalid for argument "value"'
              );
            for (i = 0; i < r - t; ++i) this[i + t] = s[i % u];
          }
          return this;
        });
      var M = /[^+/0-9A-Za-z-_]/g;
      function O(e, t) {
        var r;
        t = t || 1 / 0;
        for (var n = e.length, o = null, i = [], a = 0; a < n; ++a) {
          if ((r = e.charCodeAt(a)) > 55295 && r < 57344) {
            if (!o) {
              if (r > 56319) {
                (t -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }
              if (a + 1 === n) {
                (t -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }
              o = r;
              continue;
            }
            if (r < 56320) {
              (t -= 3) > -1 && i.push(239, 191, 189), (o = r);
              continue;
            }
            r = 65536 + (((o - 55296) << 10) | (r - 56320));
          } else o && (t -= 3) > -1 && i.push(239, 191, 189);
          if (((o = null), r < 128)) {
            if ((t -= 1) < 0) break;
            i.push(r);
          } else if (r < 2048) {
            if ((t -= 2) < 0) break;
            i.push((r >> 6) | 192, (63 & r) | 128);
          } else if (r < 65536) {
            if ((t -= 3) < 0) break;
            i.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
          } else {
            if (!(r < 1114112)) throw new Error("Invalid code point");
            if ((t -= 4) < 0) break;
            i.push(
              (r >> 18) | 240,
              ((r >> 12) & 63) | 128,
              ((r >> 6) & 63) | 128,
              (63 & r) | 128
            );
          }
        }
        return i;
      }
      function I(e) {
        return t.toByteArray(
          (function (e) {
            if ((e = (e = e.split("=")[0]).trim().replace(M, "")).length < 2)
              return "";
            for (; e.length % 4 != 0; ) e += "=";
            return e;
          })(e)
        );
      }
      function j(e, t, r, n) {
        for (var o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o)
          t[o + r] = e[o];
        return o;
      }
      function U(e, t) {
        return (
          e instanceof t ||
          (null != e &&
            null != e.constructor &&
            null != e.constructor.name &&
            e.constructor.name === t.name)
        );
      }
      function $(e) {
        return e != e;
      }
      var q = (function () {
        for (var e = "0123456789abcdef", t = new Array(256), r = 0; r < 16; ++r)
          for (var n = 16 * r, o = 0; o < 16; ++o) t[n + o] = e[r] + e[o];
        return t;
      })();
    },
  }),
  
  wt = createLazyModule({ "../../../esbuild/polyfill.noop.js"() {} });
var cesdkCore = createLazyModule({
    "../../../_builds/cesdk/wasm32-unknown-emscripten/Release/cesdk.js"(e, t) {
      var r,
        n =
          ((r =
            "undefined" != typeof document && document.currentScript
              ? document.currentScript.src
              : void 0),
          "undefined" != typeof __filename && (r ||= __filename),
          function (e = {}) {
            var t,
              n,
              o,
              i,
              a,
              s,
              u = e;
            (u.ready = new Promise((e, r) => {
              (t = e), (n = r);
            })),
              u.expectedDataFileDownloads || (u.expectedDataFileDownloads = 0),
              u.expectedDataFileDownloads++,
              u.ENVIRONMENT_IS_PTHREAD ||
                u.$ww ||
                (function (e) {
                  "object" == typeof window
                    ? window.encodeURIComponent(
                        window.location.pathname
                          .toString()
                          .substring(
                            0,
                            window.location.pathname.toString().lastIndexOf("/")
                          ) + "/"
                      )
                    : "undefined" == typeof process &&
                      "undefined" != typeof location &&
                      encodeURIComponent(
                        location.pathname
                          .toString()
                          .substring(
                            0,
                            location.pathname.toString().lastIndexOf("/")
                          ) + "/"
                      );
                  var t = "cesdk.data";
                  "function" != typeof u.locateFilePackage ||
                    u.locateFile ||
                    ((u.locateFile = u.locateFilePackage),
                    k(
                      "warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)"
                    ));
                  var r = u.locateFile ? u.locateFile(t, "") : t,
                    n = e.remote_package_size,
                    o = null,
                    i = u.getPreloadedPackage
                      ? u.getPreloadedPackage(r, n)
                      : null;
                  function a() {
                    function t(e, t) {
                      if (!e) throw t + new Error().stack;
                    }
                    function r(e, t, r) {
                      (this.start = e), (this.end = t), (this.audio = r);
                    }
                    u.FS_createPath("/", "ly.img.cesdk", !0, !0),
                      u.FS_createPath("/ly.img.cesdk", "fonts", !0, !0),
                      u.FS_createPath("/ly.img.cesdk", "icons", !0, !0),
                      u.FS_createPath("/ly.img.cesdk", "icu", !0, !0),
                      u.FS_createPath("/ly.img.cesdk", "presets", !0, !0),
                      u.FS_createPath("/ly.img.cesdk", "shaders", !0, !0),
                      u.FS_createPath(
                        "/ly.img.cesdk/shaders",
                        "common",
                        !0,
                        !0
                      ),
                      (r.prototype = {
                        requests: {},
                        open: function (e, t) {
                          (this.name = t),
                            (this.requests[t] = this),
                            u.addRunDependency(`fp ${this.name}`);
                        },
                        send: function () {},
                        onload: function () {
                          var e = this.byteArray.subarray(this.start, this.end);
                          this.finish(e);
                        },
                        finish: function (e) {
                          u.FS_createDataFile(this.name, null, e, !0, !0, !0),
                            u.removeRunDependency(`fp ${this.name}`),
                            (this.requests[this.name] = null);
                        },
                      });
                    for (var n = e.files, a = 0; a < n.length; ++a)
                      new r(n[a].start, n[a].end, n[a].audio || 0).open(
                        "GET",
                        n[a].filename
                      );
                    function s(n) {
                      t(n, "Loading data file failed."),
                        t(
                          n.constructor.name === ArrayBuffer.name,
                          "bad input to processPackageData"
                        );
                      var o = new Uint8Array(n);
                      r.prototype.byteArray = o;
                      for (var i = e.files, a = 0; a < i.length; ++a)
                        r.prototype.requests[i[a].filename].onload();
                      u.removeRunDependency("datafile_cesdk.data");
                    }
                    u.addRunDependency("datafile_cesdk.data"),
                      u.preloadResults || (u.preloadResults = {}),
                      (u.preloadResults["cesdk.data"] = { fromCache: !1 }),
                      i ? (s(i), (i = null)) : (o = s);
                  }
                  i ||
                    (function (e, t, r, n) {
                      if (
                        "object" != typeof process ||
                        "object" != typeof process.versions ||
                        "string" != typeof process.versions.node
                      ) {
                        var o = new XMLHttpRequest();
                        o.open("GET", e, !0),
                          (o.responseType = "arraybuffer"),
                          (o.onprogress = function (r) {
                            var n = e,
                              i = t;
                            if ((r.total && (i = r.total), r.loaded)) {
                              o.addedTotal
                                ? (u.dataFileDownloads[n].loaded = r.loaded)
                                : ((o.addedTotal = !0),
                                  u.dataFileDownloads ||
                                    (u.dataFileDownloads = {}),
                                  (u.dataFileDownloads[n] = {
                                    loaded: r.loaded,
                                    total: i,
                                  }));
                              var a = 0,
                                s = 0,
                                c = 0;
                              for (var l in u.dataFileDownloads) {
                                var d = u.dataFileDownloads[l];
                                (a += d.total), (s += d.loaded), c++;
                              }
                              (a = Math.ceil(
                                (a * u.expectedDataFileDownloads) / c
                              )),
                                u.setStatus &&
                                  u.setStatus(
                                    `Downloading data... (${s}/${a})`
                                  );
                            } else
                              u.dataFileDownloads ||
                                (u.setStatus &&
                                  u.setStatus("Downloading data..."));
                          }),
                          (o.onerror = function (t) {
                            throw new Error("NetworkError for: " + e);
                          }),
                          (o.onload = function (e) {
                            if (
                              !(
                                200 == o.status ||
                                304 == o.status ||
                                206 == o.status ||
                                (0 == o.status && o.response)
                              )
                            )
                              throw new Error(
                                o.statusText + " : " + o.responseURL
                              );
                            var t = o.response;
                            r(t);
                          }),
                          o.send(null);
                      } else
                        wt().readFile(e, function (e, t) {
                          e ? n(e) : r(t.buffer);
                        });
                    })(
                      r,
                      n,
                      function (e) {
                        o ? (o(e), (o = null)) : (i = e);
                      },
                      function (e) {
                        console.error("package error:", e);
                      }
                    ),
                    u.calledRun
                      ? a()
                      : (u.preRun || (u.preRun = []), u.preRun.push(a));
                })({
                  files: [
                    {
                      filename:
                        "/ly.img.cesdk/fonts/imgly_font_inter_semibold.otf",
                      start: 0,
                      end: 270760,
                    },
                    {
                      filename: "/ly.img.cesdk/icons/ErrorAudio.svg",
                      start: 270760,
                      end: 271672,
                    },
                    {
                      filename: "/ly.img.cesdk/icons/ErrorConnection.svg",
                      start: 271672,
                      end: 272620,
                    },
                    {
                      filename: "/ly.img.cesdk/icons/ErrorVideo.svg",
                      start: 272620,
                      end: 273473,
                    },
                    {
                      filename: "/ly.img.cesdk/icons/Move.svg",
                      start: 273473,
                      end: 274413,
                    },
                    {
                      filename: "/ly.img.cesdk/icons/RotateIndicator.svg",
                      start: 274413,
                      end: 275394,
                    },
                    {
                      filename: "/ly.img.cesdk/icu/icudt74l.dat",
                      start: 275394,
                      end: 810498,
                    },
                    {
                      filename: "/ly.img.cesdk/presets/.keep",
                      start: 810498,
                      end: 810498,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/adjustments.sksl",
                      start: 810498,
                      end: 814387,
                    },
                    {
                      filename:
                        "/ly.img.cesdk/shaders/black_and_white_color_mixer.sksl",
                      start: 814387,
                      end: 820704,
                    },
                    {
                      filename:
                        "/ly.img.cesdk/shaders/common/ubq_adjustments.sksl",
                      start: 820704,
                      end: 825295,
                    },
                    {
                      filename:
                        "/ly.img.cesdk/shaders/common/ubq_color_conversions.sksl",
                      start: 825295,
                      end: 835280,
                    },
                    {
                      filename:
                        "/ly.img.cesdk/shaders/common/ubq_constants.sksl",
                      start: 835280,
                      end: 835770,
                    },
                    {
                      filename:
                        "/ly.img.cesdk/shaders/common/ubq_hue_constants.sksl",
                      start: 835770,
                      end: 838937,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/common/ubq_noise.sksl",
                      start: 838937,
                      end: 841575,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/cross_cut.sksl",
                      start: 841575,
                      end: 842522,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/dot_pattern.sksl",
                      start: 842522,
                      end: 843600,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/duotone_filter.sksl",
                      start: 843600,
                      end: 844564,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/extrude_blur.sksl",
                      start: 844564,
                      end: 846681,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/glow.sksl",
                      start: 846681,
                      end: 847648,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/half_tone.sksl",
                      start: 847648,
                      end: 848142,
                    },
                    {
                      filename:
                        "/ly.img.cesdk/shaders/hsp_selective_adjustments.sksl",
                      start: 848142,
                      end: 861742,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/linocut.sksl",
                      start: 861742,
                      end: 862527,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/liquid.sksl",
                      start: 862527,
                      end: 863009,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/lut_filter.sksl",
                      start: 863009,
                      end: 865872,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/mask_color.sksl",
                      start: 865872,
                      end: 866377,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/mirror.sksl",
                      start: 866377,
                      end: 866831,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/outliner.sksl",
                      start: 866831,
                      end: 868468,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/pixelize.sksl",
                      start: 868468,
                      end: 868768,
                    },
                    {
                      filename:
                        "/ly.img.cesdk/shaders/placeholder_overlay_lines.sksl",
                      start: 868768,
                      end: 869456,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/posterize.sksl",
                      start: 869456,
                      end: 869668,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/radial_pixel.sksl",
                      start: 869668,
                      end: 870231,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/recolor.sksl",
                      start: 870231,
                      end: 872432,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/sharpie.sksl",
                      start: 872432,
                      end: 874737,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/shifter.sksl",
                      start: 874737,
                      end: 875421,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/tiltshift.sksl",
                      start: 875421,
                      end: 876003,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/tv_glitch.sksl",
                      start: 876003,
                      end: 876721,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/vignette.sksl",
                      start: 876721,
                      end: 877093,
                    },
                  ],
                  remote_package_size: 877093,
                }),
              "object" == typeof window && "object" == typeof window.performance
                ? (u.performance = performance)
                : "object" == typeof global &&
                  "object" == typeof global.perf_hooks &&
                  "object" == typeof global.perf_hooks.performance
                ? (u.performance = global.perf_hooks.performance)
                : (u.performance = {
                    mark: function () {},
                    measure: function () {},
                  }),
              ((i = o || (o = {}))[(i.PENDING = 0)] = "PENDING"),
              (i[(i.FINISHED = 1)] = "FINISHED"),
              (i[(i.ALLOCATED = 2)] = "ALLOCATED"),
              (i[(i.ERROR = 3)] = "ERROR"),
              ((s = a || (a = {}))[(s.GET = 0)] = "GET"),
              (s[(s.POST = 1)] = "POST");
            class FetchProcess {
              constructor(e, t) {
                (this.state = o.PENDING),
                  (this.totalBytes = 0),
                  (this.receivedLength = 0),
                  (this.handle = e),
                  (this.uri = t),
                  (this.abortController = new AbortController()),
                  (this.abortSignal = this.abortController.signal);
              }
              async readChunks(e) {
                let t = 0;
                const r = [],
                  n = (e) => {
                    r.push(e), (t += e.length), (this.receivedLength = t);
                  };
                if (null == e);
                else if ("getReader" in e) {
                  const t = e.getReader();
                  for (;;) {
                    const { done: e, value: r } = await t.read();
                    if (e) break;
                    if (this.abortSignal.aborted)
                      throw (
                        (await t.cancel(),
                        t.releaseLock(),
                        new Error(this.abortSignal.reason))
                      );
                    n(r);
                  }
                  t.releaseLock();
                } else {
                  const t = () => e.destroy(new Error(this.abortSignal.reason));
                  this.abortSignal.addEventListener("abort", t, { once: !0 });
                  try {
                    await new Promise((t, r) => {
                      e.on("data", n),
                        e.on("end", () => t()),
                        e.on("error", (e) => r(e));
                    });
                  } finally {
                    this.abortSignal.removeEventListener("abort", t);
                  }
                }
                const o = new Uint8Array(t);
                let i = 0;
                for (const e of r) o.set(e, i), (i += e.length);
                return this.finish(o);
              }
              abort() {
                this.isPending() && this.abortController.abort("Fetch aborted");
              }
              isPending() {
                return this.state === o.PENDING;
              }
              isError() {
                return this.state === o.ERROR;
              }
              isFinished() {
                return this.state === o.FINISHED;
              }
              isAllocated() {
                return this.state === o.ALLOCATED;
              }
              allocate() {
                if (this.isAllocated()) return this;
                if (this.isFinished()) {
                  const e = this.result.length,
                    t = u._malloc(e);
                  u.HEAPU8.set(this.result, t);
                  const r = Object.assign(Object.assign({}, this), {
                    state: o.ALLOCATED,
                    resultAddress: t,
                    resultLength: e,
                  });
                  return Object.assign(this, r), r;
                }
                return null;
              }
              finish(e) {
                const t = Object.assign(Object.assign({}, this), {
                  state: o.FINISHED,
                  result: e,
                  totalBytes: e.length,
                });
                return Object.assign(this, t);
              }
              fail(e) {
                const t = Object.assign(Object.assign({}, this), {
                  state: o.ERROR,
                  error: e,
                });
                return Object.assign(this, t);
              }
            }
            (u.emscripten_ubq_asyncFetchManager = new (class AsyncFetchManager {
              constructor() {
                (this._nextHandle = 0),
                  (this._nextHeaderHandle = 0),
                  (this._processes = new Map()),
                  (this._headers = new Map()),
                  (this._fetchImpl = null);
              }
              _fetch(e, t) {
                return this._fetchImpl ? this._fetchImpl(e, t) : fetch(e, t);
              }
              setFetch(e) {
                this._fetchImpl = e;
              }
              getProcess(e) {
                return this._processes.get(e);
              }
              deleteProcess(e) {
                const t = this._processes.get(e);
                return (
                  (null == t ? void 0 : t.isPending()) && t.abort(),
                  this._processes.delete(e)
                );
              }
              clear() {
                for (const e of this._processes.values())
                  e.isPending() && e.abort();
                this._processes.clear(), this._headers.clear();
              }
              fetch(e, t, r, n, o, i, a, s, c) {
                const l = u.UTF8ToString(t, r),
                  d = this._nextHandle++,
                  h = new FetchProcess(d, l);
                return (
                  this._processes.set(d, h),
                  l.match(/^file:/)
                    ? this._fetchFile(h).catch((e) => {
                        h.fail(e);
                      })
                    : this._fetchRemote(h, e, n, o, i, a, s, c).catch((e) => {
                        h.fail(e);
                      }),
                  h
                );
              }
              async _fetchFile(e) {
                if ("undefined" != typeof window)
                  throw new Error("File URLs supported only in Node.JS");
                const t = wt(),
                  { fileURLToPath: r } = wt(),
                  n = t.createReadStream(r(e.uri));
                return e.readChunks(n);
              }
              async _fetchRemote(e, t, r, n, o, i, s, c) {
                const l = u.UTF8ToString(s, c),
                  d = this.getHeaders(r, n),
                  h =
                    t === a.POST
                      ? new Uint8Array(new Uint8Array(u.HEAPU8.buffer, o, i))
                      : void 0,
                  f = await this._fetch(e.uri, {
                    method: a[t],
                    headers: d,
                    body: h,
                    mode: "cors",
                    credentials: l,
                    signal: e.abortSignal,
                  });
                if (f.status >= 200 && f.status <= 209) {
                  let t = 0;
                  return (
                    f.headers.has("Content-Length") &&
                      (t = +f.headers.get("Content-Length")),
                    (e.totalBytes = t),
                    e.readChunks(f.body)
                  );
                }
                return e.fail(f.statusText);
              }
              getHeaders(e, t) {
                const r = {};
                for (let n = 0; n < t; n++) {
                  const t = u.getValue(e + 4 * n, "i32"),
                    o = this._headers.get(t);
                  r[o.key] = o.value;
                }
                return r;
              }
              createHeader(e, t, r, n) {
                const o = u.UTF8ToString(e, t),
                  i = u.UTF8ToString(r, n),
                  a = this._nextHeaderHandle++;
                return this._headers.set(a, { key: o, value: i }), a;
              }
              deleteHeader(e) {
                return this._headers.delete(e);
              }
            })()),
              (u.emscripten_ubq_codec_videoDecoders = new Map()),
              (u.emscripten_ubq_codec_audioDecoders = new Map()),
              (u.emscripten_ubq_codec_videoEncoders = new Map()),
              (u.emscripten_ubq_codec_audioEncoders = new Map()),
              (u.emscripten_ubq_codec_videoDecoderNextHandle = 1),
              (u.emscripten_ubq_codec_audioDecoderNextHandle = 1),
              (u.emscripten_ubq_codec_videoEncoderNextHandle = 1),
              (u.emscripten_ubq_codec_audioEncoderNextHandle = 1),
              (u.emscripten_ubq_codec_createNativeResult = function (e) {
                const t = u._malloc(8),
                  r = u.HEAPU32.subarray(t / 4, t / 4 + 2);
                if (
                  ((r[0] = e.handle ? e.handle : e.code ? e.code : 0), e.error)
                ) {
                  const t = new TextEncoder().encode(e.error),
                    n = u._malloc(t.length + 1),
                    o = u.HEAPU8.subarray(n, n + t.length + 1);
                  for (let e = 0; e < t.length; e++) o[e] = t[e];
                  (o[t.length] = 0), (r[1] = n);
                } else r[1] = 0;
                return t;
              }),
              (u.emscripten_ubq_codec_createVideoDecoder = function (e, t) {
                const r = new VideoDecoder({
                  output: (n) => {
                    const o = r.textures;
                    let i = !1;
                    if (
                      ((r.shouldDropFrames ||
                        r.decodedFrames < r.requestedFrame ||
                        r.decodeQueueSize >= o.length) &&
                        (i = !0),
                      !i)
                    ) {
                      var a = u.ctx;
                      const e = r.decodedFrames % o.length,
                        t = a.getParameter(a.TEXTURE_BINDING_2D);
                      a.bindTexture(a.TEXTURE_2D, o[e]),
                        a.texImage2D(
                          a.TEXTURE_2D,
                          0,
                          a.RGBA,
                          a.RGBA,
                          a.UNSIGNED_BYTE,
                          n
                        ),
                        a.bindTexture(a.TEXTURE_2D, t);
                    }
                    n.close(),
                      r.decodedFrames++,
                      u.emscripten_ubq_codec_onOutputDecodedVideoFrame(
                        e,
                        r.decodedFrames,
                        i,
                        t
                      );
                  },
                  error: (e) => {
                    (r.unexpectedError = e), console.error(e);
                  },
                });
                return (
                  (r.decodedFrames = 0),
                  (r.requestedFrame = 0),
                  (r.shouldDropFrames = !1),
                  r
                );
              }),
              (u.emscripten_ubq_codec_createAudioDecoder = function (e, t, r) {
                const n = new AudioDecoder({
                  output: (o) => {
                    if (n.flushing) return void o.close();
                    const i = u.HEAPF32.subarray(e / 4, e / 4 + r),
                      a = u.HEAPF32.subarray(t / 4, t / 4 + r),
                      s = 1 === o.numberOfChannels ? 0 : 1;
                    if ("f32-planar" === o.format) {
                      let e = n.writtenFrames % r;
                      if (e + o.numberOfFrames <= r)
                        o.copyTo(i.subarray(e), {
                          planeIndex: 0,
                          frameCount: o.numberOfFrames,
                        }),
                          o.copyTo(a.subarray(e), {
                            planeIndex: s,
                            frameCount: o.numberOfFrames,
                          });
                      else {
                        const t = r - e;
                        o.copyTo(i.subarray(e), {
                          planeIndex: 0,
                          frameCount: t,
                        }),
                          o.copyTo(a.subarray(e), {
                            planeIndex: s,
                            frameCount: t,
                          }),
                          o.copyTo(i, { planeIndex: 0, frameOffset: t }),
                          o.copyTo(a, { planeIndex: s, frameOffset: t });
                      }
                      n.writtenFrames += o.numberOfFrames;
                    } else if ("s16-planar" === o.format)
                      if (1 === o.numberOfChannels) {
                        const e = new Int16Array(o.numberOfFrames);
                        o.copyTo(e, { planeIndex: 0 });
                        for (let t = 0; t < o.numberOfFrames; t++) {
                          const o = e[t] / 32768;
                          let s = n.writtenFrames % r;
                          (i[s] = o), (a[s] = o), n.writtenFrames++;
                        }
                      } else {
                        const e = new Int16Array(o.numberOfFrames),
                          t = new Int16Array(o.numberOfFrames);
                        o.copyTo(e, { planeIndex: 0 }),
                          o.copyTo(t, { planeIndex: 1 });
                        for (let s = 0; s < o.numberOfFrames; s++) {
                          let o = n.writtenFrames % r;
                          (i[o] = e[s] / 32768),
                            (a[o] = t[s] / 32768),
                            n.writtenFrames++;
                        }
                      }
                    else if ("s16" === o.format) {
                      const e = new Int16Array(
                        o.numberOfFrames * o.numberOfChannels
                      );
                      if (
                        (o.copyTo(e, { planeIndex: 0 }),
                        1 === o.numberOfChannels)
                      )
                        for (let t = 0; t < o.numberOfFrames; t++) {
                          const o = e[t] / 32768;
                          let s = n.writtenFrames % r;
                          (i[s] = o), (a[s] = o), n.writtenFrames++;
                        }
                      else
                        for (let t = 0; t < o.numberOfFrames; t++) {
                          let s = n.writtenFrames % r;
                          (i[s] = e[t * o.numberOfChannels + 0] / 32768),
                            (a[s] = e[t * o.numberOfChannels + 1] / 32768),
                            n.writtenFrames++;
                        }
                    } else console.error("Unsupported audio format:", o.format);
                    o.close();
                  },
                  error: (e) => {
                    (n.unexpectedError = e), console.error(e);
                  },
                });
                return (n.writtenFrames = 0), n;
              }),
              (u.emscripten_ubq_settings_forceWebGL1 = !1);
            var c,
              l,
              d,
              h = Object.assign({}, u),
              f = [],
              p = "./this.program",
              m = (e, t) => {
                throw t;
              },
              g = "object" == typeof window,
              v = "function" == typeof importScripts,
              y =
                "object" == typeof process &&
                "object" == typeof process.versions &&
                "string" == typeof process.versions.node,
              b = "";
            if (y) {
              var w = wt(),
                _ = wt();
              (b = v ? _.dirname(b) + "/" : __dirname + "/"),
                (c = (e, t) => (
                  (e = ee(e) ? new URL(e) : _.normalize(e)),
                  w.readFileSync(e, t ? void 0 : "utf8")
                )),
                (d = (e) => {
                  var t = c(e, !0);
                  return t.buffer || (t = new Uint8Array(t)), t;
                }),
                (l = (e, t, r, n = !0) => {
                  (e = ee(e) ? new URL(e) : _.normalize(e)),
                    w.readFile(e, n ? void 0 : "utf8", (e, o) => {
                      e ? r(e) : t(n ? o.buffer : o);
                    });
                }),
                !u.thisProgram &&
                  process.argv.length > 1 &&
                  (p = process.argv[1].replace(/\\/g, "/")),
                (f = process.argv.slice(2)),
                (m = (e, t) => {
                  throw ((process.exitCode = e), t);
                });
            } else
              (g || v) &&
                (v
                  ? (b = self.location.href)
                  : "undefined" != typeof document &&
                    document.currentScript &&
                    (b = document.currentScript.src),
                r && (b = r),
                (b = b.startsWith("blob:")
                  ? ""
                  : b.substr(0, b.replace(/[?#].*/, "").lastIndexOf("/") + 1)),
                (c = (e) => {
                  var t = new XMLHttpRequest();
                  return t.open("GET", e, !1), t.send(null), t.responseText;
                }),
                v &&
                  (d = (e) => {
                    var t = new XMLHttpRequest();
                    return (
                      t.open("GET", e, !1),
                      (t.responseType = "arraybuffer"),
                      t.send(null),
                      new Uint8Array(t.response)
                    );
                  }),
                (l = (e, t, r) => {
                  var n = new XMLHttpRequest();
                  n.open("GET", e, !0),
                    (n.responseType = "arraybuffer"),
                    (n.onload = () => {
                      200 == n.status || (0 == n.status && n.response)
                        ? t(n.response)
                        : r();
                    }),
                    (n.onerror = r),
                    n.send(null);
                }));
            var E,
              C,
              S = u.print || console.log.bind(console),
              k = u.printErr || console.error.bind(console);
            Object.assign(u, h),
              (h = null),
              u.arguments && (f = u.arguments),
              u.thisProgram && (p = u.thisProgram),
              u.quit && (m = u.quit),
              u.wasmBinary && (E = u.wasmBinary),
              "object" != typeof WebAssembly &&
                K("no native wasm support detected");
            var x,
              T,
              A,
              P,
              F,
              L,
              R,
              B,
              D,
              M,
              O,
              I = !1;
            function j(e, t) {
              e || K(t);
            }
            function U() {
              var e = C.buffer;
              (u.HEAP8 = T = new Int8Array(e)),
                (u.HEAP16 = P = new Int16Array(e)),
                (u.HEAPU8 = A = new Uint8Array(e)),
                (u.HEAPU16 = F = new Uint16Array(e)),
                (u.HEAP32 = L = new Int32Array(e)),
                (u.HEAPU32 = R = new Uint32Array(e)),
                (u.HEAPF32 = B = new Float32Array(e)),
                (u.HEAPF64 = O = new Float64Array(e)),
                (u.HEAP64 = D = new BigInt64Array(e)),
                (u.HEAPU64 = M = new BigUint64Array(e));
            }
            var $ = u.INITIAL_MEMORY || 16777216;
            (C = u.wasmMemory
              ? u.wasmMemory
              : new WebAssembly.Memory({ initial: $ / 65536, maximum: 32768 })),
              U(),
              ($ = C.buffer.byteLength);
            var q = [],
              H = [],
              N = [],
              V = [],
              z = 0,
              W = null,
              G = null;
            function X(e) {
              z++, u.monitorRunDependencies?.(z);
            }
            function Y(e) {
              if (
                (z--,
                u.monitorRunDependencies?.(z),
                0 == z && (null !== W && (clearInterval(W), (W = null)), G))
              ) {
                var t = G;
                (G = null), t();
              }
            }
            function K(e) {
              u.onAbort?.(e),
                k((e = "Aborted(" + e + ")")),
                (I = !0),
                (x = 1),
                (e += ". Build with -sASSERTIONS for more info.");
              var t = new WebAssembly.RuntimeError(e);
              throw (n(t), t);
            }
            var Z,
              Q,
              J = (e) => e.startsWith("data:application/octet-stream;base64,"),
              ee = (e) => e.startsWith("file://");
            function te(e) {
              if (e == Z && E) return new Uint8Array(E);
              if (d) return d(e);
              throw "both async and sync fetching of the wasm failed";
            }
            function re(e, t, r) {
              return (function (e) {
                return E || (!g && !v) || "function" != typeof fetch
                  ? Promise.resolve().then(() => te(e))
                  : fetch(e, { credentials: "same-origin" })
                      .then((t) => {
                        if (!t.ok)
                          throw `failed to load wasm binary file at '${e}'`;
                        return t.arrayBuffer();
                      })
                      .catch(() => te(e));
              })(e)
                .then((e) => WebAssembly.instantiate(e, t))
                .then((e) => e)
                .then(r, (e) => {
                  k(`failed to asynchronously prepare wasm: ${e}`), K(e);
                });
            }
            J((Z = "cesdk.wasm")) ||
              ((Q = Z), (Z = u.locateFile ? u.locateFile(Q, b) : b + Q));
            var ne = {
              2483220: (e, t, r, n, o) =>
                "undefined" == typeof window ||
                void 0 === (window.AudioContext || window.webkitAudioContext)
                  ? 0
                  : (void 0 === window.miniaudio &&
                      ((window.miniaudio = { referenceCount: 0 }),
                      (window.miniaudio.device_type = {}),
                      (window.miniaudio.device_type.playback = e),
                      (window.miniaudio.device_type.capture = t),
                      (window.miniaudio.device_type.duplex = r),
                      (window.miniaudio.device_state = {}),
                      (window.miniaudio.device_state.stopped = n),
                      (window.miniaudio.device_state.started = o),
                      (miniaudio.devices = []),
                      (miniaudio.track_device = function (e) {
                        for (var t = 0; t < miniaudio.devices.length; ++t)
                          if (null == miniaudio.devices[t])
                            return (miniaudio.devices[t] = e), t;
                        return (
                          miniaudio.devices.push(e),
                          miniaudio.devices.length - 1
                        );
                      }),
                      (miniaudio.untrack_device_by_index = function (e) {
                        for (
                          miniaudio.devices[e] = null;
                          miniaudio.devices.length > 0 &&
                          null ==
                            miniaudio.devices[miniaudio.devices.length - 1];

                        )
                          miniaudio.devices.pop();
                      }),
                      (miniaudio.untrack_device = function (e) {
                        for (var t = 0; t < miniaudio.devices.length; ++t)
                          if (miniaudio.devices[t] == e)
                            return miniaudio.untrack_device_by_index(t);
                      }),
                      (miniaudio.get_device_by_index = function (e) {
                        return miniaudio.devices[e];
                      }),
                      (miniaudio.unlock_event_types = (function () {
                        return ["touchstart", "touchend", "click"];
                      })()),
                      (miniaudio.unlock = function () {
                        for (var e = 0; e < miniaudio.devices.length; ++e) {
                          var t = miniaudio.devices[e];
                          null != t &&
                            null != t.webaudio &&
                            2 === t.state &&
                            t.webaudio.resume();
                        }
                        miniaudio.unlock_event_types.map(function (e) {
                          document.removeEventListener(e, miniaudio.unlock, !0);
                        });
                      }),
                      miniaudio.unlock_event_types.map(function (e) {
                        document.addEventListener(e, miniaudio.unlock, !0);
                      })),
                    (window.miniaudio.referenceCount += 1),
                    1),
              2485210: () => {
                void 0 !== window.miniaudio &&
                  ((window.miniaudio.referenceCount -= 1),
                  0 === window.miniaudio.referenceCount &&
                    delete window.miniaudio);
              },
              2485374: () =>
                void 0 !== navigator.mediaDevices &&
                void 0 !== navigator.mediaDevices.getUserMedia,
              2485478: () => {
                try {
                  var e = new (window.AudioContext ||
                      window.webkitAudioContext)(),
                    t = e.sampleRate;
                  return e.close(), t;
                } catch (e) {
                  return 0;
                }
              },
              2485649: (e, t, r, n, o, i) => {
                var a = e,
                  s = t,
                  c = r,
                  l = n,
                  d = o,
                  h = i;
                if (void 0 === window.miniaudio) return -1;
                var f = {},
                  p = {};
                a == window.miniaudio.device_type.playback &&
                  (p.sampleRate = c),
                  (f.webaudio = new (window.AudioContext ||
                    window.webkitAudioContext)(p)),
                  f.webaudio.suspend(),
                  (f.state = window.miniaudio.device_state.stopped);
                var m = 0,
                  g = s;
                return (
                  a != window.miniaudio.device_type.playback && (m = s),
                  (f.scriptNode = f.webaudio.createScriptProcessor(l, m, g)),
                  (f.scriptNode.onaudioprocess = function (e) {
                    if (
                      ((null != f.intermediaryBufferView &&
                        0 != f.intermediaryBufferView.length) ||
                        (f.intermediaryBufferView = new Float32Array(
                          u.HEAPF32.buffer,
                          d,
                          l * s
                        )),
                      a == miniaudio.device_type.capture ||
                        a == miniaudio.device_type.duplex)
                    ) {
                      for (var t = 0; t < s; t += 1)
                        for (
                          var r = e.inputBuffer.getChannelData(t),
                            n = f.intermediaryBufferView,
                            o = 0;
                          o < l;
                          o += 1
                        )
                          n[o * s + t] = r[o];
                      Ru(h, l, d);
                    }
                    if (
                      a == miniaudio.device_type.playback ||
                      a == miniaudio.device_type.duplex
                    )
                      for (
                        Bu(h, l, d), t = 0;
                        t < e.outputBuffer.numberOfChannels;
                        ++t
                      ) {
                        var i = e.outputBuffer.getChannelData(t);
                        for (n = f.intermediaryBufferView, o = 0; o < l; o += 1)
                          i[o] = n[o * s + t];
                      }
                    else
                      for (t = 0; t < e.outputBuffer.numberOfChannels; ++t)
                        e.outputBuffer.getChannelData(t).fill(0);
                  }),
                  (a != miniaudio.device_type.capture &&
                    a != miniaudio.device_type.duplex) ||
                    navigator.mediaDevices
                      .getUserMedia({ audio: !0, video: !1 })
                      .then(function (e) {
                        (f.streamNode = f.webaudio.createMediaStreamSource(e)),
                          f.streamNode.connect(f.scriptNode),
                          f.scriptNode.connect(f.webaudio.destination);
                      })
                      .catch(function (e) {
                        console.log("Failed to get user media: " + e);
                      }),
                  a == miniaudio.device_type.playback &&
                    f.scriptNode.connect(f.webaudio.destination),
                  miniaudio.track_device(f)
                );
              },
              2488432: (e) =>
                miniaudio.get_device_by_index(e).webaudio.sampleRate,
              2488498: (e) => {
                var t = miniaudio.get_device_by_index(e);
                void 0 !== t.scriptNode &&
                  ((t.scriptNode.onaudioprocess = function (e) {}),
                  t.scriptNode.disconnect(),
                  (t.scriptNode = void 0)),
                  void 0 !== t.streamNode &&
                    (t.streamNode.disconnect(), (t.streamNode = void 0)),
                  t.webaudio.close(),
                  (t.webaudio = void 0);
              },
              2488863: (e) => {
                miniaudio.untrack_device_by_index(e);
              },
              2488906: (e) => {
                var t = miniaudio.get_device_by_index(e);
                t.webaudio.resume(), (t.state = miniaudio.device_state.started);
              },
              2489031: (e) => {
                var t = miniaudio.get_device_by_index(e);
                t.webaudio.suspend(),
                  (t.state = miniaudio.device_state.stopped);
              },
              2489157: () => !!globalThis.ubq_browserTabHidden,
              2489203: () => T.length,
            };
            function oe(e) {
              (this.name = "ExitStatus"),
                (this.message = `Program terminated with exit(${e})`),
                (this.status = e);
            }
            var ie = (e) => {
                for (; e.length > 0; ) e.shift()(u);
              },
              ae = u.noExitRuntime || !0,
              se = [],
              ue = 0;
            class ExceptionInfo {
              constructor(e) {
                (this.excPtr = e), (this.ptr = e - 24);
              }
              set_type(e) {
                R[(this.ptr + 4) >> 2] = e;
              }
              get_type() {
                return R[(this.ptr + 4) >> 2];
              }
              set_destructor(e) {
                R[(this.ptr + 8) >> 2] = e;
              }
              get_destructor() {
                return R[(this.ptr + 8) >> 2];
              }
              set_caught(e) {
                (e = e ? 1 : 0), (T[(this.ptr + 12) >> 0] = e);
              }
              get_caught() {
                return 0 != T[(this.ptr + 12) >> 0];
              }
              set_rethrown(e) {
                (e = e ? 1 : 0), (T[(this.ptr + 13) >> 0] = e);
              }
              get_rethrown() {
                return 0 != T[(this.ptr + 13) >> 0];
              }
              init(e, t) {
                this.set_adjusted_ptr(0),
                  this.set_type(e),
                  this.set_destructor(t);
              }
              set_adjusted_ptr(e) {
                R[(this.ptr + 16) >> 2] = e;
              }
              get_adjusted_ptr() {
                return R[(this.ptr + 16) >> 2];
              }
              get_exception_ptr() {
                if (Vu(this.get_type())) return R[this.excPtr >> 2];
                var e = this.get_adjusted_ptr();
                return 0 !== e ? e : this.excPtr;
              }
            }
            var ce = (e) => {
                var t = ue;
                if (!t) return Du(0), 0;
                var r = new ExceptionInfo(t);
                r.set_adjusted_ptr(t);
                var n = r.get_type();
                if (!n) return Du(0), t;
                for (var o in e) {
                  var i = e[o];
                  if (0 === i || i === n) break;
                  var a = r.ptr + 16;
                  if (Nu(i, n, a)) return Du(i), t;
                }
                return Du(n), t;
              },
              le = {
                isAbs: (e) => "/" === e.charAt(0),
                splitPath: (e) =>
                  /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                    .exec(e)
                    .slice(1),
                normalizeArray: (e, t) => {
                  for (var r = 0, n = e.length - 1; n >= 0; n--) {
                    var o = e[n];
                    "." === o
                      ? e.splice(n, 1)
                      : ".." === o
                      ? (e.splice(n, 1), r++)
                      : r && (e.splice(n, 1), r--);
                  }
                  if (t) for (; r; r--) e.unshift("..");
                  return e;
                },
                normalize: (e) => {
                  var t = le.isAbs(e),
                    r = "/" === e.substr(-1);
                  return (
                    (e = le
                      .normalizeArray(
                        e.split("/").filter((e) => !!e),
                        !t
                      )
                      .join("/")) ||
                      t ||
                      (e = "."),
                    e && r && (e += "/"),
                    (t ? "/" : "") + e
                  );
                },
                dirname: (e) => {
                  var t = le.splitPath(e),
                    r = t[0],
                    n = t[1];
                  return r || n
                    ? (n && (n = n.substr(0, n.length - 1)), r + n)
                    : ".";
                },
                basename: (e) => {
                  if ("/" === e) return "/";
                  var t = (e = (e = le.normalize(e)).replace(
                    /\/$/,
                    ""
                  )).lastIndexOf("/");
                  return -1 === t ? e : e.substr(t + 1);
                },
                join: function () {
                  var e = Array.prototype.slice.call(arguments);
                  return le.normalize(e.join("/"));
                },
                join2: (e, t) => le.normalize(e + "/" + t),
              },
              de = (e) =>
                (de = (() => {
                  if (
                    "object" == typeof crypto &&
                    "function" == typeof crypto.getRandomValues
                  )
                    return (e) => crypto.getRandomValues(e);
                  if (y)
                    try {
                      var e = wt();
                      if (e.randomFillSync) return (t) => e.randomFillSync(t);
                      var t = e.randomBytes;
                      return (e) => (e.set(t(e.byteLength)), e);
                    } catch (e) {}
                  K("initRandomDevice");
                })())(e),
              he = {
                resolve: function () {
                  for (
                    var e = "", t = !1, r = arguments.length - 1;
                    r >= -1 && !t;
                    r--
                  ) {
                    var n = r >= 0 ? arguments[r] : Se.cwd();
                    if ("string" != typeof n)
                      throw new TypeError(
                        "Arguments to path.resolve must be strings"
                      );
                    if (!n) return "";
                    (e = n + "/" + e), (t = le.isAbs(n));
                  }
                  return (
                    (t ? "/" : "") +
                      (e = le
                        .normalizeArray(
                          e.split("/").filter((e) => !!e),
                          !t
                        )
                        .join("/")) || "."
                  );
                },
                relative: (e, t) => {
                  function r(e) {
                    for (var t = 0; t < e.length && "" === e[t]; t++);
                    for (var r = e.length - 1; r >= 0 && "" === e[r]; r--);
                    return t > r ? [] : e.slice(t, r - t + 1);
                  }
                  (e = he.resolve(e).substr(1)), (t = he.resolve(t).substr(1));
                  for (
                    var n = r(e.split("/")),
                      o = r(t.split("/")),
                      i = Math.min(n.length, o.length),
                      a = i,
                      s = 0;
                    s < i;
                    s++
                  )
                    if (n[s] !== o[s]) {
                      a = s;
                      break;
                    }
                  var u = [];
                  for (s = a; s < n.length; s++) u.push("..");
                  return (u = u.concat(o.slice(a))).join("/");
                },
              },
              fe =
                "undefined" != typeof TextDecoder
                  ? new TextDecoder("utf8")
                  : void 0,
              pe = (e, t, r) => {
                for (var n = t + r, o = t; e[o] && !(o >= n); ) ++o;
                if (o - t > 16 && e.buffer && fe)
                  return fe.decode(e.subarray(t, o));
                for (var i = ""; t < o; ) {
                  var a = e[t++];
                  if (128 & a) {
                    var s = 63 & e[t++];
                    if (192 != (224 & a)) {
                      var u = 63 & e[t++];
                      if (
                        (a =
                          224 == (240 & a)
                            ? ((15 & a) << 12) | (s << 6) | u
                            : ((7 & a) << 18) |
                              (s << 12) |
                              (u << 6) |
                              (63 & e[t++])) < 65536
                      )
                        i += String.fromCharCode(a);
                      else {
                        var c = a - 65536;
                        i += String.fromCharCode(
                          55296 | (c >> 10),
                          56320 | (1023 & c)
                        );
                      }
                    } else i += String.fromCharCode(((31 & a) << 6) | s);
                  } else i += String.fromCharCode(a);
                }
                return i;
              },
              me = [],
              ge = (e) => {
                for (var t = 0, r = 0; r < e.length; ++r) {
                  var n = e.charCodeAt(r);
                  n <= 127
                    ? t++
                    : n <= 2047
                    ? (t += 2)
                    : n >= 55296 && n <= 57343
                    ? ((t += 4), ++r)
                    : (t += 3);
                }
                return t;
              },
              ve = (e, t, r, n) => {
                if (!(n > 0)) return 0;
                for (var o = r, i = r + n - 1, a = 0; a < e.length; ++a) {
                  var s = e.charCodeAt(a);
                  if (
                    (s >= 55296 &&
                      s <= 57343 &&
                      (s =
                        (65536 + ((1023 & s) << 10)) |
                        (1023 & e.charCodeAt(++a))),
                    s <= 127)
                  ) {
                    if (r >= i) break;
                    t[r++] = s;
                  } else if (s <= 2047) {
                    if (r + 1 >= i) break;
                    (t[r++] = 192 | (s >> 6)), (t[r++] = 128 | (63 & s));
                  } else if (s <= 65535) {
                    if (r + 2 >= i) break;
                    (t[r++] = 224 | (s >> 12)),
                      (t[r++] = 128 | ((s >> 6) & 63)),
                      (t[r++] = 128 | (63 & s));
                  } else {
                    if (r + 3 >= i) break;
                    (t[r++] = 240 | (s >> 18)),
                      (t[r++] = 128 | ((s >> 12) & 63)),
                      (t[r++] = 128 | ((s >> 6) & 63)),
                      (t[r++] = 128 | (63 & s));
                  }
                }
                return (t[r] = 0), r - o;
              };
            function ye(e, t, r) {
              var n = r > 0 ? r : ge(e) + 1,
                o = new Array(n),
                i = ve(e, o, 0, o.length);
              return t && (o.length = i), o;
            }
            var be = {
                ttys: [],
                init() {},
                shutdown() {},
                register(e, t) {
                  (be.ttys[e] = { input: [], output: [], ops: t }),
                    Se.registerDevice(e, be.stream_ops);
                },
                stream_ops: {
                  open(e) {
                    var t = be.ttys[e.node.rdev];
                    if (!t) throw new Se.ErrnoError(43);
                    (e.tty = t), (e.seekable = !1);
                  },
                  close(e) {
                    e.tty.ops.fsync(e.tty);
                  },
                  fsync(e) {
                    e.tty.ops.fsync(e.tty);
                  },
                  read(e, t, r, n, o) {
                    if (!e.tty || !e.tty.ops.get_char)
                      throw new Se.ErrnoError(60);
                    for (var i = 0, a = 0; a < n; a++) {
                      var s;
                      try {
                        s = e.tty.ops.get_char(e.tty);
                      } catch (e) {
                        throw new Se.ErrnoError(29);
                      }
                      if (void 0 === s && 0 === i) throw new Se.ErrnoError(6);
                      if (null == s) break;
                      i++, (t[r + a] = s);
                    }
                    return i && (e.node.timestamp = Date.now()), i;
                  },
                  write(e, t, r, n, o) {
                    if (!e.tty || !e.tty.ops.put_char)
                      throw new Se.ErrnoError(60);
                    try {
                      for (var i = 0; i < n; i++)
                        e.tty.ops.put_char(e.tty, t[r + i]);
                    } catch (e) {
                      throw new Se.ErrnoError(29);
                    }
                    return n && (e.node.timestamp = Date.now()), i;
                  },
                },
                default_tty_ops: {
                  get_char: (e) =>
                    (() => {
                      if (!me.length) {
                        var e = null;
                        if (y) {
                          var t = Buffer.alloc(256),
                            r = 0,
                            n = process.stdin.fd;
                          try {
                            r = w.readSync(n, t);
                          } catch (e) {
                            if (!e.toString().includes("EOF")) throw e;
                            r = 0;
                          }
                          e = r > 0 ? t.slice(0, r).toString("utf-8") : null;
                        } else
                          "undefined" != typeof window &&
                          "function" == typeof window.prompt
                            ? null !== (e = window.prompt("Input: ")) &&
                              (e += "\n")
                            : "function" == typeof readline &&
                              null !== (e = readline()) &&
                              (e += "\n");
                        if (!e) return null;
                        me = ye(e, !0);
                      }
                      return me.shift();
                    })(),
                  put_char(e, t) {
                    null === t || 10 === t
                      ? (S(pe(e.output, 0)), (e.output = []))
                      : 0 != t && e.output.push(t);
                  },
                  fsync(e) {
                    e.output &&
                      e.output.length > 0 &&
                      (S(pe(e.output, 0)), (e.output = []));
                  },
                  ioctl_tcgets: (e) => ({
                    c_iflag: 25856,
                    c_oflag: 5,
                    c_cflag: 191,
                    c_lflag: 35387,
                    c_cc: [
                      3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22,
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    ],
                  }),
                  ioctl_tcsets: (e, t, r) => 0,
                  ioctl_tiocgwinsz: (e) => [24, 80],
                },
                default_tty1_ops: {
                  put_char(e, t) {
                    null === t || 10 === t
                      ? (k(pe(e.output, 0)), (e.output = []))
                      : 0 != t && e.output.push(t);
                  },
                  fsync(e) {
                    e.output &&
                      e.output.length > 0 &&
                      (k(pe(e.output, 0)), (e.output = []));
                  },
                },
              },
              we = (e) => {
                e = ((e, t) => Math.ceil(e / t) * t)(e, 65536);
                var t = Ou(65536, e);
                return t ? ((e, t) => (A.fill(0, e, e + t), e))(t, e) : 0;
              },
              _e = {
                ops_table: null,
                mount: (e) => _e.createNode(null, "/", 16895, 0),
                createNode(e, t, r, n) {
                  if (Se.isBlkdev(r) || Se.isFIFO(r))
                    throw new Se.ErrnoError(63);
                  _e.ops_table ||= {
                    dir: {
                      node: {
                        getattr: _e.node_ops.getattr,
                        setattr: _e.node_ops.setattr,
                        lookup: _e.node_ops.lookup,
                        mknod: _e.node_ops.mknod,
                        rename: _e.node_ops.rename,
                        unlink: _e.node_ops.unlink,
                        rmdir: _e.node_ops.rmdir,
                        readdir: _e.node_ops.readdir,
                        symlink: _e.node_ops.symlink,
                      },
                      stream: { llseek: _e.stream_ops.llseek },
                    },
                    file: {
                      node: {
                        getattr: _e.node_ops.getattr,
                        setattr: _e.node_ops.setattr,
                      },
                      stream: {
                        llseek: _e.stream_ops.llseek,
                        read: _e.stream_ops.read,
                        write: _e.stream_ops.write,
                        allocate: _e.stream_ops.allocate,
                        mmap: _e.stream_ops.mmap,
                        msync: _e.stream_ops.msync,
                      },
                    },
                    link: {
                      node: {
                        getattr: _e.node_ops.getattr,
                        setattr: _e.node_ops.setattr,
                        readlink: _e.node_ops.readlink,
                      },
                      stream: {},
                    },
                    chrdev: {
                      node: {
                        getattr: _e.node_ops.getattr,
                        setattr: _e.node_ops.setattr,
                      },
                      stream: Se.chrdev_stream_ops,
                    },
                  };
                  var o = Se.createNode(e, t, r, n);
                  return (
                    Se.isDir(o.mode)
                      ? ((o.node_ops = _e.ops_table.dir.node),
                        (o.stream_ops = _e.ops_table.dir.stream),
                        (o.contents = {}))
                      : Se.isFile(o.mode)
                      ? ((o.node_ops = _e.ops_table.file.node),
                        (o.stream_ops = _e.ops_table.file.stream),
                        (o.usedBytes = 0),
                        (o.contents = null))
                      : Se.isLink(o.mode)
                      ? ((o.node_ops = _e.ops_table.link.node),
                        (o.stream_ops = _e.ops_table.link.stream))
                      : Se.isChrdev(o.mode) &&
                        ((o.node_ops = _e.ops_table.chrdev.node),
                        (o.stream_ops = _e.ops_table.chrdev.stream)),
                    (o.timestamp = Date.now()),
                    e && ((e.contents[t] = o), (e.timestamp = o.timestamp)),
                    o
                  );
                },
                getFileDataAsTypedArray: (e) =>
                  e.contents
                    ? e.contents.subarray
                      ? e.contents.subarray(0, e.usedBytes)
                      : new Uint8Array(e.contents)
                    : new Uint8Array(0),
                expandFileStorage(e, t) {
                  var r = e.contents ? e.contents.length : 0;
                  if (!(r >= t)) {
                    (t = Math.max(t, (r * (r < 1048576 ? 2 : 1.125)) >>> 0)),
                      0 != r && (t = Math.max(t, 256));
                    var n = e.contents;
                    (e.contents = new Uint8Array(t)),
                      e.usedBytes > 0 &&
                        e.contents.set(n.subarray(0, e.usedBytes), 0);
                  }
                },
                resizeFileStorage(e, t) {
                  if (e.usedBytes != t)
                    if (0 == t) (e.contents = null), (e.usedBytes = 0);
                    else {
                      var r = e.contents;
                      (e.contents = new Uint8Array(t)),
                        r &&
                          e.contents.set(
                            r.subarray(0, Math.min(t, e.usedBytes))
                          ),
                        (e.usedBytes = t);
                    }
                },
                node_ops: {
                  getattr(e) {
                    var t = {};
                    return (
                      (t.dev = Se.isChrdev(e.mode) ? e.id : 1),
                      (t.ino = e.id),
                      (t.mode = e.mode),
                      (t.nlink = 1),
                      (t.uid = 0),
                      (t.gid = 0),
                      (t.rdev = e.rdev),
                      Se.isDir(e.mode)
                        ? (t.size = 4096)
                        : Se.isFile(e.mode)
                        ? (t.size = e.usedBytes)
                        : Se.isLink(e.mode)
                        ? (t.size = e.link.length)
                        : (t.size = 0),
                      (t.atime = new Date(e.timestamp)),
                      (t.mtime = new Date(e.timestamp)),
                      (t.ctime = new Date(e.timestamp)),
                      (t.blksize = 4096),
                      (t.blocks = Math.ceil(t.size / t.blksize)),
                      t
                    );
                  },
                  setattr(e, t) {
                    void 0 !== t.mode && (e.mode = t.mode),
                      void 0 !== t.timestamp && (e.timestamp = t.timestamp),
                      void 0 !== t.size && _e.resizeFileStorage(e, t.size);
                  },
                  lookup(e, t) {
                    throw Se.genericErrors[44];
                  },
                  mknod: (e, t, r, n) => _e.createNode(e, t, r, n),
                  rename(e, t, r) {
                    if (Se.isDir(e.mode)) {
                      var n;
                      try {
                        n = Se.lookupNode(t, r);
                      } catch (e) {}
                      if (n)
                        for (var o in n.contents) throw new Se.ErrnoError(55);
                    }
                    delete e.parent.contents[e.name],
                      (e.parent.timestamp = Date.now()),
                      (e.name = r),
                      (t.contents[r] = e),
                      (t.timestamp = e.parent.timestamp),
                      (e.parent = t);
                  },
                  unlink(e, t) {
                    delete e.contents[t], (e.timestamp = Date.now());
                  },
                  rmdir(e, t) {
                    var r = Se.lookupNode(e, t);
                    for (var n in r.contents) throw new Se.ErrnoError(55);
                    delete e.contents[t], (e.timestamp = Date.now());
                  },
                  readdir(e) {
                    var t = [".", ".."];
                    for (var r of Object.keys(e.contents)) t.push(r);
                    return t;
                  },
                  symlink(e, t, r) {
                    var n = _e.createNode(e, t, 41471, 0);
                    return (n.link = r), n;
                  },
                  readlink(e) {
                    if (!Se.isLink(e.mode)) throw new Se.ErrnoError(28);
                    return e.link;
                  },
                },
                stream_ops: {
                  read(e, t, r, n, o) {
                    var i = e.node.contents;
                    if (o >= e.node.usedBytes) return 0;
                    var a = Math.min(e.node.usedBytes - o, n);
                    if (a > 8 && i.subarray) t.set(i.subarray(o, o + a), r);
                    else for (var s = 0; s < a; s++) t[r + s] = i[o + s];
                    return a;
                  },
                  write(e, t, r, n, o, i) {
                    if ((t.buffer === T.buffer && (i = !1), !n)) return 0;
                    var a = e.node;
                    if (
                      ((a.timestamp = Date.now()),
                      t.subarray && (!a.contents || a.contents.subarray))
                    ) {
                      if (i)
                        return (
                          (a.contents = t.subarray(r, r + n)),
                          (a.usedBytes = n),
                          n
                        );
                      if (0 === a.usedBytes && 0 === o)
                        return (
                          (a.contents = t.slice(r, r + n)), (a.usedBytes = n), n
                        );
                      if (o + n <= a.usedBytes)
                        return a.contents.set(t.subarray(r, r + n), o), n;
                    }
                    if (
                      (_e.expandFileStorage(a, o + n),
                      a.contents.subarray && t.subarray)
                    )
                      a.contents.set(t.subarray(r, r + n), o);
                    else
                      for (var s = 0; s < n; s++) a.contents[o + s] = t[r + s];
                    return (a.usedBytes = Math.max(a.usedBytes, o + n)), n;
                  },
                  llseek(e, t, r) {
                    var n = t;
                    if (
                      (1 === r
                        ? (n += e.position)
                        : 2 === r &&
                          Se.isFile(e.node.mode) &&
                          (n += e.node.usedBytes),
                      n < 0)
                    )
                      throw new Se.ErrnoError(28);
                    return n;
                  },
                  allocate(e, t, r) {
                    _e.expandFileStorage(e.node, t + r),
                      (e.node.usedBytes = Math.max(e.node.usedBytes, t + r));
                  },
                  mmap(e, t, r, n, o) {
                    if (!Se.isFile(e.node.mode)) throw new Se.ErrnoError(43);
                    var i,
                      a,
                      s = e.node.contents;
                    if (2 & o || s.buffer !== T.buffer) {
                      if (
                        ((r > 0 || r + t < s.length) &&
                          (s = s.subarray
                            ? s.subarray(r, r + t)
                            : Array.prototype.slice.call(s, r, r + t)),
                        (a = !0),
                        !(i = we(t)))
                      )
                        throw new Se.ErrnoError(48);
                      T.set(s, i);
                    } else (a = !1), (i = s.byteOffset);
                    return { ptr: i, allocated: a };
                  },
                  msync: (e, t, r, n, o) => (
                    _e.stream_ops.write(e, t, 0, n, r, !1), 0
                  ),
                },
              },
              Ee = u.preloadPlugins || [],
              Ce = (e, t) => {
                var r = 0;
                return e && (r |= 365), t && (r |= 146), r;
              },
              Se = {
                root: null,
                mounts: [],
                devices: {},
                streams: [],
                nextInode: 1,
                nameTable: null,
                currentPath: "/",
                initialized: !1,
                ignorePermissions: !0,
                ErrnoError: class {
                  constructor(e) {
                    (this.name = "ErrnoError"), (this.errno = e);
                  }
                },
                genericErrors: {},
                filesystems: null,
                syncFSRequests: 0,
                lookupPath(e, t = {}) {
                  if (!(e = he.resolve(e))) return { path: "", node: null };
                  if (
                    (t = Object.assign(
                      { follow_mount: !0, recurse_count: 0 },
                      t
                    )).recurse_count > 8
                  )
                    throw new Se.ErrnoError(32);
                  for (
                    var r = e.split("/").filter((e) => !!e),
                      n = Se.root,
                      o = "/",
                      i = 0;
                    i < r.length;
                    i++
                  ) {
                    var a = i === r.length - 1;
                    if (a && t.parent) break;
                    if (
                      ((n = Se.lookupNode(n, r[i])),
                      (o = le.join2(o, r[i])),
                      Se.isMountpoint(n) &&
                        (!a || (a && t.follow_mount)) &&
                        (n = n.mounted.root),
                      !a || t.follow)
                    )
                      for (var s = 0; Se.isLink(n.mode); ) {
                        var u = Se.readlink(o);
                        if (
                          ((o = he.resolve(le.dirname(o), u)),
                          (n = Se.lookupPath(o, {
                            recurse_count: t.recurse_count + 1,
                          }).node),
                          s++ > 40)
                        )
                          throw new Se.ErrnoError(32);
                      }
                  }
                  return { path: o, node: n };
                },
                getPath(e) {
                  for (var t; ; ) {
                    if (Se.isRoot(e)) {
                      var r = e.mount.mountpoint;
                      return t
                        ? "/" !== r[r.length - 1]
                          ? `${r}/${t}`
                          : r + t
                        : r;
                    }
                    (t = t ? `${e.name}/${t}` : e.name), (e = e.parent);
                  }
                },
                hashName(e, t) {
                  for (var r = 0, n = 0; n < t.length; n++)
                    r = ((r << 5) - r + t.charCodeAt(n)) | 0;
                  return ((e + r) >>> 0) % Se.nameTable.length;
                },
                hashAddNode(e) {
                  var t = Se.hashName(e.parent.id, e.name);
                  (e.name_next = Se.nameTable[t]), (Se.nameTable[t] = e);
                },
                hashRemoveNode(e) {
                  var t = Se.hashName(e.parent.id, e.name);
                  if (Se.nameTable[t] === e) Se.nameTable[t] = e.name_next;
                  else
                    for (var r = Se.nameTable[t]; r; ) {
                      if (r.name_next === e) {
                        r.name_next = e.name_next;
                        break;
                      }
                      r = r.name_next;
                    }
                },
                lookupNode(e, t) {
                  var r = Se.mayLookup(e);
                  if (r) throw new Se.ErrnoError(r);
                  for (
                    var n = Se.hashName(e.id, t), o = Se.nameTable[n];
                    o;
                    o = o.name_next
                  ) {
                    var i = o.name;
                    if (o.parent.id === e.id && i === t) return o;
                  }
                  return Se.lookup(e, t);
                },
                createNode(e, t, r, n) {
                  var o = new Se.FSNode(e, t, r, n);
                  return Se.hashAddNode(o), o;
                },
                destroyNode(e) {
                  Se.hashRemoveNode(e);
                },
                isRoot: (e) => e === e.parent,
                isMountpoint: (e) => !!e.mounted,
                isFile: (e) => 32768 == (61440 & e),
                isDir: (e) => 16384 == (61440 & e),
                isLink: (e) => 40960 == (61440 & e),
                isChrdev: (e) => 8192 == (61440 & e),
                isBlkdev: (e) => 24576 == (61440 & e),
                isFIFO: (e) => 4096 == (61440 & e),
                isSocket: (e) => 49152 == (49152 & e),
                flagsToPermissionString(e) {
                  var t = ["r", "w", "rw"][3 & e];
                  return 512 & e && (t += "w"), t;
                },
                nodePermissions: (e, t) =>
                  Se.ignorePermissions ||
                  ((!t.includes("r") || 292 & e.mode) &&
                    (!t.includes("w") || 146 & e.mode) &&
                    (!t.includes("x") || 73 & e.mode))
                    ? 0
                    : 2,
                mayLookup(e) {
                  if (!Se.isDir(e.mode)) return 54;
                  var t = Se.nodePermissions(e, "x");
                  return t || (e.node_ops.lookup ? 0 : 2);
                },
                mayCreate(e, t) {
                  try {
                    return Se.lookupNode(e, t), 20;
                  } catch (e) {}
                  return Se.nodePermissions(e, "wx");
                },
                mayDelete(e, t, r) {
                  var n;
                  try {
                    n = Se.lookupNode(e, t);
                  } catch (e) {
                    return e.errno;
                  }
                  var o = Se.nodePermissions(e, "wx");
                  if (o) return o;
                  if (r) {
                    if (!Se.isDir(n.mode)) return 54;
                    if (Se.isRoot(n) || Se.getPath(n) === Se.cwd()) return 10;
                  } else if (Se.isDir(n.mode)) return 31;
                  return 0;
                },
                mayOpen: (e, t) =>
                  e
                    ? Se.isLink(e.mode)
                      ? 32
                      : Se.isDir(e.mode) &&
                        ("r" !== Se.flagsToPermissionString(t) || 512 & t)
                      ? 31
                      : Se.nodePermissions(e, Se.flagsToPermissionString(t))
                    : 44,
                MAX_OPEN_FDS: 4096,
                nextfd() {
                  for (var e = 0; e <= Se.MAX_OPEN_FDS; e++)
                    if (!Se.streams[e]) return e;
                  throw new Se.ErrnoError(33);
                },
                getStreamChecked(e) {
                  var t = Se.getStream(e);
                  if (!t) throw new Se.ErrnoError(8);
                  return t;
                },
                getStream: (e) => Se.streams[e],
                createStream: (e, t = -1) => (
                  Se.FSStream ||
                    ((Se.FSStream = function () {
                      this.shared = {};
                    }),
                    (Se.FSStream.prototype = {}),
                    Object.defineProperties(Se.FSStream.prototype, {
                      object: {
                        get() {
                          return this.node;
                        },
                        set(e) {
                          this.node = e;
                        },
                      },
                      isRead: {
                        get() {
                          return 1 != (2097155 & this.flags);
                        },
                      },
                      isWrite: {
                        get() {
                          return 0 != (2097155 & this.flags);
                        },
                      },
                      isAppend: {
                        get() {
                          return 1024 & this.flags;
                        },
                      },
                      flags: {
                        get() {
                          return this.shared.flags;
                        },
                        set(e) {
                          this.shared.flags = e;
                        },
                      },
                      position: {
                        get() {
                          return this.shared.position;
                        },
                        set(e) {
                          this.shared.position = e;
                        },
                      },
                    })),
                  (e = Object.assign(new Se.FSStream(), e)),
                  -1 == t && (t = Se.nextfd()),
                  (e.fd = t),
                  (Se.streams[t] = e),
                  e
                ),
                closeStream(e) {
                  Se.streams[e] = null;
                },
                chrdev_stream_ops: {
                  open(e) {
                    var t = Se.getDevice(e.node.rdev);
                    (e.stream_ops = t.stream_ops), e.stream_ops.open?.(e);
                  },
                  llseek() {
                    throw new Se.ErrnoError(70);
                  },
                },
                major: (e) => e >> 8,
                minor: (e) => 255 & e,
                makedev: (e, t) => (e << 8) | t,
                registerDevice(e, t) {
                  Se.devices[e] = { stream_ops: t };
                },
                getDevice: (e) => Se.devices[e],
                getMounts(e) {
                  for (var t = [], r = [e]; r.length; ) {
                    var n = r.pop();
                    t.push(n), r.push.apply(r, n.mounts);
                  }
                  return t;
                },
                syncfs(e, t) {
                  "function" == typeof e && ((t = e), (e = !1)),
                    Se.syncFSRequests++,
                    Se.syncFSRequests > 1 &&
                      k(
                        `warning: ${Se.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`
                      );
                  var r = Se.getMounts(Se.root.mount),
                    n = 0;
                  function o(e) {
                    return Se.syncFSRequests--, t(e);
                  }
                  function i(e) {
                    if (e) return i.errored ? void 0 : ((i.errored = !0), o(e));
                    ++n >= r.length && o(null);
                  }
                  r.forEach((t) => {
                    if (!t.type.syncfs) return i(null);
                    t.type.syncfs(t, e, i);
                  });
                },
                mount(e, t, r) {
                  var n,
                    o = "/" === r,
                    i = !r;
                  if (o && Se.root) throw new Se.ErrnoError(10);
                  if (!o && !i) {
                    var a = Se.lookupPath(r, { follow_mount: !1 });
                    if (((r = a.path), (n = a.node), Se.isMountpoint(n)))
                      throw new Se.ErrnoError(10);
                    if (!Se.isDir(n.mode)) throw new Se.ErrnoError(54);
                  }
                  var s = { type: e, opts: t, mountpoint: r, mounts: [] },
                    u = e.mount(s);
                  return (
                    (u.mount = s),
                    (s.root = u),
                    o
                      ? (Se.root = u)
                      : n &&
                        ((n.mounted = s), n.mount && n.mount.mounts.push(s)),
                    u
                  );
                },
                unmount(e) {
                  var t = Se.lookupPath(e, { follow_mount: !1 });
                  if (!Se.isMountpoint(t.node)) throw new Se.ErrnoError(28);
                  var r = t.node,
                    n = r.mounted,
                    o = Se.getMounts(n);
                  Object.keys(Se.nameTable).forEach((e) => {
                    for (var t = Se.nameTable[e]; t; ) {
                      var r = t.name_next;
                      o.includes(t.mount) && Se.destroyNode(t), (t = r);
                    }
                  }),
                    (r.mounted = null);
                  var i = r.mount.mounts.indexOf(n);
                  r.mount.mounts.splice(i, 1);
                },
                lookup: (e, t) => e.node_ops.lookup(e, t),
                mknod(e, t, r) {
                  var n = Se.lookupPath(e, { parent: !0 }).node,
                    o = le.basename(e);
                  if (!o || "." === o || ".." === o)
                    throw new Se.ErrnoError(28);
                  var i = Se.mayCreate(n, o);
                  if (i) throw new Se.ErrnoError(i);
                  if (!n.node_ops.mknod) throw new Se.ErrnoError(63);
                  return n.node_ops.mknod(n, o, t, r);
                },
                create: (e, t) => (
                  (t = void 0 !== t ? t : 438),
                  (t &= 4095),
                  (t |= 32768),
                  Se.mknod(e, t, 0)
                ),
                mkdir: (e, t) => (
                  (t = void 0 !== t ? t : 511),
                  (t &= 1023),
                  (t |= 16384),
                  Se.mknod(e, t, 0)
                ),
                mkdirTree(e, t) {
                  for (var r = e.split("/"), n = "", o = 0; o < r.length; ++o)
                    if (r[o]) {
                      n += "/" + r[o];
                      try {
                        Se.mkdir(n, t);
                      } catch (e) {
                        if (20 != e.errno) throw e;
                      }
                    }
                },
                mkdev: (e, t, r) => (
                  void 0 === r && ((r = t), (t = 438)),
                  (t |= 8192),
                  Se.mknod(e, t, r)
                ),
                symlink(e, t) {
                  if (!he.resolve(e)) throw new Se.ErrnoError(44);
                  var r = Se.lookupPath(t, { parent: !0 }).node;
                  if (!r) throw new Se.ErrnoError(44);
                  var n = le.basename(t),
                    o = Se.mayCreate(r, n);
                  if (o) throw new Se.ErrnoError(o);
                  if (!r.node_ops.symlink) throw new Se.ErrnoError(63);
                  return r.node_ops.symlink(r, n, e);
                },
                rename(e, t) {
                  var r,
                    n,
                    o = le.dirname(e),
                    i = le.dirname(t),
                    a = le.basename(e),
                    s = le.basename(t);
                  if (
                    ((r = Se.lookupPath(e, { parent: !0 }).node),
                    (n = Se.lookupPath(t, { parent: !0 }).node),
                    !r || !n)
                  )
                    throw new Se.ErrnoError(44);
                  if (r.mount !== n.mount) throw new Se.ErrnoError(75);
                  var u,
                    c = Se.lookupNode(r, a),
                    l = he.relative(e, i);
                  if ("." !== l.charAt(0)) throw new Se.ErrnoError(28);
                  if ("." !== (l = he.relative(t, o)).charAt(0))
                    throw new Se.ErrnoError(55);
                  try {
                    u = Se.lookupNode(n, s);
                  } catch (e) {}
                  if (c !== u) {
                    var d = Se.isDir(c.mode),
                      h = Se.mayDelete(r, a, d);
                    if (h) throw new Se.ErrnoError(h);
                    if ((h = u ? Se.mayDelete(n, s, d) : Se.mayCreate(n, s)))
                      throw new Se.ErrnoError(h);
                    if (!r.node_ops.rename) throw new Se.ErrnoError(63);
                    if (Se.isMountpoint(c) || (u && Se.isMountpoint(u)))
                      throw new Se.ErrnoError(10);
                    if (n !== r && (h = Se.nodePermissions(r, "w")))
                      throw new Se.ErrnoError(h);
                    Se.hashRemoveNode(c);
                    try {
                      r.node_ops.rename(c, n, s);
                    } catch (e) {
                      throw e;
                    } finally {
                      Se.hashAddNode(c);
                    }
                  }
                },
                rmdir(e) {
                  var t = Se.lookupPath(e, { parent: !0 }).node,
                    r = le.basename(e),
                    n = Se.lookupNode(t, r),
                    o = Se.mayDelete(t, r, !0);
                  if (o) throw new Se.ErrnoError(o);
                  if (!t.node_ops.rmdir) throw new Se.ErrnoError(63);
                  if (Se.isMountpoint(n)) throw new Se.ErrnoError(10);
                  t.node_ops.rmdir(t, r), Se.destroyNode(n);
                },
                readdir(e) {
                  var t = Se.lookupPath(e, { follow: !0 }).node;
                  if (!t.node_ops.readdir) throw new Se.ErrnoError(54);
                  return t.node_ops.readdir(t);
                },
                unlink(e) {
                  var t = Se.lookupPath(e, { parent: !0 }).node;
                  if (!t) throw new Se.ErrnoError(44);
                  var r = le.basename(e),
                    n = Se.lookupNode(t, r),
                    o = Se.mayDelete(t, r, !1);
                  if (o) throw new Se.ErrnoError(o);
                  if (!t.node_ops.unlink) throw new Se.ErrnoError(63);
                  if (Se.isMountpoint(n)) throw new Se.ErrnoError(10);
                  t.node_ops.unlink(t, r), Se.destroyNode(n);
                },
                readlink(e) {
                  var t = Se.lookupPath(e).node;
                  if (!t) throw new Se.ErrnoError(44);
                  if (!t.node_ops.readlink) throw new Se.ErrnoError(28);
                  return he.resolve(
                    Se.getPath(t.parent),
                    t.node_ops.readlink(t)
                  );
                },
                stat(e, t) {
                  var r = Se.lookupPath(e, { follow: !t }).node;
                  if (!r) throw new Se.ErrnoError(44);
                  if (!r.node_ops.getattr) throw new Se.ErrnoError(63);
                  return r.node_ops.getattr(r);
                },
                lstat: (e) => Se.stat(e, !0),
                chmod(e, t, r) {
                  var n;
                  if (
                    !(n =
                      "string" == typeof e
                        ? Se.lookupPath(e, { follow: !r }).node
                        : e).node_ops.setattr
                  )
                    throw new Se.ErrnoError(63);
                  n.node_ops.setattr(n, {
                    mode: (4095 & t) | (-4096 & n.mode),
                    timestamp: Date.now(),
                  });
                },
                lchmod(e, t) {
                  Se.chmod(e, t, !0);
                },
                fchmod(e, t) {
                  var r = Se.getStreamChecked(e);
                  Se.chmod(r.node, t);
                },
                chown(e, t, r, n) {
                  var o;
                  if (
                    !(o =
                      "string" == typeof e
                        ? Se.lookupPath(e, { follow: !n }).node
                        : e).node_ops.setattr
                  )
                    throw new Se.ErrnoError(63);
                  o.node_ops.setattr(o, { timestamp: Date.now() });
                },
                lchown(e, t, r) {
                  Se.chown(e, t, r, !0);
                },
                fchown(e, t, r) {
                  var n = Se.getStreamChecked(e);
                  Se.chown(n.node, t, r);
                },
                truncate(e, t) {
                  if (t < 0) throw new Se.ErrnoError(28);
                  var r;
                  if (
                    !(r =
                      "string" == typeof e
                        ? Se.lookupPath(e, { follow: !0 }).node
                        : e).node_ops.setattr
                  )
                    throw new Se.ErrnoError(63);
                  if (Se.isDir(r.mode)) throw new Se.ErrnoError(31);
                  if (!Se.isFile(r.mode)) throw new Se.ErrnoError(28);
                  var n = Se.nodePermissions(r, "w");
                  if (n) throw new Se.ErrnoError(n);
                  r.node_ops.setattr(r, { size: t, timestamp: Date.now() });
                },
                ftruncate(e, t) {
                  var r = Se.getStreamChecked(e);
                  if (0 == (2097155 & r.flags)) throw new Se.ErrnoError(28);
                  Se.truncate(r.node, t);
                },
                utime(e, t, r) {
                  var n = Se.lookupPath(e, { follow: !0 }).node;
                  n.node_ops.setattr(n, { timestamp: Math.max(t, r) });
                },
                open(e, t, r) {
                  if ("" === e) throw new Se.ErrnoError(44);
                  var n;
                  if (
                    ((r = void 0 === r ? 438 : r),
                    (r =
                      64 &
                      (t =
                        "string" == typeof t
                          ? ((e) => {
                              var t = {
                                r: 0,
                                "r+": 2,
                                w: 577,
                                "w+": 578,
                                a: 1089,
                                "a+": 1090,
                              }[e];
                              if (void 0 === t)
                                throw new Error(`Unknown file open mode: ${e}`);
                              return t;
                            })(t)
                          : t)
                        ? (4095 & r) | 32768
                        : 0),
                    "object" == typeof e)
                  )
                    n = e;
                  else {
                    e = le.normalize(e);
                    try {
                      n = Se.lookupPath(e, { follow: !(131072 & t) }).node;
                    } catch (e) {}
                  }
                  var o = !1;
                  if (64 & t)
                    if (n) {
                      if (128 & t) throw new Se.ErrnoError(20);
                    } else (n = Se.mknod(e, r, 0)), (o = !0);
                  if (!n) throw new Se.ErrnoError(44);
                  if (
                    (Se.isChrdev(n.mode) && (t &= -513),
                    65536 & t && !Se.isDir(n.mode))
                  )
                    throw new Se.ErrnoError(54);
                  if (!o) {
                    var i = Se.mayOpen(n, t);
                    if (i) throw new Se.ErrnoError(i);
                  }
                  512 & t && !o && Se.truncate(n, 0), (t &= -131713);
                  var a = Se.createStream({
                    node: n,
                    path: Se.getPath(n),
                    flags: t,
                    seekable: !0,
                    position: 0,
                    stream_ops: n.stream_ops,
                    ungotten: [],
                    error: !1,
                  });
                  return (
                    a.stream_ops.open && a.stream_ops.open(a),
                    !u.logReadFiles ||
                      1 & t ||
                      (Se.readFiles || (Se.readFiles = {}),
                      e in Se.readFiles || (Se.readFiles[e] = 1)),
                    a
                  );
                },
                close(e) {
                  if (Se.isClosed(e)) throw new Se.ErrnoError(8);
                  e.getdents && (e.getdents = null);
                  try {
                    e.stream_ops.close && e.stream_ops.close(e);
                  } catch (e) {
                    throw e;
                  } finally {
                    Se.closeStream(e.fd);
                  }
                  e.fd = null;
                },
                isClosed: (e) => null === e.fd,
                llseek(e, t, r) {
                  if (Se.isClosed(e)) throw new Se.ErrnoError(8);
                  if (!e.seekable || !e.stream_ops.llseek)
                    throw new Se.ErrnoError(70);
                  if (0 != r && 1 != r && 2 != r) throw new Se.ErrnoError(28);
                  return (
                    (e.position = e.stream_ops.llseek(e, t, r)),
                    (e.ungotten = []),
                    e.position
                  );
                },
                read(e, t, r, n, o) {
                  if (n < 0 || o < 0) throw new Se.ErrnoError(28);
                  if (Se.isClosed(e)) throw new Se.ErrnoError(8);
                  if (1 == (2097155 & e.flags)) throw new Se.ErrnoError(8);
                  if (Se.isDir(e.node.mode)) throw new Se.ErrnoError(31);
                  if (!e.stream_ops.read) throw new Se.ErrnoError(28);
                  var i = void 0 !== o;
                  if (i) {
                    if (!e.seekable) throw new Se.ErrnoError(70);
                  } else o = e.position;
                  var a = e.stream_ops.read(e, t, r, n, o);
                  return i || (e.position += a), a;
                },
                write(e, t, r, n, o, i) {
                  if (n < 0 || o < 0) throw new Se.ErrnoError(28);
                  if (Se.isClosed(e)) throw new Se.ErrnoError(8);
                  if (0 == (2097155 & e.flags)) throw new Se.ErrnoError(8);
                  if (Se.isDir(e.node.mode)) throw new Se.ErrnoError(31);
                  if (!e.stream_ops.write) throw new Se.ErrnoError(28);
                  e.seekable && 1024 & e.flags && Se.llseek(e, 0, 2);
                  var a = void 0 !== o;
                  if (a) {
                    if (!e.seekable) throw new Se.ErrnoError(70);
                  } else o = e.position;
                  var s = e.stream_ops.write(e, t, r, n, o, i);
                  return a || (e.position += s), s;
                },
                allocate(e, t, r) {
                  if (Se.isClosed(e)) throw new Se.ErrnoError(8);
                  if (t < 0 || r <= 0) throw new Se.ErrnoError(28);
                  if (0 == (2097155 & e.flags)) throw new Se.ErrnoError(8);
                  if (!Se.isFile(e.node.mode) && !Se.isDir(e.node.mode))
                    throw new Se.ErrnoError(43);
                  if (!e.stream_ops.allocate) throw new Se.ErrnoError(138);
                  e.stream_ops.allocate(e, t, r);
                },
                mmap(e, t, r, n, o) {
                  if (0 != (2 & n) && 0 == (2 & o) && 2 != (2097155 & e.flags))
                    throw new Se.ErrnoError(2);
                  if (1 == (2097155 & e.flags)) throw new Se.ErrnoError(2);
                  if (!e.stream_ops.mmap) throw new Se.ErrnoError(43);
                  return e.stream_ops.mmap(e, t, r, n, o);
                },
                msync: (e, t, r, n, o) =>
                  e.stream_ops.msync ? e.stream_ops.msync(e, t, r, n, o) : 0,
                munmap: (e) => 0,
                ioctl(e, t, r) {
                  if (!e.stream_ops.ioctl) throw new Se.ErrnoError(59);
                  return e.stream_ops.ioctl(e, t, r);
                },
                readFile(e, t = {}) {
                  if (
                    ((t.flags = t.flags || 0),
                    (t.encoding = t.encoding || "binary"),
                    "utf8" !== t.encoding && "binary" !== t.encoding)
                  )
                    throw new Error(`Invalid encoding type "${t.encoding}"`);
                  var r,
                    n = Se.open(e, t.flags),
                    o = Se.stat(e).size,
                    i = new Uint8Array(o);
                  return (
                    Se.read(n, i, 0, o, 0),
                    "utf8" === t.encoding
                      ? (r = pe(i, 0))
                      : "binary" === t.encoding && (r = i),
                    Se.close(n),
                    r
                  );
                },
                writeFile(e, t, r = {}) {
                  r.flags = r.flags || 577;
                  var n = Se.open(e, r.flags, r.mode);
                  if ("string" == typeof t) {
                    var o = new Uint8Array(ge(t) + 1),
                      i = ve(t, o, 0, o.length);
                    Se.write(n, o, 0, i, void 0, r.canOwn);
                  } else {
                    if (!ArrayBuffer.isView(t))
                      throw new Error("Unsupported data type");
                    Se.write(n, t, 0, t.byteLength, void 0, r.canOwn);
                  }
                  Se.close(n);
                },
                cwd: () => Se.currentPath,
                chdir(e) {
                  var t = Se.lookupPath(e, { follow: !0 });
                  if (null === t.node) throw new Se.ErrnoError(44);
                  if (!Se.isDir(t.node.mode)) throw new Se.ErrnoError(54);
                  var r = Se.nodePermissions(t.node, "x");
                  if (r) throw new Se.ErrnoError(r);
                  Se.currentPath = t.path;
                },
                createDefaultDirectories() {
                  Se.mkdir("/tmp"),
                    Se.mkdir("/home"),
                    Se.mkdir("/home/web_user");
                },
                createDefaultDevices() {
                  Se.mkdir("/dev"),
                    Se.registerDevice(Se.makedev(1, 3), {
                      read: () => 0,
                      write: (e, t, r, n, o) => n,
                    }),
                    Se.mkdev("/dev/null", Se.makedev(1, 3)),
                    be.register(Se.makedev(5, 0), be.default_tty_ops),
                    be.register(Se.makedev(6, 0), be.default_tty1_ops),
                    Se.mkdev("/dev/tty", Se.makedev(5, 0)),
                    Se.mkdev("/dev/tty1", Se.makedev(6, 0));
                  var e = new Uint8Array(1024),
                    t = 0,
                    r = () => (0 === t && (t = de(e).byteLength), e[--t]);
                  Se.createDevice("/dev", "random", r),
                    Se.createDevice("/dev", "urandom", r),
                    Se.mkdir("/dev/shm"),
                    Se.mkdir("/dev/shm/tmp");
                },
                createSpecialDirectories() {
                  Se.mkdir("/proc");
                  var e = Se.mkdir("/proc/self");
                  Se.mkdir("/proc/self/fd"),
                    Se.mount(
                      {
                        mount() {
                          var t = Se.createNode(e, "fd", 16895, 73);
                          return (
                            (t.node_ops = {
                              lookup(e, t) {
                                var r = +t,
                                  n = Se.getStreamChecked(r),
                                  o = {
                                    parent: null,
                                    mount: { mountpoint: "fake" },
                                    node_ops: { readlink: () => n.path },
                                  };
                                return (o.parent = o), o;
                              },
                            }),
                            t
                          );
                        },
                      },
                      {},
                      "/proc/self/fd"
                    );
                },
                createStandardStreams() {
                  u.stdin
                    ? Se.createDevice("/dev", "stdin", u.stdin)
                    : Se.symlink("/dev/tty", "/dev/stdin"),
                    u.stdout
                      ? Se.createDevice("/dev", "stdout", null, u.stdout)
                      : Se.symlink("/dev/tty", "/dev/stdout"),
                    u.stderr
                      ? Se.createDevice("/dev", "stderr", null, u.stderr)
                      : Se.symlink("/dev/tty1", "/dev/stderr"),
                    Se.open("/dev/stdin", 0),
                    Se.open("/dev/stdout", 1),
                    Se.open("/dev/stderr", 1);
                },
                staticInit() {
                  [44].forEach((e) => {
                    (Se.genericErrors[e] = new Se.ErrnoError(e)),
                      (Se.genericErrors[e].stack = "<generic error, no stack>");
                  }),
                    (Se.nameTable = new Array(4096)),
                    Se.mount(_e, {}, "/"),
                    Se.createDefaultDirectories(),
                    Se.createDefaultDevices(),
                    Se.createSpecialDirectories(),
                    (Se.filesystems = { MEMFS: _e });
                },
                init(e, t, r) {
                  (Se.init.initialized = !0),
                    (u.stdin = e || u.stdin),
                    (u.stdout = t || u.stdout),
                    (u.stderr = r || u.stderr),
                    Se.createStandardStreams();
                },
                quit() {
                  Se.init.initialized = !1;
                  for (var e = 0; e < Se.streams.length; e++) {
                    var t = Se.streams[e];
                    t && Se.close(t);
                  }
                },
                findObject(e, t) {
                  var r = Se.analyzePath(e, t);
                  return r.exists ? r.object : null;
                },
                analyzePath(e, t) {
                  try {
                    e = (n = Se.lookupPath(e, { follow: !t })).path;
                  } catch (e) {}
                  var r = {
                    isRoot: !1,
                    exists: !1,
                    error: 0,
                    name: null,
                    path: null,
                    object: null,
                    parentExists: !1,
                    parentPath: null,
                    parentObject: null,
                  };
                  try {
                    var n = Se.lookupPath(e, { parent: !0 });
                    (r.parentExists = !0),
                      (r.parentPath = n.path),
                      (r.parentObject = n.node),
                      (r.name = le.basename(e)),
                      (n = Se.lookupPath(e, { follow: !t })),
                      (r.exists = !0),
                      (r.path = n.path),
                      (r.object = n.node),
                      (r.name = n.node.name),
                      (r.isRoot = "/" === n.path);
                  } catch (e) {
                    r.error = e.errno;
                  }
                  return r;
                },
                createPath(e, t, r, n) {
                  e = "string" == typeof e ? e : Se.getPath(e);
                  for (var o = t.split("/").reverse(); o.length; ) {
                    var i = o.pop();
                    if (i) {
                      var a = le.join2(e, i);
                      try {
                        Se.mkdir(a);
                      } catch (e) {}
                      e = a;
                    }
                  }
                  return a;
                },
                createFile(e, t, r, n, o) {
                  var i = le.join2("string" == typeof e ? e : Se.getPath(e), t),
                    a = Ce(n, o);
                  return Se.create(i, a);
                },
                createDataFile(e, t, r, n, o, i) {
                  var a = t;
                  e &&
                    ((e = "string" == typeof e ? e : Se.getPath(e)),
                    (a = t ? le.join2(e, t) : e));
                  var s = Ce(n, o),
                    u = Se.create(a, s);
                  if (r) {
                    if ("string" == typeof r) {
                      for (
                        var c = new Array(r.length), l = 0, d = r.length;
                        l < d;
                        ++l
                      )
                        c[l] = r.charCodeAt(l);
                      r = c;
                    }
                    Se.chmod(u, 146 | s);
                    var h = Se.open(u, 577);
                    Se.write(h, r, 0, r.length, 0, i),
                      Se.close(h),
                      Se.chmod(u, s);
                  }
                },
                createDevice(e, t, r, n) {
                  var o = le.join2("string" == typeof e ? e : Se.getPath(e), t),
                    i = Ce(!!r, !!n);
                  Se.createDevice.major || (Se.createDevice.major = 64);
                  var a = Se.makedev(Se.createDevice.major++, 0);
                  return (
                    Se.registerDevice(a, {
                      open(e) {
                        e.seekable = !1;
                      },
                      close(e) {
                        n?.buffer?.length && n(10);
                      },
                      read(e, t, n, o, i) {
                        for (var a = 0, s = 0; s < o; s++) {
                          var u;
                          try {
                            u = r();
                          } catch (e) {
                            throw new Se.ErrnoError(29);
                          }
                          if (void 0 === u && 0 === a)
                            throw new Se.ErrnoError(6);
                          if (null == u) break;
                          a++, (t[n + s] = u);
                        }
                        return a && (e.node.timestamp = Date.now()), a;
                      },
                      write(e, t, r, o, i) {
                        for (var a = 0; a < o; a++)
                          try {
                            n(t[r + a]);
                          } catch (e) {
                            throw new Se.ErrnoError(29);
                          }
                        return o && (e.node.timestamp = Date.now()), a;
                      },
                    }),
                    Se.mkdev(o, i, a)
                  );
                },
                forceLoadFile(e) {
                  if (e.isDevice || e.isFolder || e.link || e.contents)
                    return !0;
                  if ("undefined" != typeof XMLHttpRequest)
                    throw new Error(
                      "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
                    );
                  if (!c)
                    throw new Error(
                      "Cannot load without read() or XMLHttpRequest."
                    );
                  try {
                    (e.contents = ye(c(e.url), !0)),
                      (e.usedBytes = e.contents.length);
                  } catch (e) {
                    throw new Se.ErrnoError(29);
                  }
                },
                createLazyFile(e, t, r, n, o) {
                  function i() {
                    (this.lengthKnown = !1), (this.chunks = []);
                  }
                  if (
                    ((i.prototype.get = function (e) {
                      if (!(e > this.length - 1 || e < 0)) {
                        var t = e % this.chunkSize,
                          r = (e / this.chunkSize) | 0;
                        return this.getter(r)[t];
                      }
                    }),
                    (i.prototype.setDataGetter = function (e) {
                      this.getter = e;
                    }),
                    (i.prototype.cacheLength = function () {
                      var e = new XMLHttpRequest();
                      if (
                        (e.open("HEAD", r, !1),
                        e.send(null),
                        !(
                          (e.status >= 200 && e.status < 300) ||
                          304 === e.status
                        ))
                      )
                        throw new Error(
                          "Couldn't load " + r + ". Status: " + e.status
                        );
                      var t,
                        n = Number(e.getResponseHeader("Content-length")),
                        o =
                          (t = e.getResponseHeader("Accept-Ranges")) &&
                          "bytes" === t,
                        i =
                          (t = e.getResponseHeader("Content-Encoding")) &&
                          "gzip" === t,
                        a = 1048576;
                      o || (a = n);
                      var s = this;
                      s.setDataGetter((e) => {
                        var t = e * a,
                          o = (e + 1) * a - 1;
                        if (
                          ((o = Math.min(o, n - 1)),
                          void 0 === s.chunks[e] &&
                            (s.chunks[e] = ((e, t) => {
                              if (e > t)
                                throw new Error(
                                  "invalid range (" +
                                    e +
                                    ", " +
                                    t +
                                    ") or no bytes requested!"
                                );
                              if (t > n - 1)
                                throw new Error(
                                  "only " +
                                    n +
                                    " bytes available! programmer error!"
                                );
                              var o = new XMLHttpRequest();
                              if (
                                (o.open("GET", r, !1),
                                n !== a &&
                                  o.setRequestHeader(
                                    "Range",
                                    "bytes=" + e + "-" + t
                                  ),
                                (o.responseType = "arraybuffer"),
                                o.overrideMimeType &&
                                  o.overrideMimeType(
                                    "text/plain; charset=x-user-defined"
                                  ),
                                o.send(null),
                                !(
                                  (o.status >= 200 && o.status < 300) ||
                                  304 === o.status
                                ))
                              )
                                throw new Error(
                                  "Couldn't load " + r + ". Status: " + o.status
                                );
                              return void 0 !== o.response
                                ? new Uint8Array(o.response || [])
                                : ye(o.responseText || "", !0);
                            })(t, o)),
                          void 0 === s.chunks[e])
                        )
                          throw new Error("doXHR failed!");
                        return s.chunks[e];
                      }),
                        (!i && n) ||
                          ((a = n = 1),
                          (n = this.getter(0).length),
                          (a = n),
                          S(
                            "LazyFiles on gzip forces download of the whole file when length is accessed"
                          )),
                        (this._length = n),
                        (this._chunkSize = a),
                        (this.lengthKnown = !0);
                    }),
                    "undefined" != typeof XMLHttpRequest)
                  ) {
                    if (!v)
                      throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                    var a = new i();
                    Object.defineProperties(a, {
                      length: {
                        get: function () {
                          return (
                            this.lengthKnown || this.cacheLength(), this._length
                          );
                        },
                      },
                      chunkSize: {
                        get: function () {
                          return (
                            this.lengthKnown || this.cacheLength(),
                            this._chunkSize
                          );
                        },
                      },
                    });
                    var s = { isDevice: !1, contents: a };
                  } else s = { isDevice: !1, url: r };
                  var u = Se.createFile(e, t, s, n, o);
                  s.contents
                    ? (u.contents = s.contents)
                    : s.url && ((u.contents = null), (u.url = s.url)),
                    Object.defineProperties(u, {
                      usedBytes: {
                        get: function () {
                          return this.contents.length;
                        },
                      },
                    });
                  var c = {};
                  function l(e, t, r, n, o) {
                    var i = e.node.contents;
                    if (o >= i.length) return 0;
                    var a = Math.min(i.length - o, n);
                    if (i.slice)
                      for (var s = 0; s < a; s++) t[r + s] = i[o + s];
                    else for (s = 0; s < a; s++) t[r + s] = i.get(o + s);
                    return a;
                  }
                  return (
                    Object.keys(u.stream_ops).forEach((e) => {
                      var t = u.stream_ops[e];
                      c[e] = function () {
                        return Se.forceLoadFile(u), t.apply(null, arguments);
                      };
                    }),
                    (c.read = (e, t, r, n, o) => (
                      Se.forceLoadFile(u), l(e, t, r, n, o)
                    )),
                    (c.mmap = (e, t, r, n, o) => {
                      Se.forceLoadFile(u);
                      var i = we(t);
                      if (!i) throw new Se.ErrnoError(48);
                      return l(e, T, i, t, r), { ptr: i, allocated: !0 };
                    }),
                    (u.stream_ops = c),
                    u
                  );
                },
              },
              ke = (e, t) => (e ? pe(A, e, t) : ""),
              xe = {
                DEFAULT_POLLMASK: 5,
                calculateAt(e, t, r) {
                  if (le.isAbs(t)) return t;
                  var n;
                  if (
                    ((n = -100 === e ? Se.cwd() : xe.getStreamFromFD(e).path),
                    0 == t.length)
                  ) {
                    if (!r) throw new Se.ErrnoError(44);
                    return n;
                  }
                  return le.join2(n, t);
                },
                doStat(e, t, r) {
                  var n = e(t);
                  (L[r >> 2] = n.dev),
                    (L[(r + 4) >> 2] = n.mode),
                    (R[(r + 8) >> 2] = n.nlink),
                    (L[(r + 12) >> 2] = n.uid),
                    (L[(r + 16) >> 2] = n.gid),
                    (L[(r + 20) >> 2] = n.rdev),
                    (D[(r + 24) >> 3] = BigInt(n.size)),
                    (L[(r + 32) >> 2] = 4096),
                    (L[(r + 36) >> 2] = n.blocks);
                  var o = n.atime.getTime(),
                    i = n.mtime.getTime(),
                    a = n.ctime.getTime();
                  return (
                    (D[(r + 40) >> 3] = BigInt(Math.floor(o / 1e3))),
                    (R[(r + 48) >> 2] = (o % 1e3) * 1e3),
                    (D[(r + 56) >> 3] = BigInt(Math.floor(i / 1e3))),
                    (R[(r + 64) >> 2] = (i % 1e3) * 1e3),
                    (D[(r + 72) >> 3] = BigInt(Math.floor(a / 1e3))),
                    (R[(r + 80) >> 2] = (a % 1e3) * 1e3),
                    (D[(r + 88) >> 3] = BigInt(n.ino)),
                    0
                  );
                },
                doMsync(e, t, r, n, o) {
                  if (!Se.isFile(t.node.mode)) throw new Se.ErrnoError(43);
                  if (2 & n) return 0;
                  var i = A.slice(e, e + r);
                  Se.msync(t, i, o, r, n);
                },
                varargs: void 0,
                get() {
                  var e = L[+xe.varargs >> 2];
                  return (xe.varargs += 4), e;
                },
                getp: () => xe.get(),
                getStr: (e) => ke(e),
                getStreamFromFD: (e) => Se.getStreamChecked(e),
              },
              Te = {},
              Ae = (e) => {
                for (; e.length; ) {
                  var t = e.pop();
                  e.pop()(t);
                }
              };
            function Pe(e) {
              return this.fromWireType(L[e >> 2]);
            }
            var Fe,
              Le,
              Re,
              Be = {},
              De = {},
              Me = {},
              Oe = (e) => {
                throw new Fe(e);
              },
              Ie = (e, t, r) => {
                function n(t) {
                  var n = r(t);
                  n.length !== e.length &&
                    Oe("Mismatched type converter count");
                  for (var o = 0; o < e.length; ++o) He(e[o], n[o]);
                }
                e.forEach(function (e) {
                  Me[e] = t;
                });
                var o = new Array(t.length),
                  i = [],
                  a = 0;
                t.forEach((e, t) => {
                  De.hasOwnProperty(e)
                    ? (o[t] = De[e])
                    : (i.push(e),
                      Be.hasOwnProperty(e) || (Be[e] = []),
                      Be[e].push(() => {
                        (o[t] = De[e]), ++a === i.length && n(o);
                      }));
                }),
                  0 === i.length && n(o);
              },
              je = {},
              Ue = (e) => {
                if (null === e) return "null";
                var t = typeof e;
                return "object" === t || "array" === t || "function" === t
                  ? e.toString()
                  : "" + e;
              },
              $e = (e) => {
                for (var t = "", r = e; A[r]; ) t += Le[A[r++]];
                return t;
              },
              qe = (e) => {
                throw new Re(e);
              };
            function He(e, t, r = {}) {
              if (!("argPackAdvance" in t))
                throw new TypeError(
                  "registerType registeredInstance requires argPackAdvance"
                );
              return (function (e, t, r = {}) {
                var n = t.name;
                if (
                  (e ||
                    qe(
                      `type "${n}" must have a positive integer typeid pointer`
                    ),
                  De.hasOwnProperty(e))
                ) {
                  if (r.ignoreDuplicateRegistrations) return;
                  qe(`Cannot register type '${n}' twice`);
                }
                if (((De[e] = t), delete Me[e], Be.hasOwnProperty(e))) {
                  var o = Be[e];
                  delete Be[e], o.forEach((e) => e());
                }
              })(e, t, r);
            }
            var Ne,
              Ve = (e, t, r) => {
                switch (t) {
                  case 1:
                    return r ? (e) => T[e >> 0] : (e) => A[e >> 0];
                  case 2:
                    return r ? (e) => P[e >> 1] : (e) => F[e >> 1];
                  case 4:
                    return r ? (e) => L[e >> 2] : (e) => R[e >> 2];
                  case 8:
                    return r ? (e) => D[e >> 3] : (e) => M[e >> 3];
                  default:
                    throw new TypeError(`invalid integer width (${t}): ${e}`);
                }
              },
              ze = 8,
              We = (e) => {
                qe(
                  e.$$.ptrType.registeredClass.name +
                    " instance already deleted"
                );
              },
              Ge = !1,
              Xe = (e) => {},
              Ye = (e) => {
                (e.count.value -= 1),
                  0 === e.count.value &&
                    ((e) => {
                      e.smartPtr
                        ? e.smartPtrType.rawDestructor(e.smartPtr)
                        : e.ptrType.registeredClass.rawDestructor(e.ptr);
                    })(e);
              },
              Ke = (e, t, r) => {
                if (t === r) return e;
                if (void 0 === r.baseClass) return null;
                var n = Ke(e, t, r.baseClass);
                return null === n ? null : r.downcast(n);
              },
              Ze = {},
              Qe = () => Object.keys(nt).length,
              Je = () => {
                var e = [];
                for (var t in nt) nt.hasOwnProperty(t) && e.push(nt[t]);
                return e;
              },
              et = [],
              tt = () => {
                for (; et.length; ) {
                  var e = et.pop();
                  (e.$$.deleteScheduled = !1), e.delete();
                }
              },
              rt = (e) => {
                (Ne = e), et.length && Ne && Ne(tt);
              },
              nt = {},
              ot = (e, t) => (
                (t = ((e, t) => {
                  for (
                    void 0 === t && qe("ptr should not be undefined");
                    e.baseClass;

                  )
                    (t = e.upcast(t)), (e = e.baseClass);
                  return t;
                })(e, t)),
                nt[t]
              ),
              it = (e, t) => (
                (t.ptrType && t.ptr) ||
                  Oe("makeClassHandle requires ptr and ptrType"),
                !!t.smartPtrType != !!t.smartPtr &&
                  Oe("Both smartPtrType and smartPtr must be specified"),
                (t.count = { value: 1 }),
                st(Object.create(e, { $$: { value: t, writable: !0 } }))
              );
            function at(e) {
              var t = this.getPointee(e);
              if (!t) return this.destructor(e), null;
              var r = ot(this.registeredClass, t);
              if (void 0 !== r) {
                if (0 === r.$$.count.value)
                  return (r.$$.ptr = t), (r.$$.smartPtr = e), r.clone();
                var n = r.clone();
                return this.destructor(e), n;
              }
              function o() {
                return this.isSmartPointer
                  ? it(this.registeredClass.instancePrototype, {
                      ptrType: this.pointeeType,
                      ptr: t,
                      smartPtrType: this,
                      smartPtr: e,
                    })
                  : it(this.registeredClass.instancePrototype, {
                      ptrType: this,
                      ptr: e,
                    });
              }
              var i,
                a = this.registeredClass.getActualType(t),
                s = Ze[a];
              if (!s) return o.call(this);
              i = this.isConst ? s.constPointerType : s.pointerType;
              var u = Ke(t, this.registeredClass, i.registeredClass);
              return null === u
                ? o.call(this)
                : this.isSmartPointer
                ? it(i.registeredClass.instancePrototype, {
                    ptrType: i,
                    ptr: u,
                    smartPtrType: this,
                    smartPtr: e,
                  })
                : it(i.registeredClass.instancePrototype, {
                    ptrType: i,
                    ptr: u,
                  });
            }
            var st = (e) =>
              "undefined" == typeof FinalizationRegistry
                ? ((st = (e) => e), e)
                : ((Ge = new FinalizationRegistry((e) => {
                    Ye(e.$$);
                  })),
                  (Xe = (e) => Ge.unregister(e)),
                  (st = (e) => {
                    var t = e.$$;
                    if (t.smartPtr) {
                      var r = { $$: t };
                      Ge.register(e, r, e);
                    }
                    return e;
                  })(e));
            function ut() {}
            var ct = (e, t) => Object.defineProperty(t, "name", { value: e }),
              lt = (e, t, r) => {
                if (void 0 === e[t].overloadTable) {
                  var n = e[t];
                  (e[t] = function () {
                    return (
                      e[t].overloadTable.hasOwnProperty(arguments.length) ||
                        qe(
                          `Function '${r}' called with an invalid number of arguments (${arguments.length}) - expects one of (${e[t].overloadTable})!`
                        ),
                      e[t].overloadTable[arguments.length].apply(
                        this,
                        arguments
                      )
                    );
                  }),
                    (e[t].overloadTable = []),
                    (e[t].overloadTable[n.argCount] = n);
                }
              },
              dt = (e, t, r) => {
                u.hasOwnProperty(e)
                  ? ((void 0 === r ||
                      (void 0 !== u[e].overloadTable &&
                        void 0 !== u[e].overloadTable[r])) &&
                      qe(`Cannot register public name '${e}' twice`),
                    lt(u, e, e),
                    u.hasOwnProperty(r) &&
                      qe(
                        `Cannot register multiple overloads of a function with the same number of arguments (${r})!`
                      ),
                    (u[e].overloadTable[r] = t))
                  : ((u[e] = t), void 0 !== r && (u[e].numArguments = r));
              };
            function ht(e, t, r, n, o, i, a, s) {
              (this.name = e),
                (this.constructor = t),
                (this.instancePrototype = r),
                (this.rawDestructor = n),
                (this.baseClass = o),
                (this.getActualType = i),
                (this.upcast = a),
                (this.downcast = s),
                (this.pureVirtualFunctions = []);
            }
            var ft = (e, t, r) => {
              for (; t !== r; )
                t.upcast ||
                  qe(
                    `Expected null or instance of ${r.name}, got an instance of ${t.name}`
                  ),
                  (e = t.upcast(e)),
                  (t = t.baseClass);
              return e;
            };
            function pt(e, t) {
              if (null === t)
                return (
                  this.isReference && qe(`null is not a valid ${this.name}`), 0
                );
              t.$$ || qe(`Cannot pass "${Ue(t)}" as a ${this.name}`),
                t.$$.ptr ||
                  qe(
                    `Cannot pass deleted object as a pointer of type ${this.name}`
                  );
              var r = t.$$.ptrType.registeredClass;
              return ft(t.$$.ptr, r, this.registeredClass);
            }
            function mt(e, t) {
              var r;
              if (null === t)
                return (
                  this.isReference && qe(`null is not a valid ${this.name}`),
                  this.isSmartPointer
                    ? ((r = this.rawConstructor()),
                      null !== e && e.push(this.rawDestructor, r),
                      r)
                    : 0
                );
              (t && t.$$) || qe(`Cannot pass "${Ue(t)}" as a ${this.name}`),
                t.$$.ptr ||
                  qe(
                    `Cannot pass deleted object as a pointer of type ${this.name}`
                  ),
                !this.isConst &&
                  t.$$.ptrType.isConst &&
                  qe(
                    `Cannot convert argument of type ${
                      t.$$.smartPtrType
                        ? t.$$.smartPtrType.name
                        : t.$$.ptrType.name
                    } to parameter type ${this.name}`
                  );
              var n = t.$$.ptrType.registeredClass;
              if (
                ((r = ft(t.$$.ptr, n, this.registeredClass)),
                this.isSmartPointer)
              )
                switch (
                  (void 0 === t.$$.smartPtr &&
                    qe("Passing raw pointer to smart pointer is illegal"),
                  this.sharingPolicy)
                ) {
                  case 0:
                    t.$$.smartPtrType === this
                      ? (r = t.$$.smartPtr)
                      : qe(
                          `Cannot convert argument of type ${
                            t.$$.smartPtrType
                              ? t.$$.smartPtrType.name
                              : t.$$.ptrType.name
                          } to parameter type ${this.name}`
                        );
                    break;
                  case 1:
                    r = t.$$.smartPtr;
                    break;
                  case 2:
                    if (t.$$.smartPtrType === this) r = t.$$.smartPtr;
                    else {
                      var o = t.clone();
                      (r = this.rawShare(
                        r,
                        Mt.toHandle(() => o.delete())
                      )),
                        null !== e && e.push(this.rawDestructor, r);
                    }
                    break;
                  default:
                    qe("Unsupporting sharing policy");
                }
              return r;
            }
            function gt(e, t) {
              if (null === t)
                return (
                  this.isReference && qe(`null is not a valid ${this.name}`), 0
                );
              t.$$ || qe(`Cannot pass "${Ue(t)}" as a ${this.name}`),
                t.$$.ptr ||
                  qe(
                    `Cannot pass deleted object as a pointer of type ${this.name}`
                  ),
                t.$$.ptrType.isConst &&
                  qe(
                    `Cannot convert argument of type ${t.$$.ptrType.name} to parameter type ${this.name}`
                  );
              var r = t.$$.ptrType.registeredClass;
              return ft(t.$$.ptr, r, this.registeredClass);
            }
            function vt(e) {
              return this.fromWireType(R[e >> 2]);
            }
            function yt(e, t, r, n, o, i, a, s, u, c, l) {
              (this.name = e),
                (this.registeredClass = t),
                (this.isReference = r),
                (this.isConst = n),
                (this.isSmartPointer = o),
                (this.pointeeType = i),
                (this.sharingPolicy = a),
                (this.rawGetPointee = s),
                (this.rawConstructor = u),
                (this.rawShare = c),
                (this.rawDestructor = l),
                o || void 0 !== t.baseClass
                  ? (this.toWireType = mt)
                  : n
                  ? ((this.toWireType = pt), (this.destructorFunction = null))
                  : ((this.toWireType = gt), (this.destructorFunction = null));
            }
            var bt,
              _t,
              Et = (e, t, r) => {
                u.hasOwnProperty(e) ||
                  Oe("Replacing nonexistant public symbol"),
                  void 0 !== u[e].overloadTable && void 0 !== r
                    ? (u[e].overloadTable[r] = t)
                    : ((u[e] = t), (u[e].argCount = r));
              },
              Ct = [],
              St = (e) => {
                var t = Ct[e];
                return (
                  t ||
                    (e >= Ct.length && (Ct.length = e + 1),
                    (Ct[e] = t = bt.get(e))),
                  t
                );
              },
              kt = (e, t) => {
                e = $e(e);
                var r = St(t);
                return (
                  "function" != typeof r &&
                    qe(`unknown function pointer with signature ${e}: ${t}`),
                  r
                );
              },
              xt = (e) => {
                var t = Mu(e),
                  r = $e(t);
                return Lu(t), r;
              },
              Tt = (e, t) => {
                var r = [],
                  n = {};
                throw (
                  (t.forEach(function e(t) {
                    n[t] ||
                      De[t] ||
                      (Me[t] ? Me[t].forEach(e) : (r.push(t), (n[t] = !0)));
                  }),
                  new _t(`${e}: ` + r.map(xt).join([", "])))
                );
              },
              At = (e, t) => {
                for (var r = [], n = 0; n < e; n++) r.push(R[(t + 4 * n) >> 2]);
                return r;
              };
            function Pt(e, t, r, n, o, i) {
              var a = t.length;
              a < 2 &&
                qe(
                  "argTypes array size mismatch! Must at least get return value and 'this' types!"
                );
              var s = null !== t[1] && null !== r,
                u = (function (e) {
                  for (var t = 1; t < e.length; ++t)
                    if (null !== e[t] && void 0 === e[t].destructorFunction)
                      return !0;
                  return !1;
                })(t),
                c = "void" !== t[0].name,
                l = a - 2,
                d = new Array(l),
                h = [],
                f = [];
              return ct(e, function () {
                var r;
                arguments.length !== l &&
                  qe(
                    `function ${e} called with ${arguments.length} arguments, expected ${l}`
                  ),
                  (f.length = 0),
                  (h.length = s ? 2 : 1),
                  (h[0] = o),
                  s && ((r = t[1].toWireType(f, this)), (h[1] = r));
                for (var i = 0; i < l; ++i)
                  (d[i] = t[i + 2].toWireType(f, arguments[i])), h.push(d[i]);
                return (function (e) {
                  if (u) Ae(f);
                  else
                    for (var n = s ? 1 : 2; n < t.length; n++) {
                      var o = 1 === n ? r : d[n - 2];
                      null !== t[n].destructorFunction &&
                        t[n].destructorFunction(o);
                    }
                  if (c) return t[0].fromWireType(e);
                })(n.apply(null, h));
              });
            }
            var Ft,
              Lt = (e) => {
                const t = (e = e.trim()).indexOf("(");
                return -1 !== t ? e.substr(0, t) : e;
              },
              Rt = new (class HandleAllocator {
                constructor() {
                  (this.allocated = [void 0]), (this.freelist = []);
                }
                get(e) {
                  return this.allocated[e];
                }
                has(e) {
                  return void 0 !== this.allocated[e];
                }
                allocate(e) {
                  var t = this.freelist.pop() || this.allocated.length;
                  return (this.allocated[t] = e), t;
                }
                free(e) {
                  (this.allocated[e] = void 0), this.freelist.push(e);
                }
              })(),
              Bt = (e) => {
                e >= Rt.reserved && 0 == --Rt.get(e).refcount && Rt.free(e);
              },
              Dt = () => {
                for (var e = 0, t = Rt.reserved; t < Rt.allocated.length; ++t)
                  void 0 !== Rt.allocated[t] && ++e;
                return e;
              },
              Mt = {
                toValue: (e) => (
                  e || qe("Cannot use deleted val. handle = " + e),
                  Rt.get(e).value
                ),
                toHandle: (e) => {
                  switch (e) {
                    case void 0:
                      return 1;
                    case null:
                      return 2;
                    case !0:
                      return 3;
                    case !1:
                      return 4;
                    default:
                      return Rt.allocate({ refcount: 1, value: e });
                  }
                },
              },
              Ot = {
                name: "emscripten::val",
                fromWireType: (e) => {
                  var t = Mt.toValue(e);
                  return Bt(e), t;
                },
                toWireType: (e, t) => Mt.toHandle(t),
                argPackAdvance: ze,
                readValueFromPointer: Pe,
                destructorFunction: null,
              },
              It = (e, t, r) => {
                switch (t) {
                  case 1:
                    return r
                      ? function (e) {
                          return this.fromWireType(T[e >> 0]);
                        }
                      : function (e) {
                          return this.fromWireType(A[e >> 0]);
                        };
                  case 2:
                    return r
                      ? function (e) {
                          return this.fromWireType(P[e >> 1]);
                        }
                      : function (e) {
                          return this.fromWireType(F[e >> 1]);
                        };
                  case 4:
                    return r
                      ? function (e) {
                          return this.fromWireType(L[e >> 2]);
                        }
                      : function (e) {
                          return this.fromWireType(R[e >> 2]);
                        };
                  default:
                    throw new TypeError(`invalid integer width (${t}): ${e}`);
                }
              },
              jt = (e, t) => {
                var r = De[e];
                return void 0 === r && qe(t + " has unknown type " + xt(e)), r;
              },
              Ut = (e, t) => {
                switch (t) {
                  case 4:
                    return function (e) {
                      return this.fromWireType(B[e >> 2]);
                    };
                  case 8:
                    return function (e) {
                      return this.fromWireType(O[e >> 3]);
                    };
                  default:
                    throw new TypeError(`invalid float width (${t}): ${e}`);
                }
              },
              $t = (e, t, r) => ve(e, A, t, r),
              qt =
                "undefined" != typeof TextDecoder
                  ? new TextDecoder("utf-16le")
                  : void 0,
              Ht = (e, t) => {
                for (var r = e, n = r >> 1, o = n + t / 2; !(n >= o) && F[n]; )
                  ++n;
                if ((r = n << 1) - e > 32 && qt)
                  return qt.decode(A.subarray(e, r));
                for (var i = "", a = 0; !(a >= t / 2); ++a) {
                  var s = P[(e + 2 * a) >> 1];
                  if (0 == s) break;
                  i += String.fromCharCode(s);
                }
                return i;
              },
              Nt = (e, t, r) => {
                if (((r ??= 2147483647), r < 2)) return 0;
                for (
                  var n = t,
                    o = (r -= 2) < 2 * e.length ? r / 2 : e.length,
                    i = 0;
                  i < o;
                  ++i
                ) {
                  var a = e.charCodeAt(i);
                  (P[t >> 1] = a), (t += 2);
                }
                return (P[t >> 1] = 0), t - n;
              },
              Vt = (e) => 2 * e.length,
              zt = (e, t) => {
                for (var r = 0, n = ""; !(r >= t / 4); ) {
                  var o = L[(e + 4 * r) >> 2];
                  if (0 == o) break;
                  if ((++r, o >= 65536)) {
                    var i = o - 65536;
                    n += String.fromCharCode(
                      55296 | (i >> 10),
                      56320 | (1023 & i)
                    );
                  } else n += String.fromCharCode(o);
                }
                return n;
              },
              Wt = (e, t, r) => {
                if (((r ??= 2147483647), r < 4)) return 0;
                for (var n = t, o = n + r - 4, i = 0; i < e.length; ++i) {
                  var a = e.charCodeAt(i);
                  if (
                    (a >= 55296 &&
                      a <= 57343 &&
                      (a =
                        (65536 + ((1023 & a) << 10)) |
                        (1023 & e.charCodeAt(++i))),
                    (L[t >> 2] = a),
                    (t += 4) + 4 > o)
                  )
                    break;
                }
                return (L[t >> 2] = 0), t - n;
              },
              Gt = (e) => {
                for (var t = 0, r = 0; r < e.length; ++r) {
                  var n = e.charCodeAt(r);
                  n >= 55296 && n <= 57343 && ++r, (t += 4);
                }
                return t;
              },
              Xt = (e, t, r) => {
                var n = [],
                  o = e.toWireType(n, r);
                return n.length && (R[t >> 2] = Mt.toHandle(n)), o;
              },
              Yt = [],
              Kt = {},
              Zt = (e) => {
                var t = Kt[e];
                return void 0 === t ? $e(e) : t;
              },
              Qt = () => {
                if ("object" == typeof globalThis) return globalThis;
                function e(e) {
                  e.$$$embind_global$$$ = e;
                  var t =
                    "object" == typeof $$$embind_global$$$ &&
                    e.$$$embind_global$$$ == e;
                  return t || delete e.$$$embind_global$$$, t;
                }
                if ("object" == typeof $$$embind_global$$$)
                  return $$$embind_global$$$;
                if (
                  ("object" == typeof global && e(global)
                    ? ($$$embind_global$$$ = global)
                    : "object" == typeof self &&
                      e(self) &&
                      ($$$embind_global$$$ = self),
                  "object" == typeof $$$embind_global$$$)
                )
                  return $$$embind_global$$$;
                throw Error("unable to get global object.");
              },
              Jt = Reflect.construct,
              er = (e) =>
                e < -9007199254740992 || e > 9007199254740992 ? NaN : Number(e),
              tr = (e) => e % 4 == 0 && (e % 100 != 0 || e % 400 == 0),
              rr = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335],
              nr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
              or = (e) =>
                (tr(e.getFullYear()) ? rr : nr)[e.getMonth()] + e.getDate() - 1,
              ir = (e) => {
                var t = ge(e) + 1,
                  r = Pu(t);
                return r && $t(e, r, t), r;
              },
              ar = (e, t) => {
                if (
                  ((fr.mainLoop.timingMode = e),
                  (fr.mainLoop.timingValue = t),
                  !fr.mainLoop.func)
                )
                  return 1;
                if ((fr.mainLoop.running || (fr.mainLoop.running = !0), 0 == e))
                  (fr.mainLoop.scheduler = function () {
                    var e =
                      0 | Math.max(0, fr.mainLoop.tickStartTime + t - Ft());
                    setTimeout(fr.mainLoop.runner, e);
                  }),
                    (fr.mainLoop.method = "timeout");
                else if (1 == e)
                  (fr.mainLoop.scheduler = function () {
                    fr.requestAnimationFrame(fr.mainLoop.runner);
                  }),
                    (fr.mainLoop.method = "rAF");
                else if (2 == e) {
                  if (void 0 === fr.setImmediate)
                    if ("undefined" == typeof setImmediate) {
                      var r = [],
                        n = "setimmediate";
                      addEventListener(
                        "message",
                        (e) => {
                          (e.data !== n && e.data.target !== n) ||
                            (e.stopPropagation(), r.shift()());
                        },
                        !0
                      ),
                        (fr.setImmediate = function (e) {
                          r.push(e),
                            v
                              ? (void 0 === u.setImmediates &&
                                  (u.setImmediates = []),
                                u.setImmediates.push(e),
                                postMessage({ target: n }))
                              : postMessage(n, "*");
                        });
                    } else fr.setImmediate = setImmediate;
                  (fr.mainLoop.scheduler = function () {
                    fr.setImmediate(fr.mainLoop.runner);
                  }),
                    (fr.mainLoop.method = "immediate");
                }
                return 0;
              };
            Ft = () => performance.now();
            var sr = (e) => {
                if (e instanceof oe || "unwind" == e) return x;
                m(1, e);
              },
              ur = () => ae || !1,
              cr = (e, t) => {
                var r;
                (x = e),
                  (x = r = e),
                  ur() || (u.onExit?.(r), (I = !0)),
                  m(r, new oe(r));
              },
              lr = cr,
              dr = (e) => {
                if (!I)
                  try {
                    e(),
                      (() => {
                        if (!ur())
                          try {
                            lr(x);
                          } catch (e) {
                            sr(e);
                          }
                      })();
                  } catch (e) {
                    sr(e);
                  }
              },
              hr = (e, t) =>
                setTimeout(() => {
                  dr(e);
                }, t),
              fr = {
                mainLoop: {
                  running: !1,
                  scheduler: null,
                  method: "",
                  currentlyRunningMainloop: 0,
                  func: null,
                  arg: 0,
                  timingMode: 0,
                  timingValue: 0,
                  currentFrameNumber: 0,
                  queue: [],
                  pause() {
                    (fr.mainLoop.scheduler = null),
                      fr.mainLoop.currentlyRunningMainloop++;
                  },
                  resume() {
                    fr.mainLoop.currentlyRunningMainloop++;
                    var e = fr.mainLoop.timingMode,
                      t = fr.mainLoop.timingValue,
                      r = fr.mainLoop.func;
                    (fr.mainLoop.func = null),
                      ((e, t, r, n, o) => {
                        j(
                          !fr.mainLoop.func,
                          "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters."
                        ),
                          (fr.mainLoop.func = e),
                          (fr.mainLoop.arg = n);
                        var i = fr.mainLoop.currentlyRunningMainloop;
                        function a() {
                          return !(i < fr.mainLoop.currentlyRunningMainloop);
                        }
                        if (
                          ((fr.mainLoop.running = !1),
                          (fr.mainLoop.runner = function () {
                            if (!I)
                              if (fr.mainLoop.queue.length > 0) {
                                Date.now();
                                var t = fr.mainLoop.queue.shift();
                                if (
                                  (t.func(t.arg), fr.mainLoop.remainingBlockers)
                                ) {
                                  var r = fr.mainLoop.remainingBlockers,
                                    n = r % 1 == 0 ? r - 1 : Math.floor(r);
                                  t.counted
                                    ? (fr.mainLoop.remainingBlockers = n)
                                    : ((n += 0.5),
                                      (fr.mainLoop.remainingBlockers =
                                        (8 * r + n) / 9));
                                }
                                if ((fr.mainLoop.updateStatus(), !a())) return;
                                setTimeout(fr.mainLoop.runner, 0);
                              } else
                                a() &&
                                  ((fr.mainLoop.currentFrameNumber =
                                    (fr.mainLoop.currentFrameNumber + 1) | 0),
                                  1 == fr.mainLoop.timingMode &&
                                  fr.mainLoop.timingValue > 1 &&
                                  fr.mainLoop.currentFrameNumber %
                                    fr.mainLoop.timingValue !=
                                    0
                                    ? fr.mainLoop.scheduler()
                                    : (0 == fr.mainLoop.timingMode &&
                                        (fr.mainLoop.tickStartTime = Ft()),
                                      fr.mainLoop.runIter(e),
                                      a() &&
                                        ("object" == typeof SDL &&
                                          SDL.audio?.queueNewAudioData?.(),
                                        fr.mainLoop.scheduler())));
                          }),
                          o ||
                            (t && t > 0 ? ar(0, 1e3 / t) : ar(1, 1),
                            fr.mainLoop.scheduler()),
                          r)
                        )
                          throw "unwind";
                      })(r, 0, !1, fr.mainLoop.arg, !0),
                      ar(e, t),
                      fr.mainLoop.scheduler();
                  },
                  updateStatus() {
                    if (u.setStatus) {
                      var e = u.statusMessage || "Please wait...",
                        t = fr.mainLoop.remainingBlockers,
                        r = fr.mainLoop.expectedBlockers;
                      t
                        ? t < r
                          ? u.setStatus(e + " (" + (r - t) + "/" + r + ")")
                          : u.setStatus(e)
                        : u.setStatus("");
                    }
                  },
                  runIter(e) {
                    if (!I) {
                      if (u.preMainLoop && !1 === u.preMainLoop()) return;
                      dr(e), u.postMainLoop?.();
                    }
                  },
                },
                isFullscreen: !1,
                pointerLock: !1,
                moduleContextCreatedCallbacks: [],
                workers: [],
                init() {
                  if (!fr.initted) {
                    fr.initted = !0;
                    var e = {
                      canHandle: function (e) {
                        return (
                          !u.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(e)
                        );
                      },
                      handle: function (e, t, r, n) {
                        var o = new Blob([e], { type: fr.getMimetype(t) });
                        o.size !== e.length &&
                          (o = new Blob([new Uint8Array(e).buffer], {
                            type: fr.getMimetype(t),
                          }));
                        var i = URL.createObjectURL(o),
                          a = new Image();
                        (a.onload = () => {
                          j(a.complete, `Image ${t} could not be decoded`);
                          var n = document.createElement("canvas");
                          (n.width = a.width),
                            (n.height = a.height),
                            n.getContext("2d").drawImage(a, 0, 0),
                            (_u[t] = n),
                            URL.revokeObjectURL(i),
                            r?.(e);
                        }),
                          (a.onerror = (e) => {
                            k(`Image ${i} could not be decoded`), n?.();
                          }),
                          (a.src = i);
                      },
                    };
                    Ee.push(e);
                    var t = {
                      canHandle: function (e) {
                        return (
                          !u.noAudioDecoding &&
                          e.substr(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 }
                        );
                      },
                      handle: function (e, t, r, n) {
                        var o = !1;
                        function i(n) {
                          o || ((o = !0), (Eu[t] = n), r?.(e));
                        }
                        var a = new Blob([e], { type: fr.getMimetype(t) }),
                          s = URL.createObjectURL(a),
                          u = new Audio();
                        u.addEventListener("canplaythrough", () => i(u), !1),
                          (u.onerror = function (r) {
                            o ||
                              (k(
                                `warning: browser could not fully decode audio ${t}, trying slower base64 approach`
                              ),
                              (u.src =
                                "data:audio/x-" +
                                t.substr(-3) +
                                ";base64," +
                                (function (e) {
                                  for (
                                    var t =
                                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                                      r = "",
                                      n = 0,
                                      o = 0,
                                      i = 0;
                                    i < e.length;
                                    i++
                                  )
                                    for (
                                      n = (n << 8) | e[i], o += 8;
                                      o >= 6;

                                    ) {
                                      var a = (n >> (o - 6)) & 63;
                                      (o -= 6), (r += t[a]);
                                    }
                                  return (
                                    2 == o
                                      ? ((r += t[(3 & n) << 4]), (r += "=="))
                                      : 4 == o &&
                                        ((r += t[(15 & n) << 2]), (r += "=")),
                                    r
                                  );
                                })(e)),
                              i(u));
                          }),
                          (u.src = s),
                          hr(() => {
                            i(u);
                          }, 1e4);
                      },
                    };
                    Ee.push(t);
                    var r = u.canvas;
                    r &&
                      ((r.requestPointerLock =
                        r.requestPointerLock ||
                        r.mozRequestPointerLock ||
                        r.webkitRequestPointerLock ||
                        r.msRequestPointerLock ||
                        (() => {})),
                      (r.exitPointerLock =
                        document.exitPointerLock ||
                        document.mozExitPointerLock ||
                        document.webkitExitPointerLock ||
                        document.msExitPointerLock ||
                        (() => {})),
                      (r.exitPointerLock = r.exitPointerLock.bind(document)),
                      document.addEventListener("pointerlockchange", n, !1),
                      document.addEventListener("mozpointerlockchange", n, !1),
                      document.addEventListener(
                        "webkitpointerlockchange",
                        n,
                        !1
                      ),
                      document.addEventListener("mspointerlockchange", n, !1),
                      u.elementPointerLock &&
                        r.addEventListener(
                          "click",
                          (e) => {
                            !fr.pointerLock &&
                              u.canvas.requestPointerLock &&
                              (u.canvas.requestPointerLock(),
                              e.preventDefault());
                          },
                          !1
                        ));
                  }
                  function n() {
                    fr.pointerLock =
                      document.pointerLockElement === u.canvas ||
                      document.mozPointerLockElement === u.canvas ||
                      document.webkitPointerLockElement === u.canvas ||
                      document.msPointerLockElement === u.canvas;
                  }
                },
                createContext(e, t, r, n) {
                  if (t && u.ctx && e == u.canvas) return u.ctx;
                  var o, i;
                  if (t) {
                    var a = {
                      antialias: !1,
                      alpha: !1,
                      majorVersion:
                        "undefined" != typeof WebGL2RenderingContext ? 2 : 1,
                    };
                    if (n) for (var s in n) a[s] = n[s];
                    void 0 !== mr &&
                      (i = mr.createContext(e, a)) &&
                      (o = mr.getContext(i).GLctx);
                  } else o = e.getContext("2d");
                  return o
                    ? (r &&
                        (t ||
                          j(
                            void 0 === wu,
                            "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"
                          ),
                        (u.ctx = o),
                        t && mr.makeContextCurrent(i),
                        (u.useWebGL = t),
                        fr.moduleContextCreatedCallbacks.forEach((e) => e()),
                        fr.init()),
                      o)
                    : null;
                },
                destroyContext(e, t, r) {},
                fullscreenHandlersInstalled: !1,
                lockPointer: void 0,
                resizeCanvas: void 0,
                requestFullscreen(e, t) {
                  (fr.lockPointer = e),
                    (fr.resizeCanvas = t),
                    void 0 === fr.lockPointer && (fr.lockPointer = !0),
                    void 0 === fr.resizeCanvas && (fr.resizeCanvas = !1);
                  var r = u.canvas;
                  function n() {
                    fr.isFullscreen = !1;
                    var e = r.parentNode;
                    (document.fullscreenElement ||
                      document.mozFullScreenElement ||
                      document.msFullscreenElement ||
                      document.webkitFullscreenElement ||
                      document.webkitCurrentFullScreenElement) === e
                      ? ((r.exitFullscreen = fr.exitFullscreen),
                        fr.lockPointer && r.requestPointerLock(),
                        (fr.isFullscreen = !0),
                        fr.resizeCanvas
                          ? fr.setFullscreenCanvasSize()
                          : fr.updateCanvasDimensions(r))
                      : (e.parentNode.insertBefore(r, e),
                        e.parentNode.removeChild(e),
                        fr.resizeCanvas
                          ? fr.setWindowedCanvasSize()
                          : fr.updateCanvasDimensions(r)),
                      u.onFullScreen?.(fr.isFullscreen),
                      u.onFullscreen?.(fr.isFullscreen);
                  }
                  fr.fullscreenHandlersInstalled ||
                    ((fr.fullscreenHandlersInstalled = !0),
                    document.addEventListener("fullscreenchange", n, !1),
                    document.addEventListener("mozfullscreenchange", n, !1),
                    document.addEventListener("webkitfullscreenchange", n, !1),
                    document.addEventListener("MSFullscreenChange", n, !1));
                  var o = document.createElement("div");
                  r.parentNode.insertBefore(o, r),
                    o.appendChild(r),
                    (o.requestFullscreen =
                      o.requestFullscreen ||
                      o.mozRequestFullScreen ||
                      o.msRequestFullscreen ||
                      (o.webkitRequestFullscreen
                        ? () =>
                            o.webkitRequestFullscreen(
                              Element.ALLOW_KEYBOARD_INPUT
                            )
                        : null) ||
                      (o.webkitRequestFullScreen
                        ? () =>
                            o.webkitRequestFullScreen(
                              Element.ALLOW_KEYBOARD_INPUT
                            )
                        : null)),
                    o.requestFullscreen();
                },
                exitFullscreen: () =>
                  !!fr.isFullscreen &&
                  ((
                    document.exitFullscreen ||
                    document.cancelFullScreen ||
                    document.mozCancelFullScreen ||
                    document.msExitFullscreen ||
                    document.webkitCancelFullScreen ||
                    (() => {})
                  ).apply(document, []),
                  !0),
                nextRAF: 0,
                fakeRequestAnimationFrame(e) {
                  var t = Date.now();
                  if (0 === fr.nextRAF) fr.nextRAF = t + 1e3 / 60;
                  else for (; t + 2 >= fr.nextRAF; ) fr.nextRAF += 1e3 / 60;
                  var r = Math.max(fr.nextRAF - t, 0);
                  setTimeout(e, r);
                },
                requestAnimationFrame(e) {
                  "function" != typeof requestAnimationFrame
                    ? (0, fr.fakeRequestAnimationFrame)(e)
                    : requestAnimationFrame(e);
                },
                safeSetTimeout: (e, t) => hr(e, t),
                safeRequestAnimationFrame: (e) =>
                  fr.requestAnimationFrame(() => {
                    dr(e);
                  }),
                getMimetype: (e) =>
                  ({
                    jpg: "image/jpeg",
                    jpeg: "image/jpeg",
                    png: "image/png",
                    bmp: "image/bmp",
                    ogg: "audio/ogg",
                    wav: "audio/wav",
                    mp3: "audio/mpeg",
                  }[e.substr(e.lastIndexOf(".") + 1)]),
                getUserMedia(e) {
                  (window.getUserMedia ||=
                    navigator.getUserMedia || navigator.mozGetUserMedia),
                    window.getUserMedia(e);
                },
                getMovementX: (e) =>
                  e.movementX || e.mozMovementX || e.webkitMovementX || 0,
                getMovementY: (e) =>
                  e.movementY || e.mozMovementY || e.webkitMovementY || 0,
                getMouseWheelDelta(e) {
                  var t = 0;
                  switch (e.type) {
                    case "DOMMouseScroll":
                      t = e.detail / 3;
                      break;
                    case "mousewheel":
                      t = e.wheelDelta / 120;
                      break;
                    case "wheel":
                      switch (((t = e.deltaY), e.deltaMode)) {
                        case 0:
                          t /= 100;
                          break;
                        case 1:
                          t /= 3;
                          break;
                        case 2:
                          t *= 80;
                          break;
                        default:
                          throw (
                            "unrecognized mouse wheel delta mode: " +
                            e.deltaMode
                          );
                      }
                      break;
                    default:
                      throw "unrecognized mouse wheel event: " + e.type;
                  }
                  return t;
                },
                mouseX: 0,
                mouseY: 0,
                mouseMovementX: 0,
                mouseMovementY: 0,
                touches: {},
                lastTouches: {},
                calculateMouseCoords(e, t) {
                  var r = u.canvas.getBoundingClientRect(),
                    n = u.canvas.width,
                    o = u.canvas.height,
                    i =
                      void 0 !== window.scrollX
                        ? window.scrollX
                        : window.pageXOffset,
                    a =
                      void 0 !== window.scrollY
                        ? window.scrollY
                        : window.pageYOffset,
                    s = e - (i + r.left),
                    c = t - (a + r.top);
                  return { x: (s *= n / r.width), y: (c *= o / r.height) };
                },
                setMouseCoords(e, t) {
                  const { x: r, y: n } = fr.calculateMouseCoords(e, t);
                  (fr.mouseMovementX = r - fr.mouseX),
                    (fr.mouseMovementY = n - fr.mouseY),
                    (fr.mouseX = r),
                    (fr.mouseY = n);
                },
                calculateMouseEvent(e) {
                  if (fr.pointerLock)
                    "mousemove" != e.type && "mozMovementX" in e
                      ? (fr.mouseMovementX = fr.mouseMovementY = 0)
                      : ((fr.mouseMovementX = fr.getMovementX(e)),
                        (fr.mouseMovementY = fr.getMovementY(e))),
                      "undefined" != typeof SDL
                        ? ((fr.mouseX = SDL.mouseX + fr.mouseMovementX),
                          (fr.mouseY = SDL.mouseY + fr.mouseMovementY))
                        : ((fr.mouseX += fr.mouseMovementX),
                          (fr.mouseY += fr.mouseMovementY));
                  else {
                    if (
                      "touchstart" === e.type ||
                      "touchend" === e.type ||
                      "touchmove" === e.type
                    ) {
                      var t = e.touch;
                      if (void 0 === t) return;
                      var r = fr.calculateMouseCoords(t.pageX, t.pageY);
                      if ("touchstart" === e.type)
                        (fr.lastTouches[t.identifier] = r),
                          (fr.touches[t.identifier] = r);
                      else if (
                        "touchend" === e.type ||
                        "touchmove" === e.type
                      ) {
                        var n = fr.touches[t.identifier];
                        (n ||= r),
                          (fr.lastTouches[t.identifier] = n),
                          (fr.touches[t.identifier] = r);
                      }
                      return;
                    }
                    fr.setMouseCoords(e.pageX, e.pageY);
                  }
                },
                resizeListeners: [],
                updateResizeListeners() {
                  var e = u.canvas;
                  fr.resizeListeners.forEach((t) => t(e.width, e.height));
                },
                setCanvasSize(e, t, r) {
                  var n = u.canvas;
                  fr.updateCanvasDimensions(n, e, t),
                    r || fr.updateResizeListeners();
                },
                windowedWidth: 0,
                windowedHeight: 0,
                setFullscreenCanvasSize() {
                  if ("undefined" != typeof SDL) {
                    var e = R[SDL.screen >> 2];
                    (e |= 8388608), (L[SDL.screen >> 2] = e);
                  }
                  fr.updateCanvasDimensions(u.canvas),
                    fr.updateResizeListeners();
                },
                setWindowedCanvasSize() {
                  if ("undefined" != typeof SDL) {
                    var e = R[SDL.screen >> 2];
                    (e &= -8388609), (L[SDL.screen >> 2] = e);
                  }
                  fr.updateCanvasDimensions(u.canvas),
                    fr.updateResizeListeners();
                },
                updateCanvasDimensions(e, t, r) {
                  t && r
                    ? ((e.widthNative = t), (e.heightNative = r))
                    : ((t = e.widthNative), (r = e.heightNative));
                  var n = t,
                    o = r;
                  if (
                    (u.forcedAspectRatio &&
                      u.forcedAspectRatio > 0 &&
                      (n / o < u.forcedAspectRatio
                        ? (n = Math.round(o * u.forcedAspectRatio))
                        : (o = Math.round(n / u.forcedAspectRatio))),
                    (document.fullscreenElement ||
                      document.mozFullScreenElement ||
                      document.msFullscreenElement ||
                      document.webkitFullscreenElement ||
                      document.webkitCurrentFullScreenElement) ===
                      e.parentNode && "undefined" != typeof screen)
                  ) {
                    var i = Math.min(screen.width / n, screen.height / o);
                    (n = Math.round(n * i)), (o = Math.round(o * i));
                  }
                  fr.resizeCanvas
                    ? (e.width != n && (e.width = n),
                      e.height != o && (e.height = o),
                      void 0 !== e.style &&
                        (e.style.removeProperty("width"),
                        e.style.removeProperty("height")))
                    : (e.width != t && (e.width = t),
                      e.height != r && (e.height = r),
                      void 0 !== e.style &&
                        (n != t || o != r
                          ? (e.style.setProperty(
                              "width",
                              n + "px",
                              "important"
                            ),
                            e.style.setProperty(
                              "height",
                              o + "px",
                              "important"
                            ))
                          : (e.style.removeProperty("width"),
                            e.style.removeProperty("height"))));
                },
              },
              pr = {
                errorCode: 12288,
                defaultDisplayInitialized: !1,
                currentContext: 0,
                currentReadSurface: 0,
                currentDrawSurface: 0,
                contextAttributes: {
                  alpha: !1,
                  depth: !1,
                  stencil: !1,
                  antialias: !1,
                },
                stringCache: {},
                setErrorCode(e) {
                  pr.errorCode = e;
                },
                chooseConfig(e, t, r, n, o) {
                  if (62e3 != e) return pr.setErrorCode(12296), 0;
                  if (t)
                    for (;;) {
                      var i = L[t >> 2];
                      if (12321 == i) {
                        var a = L[(t + 4) >> 2];
                        pr.contextAttributes.alpha = a > 0;
                      } else if (12325 == i) {
                        var s = L[(t + 4) >> 2];
                        pr.contextAttributes.depth = s > 0;
                      } else if (12326 == i) {
                        var u = L[(t + 4) >> 2];
                        pr.contextAttributes.stencil = u > 0;
                      } else if (12337 == i) {
                        var c = L[(t + 4) >> 2];
                        pr.contextAttributes.antialias = c > 0;
                      } else if (12338 == i)
                        (c = L[(t + 4) >> 2]),
                          (pr.contextAttributes.antialias = 1 == c);
                      else if (12544 == i) {
                        var l = L[(t + 4) >> 2];
                        pr.contextAttributes.lowLatency = 12547 != l;
                      } else if (12344 == i) break;
                      t += 8;
                    }
                  return (r && n) || o
                    ? (o && (L[o >> 2] = 1),
                      r && n > 0 && (R[r >> 2] = 62002),
                      pr.setErrorCode(12288),
                      1)
                    : (pr.setErrorCode(12300), 0);
                },
              },
              mr = {
                counter: 1,
                buffers: [],
                programs: [],
                framebuffers: [],
                renderbuffers: [],
                textures: [],
                shaders: [],
                vaos: [],
                contexts: [],
                offscreenCanvases: {},
                queries: [],
                samplers: [],
                transformFeedbacks: [],
                syncs: [],
                stringCache: {},
                stringiCache: {},
                unpackAlignment: 4,
                recordError: function (e) {
                  mr.lastError || (mr.lastError = e);
                },
                getNewId: (e) => {
                  for (var t = mr.counter++, r = e.length; r < t; r++)
                    e[r] = null;
                  return t;
                },
                getSource: (e, t, r, n) => {
                  for (var o = "", i = 0; i < t; ++i) {
                    var a = n ? R[(n + 4 * i) >> 2] : void 0;
                    o += ke(R[(r + 4 * i) >> 2], a);
                  }
                  return o;
                },
                createContext: (e, t) => {
                  if (!e.getContextSafariWebGL2Fixed) {
                    let t = function (t, r) {
                      var n = e.getContextSafariWebGL2Fixed(t, r);
                      return ("webgl" == t) ==
                        n instanceof WebGLRenderingContext
                        ? n
                        : null;
                    };
                    (e.getContextSafariWebGL2Fixed = e.getContext),
                      (e.getContext = t);
                  }
                  var r =
                    t.majorVersion > 1
                      ? e.getContext("webgl2", t)
                      : e.getContext("webgl", t);
                  return r ? mr.registerContext(r, t) : 0;
                },
                registerContext: (e, t) => {
                  var r = mr.getNewId(mr.contexts),
                    n = {
                      handle: r,
                      attributes: t,
                      version: t.majorVersion,
                      GLctx: e,
                    };
                  return (
                    e.canvas && (e.canvas.GLctxObject = n),
                    (mr.contexts[r] = n),
                    r
                  );
                },
                makeContextCurrent: (e) => (
                  (mr.currentContext = mr.contexts[e]),
                  (u.ctx = wu = mr.currentContext?.GLctx),
                  !(e && !wu)
                ),
                getContext: (e) => mr.contexts[e],
                deleteContext: (e) => {
                  mr.currentContext === mr.contexts[e] &&
                    (mr.currentContext = null),
                    "object" == typeof ou &&
                      ou.removeAllHandlersOnTarget(mr.contexts[e].GLctx.canvas),
                    mr.contexts[e] &&
                      mr.contexts[e].GLctx.canvas &&
                      (mr.contexts[e].GLctx.canvas.GLctxObject = void 0),
                    (mr.contexts[e] = null);
                },
              },
              gr = [],
              vr = (e, t, r) => {
                var n = ((e, t) => {
                  var r;
                  for (gr.length = 0; (r = A[e++]); ) {
                    var n = 105 != r;
                    (t += (n &= 112 != r) && t % 8 ? 4 : 0),
                      gr.push(
                        112 == r
                          ? R[t >> 2]
                          : 106 == r
                          ? D[t >> 3]
                          : 105 == r
                          ? L[t >> 2]
                          : O[t >> 3]
                      ),
                      (t += n ? 8 : 4);
                  }
                  return gr;
                })(t, r);
                return ne[e].apply(null, n);
              },
              yr = function (e) {
                wu.activeTexture(e);
              },
              br = (e, t) => {
                wu.attachShader(mr.programs[e], mr.shaders[t]);
              },
              wr = (e, t) => {
                wu.beginQuery(e, mr.queries[t]);
              },
              _r = (e, t) => {
                wu.disjointTimerQueryExt.beginQueryEXT(e, mr.queries[t]);
              },
              Er = function (e) {
                wu.beginTransformFeedback(e);
              },
              Cr = (e, t, r) => {
                wu.bindAttribLocation(mr.programs[e], t, ke(r));
              },
              Sr = (e, t) => {
                35051 == e
                  ? (wu.currentPixelPackBufferBinding = t)
                  : 35052 == e && (wu.currentPixelUnpackBufferBinding = t),
                  wu.bindBuffer(e, mr.buffers[t]);
              },
              kr = (e, t, r) => {
                wu.bindBufferBase(e, t, mr.buffers[r]);
              },
              xr = (e, t, r, n, o) => {
                wu.bindBufferRange(e, t, mr.buffers[r], n, o);
              },
              Tr = (e, t) => {
                wu.bindFramebuffer(e, mr.framebuffers[t]);
              },
              Ar = (e, t) => {
                wu.bindRenderbuffer(e, mr.renderbuffers[t]);
              },
              Pr = (e, t) => {
                wu.bindSampler(e, mr.samplers[t]);
              },
              Fr = (e, t) => {
                wu.bindTexture(e, mr.textures[t]);
              },
              Lr = (e, t) => {
                wu.bindTransformFeedback(e, mr.transformFeedbacks[t]);
              },
              Rr = (e) => {
                wu.bindVertexArray(mr.vaos[e]);
              },
              Br = Rr,
              Dr = Rr,
              Mr = function (e, t, r, n) {
                wu.blendColor(e, t, r, n);
              },
              Or = function (e) {
                wu.blendEquation(e);
              },
              Ir = function (e, t) {
                wu.blendEquationSeparate(e, t);
              },
              jr = function (e, t) {
                wu.blendFunc(e, t);
              },
              Ur = function (e, t, r, n) {
                wu.blendFuncSeparate(e, t, r, n);
              },
              $r = function (e, t, r, n, o, i, a, s, u, c) {
                wu.blitFramebuffer(e, t, r, n, o, i, a, s, u, c);
              },
              qr = (e, t, r, n) => {
                mr.currentContext.version >= 2
                  ? r && t
                    ? wu.bufferData(e, A, n, r, t)
                    : wu.bufferData(e, t, n)
                  : wu.bufferData(e, r ? A.subarray(r, r + t) : t, n);
              },
              Hr = (e, t, r, n) => {
                mr.currentContext.version >= 2
                  ? r && wu.bufferSubData(e, t, A, n, r)
                  : wu.bufferSubData(e, t, A.subarray(n, n + r));
              },
              Nr = function (e) {
                return wu.checkFramebufferStatus(e);
              },
              Vr = function (e) {
                wu.clear(e);
              },
              zr = function (e, t, r, n) {
                wu.clearBufferfi(e, t, r, n);
              },
              Wr = (e, t, r) => {
                wu.clearBufferfv(e, t, B, r >> 2);
              },
              Gr = (e, t, r) => {
                wu.clearBufferiv(e, t, L, r >> 2);
              },
              Xr = (e, t, r) => {
                wu.clearBufferuiv(e, t, R, r >> 2);
              },
              Yr = function (e, t, r, n) {
                wu.clearColor(e, t, r, n);
              },
              Kr = function (e) {
                wu.clearDepth(e);
              },
              Zr = function (e) {
                wu.clearStencil(e);
              },
              Qr = (e, t, r) => (
                (r = Number(r)), wu.clientWaitSync(mr.syncs[e], t, r)
              ),
              Jr = (e, t, r, n) => {
                wu.colorMask(!!e, !!t, !!r, !!n);
              },
              en = (e) => {
                wu.compileShader(mr.shaders[e]);
              },
              tn = (e, t, r, n, o, i, a, s) => {
                mr.currentContext.version >= 2
                  ? wu.currentPixelUnpackBufferBinding || !a
                    ? wu.compressedTexImage2D(e, t, r, n, o, i, a, s)
                    : wu.compressedTexImage2D(e, t, r, n, o, i, A, s, a)
                  : wu.compressedTexImage2D(
                      e,
                      t,
                      r,
                      n,
                      o,
                      i,
                      s ? A.subarray(s, s + a) : null
                    );
              },
              rn = (e, t, r, n, o, i, a, s, u) => {
                wu.currentPixelUnpackBufferBinding
                  ? wu.compressedTexImage3D(e, t, r, n, o, i, a, s, u)
                  : wu.compressedTexImage3D(e, t, r, n, o, i, a, A, u, s);
              },
              nn = (e, t, r, n, o, i, a, s, u) => {
                mr.currentContext.version >= 2
                  ? wu.currentPixelUnpackBufferBinding || !s
                    ? wu.compressedTexSubImage2D(e, t, r, n, o, i, a, s, u)
                    : wu.compressedTexSubImage2D(e, t, r, n, o, i, a, A, u, s)
                  : wu.compressedTexSubImage2D(
                      e,
                      t,
                      r,
                      n,
                      o,
                      i,
                      a,
                      u ? A.subarray(u, u + s) : null
                    );
              },
              on = (e, t, r, n, o, i, a, s, u, c, l) => {
                wu.currentPixelUnpackBufferBinding
                  ? wu.compressedTexSubImage3D(e, t, r, n, o, i, a, s, u, c, l)
                  : wu.compressedTexSubImage3D(
                      e,
                      t,
                      r,
                      n,
                      o,
                      i,
                      a,
                      s,
                      u,
                      A,
                      l,
                      c
                    );
              },
              an = function (e, t, r, n, o) {
                wu.copyBufferSubData(e, t, r, n, o);
              },
              sn = function (e, t, r, n, o, i, a, s) {
                wu.copyTexImage2D(e, t, r, n, o, i, a, s);
              },
              un = function (e, t, r, n, o, i, a, s) {
                wu.copyTexSubImage2D(e, t, r, n, o, i, a, s);
              },
              cn = function (e, t, r, n, o, i, a, s, u) {
                wu.copyTexSubImage3D(e, t, r, n, o, i, a, s, u);
              },
              ln = () => {
                var e = mr.getNewId(mr.programs),
                  t = wu.createProgram();
                return (
                  (t.name = e),
                  (t.maxUniformLength =
                    t.maxAttributeLength =
                    t.maxUniformBlockNameLength =
                      0),
                  (t.uniformIdCounter = 1),
                  (mr.programs[e] = t),
                  e
                );
              },
              dn = (e) => {
                var t = mr.getNewId(mr.shaders);
                return (mr.shaders[t] = wu.createShader(e)), t;
              },
              hn = function (e) {
                wu.cullFace(e);
              },
              fn = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.buffers[n];
                  o &&
                    (wu.deleteBuffer(o),
                    (o.name = 0),
                    (mr.buffers[n] = null),
                    n == wu.currentPixelPackBufferBinding &&
                      (wu.currentPixelPackBufferBinding = 0),
                    n == wu.currentPixelUnpackBufferBinding &&
                      (wu.currentPixelUnpackBufferBinding = 0));
                }
              },
              pn = (e, t) => {
                for (var r = 0; r < e; ++r) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.framebuffers[n];
                  o &&
                    (wu.deleteFramebuffer(o),
                    (o.name = 0),
                    (mr.framebuffers[n] = null));
                }
              },
              mn = (e) => {
                if (e) {
                  var t = mr.programs[e];
                  t
                    ? (wu.deleteProgram(t),
                      (t.name = 0),
                      (mr.programs[e] = null))
                    : mr.recordError(1281);
                }
              },
              gn = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.queries[n];
                  o && (wu.deleteQuery(o), (mr.queries[n] = null));
                }
              },
              vn = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.queries[n];
                  o &&
                    (wu.disjointTimerQueryExt.deleteQueryEXT(o),
                    (mr.queries[n] = null));
                }
              },
              yn = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.renderbuffers[n];
                  o &&
                    (wu.deleteRenderbuffer(o),
                    (o.name = 0),
                    (mr.renderbuffers[n] = null));
                }
              },
              bn = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.samplers[n];
                  o &&
                    (wu.deleteSampler(o),
                    (o.name = 0),
                    (mr.samplers[n] = null));
                }
              },
              wn = (e) => {
                if (e) {
                  var t = mr.shaders[e];
                  t
                    ? (wu.deleteShader(t), (mr.shaders[e] = null))
                    : mr.recordError(1281);
                }
              },
              _n = (e) => {
                if (e) {
                  var t = mr.syncs[e];
                  t
                    ? (wu.deleteSync(t), (t.name = 0), (mr.syncs[e] = null))
                    : mr.recordError(1281);
                }
              },
              En = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.textures[n];
                  o &&
                    (wu.deleteTexture(o),
                    (o.name = 0),
                    (mr.textures[n] = null));
                }
              },
              Cn = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.transformFeedbacks[n];
                  o &&
                    (wu.deleteTransformFeedback(o),
                    (o.name = 0),
                    (mr.transformFeedbacks[n] = null));
                }
              },
              Sn = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2];
                  wu.deleteVertexArray(mr.vaos[n]), (mr.vaos[n] = null);
                }
              },
              kn = Sn,
              xn = Sn,
              Tn = function (e) {
                wu.depthFunc(e);
              },
              An = (e) => {
                wu.depthMask(!!e);
              },
              Pn = function (e, t) {
                wu.depthRange(e, t);
              },
              Fn = (e, t) => {
                wu.detachShader(mr.programs[e], mr.shaders[t]);
              },
              Ln = function (e) {
                wu.disable(e);
              },
              Rn = (e) => {
                wu.disableVertexAttribArray(e);
              },
              Bn = (e, t, r) => {
                wu.drawArrays(e, t, r);
              },
              Dn = (e, t, r, n) => {
                wu.drawArraysInstanced(e, t, r, n);
              },
              Mn = Dn,
              On = Dn,
              In = Dn,
              jn = (e, t, r, n, o) => {
                wu.dibvbi.drawArraysInstancedBaseInstanceWEBGL(e, t, r, n, o);
              },
              Un = Dn,
              $n = Dn,
              qn = [],
              Hn = (e, t) => {
                for (var r = qn[e], n = 0; n < e; n++)
                  r[n] = L[(t + 4 * n) >> 2];
                wu.drawBuffers(r);
              },
              Nn = Hn,
              Vn = Hn,
              zn = Hn,
              Wn = (e, t, r, n) => {
                wu.drawElements(e, t, r, n);
              },
              Gn = Wn,
              Xn = (e, t, r, n, o) => {
                wu.drawElementsInstanced(e, t, r, n, o);
              },
              Yn = Xn,
              Kn = Xn,
              Zn = Xn,
              Qn = (e, t, r, n, o, i, a) => {
                wu.dibvbi.drawElementsInstancedBaseVertexBaseInstanceWEBGL(
                  e,
                  t,
                  r,
                  n,
                  o,
                  i,
                  a
                );
              },
              Jn = Xn,
              eo = Xn,
              to = (e, t, r, n, o, i) => {
                Wn(e, n, o, i);
              },
              ro = function (e) {
                wu.enable(e);
              },
              no = (e) => {
                wu.enableVertexAttribArray(e);
              },
              oo = function (e) {
                wu.endQuery(e);
              },
              io = (e) => {
                wu.disjointTimerQueryExt.endQueryEXT(e);
              },
              ao = function () {
                wu.endTransformFeedback();
              },
              so = (e, t) => {
                var r = wu.fenceSync(e, t);
                if (r) {
                  var n = mr.getNewId(mr.syncs);
                  return (r.name = n), (mr.syncs[n] = r), n;
                }
                return 0;
              },
              uo = function () {
                wu.finish();
              },
              co = function () {
                wu.flush();
              },
              lo = (e, t, r, n) => {
                wu.framebufferRenderbuffer(e, t, r, mr.renderbuffers[n]);
              },
              ho = (e, t, r, n, o) => {
                wu.framebufferTexture2D(e, t, r, mr.textures[n], o);
              },
              fo = (e, t, r, n, o) => {
                wu.framebufferTextureLayer(e, t, mr.textures[r], n, o);
              },
              po = function (e) {
                wu.frontFace(e);
              },
              mo = (e, t, r, n) => {
                for (var o = 0; o < e; o++) {
                  var i = wu[r](),
                    a = i && mr.getNewId(n);
                  i ? ((i.name = a), (n[a] = i)) : mr.recordError(1282),
                    (L[(t + 4 * o) >> 2] = a);
                }
              },
              go = (e, t) => {
                mo(e, t, "createBuffer", mr.buffers);
              },
              vo = (e, t) => {
                mo(e, t, "createFramebuffer", mr.framebuffers);
              },
              yo = (e, t) => {
                mo(e, t, "createQuery", mr.queries);
              },
              bo = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = wu.disjointTimerQueryExt.createQueryEXT();
                  if (!n) {
                    for (mr.recordError(1282); r < e; )
                      L[(t + 4 * r++) >> 2] = 0;
                    return;
                  }
                  var o = mr.getNewId(mr.queries);
                  (n.name = o), (mr.queries[o] = n), (L[(t + 4 * r) >> 2] = o);
                }
              },
              wo = (e, t) => {
                mo(e, t, "createRenderbuffer", mr.renderbuffers);
              },
              _o = (e, t) => {
                mo(e, t, "createSampler", mr.samplers);
              },
              Eo = (e, t) => {
                mo(e, t, "createTexture", mr.textures);
              },
              Co = (e, t) => {
                mo(e, t, "createTransformFeedback", mr.transformFeedbacks);
              };
            function So(e, t) {
              mo(e, t, "createVertexArray", mr.vaos);
            }
            var ko,
              xo,
              To,
              Ao = So,
              Po = So,
              Fo = function (e) {
                wu.generateMipmap(e);
              },
              Lo = (e, t, r, n, o, i, a, s) => {
                t = mr.programs[t];
                var u = wu[e](t, r);
                if (u) {
                  var c = s && $t(u.name, s, n);
                  o && (L[o >> 2] = c),
                    i && (L[i >> 2] = u.size),
                    a && (L[a >> 2] = u.type);
                }
              },
              Ro = (e, t, r, n, o, i, a) => {
                Lo("getActiveAttrib", e, t, r, n, o, i, a);
              },
              Bo = (e, t, r, n, o, i, a) => {
                Lo("getActiveUniform", e, t, r, n, o, i, a);
              },
              Do = (e, t, r, n, o) => {
                e = mr.programs[e];
                var i = wu.getActiveUniformBlockName(e, t);
                if (i)
                  if (o && r > 0) {
                    var a = $t(i, o, r);
                    n && (L[n >> 2] = a);
                  } else n && (L[n >> 2] = 0);
              },
              Mo = (e, t, r, n) => {
                if (n)
                  if (((e = mr.programs[e]), 35393 != r)) {
                    var o = wu.getActiveUniformBlockParameter(e, t, r);
                    if (null !== o)
                      if (35395 == r)
                        for (var i = 0; i < o.length; i++)
                          L[(n + 4 * i) >> 2] = o[i];
                      else L[n >> 2] = o;
                  } else {
                    var a = wu.getActiveUniformBlockName(e, t);
                    L[n >> 2] = a.length + 1;
                  }
                else mr.recordError(1281);
              },
              Oo = (e, t, r, n, o) => {
                if (o)
                  if (t > 0 && 0 == r) mr.recordError(1281);
                  else {
                    e = mr.programs[e];
                    for (var i = [], a = 0; a < t; a++)
                      i.push(L[(r + 4 * a) >> 2]);
                    var s = wu.getActiveUniforms(e, i, n);
                    if (s) {
                      var u = s.length;
                      for (a = 0; a < u; a++) L[(o + 4 * a) >> 2] = s[a];
                    }
                  }
                else mr.recordError(1281);
              },
              Io = (e, t, r, n) => {
                var o = wu.getAttachedShaders(mr.programs[e]),
                  i = o.length;
                i > t && (i = t), (L[r >> 2] = i);
                for (var a = 0; a < i; ++a) {
                  var s = mr.shaders.indexOf(o[a]);
                  L[(n + 4 * a) >> 2] = s;
                }
              },
              jo = (e, t) => wu.getAttribLocation(mr.programs[e], ke(t)),
              Uo = (e, t) => {
                R[e >> 2] = t;
                var r = R[e >> 2];
                R[(e + 4) >> 2] = (t - r) / 4294967296;
              },
              $o = function () {
                var e,
                  t =
                    ((e = [
                      "ANGLE_instanced_arrays",
                      "EXT_blend_minmax",
                      "EXT_disjoint_timer_query",
                      "EXT_frag_depth",
                      "EXT_shader_texture_lod",
                      "EXT_sRGB",
                      "OES_element_index_uint",
                      "OES_fbo_render_mipmap",
                      "OES_standard_derivatives",
                      "OES_texture_float",
                      "OES_texture_half_float",
                      "OES_texture_half_float_linear",
                      "OES_vertex_array_object",
                      "WEBGL_color_buffer_float",
                      "WEBGL_depth_texture",
                      "WEBGL_draw_buffers",
                      "EXT_color_buffer_float",
                      "EXT_disjoint_timer_query_webgl2",
                      "EXT_texture_norm16",
                      "WEBGL_clip_cull_distance",
                      "EXT_color_buffer_half_float",
                      "EXT_float_blend",
                      "EXT_texture_compression_bptc",
                      "EXT_texture_compression_rgtc",
                      "EXT_texture_filter_anisotropic",
                      "KHR_parallel_shader_compile",
                      "OES_texture_float_linear",
                      "WEBGL_compressed_texture_s3tc",
                      "WEBGL_compressed_texture_s3tc_srgb",
                      "WEBGL_debug_renderer_info",
                      "WEBGL_debug_shaders",
                      "WEBGL_lose_context",
                      "WEBGL_multi_draw",
                    ]),
                    (wu.getSupportedExtensions() || []).filter((t) =>
                      e.includes(t)
                    ));
                return (t = t.concat(t.map((e) => "GL_" + e)));
              },
              qo = (e, t, r) => {
                if (t) {
                  var n = void 0;
                  switch (e) {
                    case 36346:
                      n = 1;
                      break;
                    case 36344:
                      return void (0 != r && 1 != r && mr.recordError(1280));
                    case 34814:
                    case 36345:
                      n = 0;
                      break;
                    case 34466:
                      var o = wu.getParameter(34467);
                      n = o ? o.length : 0;
                      break;
                    case 33309:
                      if (mr.currentContext.version < 2)
                        return void mr.recordError(1282);
                      n = $o().length;
                      break;
                    case 33307:
                    case 33308:
                      if (mr.currentContext.version < 2)
                        return void mr.recordError(1280);
                      n = 33307 == e ? 3 : 0;
                  }
                  if (void 0 === n) {
                    var i = wu.getParameter(e);
                    switch (typeof i) {
                      case "number":
                        n = i;
                        break;
                      case "boolean":
                        n = i ? 1 : 0;
                        break;
                      case "string":
                        return void mr.recordError(1280);
                      case "object":
                        if (null === i)
                          switch (e) {
                            case 34964:
                            case 35725:
                            case 34965:
                            case 36006:
                            case 36007:
                            case 32873:
                            case 34229:
                            case 36662:
                            case 36663:
                            case 35053:
                            case 35055:
                            case 36010:
                            case 35097:
                            case 35869:
                            case 32874:
                            case 36389:
                            case 35983:
                            case 35368:
                            case 34068:
                              n = 0;
                              break;
                            default:
                              return void mr.recordError(1280);
                          }
                        else {
                          if (
                            i instanceof Float32Array ||
                            i instanceof Uint32Array ||
                            i instanceof Int32Array ||
                            i instanceof Array
                          ) {
                            for (var a = 0; a < i.length; ++a)
                              switch (r) {
                                case 0:
                                  L[(t + 4 * a) >> 2] = i[a];
                                  break;
                                case 2:
                                  B[(t + 4 * a) >> 2] = i[a];
                                  break;
                                case 4:
                                  T[(t + a) >> 0] = i[a] ? 1 : 0;
                              }
                            return;
                          }
                          try {
                            n = 0 | i.name;
                          } catch (t) {
                            return (
                              mr.recordError(1280),
                              void k(
                                `GL_INVALID_ENUM in glGet${r}v: Unknown object returned from WebGL getParameter(${e})! (error: ${t})`
                              )
                            );
                          }
                        }
                        break;
                      default:
                        return (
                          mr.recordError(1280),
                          void k(
                            `GL_INVALID_ENUM in glGet${r}v: Native code calling glGet${r}v(${e}) and it returns ${i} of type ${typeof i}!`
                          )
                        );
                    }
                  }
                  switch (r) {
                    case 1:
                      Uo(t, n);
                      break;
                    case 0:
                      L[t >> 2] = n;
                      break;
                    case 2:
                      B[t >> 2] = n;
                      break;
                    case 4:
                      T[t >> 0] = n ? 1 : 0;
                  }
                } else mr.recordError(1281);
              },
              Ho = (e, t) => qo(e, t, 4),
              No = (e, t, r) => {
                r ? Uo(r, wu.getBufferParameter(e, t)) : mr.recordError(1281);
              },
              Vo = (e, t, r) => {
                r
                  ? (L[r >> 2] = wu.getBufferParameter(e, t))
                  : mr.recordError(1281);
              },
              zo = () => {
                var e = wu.getError() || mr.lastError;
                return (mr.lastError = 0), e;
              },
              Wo = (e, t) => qo(e, t, 2),
              Go = (e, t) => wu.getFragDataLocation(mr.programs[e], ke(t)),
              Xo = (e, t, r, n) => {
                var o = wu.getFramebufferAttachmentParameter(e, t, r);
                (o instanceof WebGLRenderbuffer || o instanceof WebGLTexture) &&
                  (o = 0 | o.name),
                  (L[n >> 2] = o);
              },
              Yo = (e, t, r, n) => {
                if (r) {
                  var o,
                    i = wu.getIndexedParameter(e, t);
                  switch (typeof i) {
                    case "boolean":
                      o = i ? 1 : 0;
                      break;
                    case "number":
                      o = i;
                      break;
                    case "object":
                      if (null === i)
                        switch (e) {
                          case 35983:
                          case 35368:
                            o = 0;
                            break;
                          default:
                            return void mr.recordError(1280);
                        }
                      else {
                        if (!(i instanceof WebGLBuffer))
                          return void mr.recordError(1280);
                        o = 0 | i.name;
                      }
                      break;
                    default:
                      return void mr.recordError(1280);
                  }
                  switch (n) {
                    case 1:
                      Uo(r, o);
                      break;
                    case 0:
                      L[r >> 2] = o;
                      break;
                    case 2:
                      B[r >> 2] = o;
                      break;
                    case 4:
                      T[r >> 0] = o ? 1 : 0;
                      break;
                    default:
                      throw (
                        "internal emscriptenWebGLGetIndexed() error, bad type: " +
                        n
                      );
                  }
                } else mr.recordError(1281);
              },
              Ko = (e, t, r) => Yo(e, t, r, 1),
              Zo = (e, t) => {
                qo(e, t, 1);
              },
              Qo = (e, t, r) => Yo(e, t, r, 0),
              Jo = (e, t) => qo(e, t, 0),
              ei = (e, t, r, n, o) => {
                if (n < 0) mr.recordError(1281);
                else if (o) {
                  var i = wu.getInternalformatParameter(e, t, r);
                  if (null !== i)
                    for (var a = 0; a < i.length && a < n; ++a)
                      L[(o + 4 * a) >> 2] = i[a];
                } else mr.recordError(1281);
              },
              ti = (e, t, r, n, o) => {
                mr.recordError(1282);
              },
              ri = (e, t, r, n) => {
                var o = wu.getProgramInfoLog(mr.programs[e]);
                null === o && (o = "(unknown error)");
                var i = t > 0 && n ? $t(o, n, t) : 0;
                r && (L[r >> 2] = i);
              },
              ni = (e, t, r) => {
                if (r)
                  if (e >= mr.counter) mr.recordError(1281);
                  else if (((e = mr.programs[e]), 35716 == t)) {
                    var n = wu.getProgramInfoLog(e);
                    null === n && (n = "(unknown error)"),
                      (L[r >> 2] = n.length + 1);
                  } else if (35719 == t) {
                    if (!e.maxUniformLength)
                      for (var o = 0; o < wu.getProgramParameter(e, 35718); ++o)
                        e.maxUniformLength = Math.max(
                          e.maxUniformLength,
                          wu.getActiveUniform(e, o).name.length + 1
                        );
                    L[r >> 2] = e.maxUniformLength;
                  } else if (35722 == t) {
                    if (!e.maxAttributeLength)
                      for (o = 0; o < wu.getProgramParameter(e, 35721); ++o)
                        e.maxAttributeLength = Math.max(
                          e.maxAttributeLength,
                          wu.getActiveAttrib(e, o).name.length + 1
                        );
                    L[r >> 2] = e.maxAttributeLength;
                  } else if (35381 == t) {
                    if (!e.maxUniformBlockNameLength)
                      for (o = 0; o < wu.getProgramParameter(e, 35382); ++o)
                        e.maxUniformBlockNameLength = Math.max(
                          e.maxUniformBlockNameLength,
                          wu.getActiveUniformBlockName(e, o).length + 1
                        );
                    L[r >> 2] = e.maxUniformBlockNameLength;
                  } else L[r >> 2] = wu.getProgramParameter(e, t);
                else mr.recordError(1281);
              },
              oi = (e, t, r) => {
                if (r) {
                  var n,
                    o = mr.queries[e];
                  (n =
                    mr.currentContext.version < 2
                      ? wu.disjointTimerQueryExt.getQueryObjectEXT(o, t)
                      : wu.getQueryParameter(o, t)),
                    Uo(r, "boolean" == typeof n ? (n ? 1 : 0) : n);
                } else mr.recordError(1281);
              },
              ii = oi,
              ai = (e, t, r) => {
                if (r) {
                  var n,
                    o = mr.queries[e],
                    i = wu.disjointTimerQueryExt.getQueryObjectEXT(o, t);
                  (n = "boolean" == typeof i ? (i ? 1 : 0) : i),
                    (L[r >> 2] = n);
                } else mr.recordError(1281);
              },
              si = ai,
              ui = oi,
              ci = (e, t, r) => {
                if (r) {
                  var n,
                    o = mr.queries[e],
                    i = wu.getQueryParameter(o, t);
                  (n = "boolean" == typeof i ? (i ? 1 : 0) : i),
                    (L[r >> 2] = n);
                } else mr.recordError(1281);
              },
              li = ai,
              di = (e, t, r) => {
                r ? (L[r >> 2] = wu.getQuery(e, t)) : mr.recordError(1281);
              },
              hi = (e, t, r) => {
                r
                  ? (L[r >> 2] = wu.disjointTimerQueryExt.getQueryEXT(e, t))
                  : mr.recordError(1281);
              },
              fi = (e, t, r) => {
                r
                  ? (L[r >> 2] = wu.getRenderbufferParameter(e, t))
                  : mr.recordError(1281);
              },
              pi = (e, t, r) => {
                r
                  ? (B[r >> 2] = wu.getSamplerParameter(mr.samplers[e], t))
                  : mr.recordError(1281);
              },
              mi = (e, t, r) => {
                r
                  ? (L[r >> 2] = wu.getSamplerParameter(mr.samplers[e], t))
                  : mr.recordError(1281);
              },
              gi = (e, t, r, n) => {
                var o = wu.getShaderInfoLog(mr.shaders[e]);
                null === o && (o = "(unknown error)");
                var i = t > 0 && n ? $t(o, n, t) : 0;
                r && (L[r >> 2] = i);
              },
              vi = (e, t, r, n) => {
                var o = wu.getShaderPrecisionFormat(e, t);
                (L[r >> 2] = o.rangeMin),
                  (L[(r + 4) >> 2] = o.rangeMax),
                  (L[n >> 2] = o.precision);
              },
              yi = (e, t, r, n) => {
                var o = wu.getShaderSource(mr.shaders[e]);
                if (o) {
                  var i = t > 0 && n ? $t(o, n, t) : 0;
                  r && (L[r >> 2] = i);
                }
              },
              bi = (e, t, r) => {
                if (r)
                  if (35716 == t) {
                    var n = wu.getShaderInfoLog(mr.shaders[e]);
                    null === n && (n = "(unknown error)");
                    var o = n ? n.length + 1 : 0;
                    L[r >> 2] = o;
                  } else if (35720 == t) {
                    var i = wu.getShaderSource(mr.shaders[e]),
                      a = i ? i.length + 1 : 0;
                    L[r >> 2] = a;
                  } else L[r >> 2] = wu.getShaderParameter(mr.shaders[e], t);
                else mr.recordError(1281);
              },
              wi = (e) => {
                var t = mr.stringCache[e];
                if (!t) {
                  switch (e) {
                    case 7939:
                      t = ir($o().join(" "));
                      break;
                    case 7936:
                    case 7937:
                    case 37445:
                    case 37446:
                      var r = wu.getParameter(e);
                      r || mr.recordError(1280), (t = r ? ir(r) : 0);
                      break;
                    case 7938:
                      var n = wu.getParameter(7938);
                      (n =
                        mr.currentContext.version >= 2
                          ? `OpenGL ES 3.0 (${n})`
                          : `OpenGL ES 2.0 (${n})`),
                        (t = ir(n));
                      break;
                    case 35724:
                      var o = wu.getParameter(35724),
                        i = o.match(
                          /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/
                        );
                      null !== i &&
                        (3 == i[1].length && (i[1] = i[1] + "0"),
                        (o = `OpenGL ES GLSL ES ${i[1]} (${o})`)),
                        (t = ir(o));
                      break;
                    default:
                      mr.recordError(1280);
                  }
                  mr.stringCache[e] = t;
                }
                return t;
              },
              _i = (e, t) => {
                if (mr.currentContext.version < 2)
                  return mr.recordError(1282), 0;
                var r = mr.stringiCache[e];
                if (r)
                  return t < 0 || t >= r.length
                    ? (mr.recordError(1281), 0)
                    : r[t];
                if (7939 === e) {
                  var n = $o().map(ir);
                  return (
                    (r = mr.stringiCache[e] = n),
                    t < 0 || t >= r.length ? (mr.recordError(1281), 0) : r[t]
                  );
                }
                return mr.recordError(1280), 0;
              },
              Ei = (e, t, r, n, o) => {
                if (r < 0) mr.recordError(1281);
                else if (o) {
                  var i = wu.getSyncParameter(mr.syncs[e], t);
                  null !== i && ((L[o >> 2] = i), n && (L[n >> 2] = 1));
                } else mr.recordError(1281);
              },
              Ci = (e, t, r) => {
                r
                  ? (B[r >> 2] = wu.getTexParameter(e, t))
                  : mr.recordError(1281);
              },
              Si = (e, t, r) => {
                r
                  ? (L[r >> 2] = wu.getTexParameter(e, t))
                  : mr.recordError(1281);
              },
              ki = (e, t, r, n, o, i, a) => {
                e = mr.programs[e];
                var s = wu.getTransformFeedbackVarying(e, t);
                if (s) {
                  if (a && r > 0) {
                    var u = $t(s.name, a, r);
                    n && (L[n >> 2] = u);
                  } else n && (L[n >> 2] = 0);
                  o && (L[o >> 2] = s.size), i && (L[i >> 2] = s.type);
                }
              },
              xi = (e, t) => wu.getUniformBlockIndex(mr.programs[e], ke(t)),
              Ti = (e, t, r, n) => {
                if (n)
                  if (t > 0 && (0 == r || 0 == n)) mr.recordError(1281);
                  else {
                    e = mr.programs[e];
                    for (var o = [], i = 0; i < t; i++)
                      o.push(ke(L[(r + 4 * i) >> 2]));
                    var a = wu.getUniformIndices(e, o);
                    if (a) {
                      var s = a.length;
                      for (i = 0; i < s; i++) L[(n + 4 * i) >> 2] = a[i];
                    }
                  }
                else mr.recordError(1281);
              },
              Ai = (e) => "]" == e.slice(-1) && e.lastIndexOf("["),
              Pi = (e) => {
                var t,
                  r,
                  n = e.uniformLocsById,
                  o = e.uniformSizeAndIdsByName;
                if (!n)
                  for (
                    e.uniformLocsById = n = {},
                      e.uniformArrayNamesById = {},
                      t = 0;
                    t < wu.getProgramParameter(e, 35718);
                    ++t
                  ) {
                    var i = wu.getActiveUniform(e, t),
                      a = i.name,
                      s = i.size,
                      u = Ai(a),
                      c = u > 0 ? a.slice(0, u) : a,
                      l = e.uniformIdCounter;
                    for (
                      e.uniformIdCounter += s, o[c] = [s, l], r = 0;
                      r < s;
                      ++r
                    )
                      (n[l] = r), (e.uniformArrayNamesById[l++] = c);
                  }
              },
              Fi = (e, t) => {
                if (((t = ke(t)), (e = mr.programs[e]))) {
                  Pi(e);
                  var r = e.uniformLocsById,
                    n = 0,
                    o = t,
                    i = Ai(t);
                  i > 0 &&
                    ((s = t.slice(i + 1)),
                    (n = parseInt(s) >>> 0),
                    (o = t.slice(0, i)));
                  var a = e.uniformSizeAndIdsByName[o];
                  if (
                    a &&
                    n < a[0] &&
                    (r[(n += a[1])] = r[n] || wu.getUniformLocation(e, t))
                  )
                    return n;
                } else mr.recordError(1281);
                var s;
                return -1;
              },
              Li = (e) => {
                var t = wu.currentProgram;
                if (t) {
                  var r = t.uniformLocsById[e];
                  return (
                    "number" == typeof r &&
                      (t.uniformLocsById[e] = r =
                        wu.getUniformLocation(
                          t,
                          t.uniformArrayNamesById[e] + (r > 0 ? `[${r}]` : "")
                        )),
                    r
                  );
                }
                mr.recordError(1282);
              },
              Ri = (e, t, r, n) => {
                if (r) {
                  (e = mr.programs[e]), Pi(e);
                  var o = wu.getUniform(e, Li(t));
                  if ("number" == typeof o || "boolean" == typeof o)
                    switch (n) {
                      case 0:
                        L[r >> 2] = o;
                        break;
                      case 2:
                        B[r >> 2] = o;
                    }
                  else
                    for (var i = 0; i < o.length; i++)
                      switch (n) {
                        case 0:
                          L[(r + 4 * i) >> 2] = o[i];
                          break;
                        case 2:
                          B[(r + 4 * i) >> 2] = o[i];
                      }
                } else mr.recordError(1281);
              },
              Bi = (e, t, r) => {
                Ri(e, t, r, 2);
              },
              Di = (e, t, r) => {
                Ri(e, t, r, 0);
              },
              Mi = (e, t, r) => Ri(e, t, r, 0),
              Oi = (e, t, r, n) => {
                if (r) {
                  var o = wu.getVertexAttrib(e, t);
                  if (34975 == t) L[r >> 2] = o && o.name;
                  else if ("number" == typeof o || "boolean" == typeof o)
                    switch (n) {
                      case 0:
                        L[r >> 2] = o;
                        break;
                      case 2:
                        B[r >> 2] = o;
                        break;
                      case 5:
                        L[r >> 2] = Math.fround(o);
                    }
                  else
                    for (var i = 0; i < o.length; i++)
                      switch (n) {
                        case 0:
                          L[(r + 4 * i) >> 2] = o[i];
                          break;
                        case 2:
                          B[(r + 4 * i) >> 2] = o[i];
                          break;
                        case 5:
                          L[(r + 4 * i) >> 2] = Math.fround(o[i]);
                      }
                } else mr.recordError(1281);
              },
              Ii = (e, t, r) => {
                Oi(e, t, r, 0);
              },
              ji = Ii,
              Ui = Ii,
              $i = (e, t, r) => {
                r
                  ? (L[r >> 2] = wu.getVertexAttribOffset(e, t))
                  : mr.recordError(1281);
              },
              qi = (e, t, r) => {
                Oi(e, t, r, 2);
              },
              Hi = (e, t, r) => {
                Oi(e, t, r, 5);
              },
              Ni = function (e, t) {
                wu.hint(e, t);
              },
              Vi = (e, t, r) => {
                for (var n = qn[t], o = 0; o < t; o++)
                  n[o] = L[(r + 4 * o) >> 2];
                wu.invalidateFramebuffer(e, n);
              },
              zi = (e, t, r, n, o, i, a) => {
                for (var s = qn[t], u = 0; u < t; u++)
                  s[u] = L[(r + 4 * u) >> 2];
                wu.invalidateSubFramebuffer(e, s, n, o, i, a);
              },
              Wi = (e) => {
                var t = mr.buffers[e];
                return t ? wu.isBuffer(t) : 0;
              },
              Gi = function (e) {
                return wu.isEnabled(e);
              },
              Xi = (e) => {
                var t = mr.framebuffers[e];
                return t ? wu.isFramebuffer(t) : 0;
              },
              Yi = (e) => ((e = mr.programs[e]) ? wu.isProgram(e) : 0),
              Ki = (e) => {
                var t = mr.queries[e];
                return t ? wu.isQuery(t) : 0;
              },
              Zi = (e) => {
                var t = mr.queries[e];
                return t ? wu.disjointTimerQueryExt.isQueryEXT(t) : 0;
              },
              Qi = (e) => {
                var t = mr.renderbuffers[e];
                return t ? wu.isRenderbuffer(t) : 0;
              },
              Ji = (e) => {
                var t = mr.samplers[e];
                return t ? wu.isSampler(t) : 0;
              },
              ea = (e) => {
                var t = mr.shaders[e];
                return t ? wu.isShader(t) : 0;
              },
              ta = (e) => wu.isSync(mr.syncs[e]),
              ra = (e) => {
                var t = mr.textures[e];
                return t ? wu.isTexture(t) : 0;
              },
              na = (e) => wu.isTransformFeedback(mr.transformFeedbacks[e]),
              oa = (e) => {
                var t = mr.vaos[e];
                return t ? wu.isVertexArray(t) : 0;
              },
              ia = oa,
              aa = oa,
              sa = function (e) {
                wu.lineWidth(e);
              },
              ua = (e) => {
                (e = mr.programs[e]),
                  wu.linkProgram(e),
                  (e.uniformLocsById = 0),
                  (e.uniformSizeAndIdsByName = {});
              },
              ca = (e, t, r, n, o, i) => {
                wu.mdibvbi.multiDrawArraysInstancedBaseInstanceWEBGL(
                  e,
                  L,
                  t >> 2,
                  L,
                  r >> 2,
                  L,
                  n >> 2,
                  R,
                  o >> 2,
                  i
                );
              },
              la = (e, t, r, n, o, i, a, s) => {
                wu.mdibvbi.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(
                  e,
                  L,
                  t >> 2,
                  r,
                  L,
                  n >> 2,
                  L,
                  o >> 2,
                  L,
                  i >> 2,
                  R,
                  a >> 2,
                  s
                );
              },
              da = function () {
                wu.pauseTransformFeedback();
              },
              ha = (e, t) => {
                3317 == e && (mr.unpackAlignment = t), wu.pixelStorei(e, t);
              },
              fa = function (e, t) {
                wu.polygonOffset(e, t);
              },
              pa = (e, t, r, n) => {
                mr.recordError(1280);
              },
              ma = (e, t, r) => {
                mr.recordError(1280);
              },
              ga = (e, t) => {
                wu.disjointTimerQueryExt.queryCounterEXT(mr.queries[e], t);
              },
              va = function (e) {
                wu.readBuffer(e);
              },
              ya = (e) =>
                0 == (e -= 5120)
                  ? T
                  : 1 == e
                  ? A
                  : 2 == e
                  ? P
                  : 4 == e
                  ? L
                  : 6 == e
                  ? B
                  : 5 == e ||
                    28922 == e ||
                    28520 == e ||
                    30779 == e ||
                    30782 == e
                  ? R
                  : F,
              ba = (e) => 31 - Math.clz32(e.BYTES_PER_ELEMENT),
              wa = (e, t, r, n, o, i) => {
                var a = ya(e),
                  s = ba(a),
                  u = 1 << s,
                  c =
                    ((e) =>
                      ({
                        5: 3,
                        6: 4,
                        8: 2,
                        29502: 3,
                        29504: 4,
                        26917: 2,
                        26918: 2,
                        29846: 3,
                        29847: 4,
                      }[e - 6402] || 1))(t) * u,
                  l = ((e, t, r, n) => {
                    var o;
                    return t * ((e * r + (o = n) - 1) & -o);
                  })(r, n, c, mr.unpackAlignment);
                return a.subarray(o >> s, (o + l) >> s);
              },
              _a = (e, t, r, n, o, i, a) => {
                if (mr.currentContext.version >= 2)
                  if (wu.currentPixelPackBufferBinding)
                    wu.readPixels(e, t, r, n, o, i, a);
                  else {
                    var s = ya(i);
                    wu.readPixels(e, t, r, n, o, i, s, a >> ba(s));
                  }
                else {
                  var u = wa(i, o, r, n, a);
                  u ? wu.readPixels(e, t, r, n, o, i, u) : mr.recordError(1280);
                }
              },
              Ea = () => {},
              Ca = function (e, t, r, n) {
                wu.renderbufferStorage(e, t, r, n);
              },
              Sa = function (e, t, r, n, o) {
                wu.renderbufferStorageMultisample(e, t, r, n, o);
              },
              ka = function () {
                wu.resumeTransformFeedback();
              },
              xa = (e, t) => {
                wu.sampleCoverage(e, !!t);
              },
              Ta = (e, t, r) => {
                wu.samplerParameterf(mr.samplers[e], t, r);
              },
              Aa = (e, t, r) => {
                var n = B[r >> 2];
                wu.samplerParameterf(mr.samplers[e], t, n);
              },
              Pa = (e, t, r) => {
                wu.samplerParameteri(mr.samplers[e], t, r);
              },
              Fa = (e, t, r) => {
                var n = L[r >> 2];
                wu.samplerParameteri(mr.samplers[e], t, n);
              },
              La = function (e, t, r, n) {
                wu.scissor(e, t, r, n);
              },
              Ra = (e, t, r, n, o) => {
                mr.recordError(1280);
              },
              Ba = (e, t, r, n) => {
                var o = mr.getSource(e, t, r, n);
                if (
                  mr.currentContext.version >= 2 &&
                  o.includes("#version 100")
                ) {
                  var i = "";
                  (o = (o = o.replace(
                    /#extension GL_OES_standard_derivatives : enable/g,
                    ""
                  )).replace(
                    /#extension GL_EXT_shader_texture_lod : enable/g,
                    ""
                  )).includes("gl_FragColor") &&
                    ((i += "out mediump vec4 GL_FragColor;\n"),
                    (o = o.replace(/gl_FragColor/g, "GL_FragColor"))),
                    (o = (o = (o = (o = (o = (o = (o = (o = (o = (o = (o = (o =
                      o.includes("attribute")
                        ? (o = o.replace(/attribute/g, "in")).replace(
                            /varying/g,
                            "out"
                          )
                        : o.replace(/varying/g, "in")).replace(
                      /textureCubeLodEXT/g,
                      "textureCubeLod"
                    )).replace(/texture2DLodEXT/g, "texture2DLod")).replace(
                      /texture2DProjLodEXT/g,
                      "texture2DProjLod"
                    )).replace(/texture2DGradEXT/g, "texture2DGrad")).replace(
                      /texture2DProjGradEXT/g,
                      "texture2DProjGrad"
                    )).replace(
                      /textureCubeGradEXT/g,
                      "textureCubeGrad"
                    )).replace(/textureCube/g, "texture")).replace(
                      /texture1D/g,
                      "texture"
                    )).replace(/texture2D/g, "texture")).replace(
                      /texture3D/g,
                      "texture"
                    )).replace(/#version 100/g, "#version 300 es\n" + i));
                }
                wu.shaderSource(mr.shaders[e], o);
              },
              Da = function (e, t, r) {
                wu.stencilFunc(e, t, r);
              },
              Ma = function (e, t, r, n) {
                wu.stencilFuncSeparate(e, t, r, n);
              },
              Oa = function (e) {
                wu.stencilMask(e);
              },
              Ia = function (e, t) {
                wu.stencilMaskSeparate(e, t);
              },
              ja = function (e, t, r) {
                wu.stencilOp(e, t, r);
              },
              Ua = function (e, t, r, n) {
                wu.stencilOpSeparate(e, t, r, n);
              },
              $a = (e, t, r, n, o, i, a, s, u) => {
                if (
                  (mr.currentContext.version >= 2 &&
                    (6402 == a && 6402 == r && 5125 == s && (r = 33190),
                    36193 == s &&
                      ((s = 5131), 6408 == a && 6408 == r && (r = 34842)),
                    34041 == r && (r = 35056)),
                  mr.currentContext.version >= 2)
                )
                  if (wu.currentPixelUnpackBufferBinding)
                    wu.texImage2D(e, t, r, n, o, i, a, s, u);
                  else if (u) {
                    var c = ya(s);
                    wu.texImage2D(e, t, r, n, o, i, a, s, c, u >> ba(c));
                  } else wu.texImage2D(e, t, r, n, o, i, a, s, null);
                else
                  wu.texImage2D(
                    e,
                    t,
                    r,
                    n,
                    o,
                    i,
                    a,
                    s,
                    u ? wa(s, a, n, o, u) : null
                  );
              },
              qa = (e, t, r, n, o, i, a, s, u, c) => {
                if (wu.currentPixelUnpackBufferBinding)
                  wu.texImage3D(e, t, r, n, o, i, a, s, u, c);
                else if (c) {
                  var l = ya(u);
                  wu.texImage3D(e, t, r, n, o, i, a, s, u, l, c >> ba(l));
                } else wu.texImage3D(e, t, r, n, o, i, a, s, u, null);
              },
              Ha = function (e, t, r) {
                wu.texParameterf(e, t, r);
              },
              Na = (e, t, r) => {
                var n = B[r >> 2];
                wu.texParameterf(e, t, n);
              },
              Va = function (e, t, r) {
                wu.texParameteri(e, t, r);
              },
              za = (e, t, r) => {
                var n = L[r >> 2];
                wu.texParameteri(e, t, n);
              },
              Wa = function (e, t, r, n, o) {
                wu.texStorage2D(e, t, r, n, o);
              },
              Ga = function (e, t, r, n, o, i) {
                wu.texStorage3D(e, t, r, n, o, i);
              },
              Xa = (e, t, r, n, o, i, a, s, u) => {
                if (
                  (mr.currentContext.version >= 2 && 36193 == s && (s = 5131),
                  mr.currentContext.version >= 2)
                )
                  if (wu.currentPixelUnpackBufferBinding)
                    wu.texSubImage2D(e, t, r, n, o, i, a, s, u);
                  else if (u) {
                    var c = ya(s);
                    wu.texSubImage2D(e, t, r, n, o, i, a, s, c, u >> ba(c));
                  } else wu.texSubImage2D(e, t, r, n, o, i, a, s, null);
                else {
                  var l = null;
                  u && (l = wa(s, a, o, i, u)),
                    wu.texSubImage2D(e, t, r, n, o, i, a, s, l);
                }
              },
              Ya = (e, t, r, n, o, i, a, s, u, c, l) => {
                if (wu.currentPixelUnpackBufferBinding)
                  wu.texSubImage3D(e, t, r, n, o, i, a, s, u, c, l);
                else if (l) {
                  var d = ya(c);
                  wu.texSubImage3D(e, t, r, n, o, i, a, s, u, c, d, l >> ba(d));
                } else wu.texSubImage3D(e, t, r, n, o, i, a, s, u, c, null);
              },
              Ka = (e, t, r, n) => {
                e = mr.programs[e];
                for (var o = [], i = 0; i < t; i++)
                  o.push(ke(L[(r + 4 * i) >> 2]));
                wu.transformFeedbackVaryings(e, o, n);
              },
              Za = (e, t) => {
                wu.uniform1f(Li(e), t);
              },
              Qa = [],
              Ja = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform1fv(Li(e), B, r >> 2, t);
                else {
                  if (t <= 288)
                    for (var n = Qa[t - 1], o = 0; o < t; ++o)
                      n[o] = B[(r + 4 * o) >> 2];
                  else n = B.subarray(r >> 2, (r + 4 * t) >> 2);
                  wu.uniform1fv(Li(e), n);
                }
              },
              es = (e, t) => {
                wu.uniform1i(Li(e), t);
              },
              ts = [],
              rs = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform1iv(Li(e), L, r >> 2, t);
                else {
                  if (t <= 288)
                    for (var n = ts[t - 1], o = 0; o < t; ++o)
                      n[o] = L[(r + 4 * o) >> 2];
                  else n = L.subarray(r >> 2, (r + 4 * t) >> 2);
                  wu.uniform1iv(Li(e), n);
                }
              },
              ns = (e, t) => {
                wu.uniform1ui(Li(e), t);
              },
              os = (e, t, r) => {
                t && wu.uniform1uiv(Li(e), R, r >> 2, t);
              },
              is = (e, t, r) => {
                wu.uniform2f(Li(e), t, r);
              },
              as = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform2fv(Li(e), B, r >> 2, 2 * t);
                else {
                  if (t <= 144)
                    for (var n = Qa[2 * t - 1], o = 0; o < 2 * t; o += 2)
                      (n[o] = B[(r + 4 * o) >> 2]),
                        (n[o + 1] = B[(r + (4 * o + 4)) >> 2]);
                  else n = B.subarray(r >> 2, (r + 8 * t) >> 2);
                  wu.uniform2fv(Li(e), n);
                }
              },
              ss = (e, t, r) => {
                wu.uniform2i(Li(e), t, r);
              },
              us = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform2iv(Li(e), L, r >> 2, 2 * t);
                else {
                  if (t <= 144)
                    for (var n = ts[2 * t - 1], o = 0; o < 2 * t; o += 2)
                      (n[o] = L[(r + 4 * o) >> 2]),
                        (n[o + 1] = L[(r + (4 * o + 4)) >> 2]);
                  else n = L.subarray(r >> 2, (r + 8 * t) >> 2);
                  wu.uniform2iv(Li(e), n);
                }
              },
              cs = (e, t, r) => {
                wu.uniform2ui(Li(e), t, r);
              },
              ls = (e, t, r) => {
                t && wu.uniform2uiv(Li(e), R, r >> 2, 2 * t);
              },
              ds = (e, t, r, n) => {
                wu.uniform3f(Li(e), t, r, n);
              },
              hs = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform3fv(Li(e), B, r >> 2, 3 * t);
                else {
                  if (t <= 96)
                    for (var n = Qa[3 * t - 1], o = 0; o < 3 * t; o += 3)
                      (n[o] = B[(r + 4 * o) >> 2]),
                        (n[o + 1] = B[(r + (4 * o + 4)) >> 2]),
                        (n[o + 2] = B[(r + (4 * o + 8)) >> 2]);
                  else n = B.subarray(r >> 2, (r + 12 * t) >> 2);
                  wu.uniform3fv(Li(e), n);
                }
              },
              fs = (e, t, r, n) => {
                wu.uniform3i(Li(e), t, r, n);
              },
              ps = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform3iv(Li(e), L, r >> 2, 3 * t);
                else {
                  if (t <= 96)
                    for (var n = ts[3 * t - 1], o = 0; o < 3 * t; o += 3)
                      (n[o] = L[(r + 4 * o) >> 2]),
                        (n[o + 1] = L[(r + (4 * o + 4)) >> 2]),
                        (n[o + 2] = L[(r + (4 * o + 8)) >> 2]);
                  else n = L.subarray(r >> 2, (r + 12 * t) >> 2);
                  wu.uniform3iv(Li(e), n);
                }
              },
              ms = (e, t, r, n) => {
                wu.uniform3ui(Li(e), t, r, n);
              },
              gs = (e, t, r) => {
                t && wu.uniform3uiv(Li(e), R, r >> 2, 3 * t);
              },
              vs = (e, t, r, n, o) => {
                wu.uniform4f(Li(e), t, r, n, o);
              },
              ys = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform4fv(Li(e), B, r >> 2, 4 * t);
                else {
                  if (t <= 72) {
                    var n = Qa[4 * t - 1],
                      o = B;
                    r >>= 2;
                    for (var i = 0; i < 4 * t; i += 4) {
                      var a = r + i;
                      (n[i] = o[a]),
                        (n[i + 1] = o[a + 1]),
                        (n[i + 2] = o[a + 2]),
                        (n[i + 3] = o[a + 3]);
                    }
                  } else n = B.subarray(r >> 2, (r + 16 * t) >> 2);
                  wu.uniform4fv(Li(e), n);
                }
              },
              bs = (e, t, r, n, o) => {
                wu.uniform4i(Li(e), t, r, n, o);
              },
              ws = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform4iv(Li(e), L, r >> 2, 4 * t);
                else {
                  if (t <= 72)
                    for (var n = ts[4 * t - 1], o = 0; o < 4 * t; o += 4)
                      (n[o] = L[(r + 4 * o) >> 2]),
                        (n[o + 1] = L[(r + (4 * o + 4)) >> 2]),
                        (n[o + 2] = L[(r + (4 * o + 8)) >> 2]),
                        (n[o + 3] = L[(r + (4 * o + 12)) >> 2]);
                  else n = L.subarray(r >> 2, (r + 16 * t) >> 2);
                  wu.uniform4iv(Li(e), n);
                }
              },
              _s = (e, t, r, n, o) => {
                wu.uniform4ui(Li(e), t, r, n, o);
              },
              Es = (e, t, r) => {
                t && wu.uniform4uiv(Li(e), R, r >> 2, 4 * t);
              },
              Cs = (e, t, r) => {
                (e = mr.programs[e]), wu.uniformBlockBinding(e, t, r);
              },
              Ss = (e, t, r, n) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniformMatrix2fv(Li(e), !!r, B, n >> 2, 4 * t);
                else {
                  if (t <= 72)
                    for (var o = Qa[4 * t - 1], i = 0; i < 4 * t; i += 4)
                      (o[i] = B[(n + 4 * i) >> 2]),
                        (o[i + 1] = B[(n + (4 * i + 4)) >> 2]),
                        (o[i + 2] = B[(n + (4 * i + 8)) >> 2]),
                        (o[i + 3] = B[(n + (4 * i + 12)) >> 2]);
                  else o = B.subarray(n >> 2, (n + 16 * t) >> 2);
                  wu.uniformMatrix2fv(Li(e), !!r, o);
                }
              },
              ks = (e, t, r, n) => {
                t && wu.uniformMatrix2x3fv(Li(e), !!r, B, n >> 2, 6 * t);
              },
              xs = (e, t, r, n) => {
                t && wu.uniformMatrix2x4fv(Li(e), !!r, B, n >> 2, 8 * t);
              },
              Ts = (e, t, r, n) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniformMatrix3fv(Li(e), !!r, B, n >> 2, 9 * t);
                else {
                  if (t <= 32)
                    for (var o = Qa[9 * t - 1], i = 0; i < 9 * t; i += 9)
                      (o[i] = B[(n + 4 * i) >> 2]),
                        (o[i + 1] = B[(n + (4 * i + 4)) >> 2]),
                        (o[i + 2] = B[(n + (4 * i + 8)) >> 2]),
                        (o[i + 3] = B[(n + (4 * i + 12)) >> 2]),
                        (o[i + 4] = B[(n + (4 * i + 16)) >> 2]),
                        (o[i + 5] = B[(n + (4 * i + 20)) >> 2]),
                        (o[i + 6] = B[(n + (4 * i + 24)) >> 2]),
                        (o[i + 7] = B[(n + (4 * i + 28)) >> 2]),
                        (o[i + 8] = B[(n + (4 * i + 32)) >> 2]);
                  else o = B.subarray(n >> 2, (n + 36 * t) >> 2);
                  wu.uniformMatrix3fv(Li(e), !!r, o);
                }
              },
              As = (e, t, r, n) => {
                t && wu.uniformMatrix3x2fv(Li(e), !!r, B, n >> 2, 6 * t);
              },
              Ps = (e, t, r, n) => {
                t && wu.uniformMatrix3x4fv(Li(e), !!r, B, n >> 2, 12 * t);
              },
              Fs = (e, t, r, n) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniformMatrix4fv(Li(e), !!r, B, n >> 2, 16 * t);
                else {
                  if (t <= 18) {
                    var o = Qa[16 * t - 1],
                      i = B;
                    n >>= 2;
                    for (var a = 0; a < 16 * t; a += 16) {
                      var s = n + a;
                      (o[a] = i[s]),
                        (o[a + 1] = i[s + 1]),
                        (o[a + 2] = i[s + 2]),
                        (o[a + 3] = i[s + 3]),
                        (o[a + 4] = i[s + 4]),
                        (o[a + 5] = i[s + 5]),
                        (o[a + 6] = i[s + 6]),
                        (o[a + 7] = i[s + 7]),
                        (o[a + 8] = i[s + 8]),
                        (o[a + 9] = i[s + 9]),
                        (o[a + 10] = i[s + 10]),
                        (o[a + 11] = i[s + 11]),
                        (o[a + 12] = i[s + 12]),
                        (o[a + 13] = i[s + 13]),
                        (o[a + 14] = i[s + 14]),
                        (o[a + 15] = i[s + 15]);
                    }
                  } else o = B.subarray(n >> 2, (n + 64 * t) >> 2);
                  wu.uniformMatrix4fv(Li(e), !!r, o);
                }
              },
              Ls = (e, t, r, n) => {
                t && wu.uniformMatrix4x2fv(Li(e), !!r, B, n >> 2, 8 * t);
              },
              Rs = (e, t, r, n) => {
                t && wu.uniformMatrix4x3fv(Li(e), !!r, B, n >> 2, 12 * t);
              },
              Bs = (e) => {
                (e = mr.programs[e]), wu.useProgram(e), (wu.currentProgram = e);
              },
              Ds = (e) => {
                wu.validateProgram(mr.programs[e]);
              },
              Ms = function (e, t) {
                wu.vertexAttrib1f(e, t);
              },
              Os = (e, t) => {
                wu.vertexAttrib1f(e, B[t >> 2]);
              },
              Is = function (e, t, r) {
                wu.vertexAttrib2f(e, t, r);
              },
              js = (e, t) => {
                wu.vertexAttrib2f(e, B[t >> 2], B[(t + 4) >> 2]);
              },
              Us = function (e, t, r, n) {
                wu.vertexAttrib3f(e, t, r, n);
              },
              $s = (e, t) => {
                wu.vertexAttrib3f(
                  e,
                  B[t >> 2],
                  B[(t + 4) >> 2],
                  B[(t + 8) >> 2]
                );
              },
              qs = function (e, t, r, n, o) {
                wu.vertexAttrib4f(e, t, r, n, o);
              },
              Hs = (e, t) => {
                wu.vertexAttrib4f(
                  e,
                  B[t >> 2],
                  B[(t + 4) >> 2],
                  B[(t + 8) >> 2],
                  B[(t + 12) >> 2]
                );
              },
              Ns = (e, t) => {
                wu.vertexAttribDivisor(e, t);
              },
              Vs = Ns,
              zs = Ns,
              Ws = Ns,
              Gs = Ns,
              Xs = Ns,
              Ys = function (e, t, r, n, o) {
                wu.vertexAttribI4i(e, t, r, n, o);
              },
              Ks = (e, t) => {
                wu.vertexAttribI4i(
                  e,
                  L[t >> 2],
                  L[(t + 4) >> 2],
                  L[(t + 8) >> 2],
                  L[(t + 12) >> 2]
                );
              },
              Zs = function (e, t, r, n, o) {
                wu.vertexAttribI4ui(e, t, r, n, o);
              },
              Qs = (e, t) => {
                wu.vertexAttribI4ui(
                  e,
                  R[t >> 2],
                  R[(t + 4) >> 2],
                  R[(t + 8) >> 2],
                  R[(t + 12) >> 2]
                );
              },
              Js = (e, t, r, n, o) => {
                wu.vertexAttribIPointer(e, t, r, n, o);
              },
              eu = (e, t, r, n, o, i) => {
                wu.vertexAttribPointer(e, t, r, !!n, o, i);
              },
              tu = function (e, t, r, n) {
                wu.viewport(e, t, r, n);
              },
              ru = (e, t, r) => {
                (r = Number(r)), wu.waitSync(mr.syncs[e], t, r);
              },
              nu = (e) => {
                var t = (e - C.buffer.byteLength + 65535) / 65536;
                try {
                  return C.grow(t), U(), 1;
                } catch (e) {}
              },
              ou = {
                removeAllEventListeners() {
                  for (; ou.eventHandlers.length; )
                    ou._removeHandler(ou.eventHandlers.length - 1);
                  ou.deferredCalls = [];
                },
                inEventHandler: 0,
                deferredCalls: [],
                deferCall(e, t, r) {
                  function n(e, t) {
                    if (e.length != t.length) return !1;
                    for (var r in e) if (e[r] != t[r]) return !1;
                    return !0;
                  }
                  for (var o in ou.deferredCalls) {
                    var i = ou.deferredCalls[o];
                    if (i.targetFunction == e && n(i.argsList, r)) return;
                  }
                  ou.deferredCalls.push({
                    targetFunction: e,
                    precedence: t,
                    argsList: r,
                  }),
                    ou.deferredCalls.sort(
                      (e, t) => e.precedence < t.precedence
                    );
                },
                removeDeferredCalls(e) {
                  for (var t = 0; t < ou.deferredCalls.length; ++t)
                    ou.deferredCalls[t].targetFunction == e &&
                      (ou.deferredCalls.splice(t, 1), --t);
                },
                canPerformEventHandlerRequests: () =>
                  navigator.userActivation
                    ? navigator.userActivation.isActive
                    : ou.inEventHandler &&
                      ou.currentEventHandler.allowsDeferredCalls,
                runDeferredCalls() {
                  if (ou.canPerformEventHandlerRequests())
                    for (var e = 0; e < ou.deferredCalls.length; ++e) {
                      var t = ou.deferredCalls[e];
                      ou.deferredCalls.splice(e, 1),
                        --e,
                        t.targetFunction.apply(null, t.argsList);
                    }
                },
                eventHandlers: [],
                removeAllHandlersOnTarget: (e, t) => {
                  for (var r = 0; r < ou.eventHandlers.length; ++r)
                    ou.eventHandlers[r].target != e ||
                      (t && t != ou.eventHandlers[r].eventTypeString) ||
                      ou._removeHandler(r--);
                },
                _removeHandler(e) {
                  var t = ou.eventHandlers[e];
                  t.target.removeEventListener(
                    t.eventTypeString,
                    t.eventListenerFunc,
                    t.useCapture
                  ),
                    ou.eventHandlers.splice(e, 1);
                },
                registerOrRemoveHandler(e) {
                  if (!e.target) return -4;
                  if (e.callbackfunc)
                    (e.eventListenerFunc = function (t) {
                      ++ou.inEventHandler,
                        (ou.currentEventHandler = e),
                        ou.runDeferredCalls(),
                        e.handlerFunc(t),
                        ou.runDeferredCalls(),
                        --ou.inEventHandler;
                    }),
                      e.target.addEventListener(
                        e.eventTypeString,
                        e.eventListenerFunc,
                        e.useCapture
                      ),
                      ou.eventHandlers.push(e);
                  else
                    for (var t = 0; t < ou.eventHandlers.length; ++t)
                      ou.eventHandlers[t].target == e.target &&
                        ou.eventHandlers[t].eventTypeString ==
                          e.eventTypeString &&
                        ou._removeHandler(t--);
                  return 0;
                },
                getNodeNameForTarget: (e) =>
                  e
                    ? e == window
                      ? "#window"
                      : e == screen
                      ? "#screen"
                      : e?.nodeName || ""
                    : "",
                fullscreenEnabled: () =>
                  document.fullscreenEnabled ||
                  document.webkitFullscreenEnabled,
              },
              iu = ["default", "low-power", "high-performance"],
              au = [
                0,
                "undefined" != typeof document ? document : 0,
                "undefined" != typeof window ? window : 0,
              ],
              su = (e) => {
                var t;
                return (
                  (e = (t = e) > 2 ? ke(t) : t),
                  au[e] ||
                    ("undefined" != typeof document
                      ? document.querySelector(e)
                      : void 0)
                );
              },
              uu = (e, t) => {
                var r = t >> 2,
                  n = L[r + 6],
                  o = {
                    alpha: !!L[r + 0],
                    depth: !!L[r + 1],
                    stencil: !!L[r + 2],
                    antialias: !!L[r + 3],
                    premultipliedAlpha: !!L[r + 4],
                    preserveDrawingBuffer: !!L[r + 5],
                    powerPreference: iu[n],
                    failIfMajorPerformanceCaveat: !!L[r + 7],
                    majorVersion: L[r + 8],
                    minorVersion: L[r + 9],
                    enableExtensionsByDefault: L[r + 10],
                    explicitSwapControl: L[r + 11],
                    proxyContextToMainThread: L[r + 12],
                    renderViaOffscreenBackBuffer: L[r + 13],
                  },
                  i = su(e);
                return i
                  ? o.explicitSwapControl
                    ? 0
                    : mr.createContext(i, o)
                  : 0;
              },
              cu = {},
              lu = () => {
                if (!lu.strings) {
                  var e = {
                    USER: "web_user",
                    LOGNAME: "web_user",
                    PATH: "/",
                    PWD: "/",
                    HOME: "/home/web_user",
                    LANG:
                      (
                        ("object" == typeof navigator &&
                          navigator.languages &&
                          navigator.languages[0]) ||
                        "C"
                      ).replace("-", "_") + ".UTF-8",
                    _: p || "./this.program",
                  };
                  for (var t in cu)
                    void 0 === cu[t] ? delete e[t] : (e[t] = cu[t]);
                  var r = [];
                  for (var t in e) r.push(`${t}=${e[t]}`);
                  lu.strings = r;
                }
                return lu.strings;
              },
              du = (e, t, r, n) => {
                for (var o = 0, i = 0; i < r; i++) {
                  var a = R[t >> 2],
                    s = R[(t + 4) >> 2];
                  t += 8;
                  var u = Se.read(e, T, a, s, n);
                  if (u < 0) return -1;
                  if (((o += u), u < s)) break;
                  void 0 !== n && (n += u);
                }
                return o;
              },
              hu = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
              fu = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
              pu = (e, t) => {
                T.set(e, t);
              },
              mu = (e, t, r, n) => {
                var o = R[(n + 40) >> 2],
                  i = {
                    tm_sec: L[n >> 2],
                    tm_min: L[(n + 4) >> 2],
                    tm_hour: L[(n + 8) >> 2],
                    tm_mday: L[(n + 12) >> 2],
                    tm_mon: L[(n + 16) >> 2],
                    tm_year: L[(n + 20) >> 2],
                    tm_wday: L[(n + 24) >> 2],
                    tm_yday: L[(n + 28) >> 2],
                    tm_isdst: L[(n + 32) >> 2],
                    tm_gmtoff: L[(n + 36) >> 2],
                    tm_zone: o ? ke(o) : "",
                  },
                  a = ke(r),
                  s = {
                    "%c": "%a %b %d %H:%M:%S %Y",
                    "%D": "%m/%d/%y",
                    "%F": "%Y-%m-%d",
                    "%h": "%b",
                    "%r": "%I:%M:%S %p",
                    "%R": "%H:%M",
                    "%T": "%H:%M:%S",
                    "%x": "%m/%d/%y",
                    "%X": "%H:%M:%S",
                    "%Ec": "%c",
                    "%EC": "%C",
                    "%Ex": "%m/%d/%y",
                    "%EX": "%H:%M:%S",
                    "%Ey": "%y",
                    "%EY": "%Y",
                    "%Od": "%d",
                    "%Oe": "%e",
                    "%OH": "%H",
                    "%OI": "%I",
                    "%Om": "%m",
                    "%OM": "%M",
                    "%OS": "%S",
                    "%Ou": "%u",
                    "%OU": "%U",
                    "%OV": "%V",
                    "%Ow": "%w",
                    "%OW": "%W",
                    "%Oy": "%y",
                  };
                for (var u in s) a = a.replace(new RegExp(u, "g"), s[u]);
                var c = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  l = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ];
                function d(e, t, r) {
                  for (
                    var n = "number" == typeof e ? e.toString() : e || "";
                    n.length < t;

                  )
                    n = r[0] + n;
                  return n;
                }
                function h(e, t) {
                  return d(e, t, "0");
                }
                function f(e, t) {
                  function r(e) {
                    return e < 0 ? -1 : e > 0 ? 1 : 0;
                  }
                  var n;
                  return (
                    0 === (n = r(e.getFullYear() - t.getFullYear())) &&
                      0 === (n = r(e.getMonth() - t.getMonth())) &&
                      (n = r(e.getDate() - t.getDate())),
                    n
                  );
                }
                function p(e) {
                  switch (e.getDay()) {
                    case 0:
                      return new Date(e.getFullYear() - 1, 11, 29);
                    case 1:
                      return e;
                    case 2:
                      return new Date(e.getFullYear(), 0, 3);
                    case 3:
                      return new Date(e.getFullYear(), 0, 2);
                    case 4:
                      return new Date(e.getFullYear(), 0, 1);
                    case 5:
                      return new Date(e.getFullYear() - 1, 11, 31);
                    case 6:
                      return new Date(e.getFullYear() - 1, 11, 30);
                  }
                }
                function m(e) {
                  var t = ((e, t) => {
                      for (var r = new Date(e.getTime()); t > 0; ) {
                        var n = tr(r.getFullYear()),
                          o = r.getMonth(),
                          i = (n ? hu : fu)[o];
                        if (!(t > i - r.getDate()))
                          return r.setDate(r.getDate() + t), r;
                        (t -= i - r.getDate() + 1),
                          r.setDate(1),
                          o < 11
                            ? r.setMonth(o + 1)
                            : (r.setMonth(0),
                              r.setFullYear(r.getFullYear() + 1));
                      }
                      return r;
                    })(new Date(e.tm_year + 1900, 0, 1), e.tm_yday),
                    r = new Date(t.getFullYear(), 0, 4),
                    n = new Date(t.getFullYear() + 1, 0, 4),
                    o = p(r),
                    i = p(n);
                  return f(o, t) <= 0
                    ? f(i, t) <= 0
                      ? t.getFullYear() + 1
                      : t.getFullYear()
                    : t.getFullYear() - 1;
                }
                var g = {
                  "%a": (e) => c[e.tm_wday].substring(0, 3),
                  "%A": (e) => c[e.tm_wday],
                  "%b": (e) => l[e.tm_mon].substring(0, 3),
                  "%B": (e) => l[e.tm_mon],
                  "%C": (e) => h(((e.tm_year + 1900) / 100) | 0, 2),
                  "%d": (e) => h(e.tm_mday, 2),
                  "%e": (e) => d(e.tm_mday, 2, " "),
                  "%g": (e) => m(e).toString().substring(2),
                  "%G": m,
                  "%H": (e) => h(e.tm_hour, 2),
                  "%I": (e) => {
                    var t = e.tm_hour;
                    return 0 == t ? (t = 12) : t > 12 && (t -= 12), h(t, 2);
                  },
                  "%j": (e) =>
                    h(
                      e.tm_mday +
                        ((e, t) => {
                          for (var r = 0, n = 0; n <= t; r += e[n++]);
                          return r;
                        })(tr(e.tm_year + 1900) ? hu : fu, e.tm_mon - 1),
                      3
                    ),
                  "%m": (e) => h(e.tm_mon + 1, 2),
                  "%M": (e) => h(e.tm_min, 2),
                  "%n": () => "\n",
                  "%p": (e) => (e.tm_hour >= 0 && e.tm_hour < 12 ? "AM" : "PM"),
                  "%S": (e) => h(e.tm_sec, 2),
                  "%t": () => "\t",
                  "%u": (e) => e.tm_wday || 7,
                  "%U": (e) => {
                    var t = e.tm_yday + 7 - e.tm_wday;
                    return h(Math.floor(t / 7), 2);
                  },
                  "%V": (e) => {
                    var t = Math.floor(
                      (e.tm_yday + 7 - ((e.tm_wday + 6) % 7)) / 7
                    );
                    if (
                      ((e.tm_wday + 371 - e.tm_yday - 2) % 7 <= 2 && t++, t)
                    ) {
                      if (53 == t) {
                        var r = (e.tm_wday + 371 - e.tm_yday) % 7;
                        4 == r || (3 == r && tr(e.tm_year)) || (t = 1);
                      }
                    } else {
                      t = 52;
                      var n = (e.tm_wday + 7 - e.tm_yday - 1) % 7;
                      (4 == n || (5 == n && tr((e.tm_year % 400) - 1))) && t++;
                    }
                    return h(t, 2);
                  },
                  "%w": (e) => e.tm_wday,
                  "%W": (e) => {
                    var t = e.tm_yday + 7 - ((e.tm_wday + 6) % 7);
                    return h(Math.floor(t / 7), 2);
                  },
                  "%y": (e) => (e.tm_year + 1900).toString().substring(2),
                  "%Y": (e) => e.tm_year + 1900,
                  "%z": (e) => {
                    var t = e.tm_gmtoff,
                      r = t >= 0;
                    return (
                      (t = ((t = Math.abs(t) / 60) / 60) * 100 + (t % 60)),
                      (r ? "+" : "-") + String("0000" + t).slice(-4)
                    );
                  },
                  "%Z": (e) => e.tm_zone,
                  "%%": () => "%",
                };
                for (var u in ((a = a.replace(/%%/g, "\0\0")), g))
                  a.includes(u) && (a = a.replace(new RegExp(u, "g"), g[u](i)));
                var v = ye((a = a.replace(/\0\0/g, "%")), !1);
                return v.length > t ? 0 : (pu(v, e), v.length - 1);
              },
              gu = (e) => {
                var t = ge(e) + 1,
                  r = $u(t);
                return $t(e, r, t), r;
              },
              vu = function (e, t, r, n) {
                e || (e = this),
                  (this.parent = e),
                  (this.mount = e.mount),
                  (this.mounted = null),
                  (this.id = Se.nextInode++),
                  (this.name = t),
                  (this.mode = r),
                  (this.node_ops = {}),
                  (this.stream_ops = {}),
                  (this.rdev = n);
              },
              yu = 365,
              bu = 146;
            Object.defineProperties(vu.prototype, {
              read: {
                get: function () {
                  return (this.mode & yu) === yu;
                },
                set: function (e) {
                  e ? (this.mode |= yu) : (this.mode &= -366);
                },
              },
              write: {
                get: function () {
                  return (this.mode & bu) === bu;
                },
                set: function (e) {
                  e ? (this.mode |= bu) : (this.mode &= -147);
                },
              },
              isFolder: {
                get: function () {
                  return Se.isDir(this.mode);
                },
              },
              isDevice: {
                get: function () {
                  return Se.isChrdev(this.mode);
                },
              },
            }),
              (Se.FSNode = vu),
              (Se.createPreloadedFile = (e, t, r, n, o, i, a, s, u, c) => {
                var d = t ? he.resolve(le.join2(e, t)) : e;
                function h(r) {
                  function l(r) {
                    c?.(),
                      s ||
                        ((e, t, r, n, o, i) => {
                          Se.createDataFile(e, t, r, n, o, i);
                        })(e, t, r, n, o, u),
                      i?.(),
                      Y();
                  }
                  ((e, t, r, n) => {
                    void 0 !== fr && fr.init();
                    var o = !1;
                    return (
                      Ee.forEach((i) => {
                        o ||
                          (i.canHandle(t) && (i.handle(e, t, r, n), (o = !0)));
                      }),
                      o
                    );
                  })(r, d, l, () => {
                    a?.(), Y();
                  }) || l(r);
                }
                X(),
                  "string" == typeof r
                    ? ((e, t, r, n) => {
                        var o = n ? "" : `al ${e}`;
                        l(
                          e,
                          (e) => {
                            t(new Uint8Array(e)), o && Y();
                          },
                          (t) => {
                            if (!r) throw `Loading data file "${e}" failed.`;
                            r();
                          }
                        ),
                          o && X();
                      })(r, h, a)
                    : h(r);
              }),
              Se.staticInit(),
              (u.FS_createPath = Se.createPath),
              (u.FS_createDataFile = Se.createDataFile),
              (u.FS_createPreloadedFile = Se.createPreloadedFile),
              (u.FS_unlink = Se.unlink),
              (u.FS_createLazyFile = Se.createLazyFile),
              (u.FS_createDevice = Se.createDevice),
              (Fe = u.InternalError =
                class InternalError extends Error {
                  constructor(e) {
                    super(e), (this.name = "InternalError");
                  }
                }),
              (() => {
                for (var e = new Array(256), t = 0; t < 256; ++t)
                  e[t] = String.fromCharCode(t);
                Le = e;
              })(),
              (Re = u.BindingError =
                class BindingError extends Error {
                  constructor(e) {
                    super(e), (this.name = "BindingError");
                  }
                }),
              Object.assign(ut.prototype, {
                isAliasOf(e) {
                  if (!(this instanceof ut)) return !1;
                  if (!(e instanceof ut)) return !1;
                  var t = this.$$.ptrType.registeredClass,
                    r = this.$$.ptr;
                  e.$$ = e.$$;
                  for (
                    var n = e.$$.ptrType.registeredClass, o = e.$$.ptr;
                    t.baseClass;

                  )
                    (r = t.upcast(r)), (t = t.baseClass);
                  for (; n.baseClass; ) (o = n.upcast(o)), (n = n.baseClass);
                  return t === n && r === o;
                },
                clone() {
                  if (
                    (this.$$.ptr || We(this), this.$$.preservePointerOnDelete)
                  )
                    return (this.$$.count.value += 1), this;
                  var e,
                    t = st(
                      Object.create(Object.getPrototypeOf(this), {
                        $$: {
                          value:
                            ((e = this.$$),
                            {
                              count: e.count,
                              deleteScheduled: e.deleteScheduled,
                              preservePointerOnDelete:
                                e.preservePointerOnDelete,
                              ptr: e.ptr,
                              ptrType: e.ptrType,
                              smartPtr: e.smartPtr,
                              smartPtrType: e.smartPtrType,
                            }),
                        },
                      })
                    );
                  return (
                    (t.$$.count.value += 1), (t.$$.deleteScheduled = !1), t
                  );
                },
                delete() {
                  this.$$.ptr || We(this),
                    this.$$.deleteScheduled &&
                      !this.$$.preservePointerOnDelete &&
                      qe("Object already scheduled for deletion"),
                    Xe(this),
                    Ye(this.$$),
                    this.$$.preservePointerOnDelete ||
                      ((this.$$.smartPtr = void 0), (this.$$.ptr = void 0));
                },
                isDeleted() {
                  return !this.$$.ptr;
                },
                deleteLater() {
                  return (
                    this.$$.ptr || We(this),
                    this.$$.deleteScheduled &&
                      !this.$$.preservePointerOnDelete &&
                      qe("Object already scheduled for deletion"),
                    et.push(this),
                    1 === et.length && Ne && Ne(tt),
                    (this.$$.deleteScheduled = !0),
                    this
                  );
                },
              }),
              (u.getInheritedInstanceCount = Qe),
              (u.getLiveInheritedInstances = Je),
              (u.flushPendingDeletes = tt),
              (u.setDelayFunction = rt),
              Object.assign(yt.prototype, {
                getPointee(e) {
                  return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
                },
                destructor(e) {
                  this.rawDestructor?.(e);
                },
                argPackAdvance: ze,
                readValueFromPointer: vt,
                fromWireType: at,
              }),
              (_t = u.UnboundTypeError =
                ((ko = Error),
                ((To = ct((xo = "UnboundTypeError"), function (e) {
                  (this.name = xo), (this.message = e);
                  var t = new Error(e).stack;
                  void 0 !== t &&
                    (this.stack =
                      this.toString() +
                      "\n" +
                      t.replace(/^Error(:[^\n]*)?\n/, ""));
                })).prototype = Object.create(ko.prototype)),
                (To.prototype.constructor = To),
                (To.prototype.toString = function () {
                  return void 0 === this.message
                    ? this.name
                    : `${this.name}: ${this.message}`;
                }),
                To)),
              Rt.allocated.push(
                { value: void 0 },
                { value: null },
                { value: !0 },
                { value: !1 }
              ),
              Object.assign(Rt, { reserved: Rt.allocated.length }),
              (u.count_emval_handles = Dt),
              (u.requestFullscreen = fr.requestFullscreen),
              (u.requestAnimationFrame = fr.requestAnimationFrame),
              (u.setCanvasSize = fr.setCanvasSize),
              (u.pauseMainLoop = fr.mainLoop.pause),
              (u.resumeMainLoop = fr.mainLoop.resume),
              (u.getUserMedia = fr.getUserMedia),
              (u.createContext = fr.createContext);
            for (var wu, _u = {}, Eu = {}, Cu = 0; Cu < 32; ++Cu)
              qn.push(new Array(Cu));
            var Su = new Float32Array(288);
            for (Cu = 0; Cu < 288; ++Cu) Qa[Cu] = Su.subarray(0, Cu + 1);
            var ku = new Int32Array(288);
            for (Cu = 0; Cu < 288; ++Cu) ts[Cu] = ku.subarray(0, Cu + 1);
            var xu,
              Tu = {
                Qa: (e) => {
                  var t = new ExceptionInfo(e);
                  return (
                    t.get_caught() || t.set_caught(!0),
                    t.set_rethrown(!1),
                    se.push(t),
                    Hu(t.excPtr),
                    t.get_exception_ptr()
                  );
                },
                Pa: () => {
                  Iu(0, 0);
                  var e = se.pop();
                  qu(e.excPtr), (ue = 0);
                },
                o: () => ce([]),
                ca: (e) => ce([e]),
                l: (e, t, r) => {
                  throw (new ExceptionInfo(e).init(t, r), (ue = e));
                },
                O: (e) => {
                  throw (ue || (ue = e), ue);
                },
                Ib: function (e, t) {
                  try {
                    return (e = xe.getStr(e)), Se.chmod(e, t), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                Jb: function (e, t) {
                  try {
                    return Se.fchmod(e, t), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                ia: function (e, t, r) {
                  xe.varargs = r;
                  try {
                    var n = xe.getStreamFromFD(e);
                    switch (t) {
                      case 0:
                        if ((o = xe.get()) < 0) return -28;
                        for (; Se.streams[o]; ) o++;
                        return Se.createStream(n, o).fd;
                      case 1:
                      case 2:
                      case 13:
                      case 14:
                        return 0;
                      case 3:
                        return n.flags;
                      case 4:
                        var o = xe.get();
                        return (n.flags |= o), 0;
                      case 12:
                        return (o = xe.getp()), (P[(o + 0) >> 1] = 2), 0;
                    }
                    return -28;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                Hb: function (e, t) {
                  try {
                    var r = xe.getStreamFromFD(e);
                    return xe.doStat(Se.stat, r.path, t);
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                Mb: function (e, t, r) {
                  xe.varargs = r;
                  try {
                    var n = xe.getStreamFromFD(e);
                    switch (t) {
                      case 21509:
                      case 21510:
                      case 21511:
                      case 21512:
                      case 21524:
                      case 21515:
                        return n.tty ? 0 : -59;
                      case 21505:
                        if (!n.tty) return -59;
                        if (n.tty.ops.ioctl_tcgets) {
                          var o = n.tty.ops.ioctl_tcgets(n),
                            i = xe.getp();
                          (L[i >> 2] = o.c_iflag || 0),
                            (L[(i + 4) >> 2] = o.c_oflag || 0),
                            (L[(i + 8) >> 2] = o.c_cflag || 0),
                            (L[(i + 12) >> 2] = o.c_lflag || 0);
                          for (var a = 0; a < 32; a++)
                            T[(i + a + 17) >> 0] = o.c_cc[a] || 0;
                          return 0;
                        }
                        return 0;
                      case 21506:
                      case 21507:
                      case 21508:
                        if (!n.tty) return -59;
                        if (n.tty.ops.ioctl_tcsets) {
                          i = xe.getp();
                          var s = L[i >> 2],
                            u = L[(i + 4) >> 2],
                            c = L[(i + 8) >> 2],
                            l = L[(i + 12) >> 2],
                            d = [];
                          for (a = 0; a < 32; a++) d.push(T[(i + a + 17) >> 0]);
                          return n.tty.ops.ioctl_tcsets(n.tty, t, {
                            c_iflag: s,
                            c_oflag: u,
                            c_cflag: c,
                            c_lflag: l,
                            c_cc: d,
                          });
                        }
                        return 0;
                      case 21519:
                        return n.tty
                          ? ((i = xe.getp()), (L[i >> 2] = 0), 0)
                          : -59;
                      case 21520:
                        return n.tty ? -28 : -59;
                      case 21531:
                        return (i = xe.getp()), Se.ioctl(n, t, i);
                      case 21523:
                        if (!n.tty) return -59;
                        if (n.tty.ops.ioctl_tiocgwinsz) {
                          var h = n.tty.ops.ioctl_tiocgwinsz(n.tty);
                          (i = xe.getp()),
                            (P[i >> 1] = h[0]),
                            (P[(i + 2) >> 1] = h[1]);
                        }
                        return 0;
                      default:
                        return -28;
                    }
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                Fb: function (e, t) {
                  try {
                    return (e = xe.getStr(e)), xe.doStat(Se.lstat, e, t);
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                Db: function (e, t, r, n) {
                  try {
                    t = xe.getStr(t);
                    var o = 256 & n,
                      i = 4096 & n;
                    return (
                      (n &= -6401),
                      (t = xe.calculateAt(e, t, i)),
                      xe.doStat(o ? Se.lstat : Se.stat, t, r)
                    );
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                va: function (e, t, r, n) {
                  xe.varargs = n;
                  try {
                    (t = xe.getStr(t)), (t = xe.calculateAt(e, t));
                    var o = n ? xe.get() : 0;
                    return Se.open(t, r, o).fd;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                rb: function (e, t, r, n) {
                  try {
                    return (
                      (t = xe.getStr(t)),
                      (n = xe.getStr(n)),
                      (t = xe.calculateAt(e, t)),
                      (n = xe.calculateAt(r, n)),
                      Se.rename(t, n),
                      0
                    );
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                sb: function (e) {
                  try {
                    return (e = xe.getStr(e)), Se.rmdir(e), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                Gb: function (e, t) {
                  try {
                    return (e = xe.getStr(e)), xe.doStat(Se.stat, e, t);
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                tb: function (e, t, r) {
                  try {
                    return (
                      (t = xe.getStr(t)),
                      (t = xe.calculateAt(e, t)),
                      0 === r
                        ? Se.unlink(t)
                        : 512 === r
                        ? Se.rmdir(t)
                        : K("Invalid flags passed to unlinkat"),
                      0
                    );
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                Ba: (e) => {
                  var t = Te[e];
                  delete Te[e];
                  var r = t.elements,
                    n = r.length,
                    o = r
                      .map((e) => e.getterReturnType)
                      .concat(r.map((e) => e.setterArgumentType)),
                    i = t.rawConstructor,
                    a = t.rawDestructor;
                  Ie([e], o, function (e) {
                    return (
                      r.forEach((t, r) => {
                        var o = e[r],
                          i = t.getter,
                          a = t.getterContext,
                          s = e[r + n],
                          u = t.setter,
                          c = t.setterContext;
                        (t.read = (e) => o.fromWireType(i(a, e))),
                          (t.write = (e, t) => {
                            var r = [];
                            u(c, e, s.toWireType(r, t)), Ae(r);
                          });
                      }),
                      [
                        {
                          name: t.name,
                          fromWireType: (e) => {
                            for (var t = new Array(n), o = 0; o < n; ++o)
                              t[o] = r[o].read(e);
                            return a(e), t;
                          },
                          toWireType: (e, o) => {
                            if (n !== o.length)
                              throw new TypeError(
                                `Incorrect number of tuple elements for ${t.name}: expected=${n}, actual=${o.length}`
                              );
                            for (var s = i(), u = 0; u < n; ++u)
                              r[u].write(s, o[u]);
                            return null !== e && e.push(a, s), s;
                          },
                          argPackAdvance: ze,
                          readValueFromPointer: Pe,
                          destructorFunction: a,
                        },
                      ]
                    );
                  });
                },
                A: (e) => {
                  var t = je[e];
                  delete je[e];
                  var r = t.rawConstructor,
                    n = t.rawDestructor,
                    o = t.fields,
                    i = o
                      .map((e) => e.getterReturnType)
                      .concat(o.map((e) => e.setterArgumentType));
                  Ie([e], i, (e) => {
                    var i = {};
                    return (
                      o.forEach((t, r) => {
                        var n = t.fieldName,
                          a = e[r],
                          s = t.getter,
                          u = t.getterContext,
                          c = e[r + o.length],
                          l = t.setter,
                          d = t.setterContext;
                        i[n] = {
                          read: (e) => a.fromWireType(s(u, e)),
                          write: (e, t) => {
                            var r = [];
                            l(d, e, c.toWireType(r, t)), Ae(r);
                          },
                        };
                      }),
                      [
                        {
                          name: t.name,
                          fromWireType: (e) => {
                            var t = {};
                            for (var r in i) t[r] = i[r].read(e);
                            return n(e), t;
                          },
                          toWireType: (e, t) => {
                            for (var o in i)
                              if (!(o in t))
                                throw new TypeError(`Missing field: "${o}"`);
                            var a = r();
                            for (o in i) i[o].write(a, t[o]);
                            return null !== e && e.push(n, a), a;
                          },
                          argPackAdvance: ze,
                          readValueFromPointer: Pe,
                          destructorFunction: n,
                        },
                      ]
                    );
                  });
                },
                Ea: (e, t, r, n, o) => {
                  var i = -1 != (t = $e(t)).indexOf("u");
                  He(e, {
                    name: t,
                    fromWireType: (e) => e,
                    toWireType: function (e, t) {
                      if ("bigint" != typeof t && "number" != typeof t)
                        throw new TypeError(
                          `Cannot convert "${Ue(t)}" to ${this.name}`
                        );
                      return "number" == typeof t && (t = BigInt(t)), t;
                    },
                    argPackAdvance: ze,
                    readValueFromPointer: Ve(t, r, !i),
                    destructorFunction: null,
                  });
                },
                ue: (e, t, r, n) => {
                  He(e, {
                    name: (t = $e(t)),
                    fromWireType: function (e) {
                      return !!e;
                    },
                    toWireType: function (e, t) {
                      return t ? r : n;
                    },
                    argPackAdvance: ze,
                    readValueFromPointer: function (e) {
                      return this.fromWireType(A[e]);
                    },
                    destructorFunction: null,
                  });
                },
                v: (e, t, r, n, o, i, a, s, u, c, l, d, h) => {
                  (l = $e(l)),
                    (i = kt(o, i)),
                    (s &&= kt(a, s)),
                    (c &&= kt(u, c)),
                    (h = kt(d, h));
                  var f = ((e) => {
                    if (void 0 === e) return "_unknown";
                    var t = (e = e.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(
                      0
                    );
                    return t >= 48 && t <= 57 ? `_${e}` : e;
                  })(l);
                  dt(f, function () {
                    Tt(`Cannot construct ${l} due to unbound types`, [n]);
                  }),
                    Ie([e, t, r], n ? [n] : [], function (t) {
                      var r, o;
                      (t = t[0]),
                        (o = n
                          ? (r = t.registeredClass).instancePrototype
                          : ut.prototype);
                      var a = ct(l, function () {
                          if (Object.getPrototypeOf(this) !== u)
                            throw new Re("Use 'new' to construct " + l);
                          if (void 0 === d.constructor_body)
                            throw new Re(l + " has no accessible constructor");
                          var e = d.constructor_body[arguments.length];
                          if (void 0 === e)
                            throw new Re(
                              `Tried to invoke ctor of ${l} with invalid number of parameters (${
                                arguments.length
                              }) - expected (${Object.keys(
                                d.constructor_body
                              ).toString()}) parameters instead!`
                            );
                          return e.apply(this, arguments);
                        }),
                        u = Object.create(o, { constructor: { value: a } });
                      a.prototype = u;
                      var d = new ht(l, a, u, h, r, i, s, c);
                      d.baseClass &&
                        ((d.baseClass.__derivedClasses ??= []),
                        d.baseClass.__derivedClasses.push(d));
                      var p = new yt(l, d, !0, !1, !1),
                        m = new yt(l + "*", d, !1, !1, !1),
                        g = new yt(l + " const*", d, !1, !0, !1);
                      return (
                        (Ze[e] = { pointerType: m, constPointerType: g }),
                        Et(f, a),
                        [p, m, g]
                      );
                    });
                },
                x: (e, t, r, n, o, i) => {
                  var a = At(t, r);
                  (o = kt(n, o)),
                    Ie([], [e], function (e) {
                      var r = `constructor ${(e = e[0]).name}`;
                      if (
                        (void 0 === e.registeredClass.constructor_body &&
                          (e.registeredClass.constructor_body = []),
                        void 0 !== e.registeredClass.constructor_body[t - 1])
                      )
                        throw new Re(
                          `Cannot register multiple constructors with identical number of parameters (${
                            t - 1
                          }) for class '${
                            e.name
                          }'! Overload resolution is currently only performed using the parameter count, not actual type info!`
                        );
                      return (
                        (e.registeredClass.constructor_body[t - 1] = () => {
                          Tt(
                            `Cannot construct ${e.name} due to unbound types`,
                            a
                          );
                        }),
                        Ie(
                          [],
                          a,
                          (n) => (
                            n.splice(1, 0, null),
                            (e.registeredClass.constructor_body[t - 1] = Pt(
                              r,
                              n,
                              null,
                              o,
                              i
                            )),
                            []
                          )
                        ),
                        []
                      );
                    });
                },
                d: (e, t, r, n, o, i, a, s, u) => {
                  var c = At(r, n);
                  (t = $e(t)),
                    (t = Lt(t)),
                    (i = kt(o, i)),
                    Ie([], [e], function (e) {
                      var n = `${(e = e[0]).name}.${t}`;
                      function o() {
                        Tt(`Cannot call ${n} due to unbound types`, c);
                      }
                      t.startsWith("@@") && (t = Symbol[t.substring(2)]),
                        s && e.registeredClass.pureVirtualFunctions.push(t);
                      var u = e.registeredClass.instancePrototype,
                        l = u[t];
                      return (
                        void 0 === l ||
                        (void 0 === l.overloadTable &&
                          l.className !== e.name &&
                          l.argCount === r - 2)
                          ? ((o.argCount = r - 2),
                            (o.className = e.name),
                            (u[t] = o))
                          : (lt(u, t, n), (u[t].overloadTable[r - 2] = o)),
                        Ie([], c, function (o) {
                          var s = Pt(n, o, e, i, a);
                          return (
                            void 0 === u[t].overloadTable
                              ? ((s.argCount = r - 2), (u[t] = s))
                              : (u[t].overloadTable[r - 2] = s),
                            []
                          );
                        }),
                        []
                      );
                    });
                },
                te: (e) => He(e, Ot),
                ba: (e, t, r, n) => {
                  function o() {}
                  (t = $e(t)),
                    (o.values = {}),
                    He(e, {
                      name: t,
                      constructor: o,
                      fromWireType: function (e) {
                        return this.constructor.values[e];
                      },
                      toWireType: (e, t) => t.value,
                      argPackAdvance: ze,
                      readValueFromPointer: It(t, r, n),
                      destructorFunction: null,
                    }),
                    dt(t, o);
                },
                I: (e, t, r) => {
                  var n = jt(e, "enum");
                  t = $e(t);
                  var o = n.constructor,
                    i = Object.create(n.constructor.prototype, {
                      value: { value: r },
                      constructor: {
                        value: ct(`${n.name}_${t}`, function () {}),
                      },
                    });
                  (o.values[r] = i), (o[t] = i);
                },
                Da: (e, t, r) => {
                  He(e, {
                    name: (t = $e(t)),
                    fromWireType: (e) => e,
                    toWireType: (e, t) => t,
                    argPackAdvance: ze,
                    readValueFromPointer: Ut(t, r),
                    destructorFunction: null,
                  });
                },
                J: (e, t, r, n, o, i, a) => {
                  var s = At(t, r);
                  (e = $e(e)),
                    (e = Lt(e)),
                    (o = kt(n, o)),
                    dt(
                      e,
                      function () {
                        Tt(`Cannot call ${e} due to unbound types`, s);
                      },
                      t - 1
                    ),
                    Ie([], s, function (r) {
                      var n = [r[0], null].concat(r.slice(1));
                      return Et(e, Pt(e, n, null, o, i), t - 1), [];
                    });
                },
                Q: (e, t, r, n, o) => {
                  (t = $e(t)), -1 === o && (o = 4294967295);
                  var i = (e) => e;
                  if (0 === n) {
                    var a = 32 - 8 * r;
                    i = (e) => (e << a) >>> a;
                  }
                  var s = t.includes("unsigned");
                  He(e, {
                    name: t,
                    fromWireType: i,
                    toWireType: s
                      ? function (e, t) {
                          return this.name, t >>> 0;
                        }
                      : function (e, t) {
                          return this.name, t;
                        },
                    argPackAdvance: ze,
                    readValueFromPointer: Ve(t, r, 0 !== n),
                    destructorFunction: null,
                  });
                },
                E: (e, t, r) => {
                  var n = [
                    Int8Array,
                    Uint8Array,
                    Int16Array,
                    Uint16Array,
                    Int32Array,
                    Uint32Array,
                    Float32Array,
                    Float64Array,
                    BigInt64Array,
                    BigUint64Array,
                  ][t];
                  function o(e) {
                    var t = R[e >> 2],
                      r = R[(e + 4) >> 2];
                    return new n(T.buffer, r, t);
                  }
                  He(
                    e,
                    {
                      name: (r = $e(r)),
                      fromWireType: o,
                      argPackAdvance: ze,
                      readValueFromPointer: o,
                    },
                    { ignoreDuplicateRegistrations: !0 }
                  );
                },
                kf: (e, t, r, n, o, i, a, s, u, c, l, d) => {
                  (r = $e(r)),
                    (i = kt(o, i)),
                    (s = kt(a, s)),
                    (c = kt(u, c)),
                    (d = kt(l, d)),
                    Ie([e], [t], function (e) {
                      return (
                        (e = e[0]),
                        [
                          new yt(
                            r,
                            e.registeredClass,
                            !1,
                            !1,
                            !0,
                            e,
                            n,
                            i,
                            s,
                            c,
                            d
                          ),
                        ]
                      );
                    });
                },
                Fa: (e, t) => {
                  var r = "std::string" === (t = $e(t));
                  He(e, {
                    name: t,
                    fromWireType(e) {
                      var t,
                        n = R[e >> 2],
                        o = e + 4;
                      if (r)
                        for (var i = o, a = 0; a <= n; ++a) {
                          var s = o + a;
                          if (a == n || 0 == A[s]) {
                            var u = ke(i, s - i);
                            void 0 === t
                              ? (t = u)
                              : ((t += String.fromCharCode(0)), (t += u)),
                              (i = s + 1);
                          }
                        }
                      else {
                        var c = new Array(n);
                        for (a = 0; a < n; ++a)
                          c[a] = String.fromCharCode(A[o + a]);
                        t = c.join("");
                      }
                      return Lu(e), t;
                    },
                    toWireType(e, t) {
                      var n;
                      t instanceof ArrayBuffer && (t = new Uint8Array(t));
                      var o = "string" == typeof t;
                      o ||
                        t instanceof Uint8Array ||
                        t instanceof Uint8ClampedArray ||
                        t instanceof Int8Array ||
                        qe("Cannot pass non-string to std::string"),
                        (n = r && o ? ge(t) : t.length);
                      var i = Pu(4 + n + 1),
                        a = i + 4;
                      if (((R[i >> 2] = n), r && o)) $t(t, a, n + 1);
                      else if (o)
                        for (var s = 0; s < n; ++s) {
                          var u = t.charCodeAt(s);
                          u > 255 &&
                            (Lu(a),
                            qe(
                              "String has UTF-16 code units that do not fit in 8 bits"
                            )),
                            (A[a + s] = u);
                        }
                      else for (s = 0; s < n; ++s) A[a + s] = t[s];
                      return null !== e && e.push(Lu, i), i;
                    },
                    argPackAdvance: ze,
                    readValueFromPointer: vt,
                    destructorFunction(e) {
                      Lu(e);
                    },
                  });
                },
                ja: (e, t, r) => {
                  var n, o, i, a, s;
                  (r = $e(r)),
                    2 === t
                      ? ((n = Ht), (o = Nt), (a = Vt), (i = () => F), (s = 1))
                      : 4 === t &&
                        ((n = zt), (o = Wt), (a = Gt), (i = () => R), (s = 2)),
                    He(e, {
                      name: r,
                      fromWireType: (e) => {
                        for (
                          var r, o = R[e >> 2], a = i(), u = e + 4, c = 0;
                          c <= o;
                          ++c
                        ) {
                          var l = e + 4 + c * t;
                          if (c == o || 0 == a[l >> s]) {
                            var d = n(u, l - u);
                            void 0 === r
                              ? (r = d)
                              : ((r += String.fromCharCode(0)), (r += d)),
                              (u = l + t);
                          }
                        }
                        return Lu(e), r;
                      },
                      toWireType: (e, n) => {
                        "string" != typeof n &&
                          qe(`Cannot pass non-string to C++ string type ${r}`);
                        var i = a(n),
                          u = Pu(4 + i + t);
                        return (
                          (R[u >> 2] = i >> s),
                          o(n, u + 4, i + t),
                          null !== e && e.push(Lu, u),
                          u
                        );
                      },
                      argPackAdvance: ze,
                      readValueFromPointer: Pe,
                      destructorFunction(e) {
                        Lu(e);
                      },
                    });
                },
                Ca: (e, t, r, n, o, i) => {
                  Te[e] = {
                    name: $e(t),
                    rawConstructor: kt(r, n),
                    rawDestructor: kt(o, i),
                    elements: [],
                  };
                },
                P: (e, t, r, n, o, i, a, s, u) => {
                  Te[e].elements.push({
                    getterReturnType: t,
                    getter: kt(r, n),
                    getterContext: o,
                    setterArgumentType: i,
                    setter: kt(a, s),
                    setterContext: u,
                  });
                },
                B: (e, t, r, n, o, i) => {
                  je[e] = {
                    name: $e(t),
                    rawConstructor: kt(r, n),
                    rawDestructor: kt(o, i),
                    fields: [],
                  };
                },
                m: (e, t, r, n, o, i, a, s, u, c) => {
                  je[e].fields.push({
                    fieldName: $e(t),
                    getterReturnType: r,
                    getter: kt(n, o),
                    getterContext: i,
                    setterArgumentType: a,
                    setter: kt(s, u),
                    setterContext: c,
                  });
                },
                ve: (e, t) => {
                  He(e, {
                    isVoid: !0,
                    name: (t = $e(t)),
                    argPackAdvance: 0,
                    fromWireType: () => {},
                    toWireType: (e, t) => {},
                  });
                },
                Lb: () => 1,
                mb: () => {
                  throw 1 / 0;
                },
                j: (e, t, r) => (
                  (e = Mt.toValue(e)), (t = jt(t, "emval::as")), Xt(t, r, e)
                ),
                w: (e, t, r, n) => (e = Yt[e])(null, (t = Mt.toValue(t)), r, n),
                K: (e, t, r, n, o) =>
                  (e = Yt[e])((t = Mt.toValue(t)), t[(r = Zt(r))], n, o),
                c: Bt,
                se: (e, t) => (e = Mt.toValue(e)) == (t = Mt.toValue(t)),
                L: (e) =>
                  0 === e
                    ? Mt.toHandle(Qt())
                    : ((e = Zt(e)), Mt.toHandle(Qt()[e])),
                s: (e, t, r) => {
                  var n = ((e, t) => {
                      for (var r = new Array(e), n = 0; n < e; ++n)
                        r[n] = jt(R[(t + 4 * n) >> 2], "parameter " + n);
                      return r;
                    })(e, t),
                    o = n.shift();
                  e--;
                  var i,
                    a,
                    s = new Array(e),
                    u = `methodCaller<(${n.map((e) => e.name).join(", ")}) => ${
                      o.name
                    }>`;
                  return (
                    (i = ct(u, (t, i, a, u) => {
                      for (var c = 0, l = 0; l < e; ++l)
                        (s[l] = n[l].readValueFromPointer(u + c)),
                          (c += n[l].argPackAdvance);
                      var d = 1 === r ? Jt(i, s) : i.apply(t, s);
                      return Xt(o, a, d);
                    })),
                    (a = Yt.length),
                    Yt.push(i),
                    a
                  );
                },
                h: (e, t) => (
                  (e = Mt.toValue(e)), (t = Mt.toValue(t)), Mt.toHandle(e[t])
                ),
                e: (e) => {
                  e > 4 && (Rt.get(e).refcount += 1);
                },
                W: (e, t) => (e = Mt.toValue(e)) instanceof (t = Mt.toValue(t)),
                ma: (e) => "number" == typeof (e = Mt.toValue(e)),
                M: (e) => "string" == typeof (e = Mt.toValue(e)),
                Ka: () => Mt.toHandle([]),
                f: (e) => Mt.toHandle(Zt(e)),
                y: () => Mt.toHandle({}),
                i: (e) => {
                  var t = Mt.toValue(e);
                  Ae(t), Bt(e);
                },
                k: (e, t, r) => {
                  (e = Mt.toValue(e)),
                    (t = Mt.toValue(t)),
                    (r = Mt.toValue(r)),
                    (e[t] = r);
                },
                g: (e, t) => {
                  var r = (e = jt(e, "_emval_take_value")).readValueFromPointer(
                    t
                  );
                  return Mt.toHandle(r);
                },
                vf: (e) => {
                  throw (e = Mt.toValue(e));
                },
                xd: (e) => ((e = Mt.toValue(e)), Mt.toHandle(typeof e)),
                xb: function (e, t) {
                  e = er(e);
                  var r = new Date(1e3 * e);
                  (L[t >> 2] = r.getUTCSeconds()),
                    (L[(t + 4) >> 2] = r.getUTCMinutes()),
                    (L[(t + 8) >> 2] = r.getUTCHours()),
                    (L[(t + 12) >> 2] = r.getUTCDate()),
                    (L[(t + 16) >> 2] = r.getUTCMonth()),
                    (L[(t + 20) >> 2] = r.getUTCFullYear() - 1900),
                    (L[(t + 24) >> 2] = r.getUTCDay());
                  var n = Date.UTC(r.getUTCFullYear(), 0, 1, 0, 0, 0, 0),
                    o = ((r.getTime() - n) / 864e5) | 0;
                  L[(t + 28) >> 2] = o;
                },
                yb: function (e, t) {
                  e = er(e);
                  var r = new Date(1e3 * e);
                  (L[t >> 2] = r.getSeconds()),
                    (L[(t + 4) >> 2] = r.getMinutes()),
                    (L[(t + 8) >> 2] = r.getHours()),
                    (L[(t + 12) >> 2] = r.getDate()),
                    (L[(t + 16) >> 2] = r.getMonth()),
                    (L[(t + 20) >> 2] = r.getFullYear() - 1900),
                    (L[(t + 24) >> 2] = r.getDay());
                  var n = 0 | or(r);
                  (L[(t + 28) >> 2] = n),
                    (L[(t + 36) >> 2] = -60 * r.getTimezoneOffset());
                  var o = new Date(r.getFullYear(), 0, 1),
                    i = new Date(r.getFullYear(), 6, 1).getTimezoneOffset(),
                    a = o.getTimezoneOffset(),
                    s = 0 | (i != a && r.getTimezoneOffset() == Math.min(a, i));
                  L[(t + 32) >> 2] = s;
                },
                zb: function (e) {
                  var t = (() => {
                    var t = new Date(
                        L[(e + 20) >> 2] + 1900,
                        L[(e + 16) >> 2],
                        L[(e + 12) >> 2],
                        L[(e + 8) >> 2],
                        L[(e + 4) >> 2],
                        L[e >> 2],
                        0
                      ),
                      r = L[(e + 32) >> 2],
                      n = t.getTimezoneOffset(),
                      o = new Date(t.getFullYear(), 0, 1),
                      i = new Date(t.getFullYear(), 6, 1).getTimezoneOffset(),
                      a = o.getTimezoneOffset(),
                      s = Math.min(a, i);
                    if (r < 0) L[(e + 32) >> 2] = Number(i != a && s == n);
                    else if (r > 0 != (s == n)) {
                      var u = Math.max(a, i),
                        c = r > 0 ? s : u;
                      t.setTime(t.getTime() + 6e4 * (c - n));
                    }
                    L[(e + 24) >> 2] = t.getDay();
                    var l = 0 | or(t);
                    (L[(e + 28) >> 2] = l),
                      (L[e >> 2] = t.getSeconds()),
                      (L[(e + 4) >> 2] = t.getMinutes()),
                      (L[(e + 8) >> 2] = t.getHours()),
                      (L[(e + 12) >> 2] = t.getDate()),
                      (L[(e + 16) >> 2] = t.getMonth()),
                      (L[(e + 20) >> 2] = t.getYear());
                    var d = t.getTime();
                    return isNaN(d) ? -1 : d / 1e3;
                  })();
                  return BigInt(t);
                },
                vb: function (e, t, r, n, o, i, a) {
                  o = er(o);
                  try {
                    if (isNaN(o)) return 61;
                    var s = xe.getStreamFromFD(n),
                      u = Se.mmap(s, e, o, t, r),
                      c = u.ptr;
                    return (L[i >> 2] = u.allocated), (R[a >> 2] = c), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                wb: function (e, t, r, n, o, i) {
                  i = er(i);
                  try {
                    if (isNaN(i)) return 61;
                    var a = xe.getStreamFromFD(o);
                    2 & r && xe.doMsync(e, a, t, n, i), Se.munmap(a);
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                ob: (e, t, r) => {
                  var n = new Date().getFullYear(),
                    o = new Date(n, 0, 1),
                    i = new Date(n, 6, 1),
                    a = o.getTimezoneOffset(),
                    s = i.getTimezoneOffset(),
                    u = Math.max(a, s);
                  function c(e) {
                    var t = e.toTimeString().match(/\(([A-Za-z ]+)\)$/);
                    return t ? t[1] : "GMT";
                  }
                  (R[e >> 2] = 60 * u), (L[t >> 2] = Number(a != s));
                  var l = c(o),
                    d = c(i),
                    h = ir(l),
                    f = ir(d);
                  s < a
                    ? ((R[r >> 2] = h), (R[(r + 4) >> 2] = f))
                    : ((R[r >> 2] = f), (R[(r + 4) >> 2] = h));
                },
                b: () => {
                  K("");
                },
                ye: function (e) {
                  var t = ke(e);
                  localStorage.removeItem(t);
                },
                ua: (e, t, r, n, o) => pr.chooseConfig(e, t, r, n, o),
                xa: (e, t, r, n) => {
                  if (62e3 != e) return pr.setErrorCode(12296), 0;
                  for (var o = 1; ; ) {
                    var i = L[n >> 2];
                    if (12440 != i) {
                      if (12344 == i) break;
                      return pr.setErrorCode(12292), 0;
                    }
                    (o = L[(n + 4) >> 2]), (n += 8);
                  }
                  return o < 2 || o > 3
                    ? (pr.setErrorCode(12293), 0)
                    : ((pr.contextAttributes.majorVersion = o - 1),
                      (pr.contextAttributes.minorVersion = 0),
                      (pr.context = mr.createContext(
                        u.canvas,
                        pr.contextAttributes
                      )),
                      0 != pr.context
                        ? (pr.setErrorCode(12288),
                          mr.makeContextCurrent(pr.context),
                          (u.useWebGL = !0),
                          fr.moduleContextCreatedCallbacks.forEach(function (
                            e
                          ) {
                            e();
                          }),
                          mr.makeContextCurrent(null),
                          62004)
                        : (pr.setErrorCode(12297), 0));
                },
                eb: (e, t, r, n) =>
                  62e3 != e
                    ? (pr.setErrorCode(12296), 0)
                    : 62002 != t
                    ? (pr.setErrorCode(12293), 0)
                    : (pr.setErrorCode(12288), 62006),
                cd: (e, t) =>
                  62e3 != e
                    ? (pr.setErrorCode(12296), 0)
                    : 62004 != t
                    ? (pr.setErrorCode(12294), 0)
                    : (mr.deleteContext(pr.context),
                      pr.setErrorCode(12288),
                      pr.currentContext == t && (pr.currentContext = 0),
                      1),
                Tc: (e, t) =>
                  62e3 != e
                    ? (pr.setErrorCode(12296), 0)
                    : 62006 != t
                    ? (pr.setErrorCode(12301), 1)
                    : (pr.currentReadSurface == t &&
                        (pr.currentReadSurface = 0),
                      pr.currentDrawSurface == t && (pr.currentDrawSurface = 0),
                      pr.setErrorCode(12288),
                      1),
                T: (e, t, r, n) => {
                  if (62e3 != e) return pr.setErrorCode(12296), 0;
                  if (62002 != t) return pr.setErrorCode(12293), 0;
                  if (!n) return pr.setErrorCode(12300), 0;
                  switch ((pr.setErrorCode(12288), r)) {
                    case 12320:
                      return (
                        (L[n >> 2] = pr.contextAttributes.alpha ? 32 : 24), 1
                      );
                    case 12321:
                      return (
                        (L[n >> 2] = pr.contextAttributes.alpha ? 8 : 0), 1
                      );
                    case 12322:
                    case 12323:
                    case 12324:
                      return (L[n >> 2] = 8), 1;
                    case 12325:
                      return (
                        (L[n >> 2] = pr.contextAttributes.depth ? 24 : 0), 1
                      );
                    case 12326:
                      return (
                        (L[n >> 2] = pr.contextAttributes.stencil ? 8 : 0), 1
                      );
                    case 12327:
                    case 12335:
                    case 12340:
                      return (L[n >> 2] = 12344), 1;
                    case 12328:
                      return (L[n >> 2] = 62002), 1;
                    case 12329:
                    case 12333:
                    case 12334:
                    case 12345:
                    case 12346:
                    case 12347:
                    case 12349:
                    case 12350:
                    case 12354:
                      return (L[n >> 2] = 0), 1;
                    case 12330:
                    case 12332:
                      return (L[n >> 2] = 4096), 1;
                    case 12331:
                      return (L[n >> 2] = 16777216), 1;
                    case 12337:
                      return (
                        (L[n >> 2] = pr.contextAttributes.antialias ? 4 : 0), 1
                      );
                    case 12338:
                      return (
                        (L[n >> 2] = pr.contextAttributes.antialias ? 1 : 0), 1
                      );
                    case 12339:
                    case 12352:
                      return (L[n >> 2] = 4), 1;
                    case 12341:
                    case 12342:
                    case 12343:
                      return (L[n >> 2] = -1), 1;
                    case 12348:
                      return (L[n >> 2] = 1), 1;
                    case 12351:
                      return (L[n >> 2] = 12430), 1;
                    default:
                      return pr.setErrorCode(12292), 0;
                  }
                },
                cc: (e) => (
                  pr.setErrorCode(12288), 0 != e && 1 != e ? 0 : 62e3
                ),
                za: () => pr.errorCode,
                Tb: (e, t, r) =>
                  62e3 != e
                    ? (pr.setErrorCode(12296), 0)
                    : (t && (L[t >> 2] = 1),
                      r && (L[r >> 2] = 4),
                      (pr.defaultDisplayInitialized = !0),
                      pr.setErrorCode(12288),
                      1),
                nc: (e, t, r, n) =>
                  62e3 != e
                    ? (pr.setErrorCode(12296), 0)
                    : 0 != n && 62004 != n
                    ? (pr.setErrorCode(12294), 0)
                    : (0 != r && 62006 != r) || (0 != t && 62006 != t)
                    ? (pr.setErrorCode(12301), 0)
                    : (mr.makeContextCurrent(n ? pr.context : null),
                      (pr.currentContext = n),
                      (pr.currentDrawSurface = t),
                      (pr.currentReadSurface = r),
                      pr.setErrorCode(12288),
                      1),
                Aa: (e, t) => {
                  if (pr.defaultDisplayInitialized)
                    if (u.ctx) {
                      if (!u.ctx.isContextLost())
                        return pr.setErrorCode(12288), 1;
                      pr.setErrorCode(12302);
                    } else pr.setErrorCode(12290);
                  else pr.setErrorCode(12289);
                  return 0;
                },
                Ic: (e) =>
                  62e3 != e
                    ? (pr.setErrorCode(12296), 0)
                    : ((pr.currentContext = 0),
                      (pr.currentReadSurface = 0),
                      (pr.currentDrawSurface = 0),
                      (pr.defaultDisplayInitialized = !1),
                      pr.setErrorCode(12288),
                      1),
                H: (e, t, r) => vr(e, t, r),
                He: (e) => {
                  console.error(ke(e));
                },
                Ie: (e) => {
                  console.log(ke(e));
                },
                pa: (e) => {
                  console.warn(ke(e));
                },
                ga: () => Date.now(),
                xe: function () {},
                pb: () => 2147483648,
                Kb: Ft,
                eg: yr,
                fg: br,
                bd: wr,
                oe: _r,
                Pc: Er,
                gg: Cr,
                hg: Sr,
                Mc: kr,
                Nc: xr,
                ef: Tr,
                ff: Ar,
                Qe: Pr,
                ig: Fr,
                _b: Lr,
                Df: Br,
                Ff: Dr,
                jg: Mr,
                kg: Or,
                be: Ir,
                lg: jr,
                ae: Ur,
                _e: $r,
                mg: qr,
                ng: Hr,
                gf: Nr,
                og: Vr,
                pc: zr,
                qc: Wr,
                sc: Gr,
                rc: Xr,
                pg: Yr,
                $d: Kr,
                qg: Zr,
                Ma: Qr,
                rg: Jr,
                sg: en,
                tg: tn,
                hd: rn,
                ug: nn,
                gd: on,
                Ye: an,
                _d: sn,
                vg: un,
                id: cn,
                wg: ln,
                xg: dn,
                yg: hn,
                zg: fn,
                hf: pn,
                Ag: mn,
                ed: gn,
                qe: vn,
                jf: yn,
                Re: bn,
                Bg: wn,
                Ze: _n,
                Cg: En,
                Zb: Cn,
                Ef: kn,
                Gf: xn,
                Zd: Tn,
                Dg: An,
                Yd: Pn,
                Xd: Fn,
                Eg: Ln,
                Fg: Rn,
                Gg: Bn,
                Bf: Mn,
                ee: On,
                pd: In,
                yf: jn,
                qd: Un,
                Nb: $n,
                wf: Nn,
                ld: Vn,
                fe: zn,
                Hg: Gn,
                Cf: Yn,
                de: Kn,
                md: Zn,
                zf: Qn,
                nd: Jn,
                od: eo,
                pf: to,
                Ig: ro,
                Jg: no,
                ad: oo,
                ne: io,
                Oc: ao,
                We: so,
                Kg: uo,
                Lg: co,
                lf: lo,
                mf: ho,
                Sc: fo,
                Mg: po,
                Ng: go,
                nf: vo,
                fd: yo,
                re: bo,
                of: wo,
                Se: _o,
                Og: Eo,
                Yb: Co,
                Af: Ao,
                Hf: Po,
                af: Fo,
                Wd: Ro,
                Vd: Bo,
                jc: Do,
                kc: Mo,
                mc: Oo,
                Ud: Io,
                Td: jo,
                Sd: Ho,
                ec: No,
                Pg: Vo,
                Qg: zo,
                Rg: Wo,
                Bc: Go,
                bf: Xo,
                fc: Ko,
                hc: Zo,
                Qc: Qo,
                qh: Jo,
                Pb: ei,
                Ub: ti,
                Sg: ri,
                Tg: ni,
                ie: ii,
                ke: si,
                he: ui,
                _c: ci,
                je: li,
                $c: di,
                le: hi,
                cf: fi,
                $b: pi,
                ac: mi,
                Ug: gi,
                Ne: vi,
                Rd: yi,
                Vg: bi,
                La: wi,
                rh: _i,
                gc: Ei,
                Qd: Ci,
                Pd: Si,
                Kc: ki,
                lc: xi,
                oc: Ti,
                Wg: Fi,
                Od: Bi,
                Nd: Di,
                Cc: Mi,
                Jc: ji,
                Hc: Ui,
                Kd: $i,
                Md: qi,
                Ld: Hi,
                Jd: Ni,
                Oe: Vi,
                Pe: zi,
                Id: Wi,
                Hd: Gi,
                Gd: Xi,
                Fd: Yi,
                dd: Ki,
                pe: Zi,
                Ed: Qi,
                dc: Ji,
                Dd: ea,
                Xe: ta,
                Xg: ra,
                Xb: na,
                Rc: ia,
                ge: aa,
                Yg: sa,
                Zg: ua,
                tf: ca,
                uf: la,
                Wb: da,
                _g: ha,
                Cd: fa,
                Sb: pa,
                Rb: ma,
                me: ga,
                xf: va,
                $g: _a,
                Bd: Ea,
                df: Ca,
                $e: Sa,
                Vb: ka,
                Ad: xa,
                Te: Ta,
                bc: Aa,
                Ue: Pa,
                Ve: Fa,
                ah: La,
                zd: Ra,
                bh: Ba,
                ch: Da,
                dh: Ma,
                eh: Oa,
                fh: Ia,
                gh: ja,
                hh: Ua,
                ih: $a,
                kd: qa,
                jh: Ha,
                kh: Na,
                lh: Va,
                mh: za,
                qf: Wa,
                Qb: Ga,
                nh: Xa,
                jd: Ya,
                Lc: Ka,
                oh: Za,
                ph: Ja,
                ag: es,
                bg: rs,
                Ac: ns,
                wc: os,
                cg: is,
                dg: as,
                $f: ss,
                _f: us,
                zc: cs,
                vc: ls,
                Zf: ds,
                Yf: hs,
                Xf: fs,
                Wf: ps,
                yc: ms,
                uc: gs,
                Vf: vs,
                Uf: ys,
                If: bs,
                Jf: ws,
                xc: _s,
                tc: Es,
                ic: Cs,
                Kf: Ss,
                Zc: ks,
                Xc: xs,
                Lf: Ts,
                Yc: As,
                Vc: Ps,
                Mf: Fs,
                Wc: Ls,
                Uc: Rs,
                Nf: Bs,
                yd: Ds,
                Of: Ms,
                wd: Os,
                vd: Is,
                Pf: js,
                ud: Us,
                Qf: $s,
                td: qs,
                Rf: Hs,
                rf: Vs,
                ce: zs,
                rd: Ws,
                sd: Gs,
                Ob: Xs,
                Gc: Ys,
                Ec: Ks,
                Fc: Zs,
                Dc: Qs,
                sf: Js,
                Sf: eu,
                Tf: tu,
                Na: ru,
                qb: (e) => {
                  var t = A.length,
                    r = 2147483648;
                  if ((e >>>= 0) > r) return !1;
                  for (var n, o, i = 1; i <= 4; i *= 2) {
                    var a = t * (1 + 0.2 / i);
                    a = Math.min(a, e + 100663296);
                    var s = Math.min(
                      r,
                      (n = Math.max(e, a)) + (((o = 65536) - (n % o)) % o)
                    );
                    if (nu(s)) return !0;
                  }
                  return !1;
                },
                ab: function (e, t, r, n, o, i, a, s, c) {
                  const l = u.UTF8ToString(e, e + t),
                    d = u.HEAPU8.subarray(o, o + i),
                    h = u.emscripten_ubq_codec_audioDecoderNextHandle++,
                    f = {
                      codec: l,
                      sampleRate: r,
                      numberOfChannels: n,
                      description: d,
                    };
                  try {
                    const e = u.emscripten_ubq_codec_createAudioDecoder(
                      a,
                      s,
                      c
                    );
                    AudioDecoder.isConfigSupported(f).then(
                      (t) => {
                        e.configUnsupported = !t;
                      },
                      () => {
                        e.configUnsupported = !0;
                      }
                    ),
                      e.configure(f),
                      u.emscripten_ubq_codec_audioDecoders.set(h, {
                        audioDecoder: e,
                        decoderConfig: f,
                        leftBufferPtr: a,
                        rightBufferPtr: s,
                        bufferLength: c,
                      });
                  } catch (e) {
                    return u.emscripten_ubq_codec_createNativeResult({
                      error: e,
                    });
                  }
                  return u.emscripten_ubq_codec_createNativeResult({
                    handle: h,
                  });
                },
                Wa: function (e, t, r, n, o, i) {
                  const a = u.UTF8ToString(e, e + t),
                    s = u.emscripten_ubq_codec_audioEncoderNextHandle++,
                    c = {
                      codec: a,
                      sampleRate: r,
                      numberOfChannels: n,
                      bitrate: o,
                    };
                  try {
                    const e = new AudioEncoder({
                      output: (e) => {
                        const t = u._malloc(e.byteLength),
                          r = u.HEAPU8.subarray(t, t + e.byteLength);
                        e.copyTo(r),
                          u.emscripten_ubq_codec_onOutputEncodedAudioChunk(
                            s,
                            t,
                            e.byteLength,
                            i
                          ),
                          u._free(t);
                      },
                      error: (e) => console.error(e),
                    });
                    e.configure(c),
                      u.emscripten_ubq_codec_audioEncoders.set(s, {
                        audioEncoder: e,
                        audioEncoderConfig: c,
                        frameIndex: 0,
                      });
                  } catch (e) {
                    return (
                      (e += ' Requested codec: "' + a + '"'),
                      (e += "; sample rate: " + r),
                      (e += "; channels: " + n),
                      (e += "; bit rate: " + o),
                      u.emscripten_ubq_codec_createNativeResult({ error: e })
                    );
                  }
                  return u.emscripten_ubq_codec_createNativeResult({
                    handle: s,
                  });
                },
                db: function (e, t, r, n, o, i, a) {
                  const s = u.UTF8ToString(e, e + t),
                    c = u.HEAPU8.subarray(o, o + i),
                    l = u.emscripten_ubq_codec_videoDecoderNextHandle++,
                    d = {
                      codec: s,
                      codedWidth: r,
                      codedHeight: n,
                      description: c,
                      optimizeForLatency: !0,
                    };
                  try {
                    const e = u.emscripten_ubq_codec_createVideoDecoder(l, a);
                    VideoDecoder.isConfigSupported(d).then(
                      (t) => {
                        e.configUnsupported = !t;
                      },
                      () => {
                        e.configUnsupported = !0;
                      }
                    ),
                      e.configure(d),
                      u.emscripten_ubq_codec_videoDecoders.set(l, {
                        videoDecoder: e,
                        decoderConfig: d,
                        codecServicePtr: a,
                      });
                  } catch (e) {
                    return u.emscripten_ubq_codec_createNativeResult({
                      error: e,
                    });
                  }
                  return u.emscripten_ubq_codec_createNativeResult({
                    handle: l,
                  });
                },
                Za: function (e, t, r, n, o, i, a) {
                  const s = u.UTF8ToString(e, e + t),
                    c = u.emscripten_ubq_codec_videoEncoderNextHandle++,
                    l = u.specialHTMLTargets["!canvas"];
                  (l.width = r), (l.height = n);
                  const d = {
                    codec: s,
                    width: r,
                    height: n,
                    avc: { format: "annexb" },
                    framerate: o,
                  };
                  i > 0 && (d.bitrate = i);
                  try {
                    const e = new VideoEncoder({
                      output: (e) => {
                        const t = u._malloc(e.byteLength),
                          r = u.HEAPU8.subarray(t, t + e.byteLength);
                        e.copyTo(r),
                          u.emscripten_ubq_codec_onOutputEncodedVideoChunk(
                            c,
                            t,
                            e.byteLength,
                            a
                          ),
                          u._free(t);
                      },
                      error: (e) => console.error(e),
                    });
                    VideoEncoder.isConfigSupported(d).then(
                      (t) => {
                        e.configUnsupported = !t;
                      },
                      () => {
                        e.configUnsupported = !0;
                      }
                    ),
                      e.configure(d),
                      u.emscripten_ubq_codec_videoEncoders.set(c, {
                        videoEncoder: e,
                        encoderConfig: d,
                        groupOfPictures: 150,
                        frameIndex: 0,
                      });
                  } catch (e) {
                    return (
                      (e += ' Requested codec: "' + s + '"'),
                      (e += "; resolution: " + r + "x" + n),
                      u.emscripten_ubq_codec_createNativeResult({ error: e })
                    );
                  }
                  return u.emscripten_ubq_codec_createNativeResult({
                    handle: c,
                  });
                },
                Ra: function (e, t, r, n, o, i) {
                  const a = u.emscripten_ubq_codec_audioDecoders.get(e);
                  if (a.audioDecoder.unexpectedError)
                    return u.emscripten_ubq_codec_createNativeResult({
                      code: 2,
                      error: a.audioDecoder.unexpectedError,
                    });
                  "closed" === a.audioDecoder.state &&
                    ((a.audioDecoder =
                      u.emscripten_ubq_codec_createAudioDecoder(
                        a.leftBufferPtr,
                        a.rightBufferPtr,
                        a.bufferLength
                      )),
                    a.audioDecoder.configure(a.decoderConfig));
                  const s = a.audioDecoder,
                    c = u.HEAPU8.subarray(o, o + i),
                    l = new EncodedAudioChunk({
                      type: t ? "key" : "delta",
                      timestamp: r,
                      duration: n,
                      data: c,
                    });
                  try {
                    s.decode(l);
                  } catch (e) {
                    return s.configUnsupported
                      ? u.emscripten_ubq_codec_createNativeResult({
                          code: 2,
                          error: e,
                        })
                      : u.emscripten_ubq_codec_createNativeResult({
                          code: 1,
                          error: e,
                        });
                  }
                  return u.emscripten_ubq_codec_createNativeResult({ code: 0 });
                },
                Sa: function (e, t, r, n, o, i) {
                  const a = u.emscripten_ubq_codec_videoDecoders.get(e);
                  if (a.videoDecoder.unexpectedError)
                    return u.emscripten_ubq_codec_createNativeResult({
                      code: 2,
                      error: a.videoDecoder.unexpectedError,
                    });
                  if ("closed" === a.videoDecoder.state) {
                    const t = a.videoDecoder.textures;
                    return (
                      (a.videoDecoder =
                        u.emscripten_ubq_codec_createVideoDecoder(
                          e,
                          a.codecServicePtr
                        )),
                      (a.videoDecoder.textures = t),
                      a.videoDecoder.configure(a.decoderConfig),
                      u.emscripten_ubq_codec_createNativeResult({
                        code: 1,
                        error: "VideoDecoder was closed",
                      })
                    );
                  }
                  const s = a.videoDecoder,
                    c = u.HEAPU8.subarray(o, o + i),
                    l = new EncodedVideoChunk({
                      type: t ? "key" : "delta",
                      timestamp: r,
                      duration: n,
                      data: c,
                    });
                  try {
                    s.decode(l);
                  } catch (e) {
                    return s.configUnsupported
                      ? u.emscripten_ubq_codec_createNativeResult({
                          code: 2,
                          error: e,
                        })
                      : u.emscripten_ubq_codec_createNativeResult({
                          code: 1,
                          error: e,
                        });
                  }
                  return u.emscripten_ubq_codec_createNativeResult({ code: 0 });
                },
                S: function (e) {
                  if (u.emscripten_ubq_codec_audioDecoders.has(e)) {
                    const t = u.emscripten_ubq_codec_audioDecoders.get(e);
                    "closed" !== t.audioDecoder.state && t.audioDecoder.close(),
                      u.emscripten_ubq_codec_audioDecoders.delete(e);
                  }
                },
                da: function (e) {
                  const t = u.emscripten_ubq_codec_audioEncoders.get(e);
                  "closed" !== t.audioEncoder.state && t.audioEncoder.close(),
                    u.emscripten_ubq_codec_audioEncoders.delete(e);
                },
                fa: function (e) {
                  if (u.emscripten_ubq_codec_videoDecoders.has(e)) {
                    const t = u.emscripten_ubq_codec_videoDecoders.get(e);
                    "closed" !== t.videoDecoder.state && t.videoDecoder.close(),
                      u.emscripten_ubq_codec_videoDecoders.delete(e);
                  }
                },
                ea: function (e) {
                  const t = u.emscripten_ubq_codec_videoEncoders.get(e);
                  "closed" !== t.videoEncoder.state && t.videoEncoder.close(),
                    u.emscripten_ubq_codec_videoEncoders.delete(e);
                },
                Va: function (e, t, r) {
                  const n = 1e6,
                    o = u.emscripten_ubq_codec_audioEncoders.get(e),
                    i = o.audioEncoderConfig.sampleRate,
                    a = o.audioEncoderConfig.numberOfChannels,
                    s = r / a,
                    c = Math.round(n * ((o.frameIndex * s) / i)),
                    l = Math.round(n * (s / i)),
                    d = u.HEAPF32.subarray(t / 4, t / 4 + r),
                    h = new AudioData({
                      format: "f32",
                      sampleRate: i,
                      numberOfFrames: s,
                      numberOfChannels: a,
                      duration: l,
                      timestamp: c,
                      data: d,
                    });
                  o.audioEncoder.encode(h), o.frameIndex++, h.close();
                },
                Ya: function (e, t, r) {
                  const n = 1e6,
                    o = u.emscripten_ubq_codec_videoEncoders.get(e),
                    i = Math.round(
                      n * (o.frameIndex / o.encoderConfig.framerate)
                    ),
                    a = o.frameIndex % o.groupOfPictures == 0,
                    s = Math.round(n / o.encoderConfig.framerate),
                    c = u.specialHTMLTargets["!canvas"],
                    l = new VideoFrame(c, { timestamp: i, duration: s });
                  o.videoEncoder.encode(l, { keyFrame: a }),
                    l.close(),
                    o.frameIndex++;
                },
                Ua: async function (e, t) {
                  const r = u.emscripten_ubq_codec_audioEncoders.get(e);
                  await r.audioEncoder.flush(),
                    u.emscripten_ubq_codec_onFinalizedAudioEncoding(e, t);
                },
                Xa: async function (e, t) {
                  const r = u.emscripten_ubq_codec_videoEncoders.get(e);
                  await r.videoEncoder.flush(),
                    u.emscripten_ubq_codec_onFinalizedVideoEncoding(e, t);
                },
                $a: async function (e, t) {
                  const r =
                    u.emscripten_ubq_codec_audioDecoders.get(e).audioDecoder;
                  r.flushing = !0;
                  try {
                    await r.flush();
                  } catch {}
                  (r.flushing = !1), (r.writtenFrames = t);
                },
                Y: async function (e, t, r) {
                  const n =
                    u.emscripten_ubq_codec_videoDecoders.get(e).videoDecoder;
                  (n.shouldDropFrames = r), (n.flushing = !0);
                  try {
                    await n.flush();
                  } catch {}
                  (n.flushing = !1),
                    (n.shouldDropFrames = !1),
                    (n.decodedFrames = t);
                },
                ra: function (e) {
                  return u.emscripten_ubq_codec_audioDecoders.get(e)
                    .audioDecoder.decodeQueueSize;
                },
                sa: function (e) {
                  return u.emscripten_ubq_codec_videoDecoders.get(e)
                    .videoDecoder.decodedFrames;
                },
                X: function (e) {
                  return u.emscripten_ubq_codec_audioDecoders.get(e)
                    .audioDecoder.writtenFrames;
                },
                _a: function (e) {
                  return u.emscripten_ubq_codec_audioDecoders.get(e)
                    .audioDecoder.flushing;
                },
                cb: function (e) {
                  return u.emscripten_ubq_codec_videoDecoders.get(e)
                    .videoDecoder.flushing;
                },
                Z: function () {
                  return (
                    "undefined" != typeof VideoFrame &&
                    "undefined" != typeof VideoDecoder &&
                    "undefined" != typeof VideoEncoder &&
                    "undefined" != typeof AudioDecoder &&
                    "undefined" != typeof AudioEncoder
                  );
                },
                bb: function (e, t) {
                  u.emscripten_ubq_codec_videoDecoders.get(
                    e
                  ).videoDecoder.requestedFrame = t;
                },
                Ta: function (e, t, r) {
                  const n = u.emscripten_ubq_codec_videoDecoders.get(e),
                    o = u.HEAPU32.subarray(t / 4, t / 4 + r);
                  n.videoDecoder.textures = [];
                  for (let e = 0; e < r; e++)
                    n.videoDecoder.textures[e] = mr.textures[o[e]];
                },
                Ce: function (e) {
                  const t = u.emscripten_ubq_asyncFetchManager.getProcess(e);
                  return !!(null == t ? void 0 : t.allocate());
                },
                oa: function () {
                  u.emscripten_ubq_asyncFetchManager.clear();
                },
                na: function (e, t, r, n) {
                  return u.emscripten_ubq_asyncFetchManager.createHeader(
                    e,
                    t,
                    r,
                    n
                  );
                },
                Fe: function (e) {
                  u.emscripten_ubq_asyncFetchManager.deleteHeader(e);
                },
                Ge: function (e, t, r, n, o, i, a, s, c) {
                  return u.emscripten_ubq_asyncFetchManager.fetch(
                    e,
                    t,
                    r,
                    n,
                    o,
                    i,
                    a,
                    s,
                    c
                  ).handle;
                },
                aa: function (e) {
                  return u.emscripten_ubq_asyncFetchManager.deleteProcess(e);
                },
                Ee: function (e) {
                  var t, r;
                  return null !==
                    (r =
                      null ===
                        (t =
                          u.emscripten_ubq_asyncFetchManager.getProcess(e)) ||
                      void 0 === t
                        ? void 0
                        : t.receivedLength) && void 0 !== r
                    ? r
                    : 0;
                },
                Be: function (e) {
                  const t = u.emscripten_ubq_asyncFetchManager.getProcess(e);
                  return (null == t ? void 0 : t.isAllocated())
                    ? t.resultAddress
                    : -1;
                },
                Ae: function (e) {
                  const t = u.emscripten_ubq_asyncFetchManager.getProcess(e);
                  return (null == t ? void 0 : t.isAllocated())
                    ? t.resultLength
                    : -1;
                },
                la: function (e) {
                  var t, r;
                  return null !==
                    (r =
                      null ===
                        (t =
                          u.emscripten_ubq_asyncFetchManager.getProcess(e)) ||
                      void 0 === t
                        ? void 0
                        : t.state) && void 0 !== r
                    ? r
                    : -1;
                },
                De: function (e) {
                  var t, r;
                  return null !==
                    (r =
                      null ===
                        (t =
                          u.emscripten_ubq_asyncFetchManager.getProcess(e)) ||
                      void 0 === t
                        ? void 0
                        : t.totalBytes) && void 0 !== r
                    ? r
                    : 0;
                },
                fb: function () {
                  return !!u.emscripten_ubq_settings_forceWebGL1;
                },
                ta: uu,
                _: (e) => {
                  mr.currentContext == e && (mr.currentContext = 0),
                    mr.deleteContext(e);
                },
                jb: (e) =>
                  ((e) => {
                    var t = e.getExtension("OES_vertex_array_object");
                    if (t)
                      return (
                        (e.createVertexArray = () => t.createVertexArrayOES()),
                        (e.deleteVertexArray = (e) =>
                          t.deleteVertexArrayOES(e)),
                        (e.bindVertexArray = (e) => t.bindVertexArrayOES(e)),
                        (e.isVertexArray = (e) => t.isVertexArrayOES(e)),
                        1
                      );
                  })(mr.contexts[e].GLctx),
                ib: (e) =>
                  ((e) => {
                    var t = e.getExtension("WEBGL_draw_buffers");
                    if (t)
                      return (
                        (e.drawBuffers = (e, r) => t.drawBuffersWEBGL(e, r)), 1
                      );
                  })(mr.contexts[e].GLctx),
                hb: (e) =>
                  ((e) =>
                    !!(e.multiDrawWebgl = e.getExtension("WEBGL_multi_draw")))(
                    mr.contexts[e].GLctx
                  ),
                $: (e, t) => {
                  var r = mr.getContext(e),
                    n = ke(t);
                  return (
                    n.startsWith("GL_") && (n = n.substr(3)),
                    !!r.GLctx.getExtension(n)
                  );
                },
                gb: (e, t) => {
                  if (!t) return -5;
                  if (!(e = mr.contexts[e])) return -3;
                  var r = e.GLctx;
                  if (!r) return -3;
                  (r = r.getContextAttributes()),
                    (L[t >> 2] = r.alpha),
                    (L[(t + 4) >> 2] = r.depth),
                    (L[(t + 8) >> 2] = r.stencil),
                    (L[(t + 12) >> 2] = r.antialias),
                    (L[(t + 16) >> 2] = r.premultipliedAlpha),
                    (L[(t + 20) >> 2] = r.preserveDrawingBuffer);
                  var n = r.powerPreference && iu.indexOf(r.powerPreference);
                  return (
                    (L[(t + 24) >> 2] = n),
                    (L[(t + 28) >> 2] = r.failIfMajorPerformanceCaveat),
                    (L[(t + 32) >> 2] = e.version),
                    (L[(t + 36) >> 2] = 0),
                    0
                  );
                },
                Eb: (e) => (mr.makeContextCurrent(e) ? 0 : -5),
                Bb: (e, t) => {
                  var r = 0;
                  return (
                    lu().forEach((n, o) => {
                      var i = t + r;
                      (R[(e + 4 * o) >> 2] = i),
                        ((e, t) => {
                          for (var r = 0; r < e.length; ++r)
                            T[t++ >> 0] = e.charCodeAt(r);
                          T[t >> 0] = 0;
                        })(n, i),
                        (r += n.length + 1);
                    }),
                    0
                  );
                },
                Cb: (e, t) => {
                  var r = lu();
                  R[e >> 2] = r.length;
                  var n = 0;
                  return (
                    r.forEach((e) => (n += e.length + 1)), (R[t >> 2] = n), 0
                  );
                },
                Ha: lr,
                ha: function (e) {
                  try {
                    var t = xe.getStreamFromFD(e);
                    return Se.close(t), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return e.errno;
                  }
                },
                nb: function (e, t) {
                  try {
                    var r = xe.getStreamFromFD(e),
                      n = r.tty
                        ? 2
                        : Se.isDir(r.mode)
                        ? 3
                        : Se.isLink(r.mode)
                        ? 7
                        : 4;
                    return (
                      (T[t >> 0] = n),
                      (P[(t + 2) >> 1] = 0),
                      (D[(t + 8) >> 3] = BigInt(0)),
                      (D[(t + 16) >> 3] = BigInt(0)),
                      0
                    );
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return e.errno;
                  }
                },
                ub: function (e, t, r, n, o) {
                  n = er(n);
                  try {
                    if (isNaN(n)) return 61;
                    var i = xe.getStreamFromFD(e),
                      a = du(i, t, r, n);
                    return (R[o >> 2] = a), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return e.errno;
                  }
                },
                ya: function (e, t, r, n) {
                  try {
                    var o = xe.getStreamFromFD(e),
                      i = du(o, t, r);
                    return (R[n >> 2] = i), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return e.errno;
                  }
                },
                Ab: function (e, t, r, n) {
                  t = er(t);
                  try {
                    if (isNaN(t)) return 61;
                    var o = xe.getStreamFromFD(e);
                    return (
                      Se.llseek(o, t, r),
                      (D[n >> 3] = BigInt(o.position)),
                      o.getdents && 0 === t && 0 === r && (o.getdents = null),
                      0
                    );
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return e.errno;
                  }
                },
                wa: function (e, t, r, n) {
                  try {
                    var o = ((e, t, r, n) => {
                      for (var o = 0, i = 0; i < r; i++) {
                        var a = R[t >> 2],
                          s = R[(t + 4) >> 2];
                        t += 8;
                        var u = Se.write(e, T, a, s, n);
                        if (u < 0) return -1;
                        (o += u), void 0 !== n && (n += u);
                      }
                      return o;
                    })(xe.getStreamFromFD(e), t, r);
                    return (R[n >> 2] = o), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return e.errno;
                  }
                },
                ze: function (e) {
                  var t = ke(e),
                    r = localStorage.getItem(t);
                  return null == r ? null : ir(r);
                },
                we: function () {
                  return "undefined" != typeof window
                    ? ir(window.location.hostname)
                    : ir("");
                },
                kb: (e, t) => (de(A.subarray(e, e + t)), 0),
                z: function (e, t, r) {
                  var n = ju();
                  try {
                    return St(e)(t, r);
                  } catch (e) {
                    if ((Uu(n), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                N: function (e, t) {
                  var r = ju();
                  try {
                    return St(e)(t);
                  } catch (e) {
                    if ((Uu(r), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                G: function (e, t, r) {
                  var n = ju();
                  try {
                    return St(e)(t, r);
                  } catch (e) {
                    if ((Uu(n), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                n: function (e, t, r, n) {
                  var o = ju();
                  try {
                    return St(e)(t, r, n);
                  } catch (e) {
                    if ((Uu(o), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                th: function (e) {
                  var t = ju();
                  try {
                    return St(e)();
                  } catch (e) {
                    if ((Uu(t), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                Oa: function (e, t, r) {
                  var n = ju();
                  try {
                    return St(e)(t, r);
                  } catch (e) {
                    if ((Uu(n), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                r: function (e, t) {
                  var r = ju();
                  try {
                    return St(e)(t);
                  } catch (e) {
                    if ((Uu(r), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                V: function (e, t, r, n, o, i, a, s, u, c, l, d, h, f, p, m) {
                  var g = ju();
                  try {
                    return St(e)(t, r, n, o, i, a, s, u, c, l, d, h, f, p, m);
                  } catch (e) {
                    if ((Uu(g), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                q: function (e, t, r) {
                  var n = ju();
                  try {
                    return St(e)(t, r);
                  } catch (e) {
                    if ((Uu(n), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                t: function (e, t, r, n) {
                  var o = ju();
                  try {
                    return St(e)(t, r, n);
                  } catch (e) {
                    if ((Uu(o), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                U: function (e, t, r, n, o) {
                  var i = ju();
                  try {
                    return St(e)(t, r, n, o);
                  } catch (e) {
                    if ((Uu(i), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                Me: function (e, t, r, n, o, i) {
                  var a = ju();
                  try {
                    return St(e)(t, r, n, o, i);
                  } catch (e) {
                    if ((Uu(a), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                Ja: function (e, t, r, n, o, i, a) {
                  var s = ju();
                  try {
                    return St(e)(t, r, n, o, i, a);
                  } catch (e) {
                    if ((Uu(s), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                Ia: function (e, t, r, n, o, i, a, s, u, c) {
                  var l = ju();
                  try {
                    return St(e)(t, r, n, o, i, a, s, u, c);
                  } catch (e) {
                    if ((Uu(l), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                R: function (e) {
                  var t = ju();
                  try {
                    St(e)();
                  } catch (e) {
                    if ((Uu(t), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                u: function (e, t) {
                  var r = ju();
                  try {
                    St(e)(t);
                  } catch (e) {
                    if ((Uu(r), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                C: function (e, t, r, n) {
                  var o = ju();
                  try {
                    St(e)(t, r, n);
                  } catch (e) {
                    if ((Uu(o), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                F: function (e, t, r) {
                  var n = ju();
                  try {
                    St(e)(t, r);
                  } catch (e) {
                    if ((Uu(n), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                p: function (e, t, r, n) {
                  var o = ju();
                  try {
                    St(e)(t, r, n);
                  } catch (e) {
                    if ((Uu(o), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                D: function (e, t, r, n, o) {
                  var i = ju();
                  try {
                    St(e)(t, r, n, o);
                  } catch (e) {
                    if ((Uu(i), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                Le: function (e, t, r, n, o, i) {
                  var a = ju();
                  try {
                    St(e)(t, r, n, o, i);
                  } catch (e) {
                    if ((Uu(a), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                Je: function (e, t, r, n, o, i, a) {
                  var s = ju();
                  try {
                    St(e)(t, r, n, o, i, a);
                  } catch (e) {
                    if ((Uu(s), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                sh: function (e, t, r, n, o, i, a, s) {
                  var u = ju();
                  try {
                    St(e)(t, r, n, o, i, a, s);
                  } catch (e) {
                    if ((Uu(u), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                Ke: function (e, t, r, n, o, i, a, s, u, c) {
                  var l = ju();
                  try {
                    St(e)(t, r, n, o, i, a, s, u, c);
                  } catch (e) {
                    if ((Uu(l), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                ka: function () {
                  return "undefined" != typeof localStorage;
                },
                qa: function (e, t) {
                  const r = Mt.toValue(t),
                    n = u.ctx;
                  n.bindTexture(n.TEXTURE_2D, mr.textures[e]),
                    n.texImage2D(
                      n.TEXTURE_2D,
                      0,
                      n.RGBA,
                      n.RGBA,
                      n.UNSIGNED_BYTE,
                      r
                    );
                },
                a: C,
                Ga: function (e, t) {
                  var r = ke(e),
                    n = ke(t);
                  localStorage.setItem(r, n);
                },
                lb: (e, t, r, n, o) => mu(e, t, r, n),
              },
              Au = (function () {
                var e,
                  t,
                  r,
                  o,
                  i = { a: Tu };
                function a(e, t) {
                  var r;
                  return (
                    (Au = e.exports),
                    (bt = Au.yh),
                    (r = Au.uh),
                    H.unshift(r),
                    Y(),
                    Au
                  );
                }
                if ((X(), u.instantiateWasm))
                  try {
                    return u.instantiateWasm(i, a);
                  } catch (e) {
                    k(
                      `Module.instantiateWasm callback failed with error: ${e}`
                    ),
                      n(e);
                  }
                return (
                  ((e = E),
                  (t = Z),
                  (r = i),
                  (o = function (e) {
                    a(e.instance);
                  }),
                  e ||
                  "function" != typeof WebAssembly.instantiateStreaming ||
                  J(t) ||
                  y ||
                  "function" != typeof fetch
                    ? re(t, r, o)
                    : fetch(t, { credentials: "same-origin" }).then((e) =>
                        WebAssembly.instantiateStreaming(e, r).then(
                          o,
                          function (e) {
                            return (
                              k(`wasm streaming compile failed: ${e}`),
                              k("falling back to ArrayBuffer instantiation"),
                              re(t, r, o)
                            );
                          }
                        )
                      )).catch(n),
                  {}
                );
              })(),
              Pu = (u._malloc = (e) => (Pu = u._malloc = Au.vh)(e)),
              Fu = (u._main = (e, t) => (Fu = u._main = Au.wh)(e, t)),
              Lu = (u._free = (e) => (Lu = u._free = Au.xh)(e)),
              Ru =
                ((u._ma_malloc_emscripten = (e, t) =>
                  (u._ma_malloc_emscripten = Au.zh)(e, t)),
                (u._ma_free_emscripten = (e, t) =>
                  (u._ma_free_emscripten = Au.Ah)(e, t)),
                (u._ma_device_process_pcm_frames_capture__webaudio = (
                  e,
                  t,
                  r
                ) =>
                  (Ru = u._ma_device_process_pcm_frames_capture__webaudio =
                    Au.Bh)(e, t, r))),
              Bu = (u._ma_device_process_pcm_frames_playback__webaudio = (
                e,
                t,
                r
              ) =>
                (Bu = u._ma_device_process_pcm_frames_playback__webaudio =
                  Au.Ch)(e, t, r)),
              Du = (e) => (Du = Au.Dh)(e),
              Mu = (e) => (Mu = Au.Eh)(e),
              Ou = (e, t) => (Ou = Au.Fh)(e, t),
              Iu = (e, t) => (Iu = Au.Gh)(e, t),
              ju = () => (ju = Au.Hh)(),
              Uu = (e) => (Uu = Au.Ih)(e),
              $u = (e) => ($u = Au.Jh)(e),
              qu = (e) => (qu = Au.Kh)(e),
              Hu = (e) => (Hu = Au.Lh)(e),
              Nu = (e, t, r) => (Nu = Au.Mh)(e, t, r),
              Vu = (e) => (Vu = Au.Nh)(e);
            function zu(e = f) {
              function r() {
                xu ||
                  ((xu = !0),
                  (u.calledRun = !0),
                  I ||
                    (u.noFSInit || Se.init.initialized || Se.init(),
                    (Se.ignorePermissions = !1),
                    be.init(),
                    ie(H),
                    ie(N),
                    t(u),
                    u.onRuntimeInitialized && u.onRuntimeInitialized(),
                    Wu &&
                      (function (e = []) {
                        var t = Fu;
                        e.unshift(p);
                        var r = e.length,
                          n = $u(4 * (r + 1)),
                          o = n;
                        e.forEach((e) => {
                          (R[o >> 2] = gu(e)), (o += 4);
                        }),
                          (R[o >> 2] = 0);
                        try {
                          var i = t(r, n);
                          return cr(i, !0), i;
                        } catch (e) {
                          return sr(e);
                        }
                      })(e),
                    (function () {
                      if (u.postRun)
                        for (
                          "function" == typeof u.postRun &&
                          (u.postRun = [u.postRun]);
                          u.postRun.length;

                        )
                          (e = u.postRun.shift()), V.unshift(e);
                      var e;
                      ie(V);
                    })()));
              }
              z > 0 ||
                ((function () {
                  if (u.preRun)
                    for (
                      "function" == typeof u.preRun && (u.preRun = [u.preRun]);
                      u.preRun.length;

                    )
                      (e = u.preRun.shift()), q.unshift(e);
                  var e;
                  ie(q);
                })(),
                z > 0 ||
                  (u.setStatus
                    ? (u.setStatus("Running..."),
                      setTimeout(function () {
                        setTimeout(function () {
                          u.setStatus("");
                        }, 1),
                          r();
                      }, 1))
                    : r()));
            }
            if (
              ((u.___start_em_js = 2489223),
              (u.___stop_em_js = 2490058),
              (u.addRunDependency = X),
              (u.removeRunDependency = Y),
              (u.FS_createPath = Se.createPath),
              (u.FS_createLazyFile = Se.createLazyFile),
              (u.FS_createDevice = Se.createDevice),
              (u.ccall = (e, t, r, n, o) => {
                var i = {
                    string: (e) => {
                      var t = 0;
                      return null != e && 0 !== e && (t = gu(e)), t;
                    },
                    array: (e) => {
                      var t = $u(e.length);
                      return pu(e, t), t;
                    },
                  },
                  a = ((e) => u["_" + e])(e),
                  s = [],
                  c = 0;
                if (n)
                  for (var l = 0; l < n.length; l++) {
                    var d = i[r[l]];
                    d
                      ? (0 === c && (c = ju()), (s[l] = d(n[l])))
                      : (s[l] = n[l]);
                  }
                var h,
                  f = a.apply(null, s);
                return (
                  (h = f),
                  0 !== c && Uu(c),
                  (f = (function (e) {
                    return "string" === t
                      ? ke(e)
                      : "boolean" === t
                      ? Boolean(e)
                      : e;
                  })(h)),
                  f
                );
              }),
              (u.getValue = function (e, t = "i8") {
                switch ((t.endsWith("*") && (t = "*"), t)) {
                  case "i1":
                  case "i8":
                    return T[e >> 0];
                  case "i16":
                    return P[e >> 1];
                  case "i32":
                    return L[e >> 2];
                  case "i64":
                    return D[e >> 3];
                  case "float":
                    return B[e >> 2];
                  case "double":
                    return O[e >> 3];
                  case "*":
                    return R[e >> 2];
                  default:
                    K(`invalid type for getValue: ${t}`);
                }
              }),
              (u.UTF8ToString = ke),
              (u.specialHTMLTargets = au),
              (u.FS_createPreloadedFile = Se.createPreloadedFile),
              (u.FS_createDataFile = Se.createDataFile),
              (u.FS_unlink = Se.unlink),
              (G = function e() {
                xu || zu(), xu || (G = e);
              }),
              u.preInit)
            )
              for (
                "function" == typeof u.preInit && (u.preInit = [u.preInit]);
                u.preInit.length > 0;

              )
                u.preInit.pop()();
            var Wu = !0;
            return u.noInitialRun && (Wu = !1), zu(), e.ready;
          });
      "object" == typeof e && "object" == typeof t
        ? (t.exports = n)
        : "function" == typeof define && define.amd && define([], () => n);
    },
  }),
  Et = cloneWithPrototypeAndProperties(lodashDebounce()),
  Ct = cloneWithPrototypeAndProperties(lodashIsEqual());
function St(e) {
  if (e.isValid()) {
    const t = e.value();
    return e.delete(), t;
  }
  {
    const t = e.error(),
      r = t.publicMessage();
    throw (t.delete(), e.delete(), new Error(r));
  }
}
function kt(e) {
  return new Promise((t, r) => {
    e((e) => {
      try {
        const r = St(e);
        t(r);
      } catch (e) {
        r(e);
      }
    });
  });
}
var xt = (e, t = !0) => {
    const r = [];
    for (let t = 0; t < e.size(); t += 1) r.push(e.get(t));
    return t && e.delete(), r;
  },
  Tt = new WeakMap(),
  At = { assets: [], total: 0, currentPage: 0, nextPage: void 0 },
  AssetAPI = class {
    #e;
    constructor(e) {
      this.#e = e;
    }
    #t = new Set();
    #r = new Set();
    unstable_registerApplyAssetMiddleware(e) {
      return (
        this.#t.add(e),
        () => {
          this.#t.delete(e);
        }
      );
    }
    unstable_registerApplyAssetToBlockMiddleware(e) {
      return (
        this.#r.add(e),
        () => {
          this.#r.delete(e);
        }
      );
    }
    addSource(e) {
      const t = e.getSupportedMimeTypes?.bind(e),
        r = e.getGroups?.bind(e),
        n = e.applyAsset?.bind(e),
        o = e.applyAssetToBlock?.bind(e),
        i = e.addAsset?.bind(e),
        a = e.removeAsset?.bind(e),
        s = e.credits,
        u = e.license;
      St(
        this.#e.addAssetSource(
          e.id,
          async (t, r) => {
            try {
              const n = {
                  ...t,
                  sortKey: t.sortKey,
                  sortingOrder: t.sortingOrder,
                  sortActiveFirst: t.sortActiveFirst,
                  tags: xt(t.tags),
                  groups: xt(t.groups),
                  excludeGroups: xt(t.excludeGroups),
                },
                o = await e.findAssets(n);
              if (o) {
                const t = { ...o, assets: o.assets.map((t) => Pt(t, e.id)) };
                r.invoke(t);
              } else r.invoke(At);
            } catch (e) {
              r.invoke(
                e.message ?? "Unknown error in user-defined `findAssets`"
              );
            }
          },
          r
            ? async (e) => {
                try {
                  const t = await r();
                  e.invoke(t);
                } catch (t) {
                  e.invoke(
                    t.message ?? "Unknown error in user-defined `getGroups`"
                  );
                }
              }
            : null,
          s ? () => ({ name: s.name, url: s.url ?? "" }) : null,
          u ? () => ({ name: u.name, url: u.url ?? "" }) : null,
          t ? () => t() ?? [] : null,
          n
            ? async (e, t) => {
                try {
                  const r = await n(this.#n(e));
                  t.invoke(r);
                } catch (e) {
                  t.invoke(
                    e.message ?? "Unknown error in user-defined `applyAsset`"
                  );
                }
              }
            : null,
          o
            ? async (e, t, r) => {
                try {
                  await o(this.#n(e), t), r.invoke({});
                } catch (e) {
                  r.invoke(
                    e.message ??
                      "Unknown error in user-defined `applyAssetToBlock`"
                  );
                }
              }
            : null,
          i
            ? async (e) => {
                i(e);
              }
            : null,
          a
            ? async (e) => {
                a(e);
              }
            : null
        )
      ),
        this.#o(e.id, e);
    }
    addLocalSource(e, t, r, n) {
      St(
        this.#e.addLocalAssetSource(
          e,
          t ?? [],
          r
            ? async (e, t) => {
                try {
                  const n = await r(this.#n(e));
                  t.invoke(n);
                } catch (e) {
                  t.invoke(
                    e.message ?? "Unknown error in user-defined `applyAsset`"
                  );
                }
              }
            : null,
          n
            ? async (e, t, r) => {
                try {
                  await n(this.#n(e), t), r.invoke({});
                } catch (e) {
                  r.invoke(
                    e.message ??
                      "Unknown error in user-defined `applyAssetToBlock`"
                  );
                }
              }
            : null
        )
      );
    }
    removeSource(e) {
      St(this.#e.removeAssetSource(e)), this.#i(e);
    }
    findAllSources() {
      return xt(this.#e.findAllAssetSources());
    }
    findAssets(e, t) {
      return new Promise((r, n) => {
        let o = t?.tags ?? [];
        Array.isArray(o) || (o = [o]);
        const i = {
          perPage: t?.perPage ?? 0,
          page: t?.page ?? 0,
          query: t?.query ?? "",
          tags: o,
          groups: t?.groups ?? [],
          excludeGroups: t?.excludeGroups ?? [],
          locale: t?.locale ?? "",
          sortingOrder: t?.sortingOrder ?? "None",
          sortKey: t?.sortKey ?? "",
          sortActiveFirst: t?.sortActiveFirst ?? !1,
        };
        this.#e.findAssetSourceAssets(e, i, (e) => {
          try {
            const t = St(e);
            r({ ...t, nextPage: -1 === t.nextPage ? void 0 : t.nextPage });
          } catch (e) {
            n(e);
          }
        });
      });
    }
    #n(e) {
      const t = { ...e };
      return (
        0 === t.groups?.length && delete t.groups,
        t.locale || delete t.locale,
        t.label || delete t.label,
        0 === t.tags?.length && delete t.tags,
        t.credits?.name || t.credits?.url
          ? t.credits.url || delete t.credits.url
          : delete t.credits,
        t.license?.name || t.license?.url
          ? t.license.url || delete t.license.url
          : delete t.license,
        t.utm?.source || t.utm?.medium
          ? (t.utm.source || delete t.utm.source,
            t.utm.medium || delete t.utm.medium)
          : delete t.utm,
        t
      );
    }
    async getGroups(e) {
      return kt((t) => this.#e.getAssetSourceGroups(e, t)).then((e) => xt(e));
    }
    getSupportedMimeTypes(e) {
      return xt(St(this.#e.getAssetSourceSupportedMimeTypes(e)));
    }
    getCredits(e) {
      const t = St(this.#e.getAssetSourceCredits(e));
      if (t.name || t.url) return t.url ? t : { name: t.name, url: void 0 };
    }
    getLicense(e) {
      const t = St(this.#e.getAssetSourceLicense(e));
      if (t.name || t.url) return t.url ? t : { name: t.name, url: void 0 };
    }
    canManageAssets(e) {
      return !!Tt.get(this.#e)?.get(e)?.canManageAssets;
    }
    addAssetToSource(e, t) {
      St(this.#e.addAssetToSource(e, t));
    }
    removeAssetFromSource(e, t) {
      St(this.#e.removeAssetFromSource(e, t));
    }
    #o(e, t) {
      Tt.has(this.#e) || Tt.set(this.#e, new Map()),
        t.canManageAssets &&
          console.warn(
            `\nDEPRECATION WARNING:\n\n'canManageAssets' flag was found for asset source with the id '${e}'.\n\nThis flag is deprecated and will be removed in the next version. If you have used it to control if an upload buttons is rendered in the asset library, use the 'canAdd' options on an asset library entry. See documentation here: https://img.ly/docs/cesdk/ui/guides/customize-asset-library/`
          ),
        Tt.get(this.#e).set(e, { canManageAssets: t.canManageAssets });
    }
    #i(e) {
      Tt.get(this.#e)?.delete(e);
    }
    async apply(e, t) {
      const r = (e, t) =>
        new Promise((r, n) => {
          this.#e.applyAssetSourceAsset(e, Pt(t, e), (e) => {
            try {
              const t = St(e);
              this.#e.isValid(t) ? r(t) : r(void 0);
            } catch (e) {
              n(e);
            }
          });
        });
      if (this.#t.size > 0) {
        return Array.from(this.#t).reduce((e, t) => (r, n) => t(r, n, e), r)(
          e,
          t
        );
      }
      return r(e, t);
    }
    async applyToBlock(e, t, r) {
      const n = (e, t, r) =>
        kt((n) => this.#e.applyAssetSourceAssetToBlock(e, Pt(t, e), r, n));
      if (this.#r.size > 0) {
        return Array.from(this.#r).reduce(
          (e, t) => (r, n, o) => t(r, n, o, e),
          n
        )(e, t, r);
      }
      return n(e, t, r);
    }
    async unstable_applyProperty(e, t, r) {
      return kt((n) =>
        this.#e.unstable_applyAssetSourceProperty(e, Pt(t, e), r, n)
      );
    }
    async defaultApplyAsset(e) {
      return new Promise((t, r) => {
        this.#e.defaultApplyAsset(Pt(e, ""), (e) => {
          try {
            const r = St(e);
            this.#e.isValid(r) ? t(r) : t(void 0);
          } catch (e) {
            r(e);
          }
        });
      });
    }
    async defaultApplyAssetToBlock(e, t) {
      return kt((r) => this.#e.defaultApplyAssetToBlock(Pt(e, ""), t, r));
    }
    onAssetSourceAdded = (e) => {
      const t = this.#e.subscribeToAssetSourceAdded(e);
      return () => {
        this.#e.isDeleted() || St(this.#e.unsubscribe(t));
      };
    };
    onAssetSourceRemoved = (e) => {
      const t = this.#e.subscribeToAssetSourceRemoved(e);
      return () => {
        this.#e.isDeleted() || St(this.#e.unsubscribe(t));
      };
    };
    onAssetSourceUpdated = (e) => {
      const t = this.#e.subscribeToAssetSourceUpdated(e);
      return () => {
        this.#e.isDeleted() || St(this.#e.unsubscribe(t));
      };
    };
    assetSourceContentsChanged(e) {
      St(this.#e.assetSourceContentsChanged(e));
    }
    dispose() {
      Tt.delete(this.#e);
    }
  };
function Pt(e, t) {
  return "context" in e && e.context.sourceId === t && "active" in e
    ? e
    : { ...e, active: e.active ?? !1, context: { sourceId: t } };
}
var Ft = class extends TypeError {
  constructor(e, t) {
    let r;
    const { message: n, ...o } = e,
      { path: i } = e;
    super(0 === i.length ? n : "At path: " + i.join(".") + " -- " + n),
      (this.value = void 0),
      (this.key = void 0),
      (this.type = void 0),
      (this.refinement = void 0),
      (this.path = void 0),
      (this.branch = void 0),
      (this.failures = void 0),
      Object.assign(this, o),
      (this.name = this.constructor.name),
      (this.failures = () => {
        var n;
        return null != (n = r) ? n : (r = [e, ...t()]);
      });
  }
};
function Lt(e) {
  return "object" == typeof e && null != e;
}
function Rt(e) {
  return "string" == typeof e ? JSON.stringify(e) : "" + e;
}
function Bt(e, t, r, n) {
  if (!0 === e) return;
  !1 === e ? (e = {}) : "string" == typeof e && (e = { message: e });
  const { path: o, branch: i } = t,
    { type: a } = r,
    {
      refinement: s,
      message: u = "Expected a value of type `" +
        a +
        "`" +
        (s ? " with refinement `" + s + "`" : "") +
        ", but received: `" +
        Rt(n) +
        "`",
    } = e;
  return {
    value: n,
    type: a,
    refinement: s,
    key: o[o.length - 1],
    path: o,
    branch: i,
    ...e,
    message: u,
  };
}
function* Dt(e, t, r, n) {
  var o;
  (Lt((o = e)) && "function" == typeof o[Symbol.iterator]) || (e = [e]);
  for (const o of e) {
    const e = Bt(o, t, r, n);
    e && (yield e);
  }
}
function* Mt(e, t, r = {}) {
  const { path: n = [], branch: o = [e], coerce: i = !1, mask: a = !1 } = r,
    s = { path: n, branch: o };
  if (
    i &&
    ((e = t.coercer(e, s)),
    a && "type" !== t.type && Lt(t.schema) && Lt(e) && !Array.isArray(e))
  )
    for (const r in e) void 0 === t.schema[r] && delete e[r];
  let u = !0;
  for (const r of t.validator(e, s)) (u = !1), yield [r, void 0];
  for (let [r, c, l] of t.entries(e, s)) {
    const t = Mt(c, l, {
      path: void 0 === r ? n : [...n, r],
      branch: void 0 === r ? o : [...o, c],
      coerce: i,
      mask: a,
    });
    for (const n of t)
      n[0]
        ? ((u = !1), yield [n[0], void 0])
        : i &&
          ((c = n[1]),
          void 0 === r
            ? (e = c)
            : e instanceof Map
            ? e.set(r, c)
            : e instanceof Set
            ? e.add(c)
            : Lt(e) && (e[r] = c));
  }
  if (u) for (const r of t.refiner(e, s)) (u = !1), yield [r, void 0];
  u && (yield [void 0, e]);
}
var Ot = class {
  constructor(e) {
    (this.TYPE = void 0),
      (this.type = void 0),
      (this.schema = void 0),
      (this.coercer = void 0),
      (this.validator = void 0),
      (this.refiner = void 0),
      (this.entries = void 0);
    const {
      type: t,
      schema: r,
      validator: n,
      refiner: o,
      coercer: i = (e) => e,
      entries: a = function* () {},
    } = e;
    (this.type = t),
      (this.schema = r),
      (this.entries = a),
      (this.coercer = i),
      (this.validator = n ? (e, t) => Dt(n(e, t), t, this, e) : () => []),
      (this.refiner = o ? (e, t) => Dt(o(e, t), t, this, e) : () => []);
  }
  assert(e) {
    return (function (e, t) {
      const r = It(e, t);
      if (r[0]) throw r[0];
    })(e, this);
  }
  create(e) {
    return (function (e, t) {
      const r = It(e, t, { coerce: !0 });
      if (r[0]) throw r[0];
      return r[1];
    })(e, this);
  }
  is(e) {
    return (function (e, t) {
      const r = It(e, t);
      return !r[0];
    })(e, this);
  }
  mask(e) {
    return (function (e, t) {
      const r = It(e, t, { coerce: !0, mask: !0 });
      if (r[0]) throw r[0];
      return r[1];
    })(e, this);
  }
  validate(e, t = {}) {
    return It(e, this, t);
  }
};
function It(e, t, r = {}) {
  const n = Mt(e, t, r),
    o = (function (e) {
      const { done: t, value: r } = e.next();
      return t ? void 0 : r;
    })(n);
  if (o[0]) {
    return [
      new Ft(o[0], function* () {
        for (const e of n) e[0] && (yield e[0]);
      }),
      void 0,
    ];
  }
  return [void 0, o[1]];
}
function jt(e, t) {
  return new Ot({ type: e, schema: null, validator: t });
}
function Ut(e) {
  return new Ot({
    type: "array",
    schema: e,
    *entries(t) {
      if (e && Array.isArray(t))
        for (const [r, n] of t.entries()) yield [r, n, e];
    },
    coercer: (e) => (Array.isArray(e) ? e.slice() : e),
    validator: (e) =>
      Array.isArray(e) || "Expected an array value, but received: " + Rt(e),
  });
}
function $t() {
  return jt("boolean", (e) => "boolean" == typeof e);
}
function qt() {
  return jt(
    "integer",
    (e) =>
      ("number" == typeof e && !isNaN(e) && Number.isInteger(e)) ||
      "Expected an integer, but received: " + Rt(e)
  );
}
function Ht() {
  return jt(
    "number",
    (e) =>
      ("number" == typeof e && !isNaN(e)) ||
      "Expected a number, but received: " + Rt(e)
  );
}
function Nt(e) {
  const t = e ? Object.keys(e) : [],
    r = jt("never", () => !1);
  return new Ot({
    type: "object",
    schema: e || null,
    *entries(n) {
      if (e && Lt(n)) {
        const o = new Set(Object.keys(n));
        for (const r of t) o.delete(r), yield [r, n[r], e[r]];
        for (const e of o) yield [e, n[e], r];
      }
    },
    validator: (e) => Lt(e) || "Expected an object, but received: " + Rt(e),
    coercer: (e) => (Lt(e) ? { ...e } : e),
  });
}
function Vt() {
  return jt(
    "string",
    (e) => "string" == typeof e || "Expected a string, but received: " + Rt(e)
  );
}
function zt(e, t, r = {}) {
  const { exclusive: n } = r;
  return Xt(e, "max", (r) =>
    n
      ? r < t
      : r <= t ||
        "Expected a " +
          e.type +
          " less than " +
          (n ? "" : "or equal to ") +
          t +
          " but received `" +
          r +
          "`"
  );
}
function Wt(e, t, r = {}) {
  const { exclusive: n } = r;
  return Xt(e, "min", (r) =>
    n
      ? r > t
      : r >= t ||
        "Expected a " +
          e.type +
          " greater than " +
          (n ? "" : "or equal to ") +
          t +
          " but received `" +
          r +
          "`"
  );
}
function Gt(e) {
  return Xt(e, "nonempty", (t) => {
    const r = (function (e) {
      return e instanceof Map || e instanceof Set ? e.size : e.length;
    })(t);
    return (
      r > 0 || "Expected a nonempty " + e.type + " but received an empty one"
    );
  });
}
function Xt(e, t, r) {
  return new Ot({
    ...e,
    *refiner(n, o) {
      yield* e.refiner(n, o);
      const i = Dt(r(n, o), o, e, n);
      for (const e of i) yield { ...e, refinement: t };
    },
  });
}
function Yt(e, t, r) {
  const [n] = It(t, r);
  if (n) throw ((n.message = `Error in argument '${e}': ${n.message}`), n);
}
function Kt() {
  const e =
    /image\/(png|jpeg|webp|x-tga)|audio\/(wav)|video\/(mp4|quicktime)|application\/octet-stream|application\/pdf/;
  return jt(
    "MimeType",
    (t) =>
      !("string" != typeof t || !e.test(t)) || {
        message: `expected one of "image/png", "image/jpeg", "image/webp", "image/x-tga", "video/mp4", "video/quicktime", "application/pdf" or "application/octet-stream", but got "${t}"`,
      }
  );
}
function Zt() {
  const e = ["Free", "VerticalStack", "HorizontalStack", "DepthStack"];
  return jt(
    "SceneLayout",
    (t) =>
      !("string" != typeof t || !e.includes(t)) || {
        message: `expected one of ${e
          .map((e) => `"${e}"`)
          .join(", ")}, but got "${t}"`,
      }
  );
}
var Qt = Symbol("PROXY");
function Jt(e, t) {
  Object.defineProperty(e, Qt, { value: { type: "getter" }, writable: !1 });
}
function er(e, t) {
  Object.defineProperty(e, Qt, { value: { type: "setter" }, writable: !1 });
}
var tr = {};
function rr(e, t, r) {
  return Object.hasOwnProperty.call(e, t)
    ? () => {
        e[t] = r;
      }
    : () => {
        delete e[t];
      };
}
var nr,
  or = ((e) => (
    (e.Png = "image/png"),
    (e.Jpeg = "image/jpeg"),
    (e.WebP = "image/webp"),
    (e.Tga = "image/x-tga"),
    (e.Wav = "audio/wav"),
    (e.Mp4 = "video/mp4"),
    (e.QuickTime = "video/quicktime"),
    (e.Binary = "application/octet-stream"),
    (e.Pdf = "application/pdf"),
    (e.Zip = "application/zip"),
    e
  ))(or || {}),
  ir = or;
function ar(e) {
  return "r" in e && "a" in e && void 0 !== e.r && void 0 !== e.a;
}
function sr(e) {
  return "name" in e && void 0 !== e.name;
}
function ur(e) {
  return (
    "c" in e &&
    "m" in e &&
    "y" in e &&
    "k" in e &&
    void 0 !== e.c &&
    void 0 !== e.m &&
    void 0 !== e.y &&
    void 0 !== e.k
  );
}
((e) => {
  let t;
  var r;
  ((r = t = e.ColorSpace || (e.ColorSpace = {}))[(r.sRGB = 0)] = "sRGB"),
    (r[(r.CMYK = 1)] = "CMYK"),
    (r[(r.SpotColor = 2)] = "SpotColor"),
    (e.toColor = function (e) {
      switch (e.colorSpace) {
        case 0:
          return {
            r: e.components.x,
            g: e.components.y,
            b: e.components.z,
            a: e.components.w,
          };
        case 2:
          return {
            name: e.spotColorName,
            tint: e.tint,
            externalReference: e.externalReference,
          };
        case 1:
          return {
            c: e.components.x,
            m: e.components.y,
            y: e.components.z,
            k: e.components.w,
            tint: e.tint,
          };
        default:
          throw new Error("Unknown color space!");
      }
    }),
    (e.fromColor = function (e) {
      if (ar(e))
        return {
          colorSpace: 0,
          components: { x: e.r, y: e.g, z: e.b, w: e.a },
          spotColorName: "",
          tint: 1,
          externalReference: "",
        };
      if (ur(e))
        return {
          colorSpace: 1,
          components: { x: e.c, y: e.m, z: e.y, w: e.k },
          spotColorName: "",
          tint: e.tint,
          externalReference: "",
        };
      if (sr(e))
        return {
          colorSpace: 2,
          components: { x: 0, y: 0, z: 0, w: 0 },
          spotColorName: e.name,
          tint: e.tint,
          externalReference: e.externalReference,
        };
      throw new Error("Unknown color space!");
    });
})(nr || (nr = {}));
var cr,
  lr,
  dr,
  hr,
  fr,
  pr,
  mr,
  gr,
  vr,
  yr,
  br,
  wr,
  _r,
  Er,
  Cr,
  Sr,
  kr,
  xr,
  Tr,
  Ar,
  Pr,
  Fr,
  Lr,
  Rr,
  Br,
  Dr,
  Mr,
  Or,
  Ir,
  jr,
  Ur,
  $r,
  qr,
  Hr,
  Nr,
  Vr,
  zr,
  Wr,
  Gr,
  Xr,
  Yr,
  Kr,
  Zr,
  Qr,
  Jr,
  en,
  tn,
  rn,
  nn,
  on,
  an,
  sn,
  un,
  cn,
  ln,
  dn,
  hn,
  fn,
  pn,
  mn,
  gn,
  vn,
  yn,
  bn,
  wn,
  _n,
  En,
  Cn,
  Sn,
  kn,
  xn,
  Tn,
  An,
  Pn,
  Fn,
  Ln,
  Rn,
  Bn,
  Dn,
  Mn,
  On,
  In,
  jn,
  Un,
  $n,
  qn,
  Hn,
  Nn,
  Vn,
  zn,
  Wn,
  Gn,
  Xn,
  Yn,
  Kn,
  Zn,
  Qn,
  Jn,
  eo,
  to,
  ro,
  no,
  oo,
  io,
  ao,
  so,
  uo,
  co,
  lo,
  ho,
  fo,
  po,
  mo,
  go,
  vo,
  yo,
  bo,
  wo,
  _o,
  Eo,
  Co,
  So,
  ko,
  xo,
  To,
  Ao,
  Po,
  Fo,
  Lo,
  Ro,
  Bo,
  Do,
  Mo,
  Oo,
  Io,
  jo,
  Uo,
  $o,
  qo,
  Ho,
  No,
  Vo,
  zo,
  Wo,
  Go,
  Xo,
  Yo,
  Ko,
  Zo,
  Qo,
  Jo,
  ei,
  ti,
  ri,
  ni,
  oi,
  ii,
  ai,
  si,
  ui,
  ci,
  li,
  di,
  hi,
  fi,
  pi,
  mi,
  gi,
  vi,
  yi,
  bi,
  wi,
  _i,
  Ei,
  Ci,
  Si,
  ki,
  xi,
  Ti,
  Ai,
  Pi,
  Fi,
  Li,
  Ri,
  Bi,
  Di,
  Mi,
  Oi,
  Ii,
  ji,
  Ui,
  $i,
  qi,
  Hi,
  Ni,
  Vi,
  zi,
  Wi,
  Gi,
  Xi,
  Yi,
  Ki,
  Zi,
  Qi,
  Ji,
  ea,
  ta,
  ra,
  na,
  oa,
  ia,
  aa,
  sa,
  ua,
  ca,
  la,
  da,
  ha,
  fa,
  pa,
  ma,
  ga,
  va,
  ya,
  ba,
  wa,
  _a,
  Ea,
  Ca,
  Sa,
  ka,
  xa,
  Ta,
  Aa,
  Pa,
  Fa,
  La,
  Ra,
  Ba,
  Da,
  Ma,
  Oa,
  Ia,
  ja,
  Ua,
  $a,
  qa,
  Ha,
  Na,
  Va,
  za,
  Wa,
  Ga,
  Xa,
  Ya,
  Ka,
  Za,
  Qa,
  Ja,
  es,
  ts,
  rs,
  ns,
  os,
  is,
  as,
  ss,
  us,
  cs,
  ls,
  ds,
  hs,
  fs,
  ps,
  ms,
  gs,
  vs,
  ys,
  bs,
  ws,
  _s,
  Es,
  Cs,
  Ss,
  ks,
  xs,
  Ts,
  As,
  Ps,
  Fs,
  Ls,
  Rs,
  Bs,
  Ds,
  Ms,
  Os,
  Is,
  js,
  Us,
  $s,
  qs,
  Hs,
  Ns,
  Vs,
  zs,
  Ws,
  Gs,
  Xs,
  Ys,
  Ks,
  Zs,
  Qs,
  Js,
  eu,
  tu,
  ru,
  nu,
  ou =
    "undefined" != typeof Blob
      ? Blob
      : (() => {
          try {
            return mt().Blob;
          } catch (e) {
            return function () {
              throw new Error(
                "Could not find Blob constructor and failed to require('buffer').Blob"
              );
            };
          }
        })();
(tu = [er]),
  (eu = [er]),
  (Js = [er]),
  (Qs = [er]),
  (Zs = [Jt]),
  (Ks = [Jt]),
  (Ys = [er]),
  (Xs = [er]),
  (Gs = [er]),
  (Ws = [Jt]),
  (zs = [Jt]),
  (Vs = [Jt]),
  (Ns = [er]),
  (Hs = [er]),
  (qs = [er]),
  ($s = [er]),
  (Us = [Jt]),
  (js = [er]),
  (Is = [er]),
  (Os = [Jt]),
  (Ms = [Jt]),
  (Ds = [Jt]),
  (Bs = [Jt]),
  (Rs = [Jt]),
  (Ls = [Jt]),
  (Fs = [Jt]),
  (Ps = [er]),
  (As = [Jt]),
  (Ts = [Jt]),
  (xs = [Jt]),
  (ks = [er]),
  (Ss = [Jt]),
  (Cs = [er]),
  (Es = [Jt]),
  (_s = [er]),
  (ws = [Jt]),
  (bs = [er]),
  (ys = [Jt]),
  (vs = [Jt]),
  (gs = [Jt]),
  (ms = [Jt]),
  (ps = [er]),
  (fs = [er]),
  (hs = [er]),
  (ds = [er]),
  (ls = [er]),
  (cs = [er]),
  (us = [Jt]),
  (ss = [Jt]),
  (as = [er]),
  (is = [er]),
  (os = [er]),
  (ns = [er]),
  (rs = [Jt]),
  (ts = [er]),
  (es = [Jt]),
  (Ja = [Jt]),
  (Qa = [er]),
  (Za = [er]),
  (Ka = [Jt]),
  (Ya = [Jt]),
  (Xa = [Jt]),
  (Ga = [Jt]),
  (Wa = [Jt]),
  (za = [Jt]),
  (Va = [er]),
  (Na = [er]),
  (Ha = [er]),
  (qa = [er]),
  ($a = [Jt]),
  (Ua = [Jt]),
  (ja = [Jt]),
  (Ia = [Jt]),
  (Oa = [er]),
  (Ma = [Jt]),
  (Da = [er]),
  (Ba = [er]),
  (Ra = [Jt]),
  (La = [Jt]),
  (Fa = [Jt]),
  (Pa = [er]),
  (Aa = [er]),
  (Ta = [Jt]),
  (xa = [Jt]),
  (ka = [Jt]),
  (Sa = [Jt]),
  (Ca = [Jt]),
  (Ea = [Jt]),
  (_a = [er]),
  (wa = [er]),
  (ba = [Jt]),
  (ya = [er]),
  (va = [er]),
  (ga = [er]),
  (ma = [er]),
  (pa = [er]),
  (fa = [er]),
  (ha = [Jt]),
  (da = [Jt]),
  (la = [Jt]),
  (ca = [Jt]),
  (ua = [Jt]),
  (sa = [er]),
  (aa = [Jt]),
  (ia = [er]),
  (oa = [Jt]),
  (na = [er]),
  (ra = [Jt]),
  (ta = [er]),
  (ea = [Jt]),
  (Ji = [er]),
  (Qi = [Jt]),
  (Zi = [er]),
  (Ki = [Jt]),
  (Yi = [er]),
  (Xi = [Jt]),
  (Gi = [er]),
  (Wi = [Jt]),
  (zi = [Jt]),
  (Vi = [er]),
  (Ni = [Jt]),
  (Hi = [Jt]),
  (qi = [er]),
  ($i = [er]),
  (Ui = [er]),
  (ji = [Jt]),
  (Ii = [Jt]),
  (Oi = [Jt]),
  (Mi = [er]),
  (Di = [er]),
  (Bi = [er]),
  (Ri = [er]),
  (Li = [er]),
  (Fi = [er]),
  (Pi = [er]),
  (Ai = [Jt]),
  (Ti = [Jt]),
  (xi = [Jt]),
  (ki = [Jt]),
  (Si = [Jt]),
  (Ci = [Jt]),
  (Ei = [er]),
  (_i = [er]),
  (wi = [er]),
  (bi = [Jt]),
  (yi = [Jt]),
  (vi = [er]),
  (gi = [Jt]),
  (mi = [Jt]),
  (pi = [Jt]),
  (fi = [er]),
  (hi = [Jt]),
  (di = [Jt]),
  (li = [Jt]),
  (ci = [er]),
  (ui = [er]),
  (si = [Jt]),
  (ai = [er]),
  (ii = [Jt]),
  (oi = [er]),
  (ni = [Jt]),
  (ri = [Jt]),
  (ti = [Jt]),
  (ei = [er]),
  (Jo = [er]),
  (Qo = [er]),
  (Zo = [Jt]),
  (Ko = [er]),
  (Yo = [Jt]),
  (Xo = [er]),
  (Go = [Jt]),
  (Wo = [Jt]),
  (zo = [er]),
  (Vo = [Jt]),
  (No = [er]),
  (Ho = [Jt]),
  (qo = [Jt]),
  ($o = [Jt]),
  (Uo = [er]),
  (jo = [Jt]),
  (Io = [er]),
  (Oo = [Jt]),
  (Mo = [Jt]),
  (Do = [Jt]),
  (Bo = [er]),
  (Ro = [Jt]),
  (Lo = [er]),
  (Fo = [er]),
  (Po = [Jt]),
  (Ao = [Jt]),
  (To = [er]),
  (xo = [Jt]),
  (ko = [er]),
  (So = [Jt]),
  (Co = [er]),
  (Eo = [Jt]),
  (_o = [er]),
  (wo = [Jt]),
  (bo = [Jt]),
  (yo = [Jt]),
  (vo = [er]),
  (go = [Jt]),
  (mo = [er]),
  (po = [er]),
  (fo = [Jt]),
  (ho = [Jt]),
  (lo = [er]),
  (co = [Jt]),
  (uo = [er]),
  (so = [Jt]),
  (ao = [er]),
  (io = [Jt]),
  (oo = [er]),
  (no = [Jt]),
  (ro = [er]),
  (to = [Jt]),
  (eo = [er]),
  (Jn = [er]),
  (Qn = [er]),
  (Zn = [er]),
  (Kn = [er]),
  (Yn = [er]),
  (Xn = [Jt]),
  (Gn = [Jt]),
  (Wn = [Jt]),
  (zn = [Jt]),
  (Vn = [er]),
  (Nn = [Jt]),
  (Hn = [Jt]),
  (qn = [er]),
  ($n = [er]),
  (Un = [er]),
  (jn = [er]),
  (In = [Jt]),
  (On = [Jt]),
  (Mn = [Jt]),
  (Dn = [Jt]),
  (Bn = [Jt]),
  (Rn = [er]),
  (Ln = [Jt]),
  (Fn = [er]),
  (Pn = [er]),
  (An = [Jt]),
  (Tn = [er]),
  (xn = [Jt]),
  (kn = [Jt]),
  (Sn = [Jt]),
  (Cn = [er]),
  (En = [Jt]),
  (_n = [Jt]),
  (wn = [Jt]),
  (bn = [er]),
  (yn = [Jt]),
  (vn = [er]),
  (gn = [Jt]),
  (mn = [er]),
  (pn = [Jt]),
  (fn = [Jt]),
  (hn = [Jt]),
  (dn = [er]),
  (ln = [er]),
  (cn = [Jt]),
  (un = [Jt]),
  (sn = [Jt]),
  (an = [Jt]),
  (on = [er]),
  (nn = [Jt]),
  (rn = [Jt]),
  (tn = [Jt]),
  (en = [er]),
  (Jr = [Jt]),
  (Qr = [Jt]),
  (Zr = [Jt]),
  (Kr = [er]),
  (Yr = [Jt]),
  (Xr = [er]),
  (Gr = [Jt]),
  (Wr = [Jt]),
  (zr = [er]),
  (Vr = [Jt]),
  (Nr = [Jt]),
  (Hr = [Jt]),
  (qr = [er]),
  ($r = [Jt]),
  (Ur = [Jt]),
  (jr = [er]),
  (Ir = [Jt]),
  (Or = [Jt]),
  (Mr = [Jt]),
  (Dr = [er]),
  (Br = [Jt]),
  (Rr = [er]),
  (Lr = [Jt]),
  (Fr = [er]),
  (Pr = [Jt]),
  (Ar = [er]),
  (Tr = [Jt]),
  (xr = [Jt]),
  (kr = [Jt]),
  (Sr = [Jt]),
  (Cr = [Jt]),
  (Er = [Jt]),
  (_r = [Jt]),
  (wr = [er]),
  (br = [Jt]),
  (yr = [er]),
  (vr = [er]),
  (gr = [er]),
  (mr = [Jt]),
  (pr = [Jt]),
  (fr = [Jt]),
  (hr = [er]),
  (dr = [Jt]),
  (lr = [er]),
  (cr = [er]);
var BlockAPI = class {
  constructor(e) {
    executeInitializers(nu, 5, this),
      addPrivateMember(this, ru),
      defineProperty(this, "onSelectionChanged", (e) => {
        const t = accessPrivateField(this, ru).subscribeToSelectionChange(e);
        return () => {
          accessPrivateField(this, ru).isDeleted() ||
            St(accessPrivateField(this, ru).unsubscribe(t));
        };
      }),
      defineProperty(this, "onClicked", (e) => {
        const t = accessPrivateField(this, ru).subscribeToBlockClicked(e);
        return () => {
          accessPrivateField(this, ru).isDeleted() ||
            St(accessPrivateField(this, ru).unsubscribe(t));
        };
      }),
      defineProperty(this, "onStateChanged", (e, t) => {
        Yt("ids", e, Ut(qt()));
        const r = accessPrivateField(this, ru).subscribeToBlockState(e, (e) => {
          try {
            t(xt(e, !0));
          } catch (e) {
            console.error(e);
          }
        });
        return () => {
          accessPrivateField(this, ru).isDeleted() ||
            St(accessPrivateField(this, ru).unsubscribe(r));
        };
      }),
      writePrivateField(this, ru, e);
  }
  async export(e, t = ir.Png, r = {}) {
    Yt("handle", e, Ht()), Yt("mimeType", t, Kt()), Yt("options", r, Nt());
    const n = null != r.targetWidth && null != r.targetHeight,
      o = r.jpegQuality ?? 0.9,
      i = r.webpQuality ?? 1,
      a = r.pngCompressionLevel ?? 5;
    return (
      Yt("jpegQuality", o, Wt(zt(Ht(), 1), 0, { exclusive: !0 })),
      Yt("webpQuality", i, Wt(zt(Ht(), 1), 0, { exclusive: !0 })),
      Yt("pngCompressionLevel", a, Wt(zt(qt(), 9), 0)),
      (null == r.targetWidth && null == r.targetHeight) ||
        (Yt("targetWidth", r.targetWidth, Ht()),
        Yt("targetHeight", r.targetHeight, Ht())),
      new Promise((s, u) => {
        accessPrivateField(this, ru).exportToBuffer(
          e,
          t,
          (e) => {
            "error" in e ? u(e.error) : s(new ou([e], { type: t }));
          },
          {
            pngCompressionLevel: a,
            jpegQuality: o,
            webpQuality: i,
            useTargetSize: n,
            targetWidth: r.targetWidth ?? 0,
            targetHeight: r.targetHeight ?? 0,
            exportPdfWithHighCompatibility:
              r.exportPdfWithHighCompatibility ?? !0,
            exportPdfWithUnderlayer: r.exportPdfWithUnderlayer ?? !1,
            underlayerSpotColorName: r.underlayerSpotColorName ?? "",
            underlayerOffset: r.underlayerOffset ?? 0,
          }
        );
      })
    );
  }
  async exportWithColorMask(e, t = ir.Png, r, n, o, i = {}) {
    Yt("handle", e, Ht()), Yt("mimeType", t, Kt()), Yt("options", i, Nt());
    const a = null != i.targetWidth && null != i.targetHeight,
      s = i.jpegQuality ?? 0.9,
      u = i.webpQuality ?? 1,
      c = i.pngCompressionLevel ?? 5;
    return (
      Yt("jpegQuality", s, Wt(zt(Ht(), 1), 0, { exclusive: !0 })),
      Yt("webpQuality", u, Wt(zt(Ht(), 1), 0, { exclusive: !0 })),
      Yt("pngCompressionLevel", c, Wt(zt(qt(), 9), 0)),
      (null == i.targetWidth && null == i.targetHeight) ||
        (Yt("targetWidth", i.targetWidth, Ht()),
        Yt("targetHeight", i.targetHeight, Ht())),
      new Promise((l, d) => {
        accessPrivateField(this, ru).exportWithColorMaskToBuffer(
          e,
          t,
          r,
          n,
          o,
          (e, r) => {
            if ("error" in e) d(e.error);
            else if ("error" in r) d(r.error);
            else {
              const n = new ou([e], { type: t }),
                o = new ou([r], { type: t });
              l([n, o]);
            }
          },
          {
            pngCompressionLevel: c,
            jpegQuality: s,
            webpQuality: u,
            useTargetSize: a,
            targetWidth: i.targetWidth ?? 0,
            targetHeight: i.targetHeight ?? 0,
            exportPdfWithHighCompatibility:
              i.exportPdfWithHighCompatibility ?? !0,
            exportPdfWithUnderlayer: i.exportPdfWithUnderlayer ?? !1,
            underlayerSpotColorName: i.underlayerSpotColorName ?? "",
            underlayerOffset: i.underlayerOffset ?? 0,
          }
        );
      })
    );
  }
  async exportVideo(e, t = ir.Mp4, r, n) {
    throw new Error(
      "Method not implemented. An implementation is available on the BlockAPI at engine.block or cesdk.engine.block"
    );
  }
  async unstable_exportAudio(e, t = ir.Wav, r, n) {
    return (
      Yt("handle", e, Ht()),
      Yt("mimeType", t, Kt()),
      Yt("options", n, Nt()),
      new Promise((o, i) => {
        accessPrivateField(this, ru).unstable_exportAudioToBuffer(
          e,
          n.timeOffset ?? 0,
          n.duration ?? 0,
          t,
          r,
          (e) => {
            "error" in e ? i(e.error) : o(new ou([e], { type: t }));
          },
          {
            sampleRate: n.sampleRate ?? 48e3,
            numberOfChannels: n.numberOfChannels ?? 2,
          }
        );
      })
    );
  }
  async loadFromString(e) {
    return (
      Yt("content", e, Vt()),
      kt((t) => accessPrivateField(this, ru).loadBlocksFromString(e, t)).then(
        (e) => xt(e)
      )
    );
  }
  loadFromArchiveURL(e) {
    return (
      Yt("url", e, Vt()),
      kt((t) =>
        accessPrivateField(this, ru).loadBlocksFromArchiveURL(e, t)
      ).then((e) => xt(e))
    );
  }
  async saveToString(e, t = ["buffer", "http", "https"]) {
    return (
      Yt("blocks", e, Ut(Ht())),
      kt((r) => accessPrivateField(this, ru).saveBlocksToString(e, r, t))
    );
  }
  async saveToArchive(e) {
    return (
      Yt("blocks", e, Ut(Ht())),
      new Promise((t, r) => {
        accessPrivateField(this, ru).saveBlocksToArchive(e, (e) => {
          "error" in e ? r(e.error) : t(new ou([e], { type: ir.Zip }));
        });
      })
    );
  }
  create(e) {
    return Yt("type", e, Vt()), St(accessPrivateField(this, ru).create(e));
  }
  createFill(e) {
    return Yt("type", e, Vt()), St(accessPrivateField(this, ru).createFill(e));
  }
  getType(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getType(e));
  }
  getKind(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getKind(e));
  }
  setKind(e, t) {
    Yt("id", e, qt()), St(accessPrivateField(this, ru).setKind(e, t));
  }
  select(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).select(e));
  }
  setSelected(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("selected", t, $t()),
      St(accessPrivateField(this, ru).setSelected(e, t))
    );
  }
  isSelected(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isSelected(e));
  }
  findAllSelected() {
    return xt(accessPrivateField(this, ru).findAllSelected());
  }
  isGroupable(e) {
    return (
      Yt("ids", e, Ut(Ht())), St(accessPrivateField(this, ru).isGroupable(e))
    );
  }
  group(e) {
    return (
      Yt("ids", e, Gt(Ut(Ht()))), St(accessPrivateField(this, ru).group(e))
    );
  }
  ungroup(e) {
    return Yt("id", e, Ht()), St(accessPrivateField(this, ru).ungroup(e));
  }
  enterGroup(e) {
    return Yt("id", e, Ht()), St(accessPrivateField(this, ru).enterGroup(e));
  }
  exitGroup(e) {
    return Yt("id", e, Ht()), St(accessPrivateField(this, ru).exitGroup(e));
  }
  isCombinable(e) {
    return (
      Yt("ids", e, Ut(Ht())), St(accessPrivateField(this, ru).isCombinable(e))
    );
  }
  combine(e, t) {
    return (
      Yt("ids", e, Ut(Ht())),
      Yt("op", t, Vt()),
      St(accessPrivateField(this, ru).combine(e, t))
    );
  }
  setName(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("name", t, Vt()),
      St(accessPrivateField(this, ru).setName(e, t))
    );
  }
  getName(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getName(e));
  }
  getUUID(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getUUID(e));
  }
  findByName(e) {
    Yt("name", e, Vt());
    const t = accessPrivateField(this, ru).findByName(e);
    return xt(t);
  }
  findByType(e) {
    Yt("type", e, Vt());
    const t = St(accessPrivateField(this, ru).findByType(e));
    return xt(t);
  }
  findByKind(e) {
    Yt("kind", e, Vt());
    const t = St(accessPrivateField(this, ru).findByKind(e));
    return xt(t);
  }
  findAll() {
    return xt(accessPrivateField(this, ru).findAll());
  }
  findAllPlaceholders() {
    return xt(accessPrivateField(this, ru).findAllPlaceholders());
  }
  createShape(e) {
    return Yt("type", e, Vt()), St(accessPrivateField(this, ru).createShape(e));
  }
  hasShape(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasShape(e));
  }
  supportsShape(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsShape(e));
  }
  getShape(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getShape(e));
  }
  setShape(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("shape", t, qt()),
      St(accessPrivateField(this, ru).setShape(e, t))
    );
  }
  isVisible(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isVisible(e));
  }
  setVisible(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("visible", t, $t()),
      St(accessPrivateField(this, ru).setVisible(e, t))
    );
  }
  isClipped(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isClipped(e));
  }
  setClipped(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("clipped", t, $t()),
      St(accessPrivateField(this, ru).setClipped(e, t))
    );
  }
  isTransformLocked(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).isTransformLocked(e))
    );
  }
  setTransformLocked(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("locked", t, $t()),
      St(accessPrivateField(this, ru).setTransformLocked(e, t))
    );
  }
  getPositionX(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getPositionX(e));
  }
  getPositionXMode(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getPositionXMode(e))
    );
  }
  getPositionY(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getPositionY(e));
  }
  getPositionYMode(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getPositionYMode(e))
    );
  }
  setPositionX(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("value", t, Ht()),
      St(accessPrivateField(this, ru).setPositionX(e, t))
    );
  }
  setPositionXMode(e, t) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).setPositionXMode(e, t))
    );
  }
  setPositionY(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("value", t, Ht()),
      St(accessPrivateField(this, ru).setPositionY(e, t))
    );
  }
  setPositionYMode(e, t) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).setPositionYMode(e, t))
    );
  }
  setAlwaysOnTop(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setAlwaysOnTop(e, t))
    );
  }
  setAlwaysOnBottom(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setAlwaysOnBottom(e, t))
    );
  }
  isAlwaysOnTop(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isAlwaysOnTop(e));
  }
  isAlwaysOnBottom(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).isAlwaysOnBottom(e))
    );
  }
  bringToFront(e) {
    return Yt("id", e, Ht()), St(accessPrivateField(this, ru).bringToFront(e));
  }
  sendToBack(e) {
    return Yt("id", e, Ht()), St(accessPrivateField(this, ru).sendToBack(e));
  }
  bringForward(e) {
    return Yt("id", e, Ht()), St(accessPrivateField(this, ru).bringForward(e));
  }
  sendBackward(e) {
    return Yt("id", e, Ht()), St(accessPrivateField(this, ru).sendBackward(e));
  }
  getRotation(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getRotation(e));
  }
  setRotation(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("radians", t, Ht()),
      St(accessPrivateField(this, ru).setRotation(e, t))
    );
  }
  getFlipHorizontal(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getFlip(e)).horizontal
    );
  }
  getFlipVertical(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getFlip(e)).vertical
    );
  }
  setFlipHorizontal(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("flip", t, $t()),
      St(accessPrivateField(this, ru).setFlipHorizontal(e, t))
    );
  }
  setFlipVertical(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("flip", t, $t()),
      St(accessPrivateField(this, ru).setFlipVertical(e, t))
    );
  }
  hasContentFillMode(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).hasContentFillMode(e))
    );
  }
  supportsContentFillMode(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).supportsContentFillMode(e))
    );
  }
  getWidth(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getWidth(e));
  }
  getWidthMode(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getWidthMode(e));
  }
  getHeight(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getHeight(e));
  }
  getHeightMode(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getHeightMode(e));
  }
  setWidth(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("value", t, Ht()),
      St(accessPrivateField(this, ru).setWidth(e, t))
    );
  }
  setWidthMode(e, t) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).setWidthMode(e, t))
    );
  }
  setHeight(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("value", t, Ht()),
      St(accessPrivateField(this, ru).setHeight(e, t))
    );
  }
  setHeightMode(e, t) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).setHeightMode(e, t))
    );
  }
  getFrameX(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getLastFrameX(e));
  }
  getFrameY(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getLastFrameY(e));
  }
  getFrameWidth(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getLastFrameWidth(e))
    );
  }
  getFrameHeight(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getLastFrameHeight(e))
    );
  }
  setContentFillMode(e, t) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setContentFillMode(e, t))
    );
  }
  getContentFillMode(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getContentFillMode(e))
    );
  }
  duplicate(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).duplicate(e));
  }
  destroy(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).destroy(e));
  }
  isValid(e) {
    return Yt("id", e, qt()), accessPrivateField(this, ru).isValid(e);
  }
  getParent(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).hasParent(e))
        ? St(accessPrivateField(this, ru).getParent(e))
        : null
    );
  }
  getChildren(e) {
    Yt("id", e, qt());
    const t = St(accessPrivateField(this, ru).getChildren(e));
    return xt(t);
  }
  insertChild(e, t, r) {
    return (
      Yt("parent", e, Ht()),
      Yt("child", t, Ht()),
      Yt("index", r, Wt(Ht(), 0)),
      St(accessPrivateField(this, ru).insertChild(e, t, r))
    );
  }
  appendChild(e, t) {
    return (
      Yt("parent", e, Ht()),
      Yt("child", t, Ht()),
      St(accessPrivateField(this, ru).appendChild(e, t))
    );
  }
  referencesAnyVariables(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).referencesAnyVariables(e))
    );
  }
  getGlobalBoundingBoxX(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getGlobalBoundingBoxX(e))
    );
  }
  getGlobalBoundingBoxY(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getGlobalBoundingBoxY(e))
    );
  }
  getGlobalBoundingBoxWidth(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getGlobalBoundingBoxWidth(e))
    );
  }
  getGlobalBoundingBoxHeight(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getGlobalBoundingBoxHeight(e))
    );
  }
  getScreenSpaceBoundingBoxXYWH(e) {
    return (
      Yt("ids", e, Ut(Ht())),
      St(accessPrivateField(this, ru).getScreenSpaceBoundingBoxXYWH(e))
    );
  }
  alignHorizontally(e, t) {
    return (
      Yt("ids", e, Gt(Ut(Ht()))),
      St(accessPrivateField(this, ru).alignHorizontally(e, t))
    );
  }
  alignVertically(e, t) {
    return (
      Yt("ids", e, Gt(Ut(Ht()))),
      St(accessPrivateField(this, ru).alignVertically(e, t))
    );
  }
  isAlignable(e) {
    return (
      Yt("ids", e, Ut(Ht())), St(accessPrivateField(this, ru).isAlignable(e))
    );
  }
  distributeHorizontally(e) {
    return (
      Yt("ids", e, Gt(Ut(Ht()))),
      St(accessPrivateField(this, ru).distributeHorizontally(e))
    );
  }
  distributeVertically(e) {
    return (
      Yt("ids", e, Gt(Ut(Ht()))),
      St(accessPrivateField(this, ru).distributeVertically(e))
    );
  }
  isDistributable(e) {
    return (
      Yt("ids", e, Ut(Ht())),
      St(accessPrivateField(this, ru).isDistributable(e))
    );
  }
  fillParent(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).fillParent(e));
  }
  resizeContentAware(e, t, r) {
    return (
      Yt("ids", e, Ut(Ht())),
      Yt("width", t, Ht()),
      Yt("height", r, Ht()),
      St(accessPrivateField(this, ru).resizeContentAware(e, t, r))
    );
  }
  scale(e, t, r = 0, n = 0) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).scale(e, t, r, n))
    );
  }
  findAllProperties(e) {
    return (
      Yt("id", e, qt()),
      xt(St(accessPrivateField(this, ru).findAllProperties(e)))
    );
  }
  isPropertyReadable(e) {
    return (
      Yt("property", e, Vt()),
      accessPrivateField(this, ru).isPropertyReadable(e)
    );
  }
  isPropertyWritable(e) {
    return (
      Yt("property", e, Vt()),
      accessPrivateField(this, ru).isPropertyWritable(e)
    );
  }
  getPropertyType(e) {
    Yt("property", e, Vt());
    return St(accessPrivateField(this, ru).getPropertyType(e));
  }
  getEnumValues(e) {
    return (
      Yt("enumProperty", e, Vt()),
      xt(St(accessPrivateField(this, ru).getEnumValues(e)))
    );
  }
  setBool(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("value", r, $t()),
      St(accessPrivateField(this, ru).setBool(e, t, r))
    );
  }
  getBool(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getBool(e, t))
    );
  }
  setInt(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("value", r, qt()),
      St(accessPrivateField(this, ru).setInt(e, t, r))
    );
  }
  getInt(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getInt(e, t))
    );
  }
  setFloat(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("value", r, Ht()),
      St(accessPrivateField(this, ru).setFloat(e, t, r))
    );
  }
  getFloat(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getFloat(e, t))
    );
  }
  setDouble(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("value", r, Ht()),
      St(accessPrivateField(this, ru).setDouble(e, t, r))
    );
  }
  getDouble(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getDouble(e, t))
    );
  }
  setString(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("value", r, Vt()),
      St(accessPrivateField(this, ru).setString(e, t, r))
    );
  }
  getString(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getString(e, t))
    );
  }
  setColor(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).setColor(e, t, nr.fromColor(r)))
    );
  }
  getColor(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      nr.toColor(St(accessPrivateField(this, ru).getColor(e, t)))
    );
  }
  setColorRGBA(e, t, r, n, o, i = 1) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("r", r, Ht()),
      Yt("g", n, Ht()),
      Yt("b", o, Ht()),
      Yt("a", i, Ht()),
      St(accessPrivateField(this, ru).setColorRGBA(e, t, r, n, o, i))
    );
  }
  getColorRGBA(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getColorRGBA(e, t))
    );
  }
  setColorSpot(e, t, r, n = 1) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("name", r, Vt()),
      Yt("tint", n, Ht()),
      St(accessPrivateField(this, ru).setColorSpot(e, t, r, n))
    );
  }
  getColorSpotName(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getColorSpotName(e, t))
    );
  }
  getColorSpotTint(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getColorSpotTint(e, t))
    );
  }
  setGradientColorStops(e, t, r) {
    Yt("id", e, qt()), Yt("property", t, Vt());
    const n = r.map((e) => ({ color: nr.fromColor(e.color), stop: e.stop }));
    return St(accessPrivateField(this, ru).setGradientColorStops(e, t, n));
  }
  getGradientColorStops(e, t) {
    Yt("id", e, qt()), Yt("property", t, Vt());
    const r = St(accessPrivateField(this, ru).getGradientColorStops(e, t));
    return xt(r).map((e) => ({ color: nr.toColor(e.color), stop: e.stop }));
  }
  getSourceSet(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      xt(St(accessPrivateField(this, ru).getSourceSet(e, t)))
    );
  }
  setSourceSet(e, t, r) {
    Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("sourceSet", r, Ut(Nt({ uri: Vt(), width: Ht(), height: Ht() }))),
      St(accessPrivateField(this, ru).setSourceSet(e, t, r));
  }
  addImageFileURIToSourceSet(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("uri", r, Vt()),
      kt((n) =>
        accessPrivateField(this, ru).addImageFileURIToSourceSet(e, t, r, n)
      )
    );
  }
  setEnum(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("value", r, Vt()),
      St(accessPrivateField(this, ru).setEnum(e, t, r))
    );
  }
  getEnum(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getEnum(e, t))
    );
  }
  hasCrop(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasCrop(e));
  }
  supportsCrop(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsCrop(e));
  }
  setCropScaleX(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("scaleX", t, Ht()),
      St(accessPrivateField(this, ru).setCropScaleX(e, t))
    );
  }
  setCropScaleY(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("scaleY", t, Ht()),
      St(accessPrivateField(this, ru).setCropScaleY(e, t))
    );
  }
  setCropRotation(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("rotation", t, Ht()),
      St(accessPrivateField(this, ru).setCropRotation(e, t))
    );
  }
  setCropScaleRatio(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("scaleRatio", t, Ht()),
      St(accessPrivateField(this, ru).setCropScaleRatio(e, t))
    );
  }
  setCropTranslationX(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("translationX", t, Ht()),
      St(accessPrivateField(this, ru).setCropTranslationX(e, t))
    );
  }
  setCropTranslationY(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("translationY", t, Ht()),
      St(accessPrivateField(this, ru).setCropTranslationY(e, t))
    );
  }
  resetCrop(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).resetCrop(e));
  }
  getCropScaleX(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getCropScaleX(e));
  }
  getCropScaleY(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getCropScaleY(e));
  }
  getCropRotation(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getCropRotation(e))
    );
  }
  getCropScaleRatio(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getCropScaleRatio(e))
    );
  }
  getCropTranslationX(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getCropTranslationX(e))
    );
  }
  getCropTranslationY(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getCropTranslationY(e))
    );
  }
  adjustCropToFillFrame(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("minScaleRatio", t, Ht()),
      St(accessPrivateField(this, ru).adjustCropToFillFrame(e, t))
    );
  }
  flipCropHorizontal(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).flipCropHorizontal(e))
    );
  }
  flipCropVertical(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).flipCropVertical(e))
    );
  }
  hasOpacity(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasOpacity(e));
  }
  supportsOpacity(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsOpacity(e))
    );
  }
  setOpacity(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("opacity", t, Ht()),
      St(accessPrivateField(this, ru).setOpacity(e, t))
    );
  }
  getOpacity(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getOpacity(e));
  }
  hasBlendMode(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasBlendMode(e));
  }
  supportsBlendMode(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsBlendMode(e))
    );
  }
  setBlendMode(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("blendMode", t, Vt()),
      St(accessPrivateField(this, ru).setBlendMode(e, t))
    );
  }
  getBlendMode(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getBlendMode(e));
  }
  hasFillColor(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasFillColor(e));
  }
  isIncludedInExport(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).isIncludedInExport(e))
    );
  }
  setIncludedInExport(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setIncludedInExport(e, t))
    );
  }
  setFillColorRGBA(e, t, r, n, o = 1) {
    return (
      Yt("id", e, qt()),
      Yt("r", t, Ht()),
      Yt("g", r, Ht()),
      Yt("b", n, Ht()),
      Yt("a", o, Ht()),
      St(accessPrivateField(this, ru).setFillColorRGBA(e, t, r, n, o))
    );
  }
  getFillColorRGBA(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getFillColorRGBA(e))
    );
  }
  setFillColorEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setFillColorEnabled(e, t))
    );
  }
  isFillColorEnabled(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).isFillColorEnabled(e))
    );
  }
  createEffect(e) {
    return (
      Yt("type", e, Vt()), St(accessPrivateField(this, ru).createEffect(e))
    );
  }
  hasEffects(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasEffects(e));
  }
  supportsEffects(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsEffects(e))
    );
  }
  getEffects(e) {
    Yt("id", e, qt());
    const t = St(accessPrivateField(this, ru).getEffects(e));
    return xt(t);
  }
  insertEffect(e, t, r) {
    Yt("id", e, qt()),
      Yt("effectId", t, qt()),
      Yt("index", r, Wt(qt(), 0)),
      St(accessPrivateField(this, ru).insertEffect(e, t, r));
  }
  appendEffect(e, t) {
    Yt("id", e, qt()),
      Yt("effectId", t, qt()),
      St(accessPrivateField(this, ru).appendEffect(e, t));
  }
  removeEffect(e, t) {
    Yt("id", e, qt()),
      Yt("index", t, Wt(qt(), 0)),
      St(accessPrivateField(this, ru).removeEffect(e, t));
  }
  hasEffectEnabled(e) {
    return (
      Yt("effectId", e, qt()),
      St(accessPrivateField(this, ru).hasEffectEnabled(e))
    );
  }
  setEffectEnabled(e, t) {
    Yt("effectId", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setEffectEnabled(e, t));
  }
  isEffectEnabled(e) {
    return (
      Yt("effectId", e, qt()),
      St(accessPrivateField(this, ru).isEffectEnabled(e))
    );
  }
  createBlur(e) {
    return Yt("type", e, Vt()), St(accessPrivateField(this, ru).createBlur(e));
  }
  hasBlur(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasBlur(e));
  }
  supportsBlur(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsBlur(e));
  }
  setBlur(e, t) {
    Yt("id", e, qt()),
      Yt("blurId", t, qt()),
      St(accessPrivateField(this, ru).setBlur(e, t));
  }
  getBlur(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getBlur(e));
  }
  setBlurEnabled(e, t) {
    Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setBlurEnabled(e, t));
  }
  isBlurEnabled(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isBlurEnabled(e));
  }
  hasBackgroundColor(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).hasBackgroundColor(e))
    );
  }
  supportsBackgroundColor(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).supportsBackgroundColor(e))
    );
  }
  setBackgroundColorRGBA(e, t, r, n, o = 1) {
    return (
      Yt("id", e, qt()),
      Yt("r", t, Ht()),
      Yt("g", r, Ht()),
      Yt("b", n, Ht()),
      Yt("a", o, Ht()),
      St(accessPrivateField(this, ru).setBackgroundColorRGBA(e, t, r, n, o))
    );
  }
  getBackgroundColorRGBA(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getBackgroundColorRGBA(e))
    );
  }
  setBackgroundColorEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setBackgroundColorEnabled(e, t))
    );
  }
  isBackgroundColorEnabled(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).isBackgroundColorEnabled(e))
    );
  }
  hasStroke(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasStroke(e));
  }
  supportsStroke(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsStroke(e))
    );
  }
  setStrokeEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setStrokeEnabled(e, t))
    );
  }
  isStrokeEnabled(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).isStrokeEnabled(e))
    );
  }
  setStrokeColorRGBA(e, t, r, n, o = 1) {
    return (
      Yt("id", e, qt()),
      Yt("r", t, Ht()),
      Yt("g", r, Ht()),
      Yt("b", n, Ht()),
      Yt("a", o, Ht()),
      St(accessPrivateField(this, ru).setStrokeColorRGBA(e, t, r, n, o))
    );
  }
  setStrokeColor(e, t) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setStrokeColor(e, nr.fromColor(t)))
    );
  }
  getStrokeColorRGBA(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getStrokeColorRGBA(e))
    );
  }
  getStrokeColor(e) {
    return (
      Yt("id", e, qt()),
      nr.toColor(St(accessPrivateField(this, ru).getStrokeColor(e)))
    );
  }
  setStrokeWidth(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("width", t, Ht()),
      St(accessPrivateField(this, ru).setStrokeWidth(e, t))
    );
  }
  getStrokeWidth(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getStrokeWidth(e))
    );
  }
  setStrokeStyle(e, t) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).setStrokeStyle(e, t))
    );
  }
  getStrokeStyle(e) {
    Yt("id", e, qt());
    return St(accessPrivateField(this, ru).getStrokeStyle(e));
  }
  setStrokePosition(e, t) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setStrokePosition(e, t))
    );
  }
  getStrokePosition(e) {
    Yt("id", e, qt());
    return St(accessPrivateField(this, ru).getStrokePosition(e));
  }
  setStrokeCornerGeometry(e, t) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setStrokeCornerGeometry(e, t))
    );
  }
  getStrokeCornerGeometry(e) {
    Yt("id", e, qt());
    return St(accessPrivateField(this, ru).getStrokeCornerGeometry(e));
  }
  hasDropShadow(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasDropShadow(e));
  }
  supportsDropShadow(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsDropShadow(e))
    );
  }
  setDropShadowEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setDropShadowEnabled(e, t))
    );
  }
  isDropShadowEnabled(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).isDropShadowEnabled(e))
    );
  }
  setDropShadowColorRGBA(e, t, r, n, o = 1) {
    return (
      Yt("id", e, qt()),
      Yt("r", t, Ht()),
      Yt("g", r, Ht()),
      Yt("b", n, Ht()),
      Yt("a", o, Ht()),
      St(accessPrivateField(this, ru).setDropShadowColorRGBA(e, t, r, n, o))
    );
  }
  setDropShadowColor(e, t) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setDropShadowColor(e, nr.fromColor(t)))
    );
  }
  getDropShadowColorRGBA(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getDropShadowColorRGBA(e))
    );
  }
  getDropShadowColor(e) {
    return (
      Yt("id", e, qt()),
      nr.toColor(St(accessPrivateField(this, ru).getDropShadowColor(e)))
    );
  }
  setDropShadowOffsetX(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("offsetX", t, Ht()),
      St(accessPrivateField(this, ru).setDropShadowOffsetX(e, t))
    );
  }
  getDropShadowOffsetX(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getDropShadowOffsetX(e))
    );
  }
  setDropShadowOffsetY(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("offsetY", t, Ht()),
      St(accessPrivateField(this, ru).setDropShadowOffsetY(e, t))
    );
  }
  getDropShadowOffsetY(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getDropShadowOffsetY(e))
    );
  }
  setDropShadowBlurRadiusX(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("blurRadiusX", t, Ht()),
      St(accessPrivateField(this, ru).setDropShadowBlurRadiusX(e, t))
    );
  }
  getDropShadowBlurRadiusX(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getDropShadowBlurRadiusX(e))
    );
  }
  setDropShadowBlurRadiusY(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("blurRadiusY", t, Ht()),
      St(accessPrivateField(this, ru).setDropShadowBlurRadiusY(e, t))
    );
  }
  getDropShadowBlurRadiusY(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getDropShadowBlurRadiusY(e))
    );
  }
  setDropShadowClip(e, t) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setDropShadowClip(e, t))
    );
  }
  getDropShadowClip(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getDropShadowClip(e))
    );
  }
  createCutoutFromBlocks(e, t = 2, r = 4) {
    return (
      Yt("ids", e, Ut(qt())),
      Yt("vectorizeDistanceThreshold", t, Ht()),
      Yt("maxSmoothingDistance", r, Ht()),
      St(accessPrivateField(this, ru).createCutoutFromBlocks(e, t, r))
    );
  }
  createCutoutFromPath(e) {
    return (
      Yt("path", e, Vt()),
      St(accessPrivateField(this, ru).createCutoutFromPath(e))
    );
  }
  createCutoutFromOperation(e, t) {
    return (
      Yt("ids", e, Ut(qt())),
      Yt(
        "op",
        t,
        (function () {
          const e = ["Difference", "Intersection", "Union", "XOR"];
          return jt(
            "CutoutOperation",
            (t) =>
              !("string" != typeof t || !e.includes(t)) || {
                message: `expected one of ${e
                  .map((e) => `"${e}"`)
                  .join(", ")}, but got "${t}"`,
              }
          );
        })()
      ),
      St(accessPrivateField(this, ru).createCutoutFromOperation(e, t))
    );
  }
  replaceText(e, t, r = -1, n = -1) {
    Yt("id", e, qt()),
      Yt("text", t, Vt()),
      Yt("from", r, qt()),
      Yt("to", n, qt()),
      St(accessPrivateField(this, ru).replaceText(e, t, r, n));
  }
  removeText(e, t = -1, r = -1) {
    Yt("id", e, qt()),
      Yt("from", t, qt()),
      Yt("to", r, qt()),
      St(accessPrivateField(this, ru).removeText(e, t, r));
  }
  setTextColor(e, t, r = -1, n = -1) {
    Yt("id", e, qt()),
      Yt("from", r, qt()),
      Yt("to", n, qt()),
      St(accessPrivateField(this, ru).setTextColor(e, nr.fromColor(t), r, n));
  }
  getTextColors(e, t = -1, r = -1) {
    Yt("id", e, qt()), Yt("from", t, qt()), Yt("to", r, qt());
    const n = accessPrivateField(this, ru).getTextColors(e, t, r);
    return xt(St(n)).map((e) => nr.toColor(e));
  }
  getTextFontWeights(e, t = -1, r = -1) {
    return (
      Yt("id", e, qt()),
      Yt("from", t, qt()),
      Yt("to", r, qt()),
      xt(St(accessPrivateField(this, ru).getTextFontWeights(e, t, r)))
    );
  }
  getTextFontStyles(e, t = -1, r = -1) {
    return (
      Yt("id", e, qt()),
      Yt("from", t, qt()),
      Yt("to", r, qt()),
      xt(St(accessPrivateField(this, ru).getTextFontStyles(e, t, r)))
    );
  }
  getTextCases(e, t = -1, r = -1) {
    return (
      Yt("id", e, qt()),
      Yt("from", t, qt()),
      Yt("to", r, qt()),
      xt(St(accessPrivateField(this, ru).getTextCases(e, t, r)))
    );
  }
  setTextCase(e, t, r = -1, n = -1) {
    Yt("id", e, qt()),
      Yt("textCase", t, Vt()),
      Yt("from", r, qt()),
      Yt("to", n, qt()),
      St(accessPrivateField(this, ru).setTextCase(e, t, r, n));
  }
  canToggleBoldFont(e, t = -1, r = -1) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).canToggleBoldFont(e, t, r))
    );
  }
  canToggleItalicFont(e, t = -1, r = -1) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).canToggleItalicFont(e, t, r))
    );
  }
  toggleBoldFont(e, t = -1, r = -1) {
    Yt("id", e, qt()), St(accessPrivateField(this, ru).toggleBoldFont(e, t, r));
  }
  toggleItalicFont(e, t = -1, r = -1) {
    Yt("id", e, qt()),
      St(accessPrivateField(this, ru).toggleItalicFont(e, t, r));
  }
  setFont(e, t, r) {
    Yt("block", e, qt()),
      Yt("fontFileUri", t, Vt()),
      St(accessPrivateField(this, ru).setFont(e, t, r));
  }
  setTypeface(e, t, r) {
    Yt("block", e, qt()),
      Yt("fontFileUri", t, Vt()),
      St(accessPrivateField(this, ru).setTypeface(e, t, r));
  }
  getTypeface(e) {
    return (
      Yt("block", e, qt()), St(accessPrivateField(this, ru).getTypeface(e))
    );
  }
  getTextCursorRange() {
    return St(accessPrivateField(this, ru).getTextCursorRange());
  }
  hasFill(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasFill(e));
  }
  supportsFill(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsFill(e));
  }
  isFillEnabled(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isFillEnabled(e));
  }
  setFillEnabled(e, t) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).setFillEnabled(e, t))
    );
  }
  getFill(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getFill(e));
  }
  setFill(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("fill", t, qt()),
      St(accessPrivateField(this, ru).setFill(e, t))
    );
  }
  setFillSolidColor(e, t, r, n, o = 1) {
    Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setFillSolidColor(e, t, r, n, o));
  }
  getFillSolidColor(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getFillSolidColor(e))
    );
  }
  setPlaceholderEnabled(e, t) {
    Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setPlaceholderEnabled(e, t));
  }
  isPlaceholderEnabled(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).isPlaceholderEnabled(e))
    );
  }
  hasPlaceholderBehavior(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).hasPlaceholderBehavior(e))
    );
  }
  supportsPlaceholderBehavior(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).supportsPlaceholderBehavior(e))
    );
  }
  setPlaceholderBehaviorEnabled(e, t) {
    Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setPlaceholderBehaviorEnabled(e, t));
  }
  isPlaceholderBehaviorEnabled(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).isPlaceholderBehaviorEnabled(e))
    );
  }
  hasPlaceholderControls(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).hasPlaceholderControls(e))
    );
  }
  supportsPlaceholderControls(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).supportsPlaceholderControls(e))
    );
  }
  setPlaceholderControlsOverlayEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(
        accessPrivateField(this, ru).setPlaceholderControlsOverlayEnabled(e, t)
      )
    );
  }
  isPlaceholderControlsOverlayEnabled(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).isPlaceholderControlsOverlayEnabled(e))
    );
  }
  setPlaceholderControlsButtonEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setPlaceholderControlsButtonEnabled(e, t))
    );
  }
  isPlaceholderControlsButtonEnabled(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).isPlaceholderControlsButtonEnabled(e))
    );
  }
  setMetadata(e, t, r) {
    Yt("id", e, qt()),
      Yt("key", t, Vt()),
      Yt("value", r, Vt()),
      St(accessPrivateField(this, ru).setMetadata(e, t, r));
  }
  getMetadata(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("key", t, Vt()),
      St(accessPrivateField(this, ru).getMetadata(e, t))
    );
  }
  hasMetadata(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("key", t, Vt()),
      St(accessPrivateField(this, ru).hasMetadata(e, t))
    );
  }
  findAllMetadata(e) {
    return (
      Yt("id", e, qt()), xt(St(accessPrivateField(this, ru).findAllMetadata(e)))
    );
  }
  removeMetadata(e, t) {
    Yt("id", e, qt()),
      Yt("key", t, Vt()),
      St(accessPrivateField(this, ru).removeMetadata(e, t));
  }
  setScopeEnabled(e, t, r) {
    Yt("id", e, qt()),
      Yt("key", t, Vt()),
      Yt("enabled", r, $t()),
      St(accessPrivateField(this, ru).setScopeEnabled(e, t, r));
  }
  isScopeEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("key", t, Vt()),
      St(accessPrivateField(this, ru).isScopeEnabled(e, t))
    );
  }
  isAllowedByScope(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("key", t, Vt()),
      St(accessPrivateField(this, ru).isAllowedByScope(e, t))
    );
  }
  hasDuration(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasDuration(e));
  }
  supportsDuration(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsDuration(e))
    );
  }
  setDuration(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("duration", t, Ht()),
      St(accessPrivateField(this, ru).setDuration(e, t))
    );
  }
  getDuration(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getDuration(e));
  }
  hasTimeOffset(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasTimeOffset(e));
  }
  supportsTimeOffset(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsTimeOffset(e))
    );
  }
  setTimeOffset(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("offset", t, Ht()),
      St(accessPrivateField(this, ru).setTimeOffset(e, t))
    );
  }
  getTimeOffset(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getTimeOffset(e));
  }
  hasTrim(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasTrim(e));
  }
  supportsTrim(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsTrim(e));
  }
  setTrimOffset(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("offset", t, Ht()),
      St(accessPrivateField(this, ru).setTrimOffset(e, t))
    );
  }
  getTrimOffset(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getTrimOffset(e));
  }
  setTrimLength(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("length", t, Ht()),
      St(accessPrivateField(this, ru).setTrimLength(e, t))
    );
  }
  getTrimLength(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getTrimLength(e));
  }
  getTotalSceneDuration(e) {
    return (
      Yt("scene", e, qt()),
      St(accessPrivateField(this, ru).getTotalSceneDuration(e))
    );
  }
  setPlaying(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setPlaying(e, t))
    );
  }
  isPlaying(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isPlaying(e));
  }
  hasPlaybackTime(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).hasPlaybackTime(e))
    );
  }
  supportsPlaybackTime(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).supportsPlaybackTime(e))
    );
  }
  setPlaybackTime(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("time", t, Ht()),
      St(accessPrivateField(this, ru).setPlaybackTime(e, t))
    );
  }
  getPlaybackTime(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getPlaybackTime(e))
    );
  }
  isVisibleAtCurrentPlaybackTime(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).isVisibleAtCurrentPlaybackTime(e))
    );
  }
  setSoloPlaybackEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setSoloPlaybackEnabled(e, t))
    );
  }
  isSoloPlaybackEnabled(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).isSoloPlaybackEnabled(e))
    );
  }
  hasPlaybackControl(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).hasPlaybackControl(e))
    );
  }
  supportsPlaybackControl(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).supportsPlaybackControl(e))
    );
  }
  setLooping(e, t) {
    Yt("id", e, qt()),
      Yt("looping", t, $t()),
      St(accessPrivateField(this, ru).setLooping(e, t));
  }
  isLooping(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isLooping(e));
  }
  setMuted(e, t) {
    Yt("id", e, qt()),
      Yt("muted", t, $t()),
      St(accessPrivateField(this, ru).setMuted(e, t));
  }
  isMuted(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isMuted(e));
  }
  setVolume(e, t) {
    Yt("id", e, qt()),
      Yt("volume", t, Ht()),
      St(accessPrivateField(this, ru).setVolume(e, t));
  }
  getVolume(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getVolume(e));
  }
  async forceLoadAVResource(e) {
    return (
      Yt("id", e, qt()),
      kt((t) => accessPrivateField(this, ru).forceLoadAVResource(e, t))
    );
  }
  unstable_isAVResourceLoaded(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).unstable_isAVResourceLoaded(e))
    );
  }
  getAVResourceTotalDuration(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getAVResourceTotalDuration(e))
    );
  }
  getVideoWidth(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getVideoWidth(e));
  }
  getVideoHeight(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getVideoHeight(e))
    );
  }
  generateVideoThumbnailSequence(e, t, r, n, o, i) {
    Yt("id", e, qt()),
      Yt("thumbnailHeight", t, qt()),
      Yt("timeBegin", r, Ht()),
      Yt("timeEnd", n, Ht()),
      Yt("numberOfFrames", o, qt());
    const a = accessPrivateField(this, ru).generateVideoThumbnailSequence(
      e,
      t,
      r,
      n,
      o,
      (e) => {
        "error" in e
          ? i(0, new Error(e.error))
          : i(
              e.frameIndex,
              new ImageData(
                new Uint8ClampedArray(e.imageData),
                e.width,
                e.height
              )
            );
      }
    );
    return () => {
      accessPrivateField(this, ru).cancelVideoThumbnailSequenceGeneration(a);
    };
  }
  generateAudioThumbnailSequence(e, t, r, n, o, i, a) {
    Yt("id", e, qt()),
      Yt("samplesPerChunk", t, qt()),
      Yt("timeBegin", r, Ht()),
      Yt("timeEnd", n, Ht()),
      Yt("numberOfSamples", o, qt()),
      Yt("numberOfChannels", i, qt());
    const s = accessPrivateField(this, ru).generateAudioThumbnailSequence(
      e,
      t,
      r,
      n,
      o,
      i,
      (e) => {
        "error" in e ? a(0, new Error(e.error)) : a(e.chunkIndex, e.sampleData);
      }
    );
    return () => {
      accessPrivateField(this, ru).cancelAudioThumbnailSequenceGeneration(s);
    };
  }
  async getVideoFillThumbnail(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("thumbnailHeight", t, qt()),
      new Promise((r, n) => {
        accessPrivateField(this, ru).getVideoFillThumbnail(e, t, (e) => {
          "error" in e ? n(e.error) : r(new ou([e], { type: "image/jpeg" }));
        });
      })
    );
  }
  async getVideoFillThumbnailAtlas(e, t, r, n) {
    return (
      Yt("id", e, qt()),
      Yt("numberOfColumns", t, qt()),
      Yt("numberOfRows", r, qt()),
      Yt("thumbnailHeight", n, qt()),
      new Promise((o, i) => {
        accessPrivateField(this, ru).getVideoFillThumbnailAtlas(
          e,
          t,
          r,
          n,
          (e) => {
            "error" in e ? i(e.error) : o(new ou([e], { type: "image/jpeg" }));
          }
        );
      })
    );
  }
  async getPageThumbnailAtlas(e, t, r, n) {
    return (
      Yt("id", e, qt()),
      Yt("numberOfColumns", t, qt()),
      Yt("numberOfRows", r, qt()),
      new Promise((o, i) => {
        accessPrivateField(this, ru).getPageThumbnailAtlas(e, t, r, n, (e) => {
          "error" in e ? i(e.error) : o(new ou([e], { type: "image/jpeg" }));
        });
      })
    );
  }
  createAnimation(e) {
    return (
      Yt("type", e, Vt()), St(accessPrivateField(this, ru).createAnimation(e))
    );
  }
  supportsAnimation(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsAnimation(e))
    );
  }
  setInAnimation(e, t) {
    Yt("id", e, qt()),
      Yt("animation", t, qt()),
      St(accessPrivateField(this, ru).setInAnimation(e, t));
  }
  setLoopAnimation(e, t) {
    Yt("id", e, qt()),
      Yt("animation", t, qt()),
      St(accessPrivateField(this, ru).setLoopAnimation(e, t));
  }
  setOutAnimation(e, t) {
    Yt("id", e, qt()),
      Yt("animation", t, qt()),
      St(accessPrivateField(this, ru).setOutAnimation(e, t));
  }
  getInAnimation(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getInAnimation(e))
    );
  }
  getLoopAnimation(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getLoopAnimation(e))
    );
  }
  getOutAnimation(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getOutAnimation(e))
    );
  }
  setNativePixelBuffer(e, t) {
    Yt("id", e, qt()),
      t instanceof HTMLVideoElement &&
        ((t.width = t.videoWidth), (t.height = t.videoHeight)),
      St(accessPrivateField(this, ru).setNativePixelBuffer(e, t));
  }
  getState(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getState(e));
  }
  setState(e, t) {
    Yt("id", e, qt()), St(accessPrivateField(this, ru).setState(e, t));
  }
  async forceLoadResources(e) {
    return (
      Yt("ids", e, Ut(qt())),
      kt((t) => accessPrivateField(this, ru).forceLoadResources(e, t))
    );
  }
};
(nu = createMetadataArray(null)),
  (ru = new WeakMap()),
  defineMember(nu, 1, "loadFromString", tu, BlockAPI),
  defineMember(nu, 1, "loadFromArchiveURL", eu, BlockAPI),
  defineMember(nu, 1, "create", Js, BlockAPI),
  defineMember(nu, 1, "createFill", Qs, BlockAPI),
  defineMember(nu, 1, "getType", Zs, BlockAPI),
  defineMember(nu, 1, "getKind", Ks, BlockAPI),
  defineMember(nu, 1, "setKind", Ys, BlockAPI),
  defineMember(nu, 1, "select", Xs, BlockAPI),
  defineMember(nu, 1, "setSelected", Gs, BlockAPI),
  defineMember(nu, 1, "isSelected", Ws, BlockAPI),
  defineMember(nu, 1, "findAllSelected", zs, BlockAPI),
  defineMember(nu, 1, "isGroupable", Vs, BlockAPI),
  defineMember(nu, 1, "group", Ns, BlockAPI),
  defineMember(nu, 1, "ungroup", Hs, BlockAPI),
  defineMember(nu, 1, "enterGroup", qs, BlockAPI),
  defineMember(nu, 1, "exitGroup", $s, BlockAPI),
  defineMember(nu, 1, "isCombinable", Us, BlockAPI),
  defineMember(nu, 1, "combine", js, BlockAPI),
  defineMember(nu, 1, "setName", Is, BlockAPI),
  defineMember(nu, 1, "getName", Os, BlockAPI),
  defineMember(nu, 1, "getUUID", Ms, BlockAPI),
  defineMember(nu, 1, "findByName", Ds, BlockAPI),
  defineMember(nu, 1, "findByType", Bs, BlockAPI),
  defineMember(nu, 1, "findByKind", Rs, BlockAPI),
  defineMember(nu, 1, "findAll", Ls, BlockAPI),
  defineMember(nu, 1, "findAllPlaceholders", Fs, BlockAPI),
  defineMember(nu, 1, "createShape", Ps, BlockAPI),
  defineMember(nu, 1, "hasShape", As, BlockAPI),
  defineMember(nu, 1, "supportsShape", Ts, BlockAPI),
  defineMember(nu, 1, "getShape", xs, BlockAPI),
  defineMember(nu, 1, "setShape", ks, BlockAPI),
  defineMember(nu, 1, "isVisible", Ss, BlockAPI),
  defineMember(nu, 1, "setVisible", Cs, BlockAPI),
  defineMember(nu, 1, "isClipped", Es, BlockAPI),
  defineMember(nu, 1, "setClipped", _s, BlockAPI),
  defineMember(nu, 1, "isTransformLocked", ws, BlockAPI),
  defineMember(nu, 1, "setTransformLocked", bs, BlockAPI),
  defineMember(nu, 1, "getPositionX", ys, BlockAPI),
  defineMember(nu, 1, "getPositionXMode", vs, BlockAPI),
  defineMember(nu, 1, "getPositionY", gs, BlockAPI),
  defineMember(nu, 1, "getPositionYMode", ms, BlockAPI),
  defineMember(nu, 1, "setPositionX", ps, BlockAPI),
  defineMember(nu, 1, "setPositionXMode", fs, BlockAPI),
  defineMember(nu, 1, "setPositionY", hs, BlockAPI),
  defineMember(nu, 1, "setPositionYMode", ds, BlockAPI),
  defineMember(nu, 1, "setAlwaysOnTop", ls, BlockAPI),
  defineMember(nu, 1, "setAlwaysOnBottom", cs, BlockAPI),
  defineMember(nu, 1, "isAlwaysOnTop", us, BlockAPI),
  defineMember(nu, 1, "isAlwaysOnBottom", ss, BlockAPI),
  defineMember(nu, 1, "bringToFront", as, BlockAPI),
  defineMember(nu, 1, "sendToBack", is, BlockAPI),
  defineMember(nu, 1, "bringForward", os, BlockAPI),
  defineMember(nu, 1, "sendBackward", ns, BlockAPI),
  defineMember(nu, 1, "getRotation", rs, BlockAPI),
  defineMember(nu, 1, "setRotation", ts, BlockAPI),
  defineMember(nu, 1, "getFlipHorizontal", es, BlockAPI),
  defineMember(nu, 1, "getFlipVertical", Ja, BlockAPI),
  defineMember(nu, 1, "setFlipHorizontal", Qa, BlockAPI),
  defineMember(nu, 1, "setFlipVertical", Za, BlockAPI),
  defineMember(nu, 1, "hasContentFillMode", Ka, BlockAPI),
  defineMember(nu, 1, "supportsContentFillMode", Ya, BlockAPI),
  defineMember(nu, 1, "getWidth", Xa, BlockAPI),
  defineMember(nu, 1, "getWidthMode", Ga, BlockAPI),
  defineMember(nu, 1, "getHeight", Wa, BlockAPI),
  defineMember(nu, 1, "getHeightMode", za, BlockAPI),
  defineMember(nu, 1, "setWidth", Va, BlockAPI),
  defineMember(nu, 1, "setWidthMode", Na, BlockAPI),
  defineMember(nu, 1, "setHeight", Ha, BlockAPI),
  defineMember(nu, 1, "setHeightMode", qa, BlockAPI),
  defineMember(nu, 1, "getFrameX", $a, BlockAPI),
  defineMember(nu, 1, "getFrameY", Ua, BlockAPI),
  defineMember(nu, 1, "getFrameWidth", ja, BlockAPI),
  defineMember(nu, 1, "getFrameHeight", Ia, BlockAPI),
  defineMember(nu, 1, "setContentFillMode", Oa, BlockAPI),
  defineMember(nu, 1, "getContentFillMode", Ma, BlockAPI),
  defineMember(nu, 1, "duplicate", Da, BlockAPI),
  defineMember(nu, 1, "destroy", Ba, BlockAPI),
  defineMember(nu, 1, "isValid", Ra, BlockAPI),
  defineMember(nu, 1, "getParent", La, BlockAPI),
  defineMember(nu, 1, "getChildren", Fa, BlockAPI),
  defineMember(nu, 1, "insertChild", Pa, BlockAPI),
  defineMember(nu, 1, "appendChild", Aa, BlockAPI),
  defineMember(nu, 1, "referencesAnyVariables", Ta, BlockAPI),
  defineMember(nu, 1, "getGlobalBoundingBoxX", xa, BlockAPI),
  defineMember(nu, 1, "getGlobalBoundingBoxY", ka, BlockAPI),
  defineMember(nu, 1, "getGlobalBoundingBoxWidth", Sa, BlockAPI),
  defineMember(nu, 1, "getGlobalBoundingBoxHeight", Ca, BlockAPI),
  defineMember(nu, 1, "getScreenSpaceBoundingBoxXYWH", Ea, BlockAPI),
  defineMember(nu, 1, "alignHorizontally", _a, BlockAPI),
  defineMember(nu, 1, "alignVertically", wa, BlockAPI),
  defineMember(nu, 1, "isAlignable", ba, BlockAPI),
  defineMember(nu, 1, "distributeHorizontally", ya, BlockAPI),
  defineMember(nu, 1, "distributeVertically", va, BlockAPI),
  defineMember(nu, 1, "isDistributable", ga, BlockAPI),
  defineMember(nu, 1, "fillParent", ma, BlockAPI),
  defineMember(nu, 1, "resizeContentAware", pa, BlockAPI),
  defineMember(nu, 1, "scale", fa, BlockAPI),
  defineMember(nu, 1, "findAllProperties", ha, BlockAPI),
  defineMember(nu, 1, "isPropertyReadable", da, BlockAPI),
  defineMember(nu, 1, "isPropertyWritable", la, BlockAPI),
  defineMember(nu, 1, "getPropertyType", ca, BlockAPI),
  defineMember(nu, 1, "getEnumValues", ua, BlockAPI),
  defineMember(nu, 1, "setBool", sa, BlockAPI),
  defineMember(nu, 1, "getBool", aa, BlockAPI),
  defineMember(nu, 1, "setInt", ia, BlockAPI),
  defineMember(nu, 1, "getInt", oa, BlockAPI),
  defineMember(nu, 1, "setFloat", na, BlockAPI),
  defineMember(nu, 1, "getFloat", ra, BlockAPI),
  defineMember(nu, 1, "setDouble", ta, BlockAPI),
  defineMember(nu, 1, "getDouble", ea, BlockAPI),
  defineMember(nu, 1, "setString", Ji, BlockAPI),
  defineMember(nu, 1, "getString", Qi, BlockAPI),
  defineMember(nu, 1, "setColor", Zi, BlockAPI),
  defineMember(nu, 1, "getColor", Ki, BlockAPI),
  defineMember(nu, 1, "setColorRGBA", Yi, BlockAPI),
  defineMember(nu, 1, "getColorRGBA", Xi, BlockAPI),
  defineMember(nu, 1, "setColorSpot", Gi, BlockAPI),
  defineMember(nu, 1, "getColorSpotName", Wi, BlockAPI),
  defineMember(nu, 1, "getColorSpotTint", zi, BlockAPI),
  defineMember(nu, 1, "setGradientColorStops", Vi, BlockAPI),
  defineMember(nu, 1, "getGradientColorStops", Ni, BlockAPI),
  defineMember(nu, 1, "getSourceSet", Hi, BlockAPI),
  defineMember(nu, 1, "setSourceSet", qi, BlockAPI),
  defineMember(nu, 1, "addImageFileURIToSourceSet", $i, BlockAPI),
  defineMember(nu, 1, "setEnum", Ui, BlockAPI),
  defineMember(nu, 1, "getEnum", ji, BlockAPI),
  defineMember(nu, 1, "hasCrop", Ii, BlockAPI),
  defineMember(nu, 1, "supportsCrop", Oi, BlockAPI),
  defineMember(nu, 1, "setCropScaleX", Mi, BlockAPI),
  defineMember(nu, 1, "setCropScaleY", Di, BlockAPI),
  defineMember(nu, 1, "setCropRotation", Bi, BlockAPI),
  defineMember(nu, 1, "setCropScaleRatio", Ri, BlockAPI),
  defineMember(nu, 1, "setCropTranslationX", Li, BlockAPI),
  defineMember(nu, 1, "setCropTranslationY", Fi, BlockAPI),
  defineMember(nu, 1, "resetCrop", Pi, BlockAPI),
  defineMember(nu, 1, "getCropScaleX", Ai, BlockAPI),
  defineMember(nu, 1, "getCropScaleY", Ti, BlockAPI),
  defineMember(nu, 1, "getCropRotation", xi, BlockAPI),
  defineMember(nu, 1, "getCropScaleRatio", ki, BlockAPI),
  defineMember(nu, 1, "getCropTranslationX", Si, BlockAPI),
  defineMember(nu, 1, "getCropTranslationY", Ci, BlockAPI),
  defineMember(nu, 1, "adjustCropToFillFrame", Ei, BlockAPI),
  defineMember(nu, 1, "flipCropHorizontal", _i, BlockAPI),
  defineMember(nu, 1, "flipCropVertical", wi, BlockAPI),
  defineMember(nu, 1, "hasOpacity", bi, BlockAPI),
  defineMember(nu, 1, "supportsOpacity", yi, BlockAPI),
  defineMember(nu, 1, "setOpacity", vi, BlockAPI),
  defineMember(nu, 1, "getOpacity", gi, BlockAPI),
  defineMember(nu, 1, "hasBlendMode", mi, BlockAPI),
  defineMember(nu, 1, "supportsBlendMode", pi, BlockAPI),
  defineMember(nu, 1, "setBlendMode", fi, BlockAPI),
  defineMember(nu, 1, "getBlendMode", hi, BlockAPI),
  defineMember(nu, 1, "hasFillColor", di, BlockAPI),
  defineMember(nu, 1, "isIncludedInExport", li, BlockAPI),
  defineMember(nu, 1, "setIncludedInExport", ci, BlockAPI),
  defineMember(nu, 1, "setFillColorRGBA", ui, BlockAPI),
  defineMember(nu, 1, "getFillColorRGBA", si, BlockAPI),
  defineMember(nu, 1, "setFillColorEnabled", ai, BlockAPI),
  defineMember(nu, 1, "isFillColorEnabled", ii, BlockAPI),
  defineMember(nu, 1, "createEffect", oi, BlockAPI),
  defineMember(nu, 1, "hasEffects", ni, BlockAPI),
  defineMember(nu, 1, "supportsEffects", ri, BlockAPI),
  defineMember(nu, 1, "getEffects", ti, BlockAPI),
  defineMember(nu, 1, "insertEffect", ei, BlockAPI),
  defineMember(nu, 1, "appendEffect", Jo, BlockAPI),
  defineMember(nu, 1, "removeEffect", Qo, BlockAPI),
  defineMember(nu, 1, "hasEffectEnabled", Zo, BlockAPI),
  defineMember(nu, 1, "setEffectEnabled", Ko, BlockAPI),
  defineMember(nu, 1, "isEffectEnabled", Yo, BlockAPI),
  defineMember(nu, 1, "createBlur", Xo, BlockAPI),
  defineMember(nu, 1, "hasBlur", Go, BlockAPI),
  defineMember(nu, 1, "supportsBlur", Wo, BlockAPI),
  defineMember(nu, 1, "setBlur", zo, BlockAPI),
  defineMember(nu, 1, "getBlur", Vo, BlockAPI),
  defineMember(nu, 1, "setBlurEnabled", No, BlockAPI),
  defineMember(nu, 1, "isBlurEnabled", Ho, BlockAPI),
  defineMember(nu, 1, "hasBackgroundColor", qo, BlockAPI),
  defineMember(nu, 1, "supportsBackgroundColor", $o, BlockAPI),
  defineMember(nu, 1, "setBackgroundColorRGBA", Uo, BlockAPI),
  defineMember(nu, 1, "getBackgroundColorRGBA", jo, BlockAPI),
  defineMember(nu, 1, "setBackgroundColorEnabled", Io, BlockAPI),
  defineMember(nu, 1, "isBackgroundColorEnabled", Oo, BlockAPI),
  defineMember(nu, 1, "hasStroke", Mo, BlockAPI),
  defineMember(nu, 1, "supportsStroke", Do, BlockAPI),
  defineMember(nu, 1, "setStrokeEnabled", Bo, BlockAPI),
  defineMember(nu, 1, "isStrokeEnabled", Ro, BlockAPI),
  defineMember(nu, 1, "setStrokeColorRGBA", Lo, BlockAPI),
  defineMember(nu, 1, "setStrokeColor", Fo, BlockAPI),
  defineMember(nu, 1, "getStrokeColorRGBA", Po, BlockAPI),
  defineMember(nu, 1, "getStrokeColor", Ao, BlockAPI),
  defineMember(nu, 1, "setStrokeWidth", To, BlockAPI),
  defineMember(nu, 1, "getStrokeWidth", xo, BlockAPI),
  defineMember(nu, 1, "setStrokeStyle", ko, BlockAPI),
  defineMember(nu, 1, "getStrokeStyle", So, BlockAPI),
  defineMember(nu, 1, "setStrokePosition", Co, BlockAPI),
  defineMember(nu, 1, "getStrokePosition", Eo, BlockAPI),
  defineMember(nu, 1, "setStrokeCornerGeometry", _o, BlockAPI),
  defineMember(nu, 1, "getStrokeCornerGeometry", wo, BlockAPI),
  defineMember(nu, 1, "hasDropShadow", bo, BlockAPI),
  defineMember(nu, 1, "supportsDropShadow", yo, BlockAPI),
  defineMember(nu, 1, "setDropShadowEnabled", vo, BlockAPI),
  defineMember(nu, 1, "isDropShadowEnabled", go, BlockAPI),
  defineMember(nu, 1, "setDropShadowColorRGBA", mo, BlockAPI),
  defineMember(nu, 1, "setDropShadowColor", po, BlockAPI),
  defineMember(nu, 1, "getDropShadowColorRGBA", fo, BlockAPI),
  defineMember(nu, 1, "getDropShadowColor", ho, BlockAPI),
  defineMember(nu, 1, "setDropShadowOffsetX", lo, BlockAPI),
  defineMember(nu, 1, "getDropShadowOffsetX", co, BlockAPI),
  defineMember(nu, 1, "setDropShadowOffsetY", uo, BlockAPI),
  defineMember(nu, 1, "getDropShadowOffsetY", so, BlockAPI),
  defineMember(nu, 1, "setDropShadowBlurRadiusX", ao, BlockAPI),
  defineMember(nu, 1, "getDropShadowBlurRadiusX", io, BlockAPI),
  defineMember(nu, 1, "setDropShadowBlurRadiusY", oo, BlockAPI),
  defineMember(nu, 1, "getDropShadowBlurRadiusY", no, BlockAPI),
  defineMember(nu, 1, "setDropShadowClip", ro, BlockAPI),
  defineMember(nu, 1, "getDropShadowClip", to, BlockAPI),
  defineMember(nu, 1, "createCutoutFromBlocks", eo, BlockAPI),
  defineMember(nu, 1, "createCutoutFromPath", Jn, BlockAPI),
  defineMember(nu, 1, "createCutoutFromOperation", Qn, BlockAPI),
  defineMember(nu, 1, "replaceText", Zn, BlockAPI),
  defineMember(nu, 1, "removeText", Kn, BlockAPI),
  defineMember(nu, 1, "setTextColor", Yn, BlockAPI),
  defineMember(nu, 1, "getTextColors", Xn, BlockAPI),
  defineMember(nu, 1, "getTextFontWeights", Gn, BlockAPI),
  defineMember(nu, 1, "getTextFontStyles", Wn, BlockAPI),
  defineMember(nu, 1, "getTextCases", zn, BlockAPI),
  defineMember(nu, 1, "setTextCase", Vn, BlockAPI),
  defineMember(nu, 1, "canToggleBoldFont", Nn, BlockAPI),
  defineMember(nu, 1, "canToggleItalicFont", Hn, BlockAPI),
  defineMember(nu, 1, "toggleBoldFont", qn, BlockAPI),
  defineMember(nu, 1, "toggleItalicFont", $n, BlockAPI),
  defineMember(nu, 1, "setFont", Un, BlockAPI),
  defineMember(nu, 1, "setTypeface", jn, BlockAPI),
  defineMember(nu, 1, "getTypeface", In, BlockAPI),
  defineMember(nu, 1, "getTextCursorRange", On, BlockAPI),
  defineMember(nu, 1, "hasFill", Mn, BlockAPI),
  defineMember(nu, 1, "supportsFill", Dn, BlockAPI),
  defineMember(nu, 1, "isFillEnabled", Bn, BlockAPI),
  defineMember(nu, 1, "setFillEnabled", Rn, BlockAPI),
  defineMember(nu, 1, "getFill", Ln, BlockAPI),
  defineMember(nu, 1, "setFill", Fn, BlockAPI),
  defineMember(nu, 1, "setFillSolidColor", Pn, BlockAPI),
  defineMember(nu, 1, "getFillSolidColor", An, BlockAPI),
  defineMember(nu, 1, "setPlaceholderEnabled", Tn, BlockAPI),
  defineMember(nu, 1, "isPlaceholderEnabled", xn, BlockAPI),
  defineMember(nu, 1, "hasPlaceholderBehavior", kn, BlockAPI),
  defineMember(nu, 1, "supportsPlaceholderBehavior", Sn, BlockAPI),
  defineMember(nu, 1, "setPlaceholderBehaviorEnabled", Cn, BlockAPI),
  defineMember(nu, 1, "isPlaceholderBehaviorEnabled", En, BlockAPI),
  defineMember(nu, 1, "hasPlaceholderControls", _n, BlockAPI),
  defineMember(nu, 1, "supportsPlaceholderControls", wn, BlockAPI),
  defineMember(nu, 1, "setPlaceholderControlsOverlayEnabled", bn, BlockAPI),
  defineMember(nu, 1, "isPlaceholderControlsOverlayEnabled", yn, BlockAPI),
  defineMember(nu, 1, "setPlaceholderControlsButtonEnabled", vn, BlockAPI),
  defineMember(nu, 1, "isPlaceholderControlsButtonEnabled", gn, BlockAPI),
  defineMember(nu, 1, "setMetadata", mn, BlockAPI),
  defineMember(nu, 1, "getMetadata", pn, BlockAPI),
  defineMember(nu, 1, "hasMetadata", fn, BlockAPI),
  defineMember(nu, 1, "findAllMetadata", hn, BlockAPI),
  defineMember(nu, 1, "removeMetadata", dn, BlockAPI),
  defineMember(nu, 1, "setScopeEnabled", ln, BlockAPI),
  defineMember(nu, 1, "isScopeEnabled", cn, BlockAPI),
  defineMember(nu, 1, "isAllowedByScope", un, BlockAPI),
  defineMember(nu, 1, "hasDuration", sn, BlockAPI),
  defineMember(nu, 1, "supportsDuration", an, BlockAPI),
  defineMember(nu, 1, "setDuration", on, BlockAPI),
  defineMember(nu, 1, "getDuration", nn, BlockAPI),
  defineMember(nu, 1, "hasTimeOffset", rn, BlockAPI),
  defineMember(nu, 1, "supportsTimeOffset", tn, BlockAPI),
  defineMember(nu, 1, "setTimeOffset", en, BlockAPI),
  defineMember(nu, 1, "getTimeOffset", Jr, BlockAPI),
  defineMember(nu, 1, "hasTrim", Qr, BlockAPI),
  defineMember(nu, 1, "supportsTrim", Zr, BlockAPI),
  defineMember(nu, 1, "setTrimOffset", Kr, BlockAPI),
  defineMember(nu, 1, "getTrimOffset", Yr, BlockAPI),
  defineMember(nu, 1, "setTrimLength", Xr, BlockAPI),
  defineMember(nu, 1, "getTrimLength", Gr, BlockAPI),
  defineMember(nu, 1, "getTotalSceneDuration", Wr, BlockAPI),
  defineMember(nu, 1, "setPlaying", zr, BlockAPI),
  defineMember(nu, 1, "isPlaying", Vr, BlockAPI),
  defineMember(nu, 1, "hasPlaybackTime", Nr, BlockAPI),
  defineMember(nu, 1, "supportsPlaybackTime", Hr, BlockAPI),
  defineMember(nu, 1, "setPlaybackTime", qr, BlockAPI),
  defineMember(nu, 1, "getPlaybackTime", $r, BlockAPI),
  defineMember(nu, 1, "isVisibleAtCurrentPlaybackTime", Ur, BlockAPI),
  defineMember(nu, 1, "setSoloPlaybackEnabled", jr, BlockAPI),
  defineMember(nu, 1, "isSoloPlaybackEnabled", Ir, BlockAPI),
  defineMember(nu, 1, "hasPlaybackControl", Or, BlockAPI),
  defineMember(nu, 1, "supportsPlaybackControl", Mr, BlockAPI),
  defineMember(nu, 1, "setLooping", Dr, BlockAPI),
  defineMember(nu, 1, "isLooping", Br, BlockAPI),
  defineMember(nu, 1, "setMuted", Rr, BlockAPI),
  defineMember(nu, 1, "isMuted", Lr, BlockAPI),
  defineMember(nu, 1, "setVolume", Fr, BlockAPI),
  defineMember(nu, 1, "getVolume", Pr, BlockAPI),
  defineMember(nu, 1, "forceLoadAVResource", Ar, BlockAPI),
  defineMember(nu, 1, "unstable_isAVResourceLoaded", Tr, BlockAPI),
  defineMember(nu, 1, "getAVResourceTotalDuration", xr, BlockAPI),
  defineMember(nu, 1, "getVideoWidth", kr, BlockAPI),
  defineMember(nu, 1, "getVideoHeight", Sr, BlockAPI),
  defineMember(nu, 1, "getVideoFillThumbnail", Cr, BlockAPI),
  defineMember(nu, 1, "getVideoFillThumbnailAtlas", Er, BlockAPI),
  defineMember(nu, 1, "getPageThumbnailAtlas", _r, BlockAPI),
  defineMember(nu, 1, "createAnimation", wr, BlockAPI),
  defineMember(nu, 1, "supportsAnimation", br, BlockAPI),
  defineMember(nu, 1, "setInAnimation", yr, BlockAPI),
  defineMember(nu, 1, "setLoopAnimation", vr, BlockAPI),
  defineMember(nu, 1, "setOutAnimation", gr, BlockAPI),
  defineMember(nu, 1, "getInAnimation", mr, BlockAPI),
  defineMember(nu, 1, "getLoopAnimation", pr, BlockAPI),
  defineMember(nu, 1, "getOutAnimation", fr, BlockAPI),
  defineMember(nu, 1, "setNativePixelBuffer", hr, BlockAPI),
  defineMember(nu, 1, "getState", dr, BlockAPI),
  defineMember(nu, 1, "setState", lr, BlockAPI),
  defineMember(nu, 1, "forceLoadResources", cr, BlockAPI),
  assignMetadata(nu, BlockAPI);
var iu,
  au,
  su,
  uu,
  cu,
  lu,
  du,
  hu,
  fu,
  pu,
  mu,
  gu,
  vu,
  yu,
  bu,
  wu,
  _u,
  Eu,
  Cu,
  Su,
  ku,
  xu,
  Tu,
  Au,
  Pu,
  Fu,
  Lu,
  Ru,
  Bu,
  Du,
  Mu,
  Ou,
  Iu,
  ju,
  Uu,
  $u,
  qu,
  Hu,
  Nu,
  Vu,
  zu,
  Wu,
  Gu,
  Xu,
  Yu,
  Ku,
  Zu,
  Qu,
  Ju,
  ec,
  tc,
  rc,
  nc,
  oc,
  ic,
  ac,
  sc,
  uc,
  cc,
  lc = new WeakMap();
(sc = [er]),
  (ac = [er]),
  (ic = [er]),
  (oc = [Jt]),
  (nc = [Jt]),
  (rc = [er]),
  (tc = [er]),
  (ec = [Jt]),
  (Ju = [Jt]),
  (Qu = [Jt]),
  (Zu = [Jt]),
  (Ku = [Jt]),
  (Yu = [Jt]),
  (Xu = [er]),
  (Gu = [er]),
  (Wu = [er]),
  (zu = [Jt]),
  (Vu = [er]),
  (Nu = [er]),
  (Hu = [er]),
  (qu = [Jt]),
  ($u = [Jt]),
  (Uu = [er]),
  (ju = [Jt]),
  (Iu = [er]),
  (Ou = [Jt]),
  (Mu = [er]),
  (Du = [Jt]),
  (Bu = [er]),
  (Ru = [Jt]),
  (Lu = [er]),
  (Fu = [Jt]),
  (Pu = [er]),
  (Au = [Jt]),
  (Tu = [er]),
  (xu = [Jt]),
  (ku = [er]),
  (Su = [Jt]),
  (Cu = [Jt]),
  (Eu = [Jt]),
  (_u = [Jt]),
  (wu = [Jt]),
  (bu = [er]),
  (yu = [Jt]),
  (vu = [Jt]),
  (gu = [Jt]),
  (mu = [er]),
  (pu = [Jt]),
  (fu = [Jt]),
  (hu = [Jt]),
  (du = [Jt]),
  (lu = [er]),
  (cu = [er]),
  (uu = [er]),
  (su = [er]),
  (au = [er]),
  (iu = [Jt]);
var EditorAPI = class {
  constructor(e) {
    executeInitializers(cc, 5, this),
      addPrivateMember(this, uc),
      defineProperty(this, "onStateChanged", (e) => {
        const t = accessPrivateField(this, uc).subscribeToEditorState(e);
        return () => {
          accessPrivateField(this, uc).isDeleted() ||
            St(accessPrivateField(this, uc).unsubscribe(t));
        };
      }),
      defineProperty(this, "onHistoryUpdated", (e) => {
        const t = accessPrivateField(this, uc).subscribeToHistory(e);
        return () => {
          accessPrivateField(this, uc).isDeleted() ||
            accessPrivateField(this, uc).unsubscribe(t);
        };
      }),
      defineProperty(this, "onSettingsChanged", (e) => {
        const t = accessPrivateField(this, uc).subscribeToSettings(e);
        return () => {
          accessPrivateField(this, uc).isDeleted() ||
            St(accessPrivateField(this, uc).unsubscribe(t));
        };
      }),
      defineProperty(this, "onRoleChanged", (e) => {
        const t = accessPrivateField(this, uc).subscribeToRoleChange(e);
        return () => {
          accessPrivateField(this, uc).isDeleted() ||
            St(accessPrivateField(this, uc).unsubscribe(t));
        };
      }),
      writePrivateField(this, uc, e);
  }
  unlockWithLicense(e) {
    St(accessPrivateField(this, uc).unlockWithLicense(e));
  }
  startTracking(e, t) {
    accessPrivateField(this, uc).startTracking(e, t, "");
  }
  setTrackingMetadata(e) {
    accessPrivateField(this, uc).setTrackingMetadata(e);
  }
  getTrackingMetadata() {
    return St(accessPrivateField(this, uc).getTrackingMetadata());
  }
  getActiveLicense() {
    return St(accessPrivateField(this, uc).getActiveLicense());
  }
  _update() {
    accessPrivateField(this, uc).update();
  }
  setEditMode(e) {
    Yt("keypath", e, Vt()), accessPrivateField(this, uc).setEditMode(e);
  }
  getEditMode() {
    return accessPrivateField(this, uc).getEditMode();
  }
  unstable_isInteractionHappening() {
    return St(accessPrivateField(this, uc).unstable_isInteractionHappening());
  }
  getCursorType() {
    return accessPrivateField(this, uc).getCursorType();
  }
  getCursorRotation() {
    return accessPrivateField(this, uc).getCursorRotation();
  }
  getTextCursorPositionInScreenSpaceX() {
    return accessPrivateField(this, uc).getTextCursorPositionInScreenSpaceX();
  }
  getTextCursorPositionInScreenSpaceY() {
    return accessPrivateField(this, uc).getTextCursorPositionInScreenSpaceY();
  }
  createHistory() {
    return accessPrivateField(this, uc).createHistory();
  }
  destroyHistory(e) {
    St(accessPrivateField(this, uc).destroyHistory(e));
  }
  setActiveHistory(e) {
    St(accessPrivateField(this, uc).setActiveHistory(e));
  }
  getActiveHistory() {
    return accessPrivateField(this, uc).getActiveHistory();
  }
  addUndoStep() {
    St(accessPrivateField(this, uc).addUndoStep());
  }
  undo() {
    St(accessPrivateField(this, uc).undo());
  }
  redo() {
    St(accessPrivateField(this, uc).redo());
  }
  canUndo() {
    return St(accessPrivateField(this, uc).canUndo());
  }
  canRedo() {
    return St(accessPrivateField(this, uc).canRedo());
  }
  setSettingBool(e, t) {
    return (
      Yt("keypath", e, Vt()),
      Yt("value", t, $t()),
      St(accessPrivateField(this, uc).setSettingBool(e, t))
    );
  }
  getSettingBool(e) {
    return (
      Yt("keypath", e, Vt()), St(accessPrivateField(this, uc).getSettingBool(e))
    );
  }
  setSettingInt(e, t) {
    return (
      Yt("keypath", e, Vt()),
      Yt("value", t, qt()),
      St(accessPrivateField(this, uc).setSettingInt(e, t))
    );
  }
  getSettingInt(e) {
    return (
      Yt("keypath", e, Vt()), St(accessPrivateField(this, uc).getSettingInt(e))
    );
  }
  setSettingFloat(e, t) {
    return (
      Yt("keypath", e, Vt()),
      Yt("value", t, Ht()),
      St(accessPrivateField(this, uc).setSettingFloat(e, t))
    );
  }
  getSettingFloat(e) {
    return (
      Yt("keypath", e, Vt()),
      St(accessPrivateField(this, uc).getSettingFloat(e))
    );
  }
  setSettingString(e, t) {
    return (
      Yt("keypath", e, Vt()),
      Yt("value", t, Vt()),
      St(accessPrivateField(this, uc).setSettingString(e, t))
    );
  }
  getSettingString(e) {
    return (
      Yt("keypath", e, Vt()),
      St(accessPrivateField(this, uc).getSettingString(e))
    );
  }
  setSettingColor(e, t) {
    return (
      Yt("keypath", e, Vt()),
      St(accessPrivateField(this, uc).setSettingColor(e, nr.fromColor(t)))
    );
  }
  getSettingColor(e) {
    return (
      Yt("keypath", e, Vt()),
      nr.toColor(St(accessPrivateField(this, uc).getSettingColor(e)))
    );
  }
  setSettingColorRGBA(e, t, r, n, o = 1) {
    return (
      Yt("keypath", e, Vt()),
      Yt("r", t, Ht()),
      Yt("g", r, Ht()),
      Yt("b", n, Ht()),
      Yt("a", o, Ht()),
      St(accessPrivateField(this, uc).setSettingColorRGBA(e, t, r, n, o))
    );
  }
  getSettingColorRGBA(e) {
    return (
      Yt("keypath", e, Vt()),
      St(accessPrivateField(this, uc).getSettingColorRGBA(e))
    );
  }
  setSettingEnum(e, t) {
    return (
      Yt("keypath", e, Vt()),
      Yt("value", t, Vt()),
      St(accessPrivateField(this, uc).setSettingEnum(e, t))
    );
  }
  getSettingEnum(e) {
    return (
      Yt("keypath", e, Vt()), St(accessPrivateField(this, uc).getSettingEnum(e))
    );
  }
  getSettingEnumOptions(e) {
    return (
      Yt("keypath", e, Vt()),
      xt(St(accessPrivateField(this, uc).getSettingEnumOptions(e)))
    );
  }
  setRole(e) {
    return St(accessPrivateField(this, uc).setRole(e));
  }
  getRole() {
    return St(accessPrivateField(this, uc).getRole());
  }
  findAllSettings() {
    return xt(accessPrivateField(this, uc).findAllSettings());
  }
  getSettingType(e) {
    Yt("keypath", e, Vt());
    return St(accessPrivateField(this, uc).getSettingType(e));
  }
  getAvailableMemory() {
    return St(accessPrivateField(this, uc).getAvailableMemory());
  }
  getUsedMemory() {
    return St(accessPrivateField(this, uc).getUsedMemory());
  }
  getMaxExportSize() {
    return St(accessPrivateField(this, uc).getMaxExportSize());
  }
  setURIResolver(e) {
    lc.set(accessPrivateField(this, uc), e);
    return St(
      accessPrivateField(this, uc).setURIResolver((t) =>
        e(t, this.defaultURIResolver.bind(this))
      )
    );
  }
  unstable_getURIResolver() {
    return lc.get(accessPrivateField(this, uc)) ?? null;
  }
  defaultURIResolver(e) {
    return accessPrivateField(this, uc).defaultURIResolver(e);
  }
  getAbsoluteURI(e) {
    return St(accessPrivateField(this, uc).getAbsoluteURI(e));
  }
  findAllScopes() {
    return xt(accessPrivateField(this, uc).findAllScopes());
  }
  setGlobalScope(e, t) {
    Yt("key", e, Vt()),
      Yt("value", t, Vt()),
      St(accessPrivateField(this, uc).setGlobalScope(e, t));
  }
  getGlobalScope(e) {
    return (
      Yt("key", e, Vt()), St(accessPrivateField(this, uc).getGlobalScope(e))
    );
  }
  findAllSpotColors() {
    return xt(accessPrivateField(this, uc).findAllSpotColors());
  }
  getSpotColorRGBA(e) {
    return Yt("name", e, Vt()), accessPrivateField(this, uc).getSpotColorRGB(e);
  }
  getSpotColorCMYK(e) {
    return (
      Yt("name", e, Vt()), accessPrivateField(this, uc).getSpotColorCMYK(e)
    );
  }
  setSpotColorRGB(e, t, r, n) {
    return (
      Yt("name", e, Vt()),
      Yt("r", t, Ht()),
      Yt("g", r, Ht()),
      Yt("b", n, Ht()),
      accessPrivateField(this, uc).setSpotColorRGB(e, t, r, n)
    );
  }
  setSpotColorCMYK(e, t, r, n, o) {
    return (
      Yt("name", e, Vt()),
      Yt("c", t, Ht()),
      Yt("m", r, Ht()),
      Yt("y", n, Ht()),
      Yt("k", o, Ht()),
      accessPrivateField(this, uc).setSpotColorCMYK(e, t, r, n, o)
    );
  }
  removeSpotColor(e) {
    return (
      Yt("name", e, Vt()), St(accessPrivateField(this, uc).removeSpotColor(e))
    );
  }
  setSpotColorForCutoutType(e, t) {
    return (
      Yt("type", e, Vt()),
      Yt("color", t, Vt()),
      St(accessPrivateField(this, uc).setSpotColorForCutoutType(e, t))
    );
  }
  getSpotColorForCutoutType(e) {
    return (
      Yt("type", e, Vt()),
      St(accessPrivateField(this, uc).getSpotColorForCutoutType(e))
    );
  }
  convertColorToColorSpace(e, t) {
    return (
      Yt("colorSpace", t, Vt()),
      nr.toColor(
        St(
          accessPrivateField(this, uc).convertColorToColorSpace(
            nr.fromColor(e),
            t
          )
        )
      )
    );
  }
  createBuffer() {
    return accessPrivateField(this, uc).createBuffer();
  }
  destroyBuffer(e) {
    St(accessPrivateField(this, uc).destroyBuffer(e));
  }
  setBufferData(e, t, r) {
    Yt("offset", t, qt()),
      St(accessPrivateField(this, uc).setBufferData(e, t, r));
  }
  getBufferData(e, t, r) {
    Yt("offset", t, qt()), Yt("length", r, qt());
    const n = accessPrivateField(this, uc).getBufferData(e, t, r);
    if ("error" in n) throw new Error(n.error);
    return n;
  }
  setBufferLength(e, t) {
    Yt("length", t, qt()),
      St(accessPrivateField(this, uc).setBufferLength(e, t));
  }
  getBufferLength(e) {
    return St(accessPrivateField(this, uc).getBufferLength(e));
  }
  cloneBuffers() {
    return xt(St(accessPrivateField(this, uc).cloneBuffers()));
  }
  restoreBuffers(e) {
    St(accessPrivateField(this, uc).restoreBuffers(e));
  }
  getMimeType(e) {
    return (
      Yt("uri", e, Vt()),
      kt((t) => accessPrivateField(this, uc).getMimeType(e, t))
    );
  }
  findAllTransientResources() {
    return xt(St(accessPrivateField(this, uc).findAllTransientResources()));
  }
  getResourceData(e, t, r) {
    Yt("uri", e, Vt()),
      Yt("chunkSize", t, qt()),
      St(accessPrivateField(this, uc).getResourceData(e, t, r));
  }
  relocateResource(e, t) {
    Yt("currentUrl", e, Vt()),
      Yt("relocatedUrl", t, Vt()),
      St(accessPrivateField(this, uc).relocateResource(e, t));
  }
};
(cc = createMetadataArray(null)),
  (uc = new WeakMap()),
  defineMember(cc, 1, "unlockWithLicense", sc, EditorAPI),
  defineMember(cc, 1, "startTracking", ac, EditorAPI),
  defineMember(cc, 1, "setTrackingMetadata", ic, EditorAPI),
  defineMember(cc, 1, "getTrackingMetadata", oc, EditorAPI),
  defineMember(cc, 1, "getActiveLicense", nc, EditorAPI),
  defineMember(cc, 1, "_update", rc, EditorAPI),
  defineMember(cc, 1, "setEditMode", tc, EditorAPI),
  defineMember(cc, 1, "getEditMode", ec, EditorAPI),
  defineMember(cc, 1, "unstable_isInteractionHappening", Ju, EditorAPI),
  defineMember(cc, 1, "getCursorType", Qu, EditorAPI),
  defineMember(cc, 1, "getCursorRotation", Zu, EditorAPI),
  defineMember(cc, 1, "getTextCursorPositionInScreenSpaceX", Ku, EditorAPI),
  defineMember(cc, 1, "getTextCursorPositionInScreenSpaceY", Yu, EditorAPI),
  defineMember(cc, 1, "createHistory", Xu, EditorAPI),
  defineMember(cc, 1, "destroyHistory", Gu, EditorAPI),
  defineMember(cc, 1, "setActiveHistory", Wu, EditorAPI),
  defineMember(cc, 1, "getActiveHistory", zu, EditorAPI),
  defineMember(cc, 1, "addUndoStep", Vu, EditorAPI),
  defineMember(cc, 1, "undo", Nu, EditorAPI),
  defineMember(cc, 1, "redo", Hu, EditorAPI),
  defineMember(cc, 1, "canUndo", qu, EditorAPI),
  defineMember(cc, 1, "canRedo", $u, EditorAPI),
  defineMember(cc, 1, "setSettingBool", Uu, EditorAPI),
  defineMember(cc, 1, "getSettingBool", ju, EditorAPI),
  defineMember(cc, 1, "setSettingInt", Iu, EditorAPI),
  defineMember(cc, 1, "getSettingInt", Ou, EditorAPI),
  defineMember(cc, 1, "setSettingFloat", Mu, EditorAPI),
  defineMember(cc, 1, "getSettingFloat", Du, EditorAPI),
  defineMember(cc, 1, "setSettingString", Bu, EditorAPI),
  defineMember(cc, 1, "getSettingString", Ru, EditorAPI),
  defineMember(cc, 1, "setSettingColor", Lu, EditorAPI),
  defineMember(cc, 1, "getSettingColor", Fu, EditorAPI),
  defineMember(cc, 1, "setSettingColorRGBA", Pu, EditorAPI),
  defineMember(cc, 1, "getSettingColorRGBA", Au, EditorAPI),
  defineMember(cc, 1, "setSettingEnum", Tu, EditorAPI),
  defineMember(cc, 1, "getSettingEnum", xu, EditorAPI),
  defineMember(cc, 1, "setRole", ku, EditorAPI),
  defineMember(cc, 1, "getRole", Su, EditorAPI),
  defineMember(cc, 1, "findAllSettings", Cu, EditorAPI),
  defineMember(cc, 1, "getAvailableMemory", Eu, EditorAPI),
  defineMember(cc, 1, "getUsedMemory", _u, EditorAPI),
  defineMember(cc, 1, "getMaxExportSize", wu, EditorAPI),
  defineMember(cc, 1, "setURIResolver", bu, EditorAPI),
  defineMember(cc, 1, "unstable_getURIResolver", yu, EditorAPI),
  defineMember(cc, 1, "getAbsoluteURI", vu, EditorAPI),
  defineMember(cc, 1, "findAllScopes", gu, EditorAPI),
  defineMember(cc, 1, "setGlobalScope", mu, EditorAPI),
  defineMember(cc, 1, "getGlobalScope", pu, EditorAPI),
  defineMember(cc, 1, "findAllSpotColors", fu, EditorAPI),
  defineMember(cc, 1, "getSpotColorRGBA", hu, EditorAPI),
  defineMember(cc, 1, "getSpotColorCMYK", du, EditorAPI),
  defineMember(cc, 1, "setSpotColorRGB", lu, EditorAPI),
  defineMember(cc, 1, "setSpotColorCMYK", cu, EditorAPI),
  defineMember(cc, 1, "removeSpotColor", uu, EditorAPI),
  defineMember(cc, 1, "setSpotColorForCutoutType", su, EditorAPI),
  defineMember(cc, 1, "getSpotColorForCutoutType", au, EditorAPI),
  defineMember(cc, 1, "convertColorToColorSpace", iu, EditorAPI),
  assignMetadata(cc, EditorAPI);
var dc,
  hc,
  fc,
  pc,
  mc,
  gc,
  vc,
  yc,
  bc,
  wc,
  _c,
  Ec,
  Cc,
  Sc,
  kc,
  xc,
  Tc,
  Ac,
  Pc,
  Fc,
  Lc,
  Rc,
  Bc,
  Dc,
  Mc,
  EventAPI = class {
    #e;
    constructor(e) {
      this.#e = e;
    }
    subscribe = (e, t) => {
      Yt("blocks", e, Ut());
      const r = this.#e.subscribe(e, (e) => {
        try {
          t(xt(e, !0));
        } catch (e) {
          console.error(e);
        }
      });
      return () => {
        this.#e.isDeleted() || St(this.#e.unsubscribe(r));
      };
    };
  };
(Bc = [er]),
  (Rc = [er]),
  (Lc = [er]),
  (Fc = [er]),
  (Pc = [er]),
  (Ac = [er]),
  (Tc = [er]),
  (xc = [Jt]),
  (kc = [er]),
  (Sc = [er]),
  (Cc = [Jt]),
  (Ec = [er]),
  (_c = [Jt]),
  (wc = [Jt]),
  (bc = [Jt]),
  (yc = [Jt]),
  (vc = [Jt]),
  (gc = [er]),
  (mc = [Jt]),
  (pc = [er]),
  (fc = [er]),
  (hc = [er]),
  (dc = [Jt]);
var Oc,
  Ic,
  jc,
  Uc,
  $c,
  qc,
  SceneAPI = class {
    constructor(e) {
      executeInitializers(Mc, 5, this),
        addPrivateMember(this, Dc),
        defineProperty(this, "onZoomLevelChanged", (e) => {
          const t = accessPrivateField(this, Dc).subscribeToZoomLevel(e);
          return () => {
            accessPrivateField(this, Dc).isDeleted() ||
              St(accessPrivateField(this, Dc).unsubscribe(t));
          };
        }),
        defineProperty(this, "onActiveChanged", (e) => {
          const t = accessPrivateField(this, Dc).subscribeToActiveSceneChange(
            e
          );
          return () => {
            accessPrivateField(this, Dc).isDeleted() ||
              St(accessPrivateField(this, Dc).unsubscribe(t));
          };
        }),
        writePrivateField(this, Dc, e);
    }
    async loadFromString(e) {
      return (
        Yt("sceneContent", e, Vt()),
        kt((t) => accessPrivateField(this, Dc).loadSceneFromString(e, t))
      );
    }
    async loadFromURL(e) {
      return (
        Yt("url", e, Vt()),
        kt((t) => accessPrivateField(this, Dc).loadSceneFromURL(e, t))
      );
    }
    async loadFromArchiveURL(e) {
      return (
        Yt("url", e, Vt()),
        kt((t) => accessPrivateField(this, Dc).loadSceneFromArchiveURL(e, t))
      );
    }
    async saveToString(e = ["blob", "bundle", "file", "http", "https"]) {
      const t = this.get();
      if (null == t) throw new Error("No scene available.");
      return kt((r) => {
        accessPrivateField(this, Dc).saveSceneToString(t, r, e);
      });
    }
    async saveToArchive() {
      return new Promise((e, t) => {
        const r = this.get();
        null == r
          ? t(new Error("No scene available."))
          : accessPrivateField(this, Dc).saveSceneToArchive(r, (r) => {
              "error" in r ? t(r.error) : e(new ou([r], { type: ir.Zip }));
            });
      });
    }
    create(e = "Free") {
      Yt("sceneLayout", e, Zt());
      return St(accessPrivateField(this, Dc).createScene(e));
    }
    createVideo() {
      return St(accessPrivateField(this, Dc).createVideoScene());
    }
    createFromImage(e, t = 300, r = 1, n = "Free", o = 0, i = !1) {
      return (
        Yt("url", e, Vt()),
        Yt("dpi", t, Wt(Ht(), 0)),
        Yt("pixelScaleFactor", r, Wt(Ht(), 0)),
        Yt("sceneLayout", n, Zt()),
        kt((a) =>
          accessPrivateField(this, Dc).createSceneFromImage(e, t, r, n, o, i, a)
        )
      );
    }
    createFromVideo(e) {
      return (
        Yt("url", e, Vt()),
        kt((t) => accessPrivateField(this, Dc).createSceneFromVideo(e, t))
      );
    }
    get() {
      const e = St(accessPrivateField(this, Dc).findByType("scene")),
        t = xt(e);
      return t.length > 0 ? t[0] : null;
    }
    async applyTemplateFromString(e) {
      return (
        Yt("content", e, Vt()),
        kt((t) => accessPrivateField(this, Dc).applyTemplateFromString(e, t))
      );
    }
    async applyTemplateFromURL(e) {
      return (
        Yt("url", e, Vt()),
        kt((t) => accessPrivateField(this, Dc).applyTemplateFromURL(e, t))
      );
    }
    getMode() {
      const e = this.get();
      return St(accessPrivateField(this, Dc).getSceneMode(e));
    }
    setDesignUnit(e) {
      Yt(
        "designUnit",
        e,
        (function () {
          const e = ["Pixel", "Millimeter", "Inch"];
          return jt(
            "DesignUnit",
            (t) =>
              !("string" != typeof t || !e.includes(t)) || {
                message: `expected one of ${e
                  .map((e) => `"${e}"`)
                  .join(", ")}, but got "${t}"`,
              }
          );
        })()
      );
      const t = this.get();
      St(accessPrivateField(this, Dc).setDesignUnit(t, e));
    }
    getDesignUnit() {
      const e = this.get();
      return St(accessPrivateField(this, Dc).getDesignUnit(e));
    }
    getPages() {
      return xt(St(accessPrivateField(this, Dc).getPages()));
    }
    getCurrentPage() {
      const e = this.get();
      if (null == e) return null;
      const t = accessPrivateField(this, Dc).getCurrentPage(e);
      return t.isValid() ? St(t) : null;
    }
    findNearestToViewPortCenterByType(e) {
      Yt("type", e, Vt());
      const t = this.get();
      if (null == t) return [];
      const r = St(
        accessPrivateField(this, Dc).findNearestToViewPortCenterByType(t, e)
      );
      return xt(r);
    }
    findNearestToViewPortCenterByKind(e) {
      Yt("kind", e, Vt());
      const t = this.get();
      if (null == t) return [];
      const r = St(
        accessPrivateField(this, Dc).findNearestToViewPortCenterByKind(t, e)
      );
      return xt(r);
    }
    setZoomLevel(e = 1) {
      const t = this.get();
      Yt("zoomLevel", e, Wt(Ht(), 0)),
        accessPrivateField(this, Dc).setZoomLevel(t, e);
    }
    getZoomLevel() {
      const e = this.get();
      return St(accessPrivateField(this, Dc).getZoomLevel(e));
    }
    async zoomToBlock(e, t = 0, r = 0, n = 0, o = 0) {
      return (
        Yt("id", e, qt()),
        kt((i) => accessPrivateField(this, Dc).zoomToBlock(e, t, r, n, o, i))
      );
    }
    enableZoomAutoFit(e, t, r = 0, n = 0, o = 0, i = 0) {
      return (
        Yt("id", e, qt()),
        Yt(
          "axis",
          t,
          (function () {
            const e = ["Horizontal", "Vertical", "Both"];
            return jt(
              "ZoomAutoFitAxis",
              (t) =>
                !("string" != typeof t || !e.includes(t)) || {
                  message: `expected one of ${e
                    .map((e) => `"${e}"`)
                    .join(", ")}, but got "${t}"`,
                }
            );
          })()
        ),
        "Horizontal" === t
          ? (Yt("paddingBefore", r, Ht()),
            Yt("paddingAfter", n, Ht()),
            St(
              accessPrivateField(this, Dc).enableZoomAutoFit(e, t, r, 0, n, 0)
            ))
          : "Vertical" === t
          ? (Yt("paddingBefore", r, Ht()),
            Yt("paddingAfter", n, Ht()),
            St(
              accessPrivateField(this, Dc).enableZoomAutoFit(e, t, 0, r, 0, n)
            ))
          : (Yt("paddingLeft", r, Ht()),
            Yt("paddingTop", n, Ht()),
            Yt("paddingRight", o, Ht()),
            Yt("paddingBottom", i, Ht()),
            St(
              accessPrivateField(this, Dc).enableZoomAutoFit(e, t, r, n, o, i)
            ))
      );
    }
    disableZoomAutoFit(e) {
      return (
        Yt("blockOrScene", e, qt()),
        St(accessPrivateField(this, Dc).disableZoomAutoFit(e))
      );
    }
    isZoomAutoFitEnabled(e) {
      return (
        Yt("blockOrScene", e, qt()),
        St(accessPrivateField(this, Dc).isZoomAutoFitEnabled(e))
      );
    }
    unstable_enableCameraPositionClamping(
      e,
      t = 0,
      r = 0,
      n = 0,
      o = 0,
      i = 0,
      a = 0,
      s = 0,
      u = 0
    ) {
      return (
        Yt("ids", e, Ut(Ht())),
        Yt("paddingLeft", t, Ht()),
        Yt("paddingTop", r, Ht()),
        Yt("paddingRight", n, Ht()),
        Yt("paddingBottom", o, Ht()),
        Yt("scaledPaddingLeft", t, Ht()),
        Yt("scaledPaddingTop", r, Ht()),
        Yt("scaledPaddingRight", n, Ht()),
        Yt("scaledPaddingBottom", o, Ht()),
        St(
          accessPrivateField(this, Dc).unstable_enableCameraPositionClamping(
            e,
            t,
            r,
            n,
            o,
            i,
            a,
            s,
            u
          )
        )
      );
    }
    unstable_disableCameraPositionClamping(e = this.get()) {
      if (null == e) throw new Error("No scene available.");
      return St(
        accessPrivateField(this, Dc).unstable_disableCameraPositionClamping(e)
      );
    }
    unstable_isCameraPositionClampingEnabled(e = this.get()) {
      if (null == e) throw new Error("No scene available.");
      return St(
        accessPrivateField(this, Dc).unstable_isCameraPositionClampingEnabled(e)
      );
    }
    unstable_enableCameraZoomClamping(
      e,
      t = -1,
      r = -1,
      n = 0,
      o = 0,
      i = 0,
      a = 0
    ) {
      return (
        Yt("ids", e, Ut(Ht())),
        Yt("minZoomLimit", t, Ht()),
        Yt("maxZoomLimit", r, Ht()),
        Yt("paddingLeft", n, Ht()),
        Yt("paddingTop", o, Ht()),
        Yt("paddingRight", i, Ht()),
        Yt("paddingBottom", a, Ht()),
        St(
          accessPrivateField(this, Dc).unstable_enableCameraZoomClamping(
            e,
            t,
            r,
            n,
            o,
            i,
            a
          )
        )
      );
    }
    unstable_disableCameraZoomClamping(e = this.get()) {
      if (null == e) throw new Error("No scene available.");
      return St(
        accessPrivateField(this, Dc).unstable_disableCameraZoomClamping(e)
      );
    }
    unstable_isCameraZoomClampingEnabled(e = this.get()) {
      if (null == e) throw new Error("No scene available.");
      return St(
        accessPrivateField(this, Dc).unstable_isCameraZoomClampingEnabled(e)
      );
    }
  };
(Mc = createMetadataArray(null)),
  (Dc = new WeakMap()),
  defineMember(Mc, 1, "loadFromString", Bc, SceneAPI),
  defineMember(Mc, 1, "loadFromURL", Rc, SceneAPI),
  defineMember(Mc, 1, "loadFromArchiveURL", Lc, SceneAPI),
  defineMember(Mc, 1, "create", Fc, SceneAPI),
  defineMember(Mc, 1, "createVideo", Pc, SceneAPI),
  defineMember(Mc, 1, "createFromImage", Ac, SceneAPI),
  defineMember(Mc, 1, "createFromVideo", Tc, SceneAPI),
  defineMember(Mc, 1, "get", xc, SceneAPI),
  defineMember(Mc, 1, "applyTemplateFromString", kc, SceneAPI),
  defineMember(Mc, 1, "applyTemplateFromURL", Sc, SceneAPI),
  defineMember(Mc, 1, "getMode", Cc, SceneAPI),
  defineMember(Mc, 1, "setDesignUnit", Ec, SceneAPI),
  defineMember(Mc, 1, "getDesignUnit", _c, SceneAPI),
  defineMember(Mc, 1, "getPages", wc, SceneAPI),
  defineMember(Mc, 1, "getCurrentPage", bc, SceneAPI),
  defineMember(Mc, 1, "findNearestToViewPortCenterByType", yc, SceneAPI),
  defineMember(Mc, 1, "findNearestToViewPortCenterByKind", vc, SceneAPI),
  defineMember(Mc, 1, "setZoomLevel", gc, SceneAPI),
  defineMember(Mc, 1, "getZoomLevel", mc, SceneAPI),
  defineMember(Mc, 1, "zoomToBlock", pc, SceneAPI),
  defineMember(Mc, 1, "enableZoomAutoFit", fc, SceneAPI),
  defineMember(Mc, 1, "disableZoomAutoFit", hc, SceneAPI),
  defineMember(Mc, 1, "isZoomAutoFitEnabled", dc, SceneAPI),
  assignMetadata(Mc, SceneAPI),
  (Uc = [Jt]),
  (jc = [er]),
  (Ic = [Jt]),
  (Oc = [er]);
var VariableAPI = class {
  constructor(e) {
    executeInitializers(qc, 5, this),
      addPrivateMember(this, $c),
      writePrivateField(this, $c, e);
  }
  findAll() {
    return xt(accessPrivateField(this, $c).findAllVariables());
  }
  setString(e, t) {
    return (
      Yt("key", e, Vt()),
      Yt("value", t, Vt()),
      St(accessPrivateField(this, $c).setVariableString(e, t))
    );
  }
  getString(e) {
    return (
      Yt("key", e, Vt()), St(accessPrivateField(this, $c).getVariableString(e))
    );
  }
  remove(e) {
    return (
      Yt("key", e, Vt()), St(accessPrivateField(this, $c).removeVariable(e))
    );
  }
};
(qc = createMetadataArray(null)),
  ($c = new WeakMap()),
  defineMember(qc, 1, "findAll", Uc, VariableAPI),
  defineMember(qc, 1, "setString", jc, VariableAPI),
  defineMember(qc, 1, "getString", Ic, VariableAPI),
  defineMember(qc, 1, "remove", Oc, VariableAPI),
  assignMetadata(qc, VariableAPI);
var Hc = async function (e, t, r = fetch, n, o = new Set(n.findAllSources())) {
  const i = e.map(async (e) => {
    const i =
      ((a = `/${e}/content.json`),
      `${t.replace(/\/+$/, "")}/${a.replace(/^\/+/, "")}`);
    var a;
    return r(i)
      .then((e) => {
        if (!e.ok) throw new Error(e.statusText);
        return e.json();
      })
      .then((r) => {
        if (void 0 === r.assets)
          throw new Error(`Invalid content.json for assets: ${e}`);
        const i = r.assets;
        o.has(e) || n.addLocalSource(e),
          i.forEach((r) => {
            r.meta &&
              Object.entries(r.meta).forEach(([e, n]) => {
                const o = n.toString();
                if (o.includes("{{base_url}}")) {
                  const n = o.replace("{{base_url}}", t);
                  r.meta && (r.meta[e] = n);
                }
              }),
              r.payload?.typeface &&
                r.payload.typeface.fonts.forEach((e) => {
                  e.uri.includes("{{base_url}}") &&
                    (e.uri = e.uri.replace("{{base_url}}", t));
                }),
              r.payload?.sourceSet &&
                r.payload.sourceSet.forEach((e) => {
                  e.uri.includes("{{base_url}}") &&
                    (e.uri = e.uri.replace("{{base_url}}", t));
                }),
              n.addAssetToSource(e, r);
          });
      });
  });
  await Promise.all(i);
};
var Nc = async function (e, t, r, n) {
    const o = [
      "ly.img.sticker",
      "ly.img.vectorpath",
      "ly.img.colors.defaultPalette",
      "ly.img.filter.lut",
      "ly.img.filter.duotone",
      "ly.img.effect",
      "ly.img.blur",
      "ly.img.typeface",
    ].filter((e) => !r.includes(e));
    await Hc(o, t, n, e);
  },
  Vc = ((e) => (
    (e[(e.Information = 0)] = "Information"),
    (e[(e.Warning = 1)] = "Warning"),
    (e[(e.Error = 2)] = "Error"),
    e
  ))(Vc || {}),
  zc = ((e) => (
    (e[(e.Free = 0)] = "Free"),
    (e[(e.VerticalStack = 1)] = "VerticalStack"),
    (e[(e.HorizontalStack = 2)] = "HorizontalStack"),
    (e[(e.DepthStack = 3)] = "DepthStack"),
    e
  ))(zc || {});
var Wc = async function (
  e,
  t,
  r,
  n,
  o,
  i,
  a = "https://cdn.img.ly/assets/demo/v2"
) {
  const s = new Set(e.findAllSources()),
    u = "ly.img.image.upload";
  !o ||
    r.includes(u) ||
    s.has(u) ||
    e.addLocalSource(u, [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "image/gif",
      "image/bmp",
    ]);
  const c = "ly.img.video.upload";
  "Video" !== n ||
    !o ||
    r.includes(c) ||
    s.has(c) ||
    e.addLocalSource(c, ["video/mp4", "video/quicktime"]);
  const l = "ly.img.audio.upload";
  "Video" !== n ||
    !o ||
    r.includes(l) ||
    s.has(l) ||
    e.addLocalSource(l, [
      "audio/mpeg",
      "audio/mp3",
      "audio/x-m4a",
      "audio/wav",
    ]);
  const d = ["ly.img.image", "ly.img.video", "ly.img.audio"].filter(
    (e) => !r.includes(e)
  );
  s.has("ly.img.template") ||
    r.includes("ly.img.template") ||
    (e.addLocalSource("ly.img.template", void 0, async (e) => {
      const r = e.meta?.uri;
      if (r)
        if (r.startsWith("UBQ1")) t.applyTemplateFromString(r);
        else {
          const e = new URL(r, window.location.href);
          t.applyTemplateFromURL(e.href);
        }
    }),
    d.push("ly.img.template")),
    "Video" !== n ||
      s.has("ly.img.video.template") ||
      r.includes("ly.img.video.template") ||
      (e.addLocalSource("ly.img.video.template", void 0, async (e) => {
        const r = e.meta?.uri;
        if (r)
          if (r.startsWith("UBQ1")) t.applyTemplateFromString(r);
          else {
            const e = new URL(r, window.location.href);
            t.applyTemplateFromURL(e.href);
          }
      }),
      d.push("ly.img.video.template")),
    await Hc(d, a, i, e);
};
function Gc(e, t) {
  let r;
  const n = new Set();
  function o() {
    const n = window.devicePixelRatio,
      { width: i, height: a } = e.getBoundingClientRect();
    t(i * n, a * n, n),
      (r = matchMedia(`(resolution: ${n}dppx)`)),
      r.addEventListener("change", o, { once: !0 });
  }
  o();
  const i = new ResizeObserver(function ([e]) {
    const { width: r, height: o } = e.target.getBoundingClientRect();
    if (r <= 0 || o <= 0) return;
    const i = window.devicePixelRatio,
      a = setTimeout(function () {
        n.delete(a), t(r * i, o * i, i);
      }, 0);
    n.add(a);
  });
  return (
    i.observe(e),
    () => {
      r.removeEventListener("change", o), i.disconnect();
      for (const e of n) clearTimeout(e);
      n.clear(), (e = null), (t = null);
    }
  );
}
var Xc = cloneWithPrototypeAndProperties(lodashIsEqual());
function Yc(e, t) {
  const r = new Set();
  function n(n) {
    r.add(n);
    e?.((e, ...t) => {
      n(e);
      for (const e of t) n(e);
    });
    return () => {
      r.delete(n), t?.();
    };
  }
  return (
    (n.emit = function (e, ...t) {
      for (const n of r) {
        n(e);
        for (const e of t) n(e);
      }
    }),
    (n.handlers = r),
    n
  );
}
var Kc = (e) => (t) =>
  function (r) {
    return t(function (t) {
      r(e(t));
    });
  };
function Zc(e) {
  return (t) =>
    function (r) {
      let n = !1;
      const o = t(function (e) {
        (n = !0), r(e);
      });
      return n || r(e instanceof Function ? e() : e), o;
    };
}
var Qc =
    (e = (e, t) => e === t) =>
    (t) =>
      function (r) {
        let n;
        return t(function (t) {
          e(t, n) || ((n = t), r(t));
        });
      },
  Jc = (e) => {
    const t = new Set();
    let r = null;
    return function (n) {
      return (
        t.add(n),
        null === r &&
          (r = e(function (e) {
            t.forEach((t) => t(e));
          })),
        function () {
          t.delete(n), 0 === t.size && (r?.(), (r = null));
        }
      );
    };
  };
function el(e, ...t) {
  return t.reduce((e, t) => t(e), e);
}
var tl = (...e) => {
  const t = Array.from(e);
  return function (e) {
    const r = t.map(function (t) {
      return t(e);
    });
    return function () {
      for (const e of r) e();
    };
  };
};
function rl(e) {
  return function (t) {
    let r = null;
    const n = e(function (e) {
      r?.(), (r = e ? e(t) : e);
    });
    return function () {
      n(), r?.(), (r = null);
    };
  };
}
function nl(...e) {
  const t = Array.from(e);
  return function (e) {
    const r = new Array(t.length),
      n = t.map((t, n) =>
        t(function (t) {
          (r[n] = t), e(r);
        })
      );
    return function () {
      n.forEach((e) => e()), (r.length = 0);
    };
  };
}
var ol = Symbol("NO_VALUE");
function il(e) {
  let t = ol;
  const r = Yc();
  return {
    subscribe: r,
    value: () => (t === ol && (t = e()), t),
    update(e) {
      (t = e), r.emit(t);
    },
  };
}
var al = cloneWithPrototypeAndProperties(lodashOnce());
function sl(e, t) {
  const { block: r, event: n } = t;
  return el((t) => {
    const o = r.getType(e),
      i = (0, al.default)(
        n.subscribe([e], function (n) {
          (n.some((e) => "Destroyed" === e.type) && !r.isValid(e)) ||
          r.getType(e) !== o
            ? i()
            : t(n);
        })
      );
    return i;
  }, Jc);
}
function ul(e, t) {
  if (!t) return e;
  let r;
  return (...n) => {
    const o = e(...n);
    return t(o, r) || (r = o), r;
  };
}
var cl = function (e, t, r, n) {
  const o = ul(t, n?.equals),
    i = Yc();
  return {
    subscribe: el(tl(e, i), Kc(o), Qc(), Jc),
    update: r,
    value: o,
    flush: () => i.emit(),
  };
};
var ll = class {
  settings;
  clampCamera = !1;
  clampResult = il(() => ({
    sceneSize: { x: 0, y: 0 },
    scrollPercentage: { x: NaN, y: NaN },
  }));
  zoomLevel;
  #a;
  viewportPadding = il(() => ({ x: 40, y: 48 }));
  autoFit;
  scrollPercentage;
  sceneSize;
  scroll;
  constructor(e) {
    const { block: t, scene: r, _legacyApi: n } = e,
      o = el(
        r.onActiveChanged,
        Zc(),
        Kc(() => r.get())
      ),
      i = el(
        o,
        Kc((r) =>
          null != r && t.isValid(r)
            ? el(
                sl(r, e),
                Zc([]),
                Kc(() => t.getFloat(r, "scene/dpi"))
              )
            : () => () => {}
        ),
        rl
      ),
      a = el(
        o,
        Kc(() => {
          const r = t.findByType("camera")[0];
          return null == r
            ? () => () => {}
            : el(
                sl(r, e),
                Zc([]),
                Kc(() => r)
              );
        }),
        rl
      );
    (this.settings = {
      subscribe: el(
        a,
        Kc((e) => ({
          width: t.getFloat(e, "camera/resolution/width"),
          height: t.getFloat(e, "camera/resolution/height"),
          pixelRatio: t.getFloat(e, "camera/pixelRatio"),
        })),
        Qc(Xc.default),
        Jc
      ),
      update({ width: e, height: r, pixelRatio: n }) {
        const o = t.findByType("camera")[0];
        null != o &&
          (t.setFloat(o, "camera/resolution/width", e),
          t.setFloat(o, "camera/resolution/height", r),
          t.setFloat(o, "camera/pixelRatio", n));
      },
      value() {
        const e = t.findByType("camera")[0];
        return null == e
          ? { width: 0, height: 0, pixelRatio: 1 }
          : {
              width: t.getFloat(e, "camera/resolution/width"),
              height: t.getFloat(e, "camera/resolution/height"),
              pixelRatio: t.getFloat(e, "camera/pixelRatio"),
            };
      },
    }),
      (this.zoomLevel = cl(
        tl(r.onZoomLevelChanged, i),
        () => {
          const e = r.get(),
            { pixelRatio: n } = this.settings.value();
          return null != e && t.isValid(e) ? r.getZoomLevel() / n : 1;
        },
        (e) => {
          const n = r.get(),
            { pixelRatio: o } = this.settings.value();
          null != n && t.isValid(n) && r.setZoomLevel(e * o);
        }
      )),
      (this.#a = {
        subscribe: el(
          a,
          Kc((e) => n.getValue(e, "ubq/designblocks/Camera", "zoomLevel")),
          Qc()
        ),
        value() {
          const e = t.findByType("camera")[0];
          return null == e
            ? 1
            : n.getValue(e, "ubq/designblocks/Camera", "zoomLevel");
        },
      }),
      (this.autoFit = cl(r.onZoomLevelChanged, () => {
        const e = r.get();
        return null != e && r.isZoomAutoFitEnabled(e);
      })),
      (this.scrollPercentage = {
        subscribe: el(
          this.clampResult.subscribe,
          Kc((e) => e.scrollPercentage),
          Qc(Xc.default)
        ),
        value: () => this.clampResult.value().scrollPercentage,
      }),
      (this.sceneSize = {
        subscribe: el(
          nl(
            this.clampResult.subscribe,
            this.#a.subscribe,
            this.settings.subscribe
          ),
          Kc(([e, t, r]) => {
            const n = e?.sceneSize ??
                this.clampResult.value().sceneSize ?? { x: 0, y: 0 },
              o = t ?? this.#a.value() ?? 10,
              i = r?.pixelRatio ?? this.settings.value().pixelRatio ?? 1;
            return { x: (n.x * o) / i, y: (n.y * o) / i };
          }),
          Qc(Xc.default)
        ),
        value: () => {
          const e = this.clampResult.value().sceneSize ?? { x: 0, y: 0 },
            t = this.#a.value() ?? 10,
            r = this.settings.value().pixelRatio ?? 1;
          return { x: (e.x * t) / r, y: (e.y * t) / r };
        },
      }),
      (this.scroll = (e) => {
        const r = t.findByType("camera")[0];
        if (null == r) return;
        const n = this.#a.value(),
          o = this.settings.value().pixelRatio,
          i = (e.x * o) / n,
          a = (e.y * o) / n,
          s = { x: t.getPositionX(r) + i, y: t.getPositionY(r) + a };
        t.setPositionX(r, s.x), t.setPositionY(r, s.y);
      });
  }
};
function dl(e, t) {
  const r = `[UBQ] ${e}`;
  switch (t) {
    case "Warning":
      console.warn(r);
      break;
    case "Error":
      console.error(r);
      break;
    case "Info":
      console.info(r);
      break;
    default:
      console.log(r);
  }
}
function hl(e, t) {
  return (
    (t ??= "undefined" == typeof window ? void 0 : window.location.href),
    new URL(e ?? "", t).href.replace(/\/*$/, "/")
  );
}
function fl(e = {}) {
  const t = {
    ...e,
    license: e.license ?? "",
    baseURL:
      e.baseURL ??
      "https://cdn.img.ly/packages/imgly/cesdk-engine/1.37.0/assets",
    core: e.core ?? { baseURL: "core/" },
    logger: e.logger ?? dl,
    presets: e.presets ?? {},
  };
  return (
    (t.baseURL = hl(t.baseURL)),
    (t.core.baseURL = hl(t.core.baseURL, t.baseURL)),
    t
  );
}
var pl = {
  warnKeys(e) {
    if (
      e.scene ||
      e.page ||
      e.assetSources ||
      e.presets?.colorPalettes ||
      e.presets?.images ||
      e.presets?.pageFormats ||
      e.presets?.colorPalettes ||
      e.variables ||
      e.callbacks?.log ||
      e.initialSceneMode ||
      e.initialSceneString ||
      e.initialSceneURL ||
      e.initialImageURL
    )
      return "Your configuration contains keys that are no longer supported and will be ignored. Refer to https://img.ly/docs/cesdk/introduction/migration_1_13/ for information about the removed keys.";
  },
};
function ml(e, t) {
  return t
    ? e.flatMap((e) => {
        const r = e.warnKeys?.(t);
        return "string" == typeof r ? [r] : r ?? [];
      })
    : [];
}
function gl(e, t, r) {
  if (t) for (const n of e) n.applyFallback?.(t, r);
}
function vl(e, t) {
  return t
    ? e.reduce(
        (e, t) => (t.migrateConfigObject ? t.migrateConfigObject(e) : e),
        t
      )
    : t;
}
var yl,
  bl,
  wl,
  _l,
  El = [
    pl,
    new (class _TypefaceMigration {
      static APIFALLBACK_TYPEFACES_SOURCE_ID = "apiFallbackTypefaces";
      warnKeys(e) {
        if (e.presets?.typefaces)
          return "The `presets.typefaces` configuration option is deprecated. Use the AssetAPI to add typefaces instead.";
      }
      applyFallback(e, t) {
        if (e)
          try {
            const r = t.asset;
            if (e.presets?.typefaces) {
              r.addLocalSource(
                _TypefaceMigration.APIFALLBACK_TYPEFACES_SOURCE_ID
              );
              for (const [t, n] of Object.entries(e.presets.typefaces))
                r.addAssetToSource(
                  _TypefaceMigration.APIFALLBACK_TYPEFACES_SOURCE_ID,
                  {
                    id: t,
                    payload: {
                      typeface: {
                        name: n.family,
                        fonts: n.fonts.map((e) => ({
                          subFamily: `${e.weight} ${e.style}`,
                          style: e.style,
                          uri: e.fontURL,
                          weight: e.weight,
                        })),
                      },
                    },
                  }
                );
            }
          } catch (e) {
            console.error(e);
          }
      }
    })(),
  ];
function Cl(e, t, r = void 0) {
  const n = (e) => {
      St(t.setContext("")), e.preventDefault();
    },
    o = (e) => {
      St(t.setContext("!canvas")), r && r(), e.preventDefault();
    };
  return (
    e.addEventListener("webglcontextlost", n, !1),
    e.addEventListener("webglcontextrestored", o, !1),
    () => {
      e.removeEventListener("webglcontextlost", n),
        e.removeEventListener("webglcontextrestored", o);
    }
  );
}
function Sl(e) {
  const t = {
    key: 255,
    characters: e.key,
    shiftIsHeld: e.shiftKey,
    commandIsHeld: e.metaKey || e.ctrlKey,
    optionIsHeld: e.altKey,
    timestamp: Date.now(),
  };
  switch (e.key.toUpperCase()) {
    case "0":
      t.key = 0;
      break;
    case "1":
      t.key = 1;
      break;
    case "2":
      t.key = 2;
      break;
    case "3":
      t.key = 3;
      break;
    case "4":
      t.key = 4;
      break;
    case "5":
      t.key = 5;
      break;
    case "6":
      t.key = 6;
      break;
    case "7":
      t.key = 7;
      break;
    case "8":
      t.key = 8;
      break;
    case "9":
      t.key = 9;
      break;
    case "A":
      t.key = 10;
      break;
    case "B":
      t.key = 11;
      break;
    case "C":
      t.key = 12;
      break;
    case "D":
      t.key = 13;
      break;
    case "E":
      t.key = 14;
      break;
    case "F":
      t.key = 15;
      break;
    case "G":
      t.key = 16;
      break;
    case "H":
      t.key = 17;
      break;
    case "I":
      t.key = 18;
      break;
    case "J":
      t.key = 19;
      break;
    case "K":
      t.key = 20;
      break;
    case "L":
      t.key = 21;
      break;
    case "M":
      t.key = 22;
      break;
    case "N":
      t.key = 23;
      break;
    case "O":
      t.key = 24;
      break;
    case "P":
      t.key = 25;
      break;
    case "Q":
      t.key = 26;
      break;
    case "R":
      t.key = 27;
      break;
    case "S":
      t.key = 28;
      break;
    case "T":
      t.key = 29;
      break;
    case "U":
      t.key = 30;
      break;
    case "V":
      t.key = 31;
      break;
    case "W":
      t.key = 32;
      break;
    case "X":
      t.key = 33;
      break;
    case "Y":
      t.key = 34;
      break;
    case "Z":
      t.key = 35;
      break;
    case " ":
      t.key = 42;
      break;
    case "ESCAPE":
      (t.key = 43), (t.characters = "");
      break;
    case "BACKSPACE":
      (t.key = 40), (t.characters = "");
      break;
    case "DELETE":
      (t.key = 44), (t.characters = "");
      break;
    case "ENTER":
      (t.key = 41), (t.characters = t.shiftIsHeld ? "\u2028" : "\n");
      break;
    case "CONTROL":
      (t.key = 45), (t.characters = "");
      break;
    case "ALT":
      (t.key = 46), (t.characters = "");
      break;
    case "SHIFT":
      (t.key = 47), (t.characters = "");
      break;
    case "ARROWLEFT":
      (t.key = 36), (t.characters = "");
      break;
    case "ARROWRIGHT":
      (t.key = 37), (t.characters = "");
      break;
    case "ARROWUP":
      (t.key = 38), (t.characters = "");
      break;
    case "ARROWDOWN":
      (t.key = 39), (t.characters = "");
      break;
    case "DEAD":
      (t.key = 255), (t.characters = "");
  }
  return t;
}
(wl = [Jt]), (bl = [Jt]), (yl = [Jt]);
var kl = class {
  constructor(e) {
    executeInitializers(_l, 5, this),
      defineProperty(this, "ubique"),
      defineProperty(this, "notificationStream", (e) => {
        const t = this.ubique.addEventCallback("NotificationEvent", (t) =>
          e({ type: Vc[t.type], i18n: t.i18n })
        );
        return () => {
          t.dispose(), t.delete();
        };
      }),
      defineProperty(this, "designElementLifecycleStream", (e) => (t) => {
        const r = this.ubique.addEventCallback(e, t);
        return () => {
          r.dispose(), r.delete();
        };
      }),
      defineProperty(this, "historyStream", (e) => {
        const t = this.ubique.addEventCallback("HistoryUpdatedEvent", e);
        return () => {
          t.dispose(), t.delete();
        };
      }),
      (this.ubique = e.getInternalAPI());
  }
  dispose() {
    this.ubique.delete();
  }
  setErrorCallback(e, t) {
    this.ubique.setErrorCallback(e, t);
  }
  getSelectedText() {
    return St(this.ubique.getSelectedText());
  }
  hasComponent(e, t) {
    return St(this.ubique.hasComponent(e, t));
  }
  getValue(e, t, r) {
    return St(this.ubique.getValue(e, t, r));
  }
  execute(e, t) {
    let r;
    const n = new Promise((n, o) => {
      r = this.ubique.ubqExecute(e, t, (e) => {
        try {
          const t = St(e);
          n(t);
        } catch (e) {
          o(e);
        }
      });
    });
    return St(r), n;
  }
  sendKey(e) {
    return this.execute("ubq/inputs/keyboardkey", Sl(e));
  }
  changeSceneLayout(e, t, r, n) {
    return this.execute("ubq/scene/changeLayout", [e, zc[t], r, n]);
  }
};
defineMember((_l = createMetadataArray(null)), 1, "getSelectedText", wl, kl),
  defineMember(_l, 1, "hasComponent", bl, kl),
  defineMember(_l, 1, "getValue", yl, kl),
  assignMetadata(_l, kl);
var xl = !1;
var Tl = "https://api.img.ly/activate";
var Al = cloneWithPrototypeAndProperties(cesdkCore()),
  Pl = "./cesdk-v1.37.0-XHZXX7DG.data",
  Fl = "./cesdk-v1.37.0-PJWLHKQM.wasm",
  Ll = Al.default,
  Rl =
    (!(
      "undefined" == typeof window ||
      !window.document ||
      !window.document.createElement
    ) &&
      navigator &&
      navigator.userAgent) ||
    "",
  Bl = -1 !== Rl.indexOf("Edge"),
  Dl = !!Rl.match(/msie|trident/i),
  Ml =
    /\b(iPad|iPhone|iPod)\b/.test(Rl) &&
    /WebKit/.test(Rl) &&
    !/Edge/.test(Rl) &&
    ("undefined" == typeof window || !("MSStream" in window)),
  Ol = (e, t) => {
    if (null != t) {
      return [t, e.split("/").pop()].join("");
    }
    return new URL(e, window.location.origin);
  };
function Il() {
  try {
    return new WebAssembly.Memory({
      initial: jl(Ml ? 512 : 32),
      maximum: jl(2048),
    });
  } catch (e) {
    return new WebAssembly.Memory({ initial: jl(32), maximum: jl(2048) });
  }
}
function jl(e) {
  return (1024 * e * 1024) / 65536;
}
async function Ul(e, t) {
  const { core: r } = t,
    n = t.logger,
    o = Ol(Fl, r.baseURL).toString(),
    i = Ol(Pl, r.baseURL).toString(),
    a = /electron/i.test(navigator.userAgent),
    s = (function (e, t = fetch) {
      if (!e.license) throw new Error("Missing license key in config");
      return e.license.length < 128
        ? t(Tl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey: e.license, userId: e.userId }),
          })
            .then((e) => {
              if (e.ok) return e.json();
              throw new Error(
                "Unfortunately we are experiencing a server down time and your License key cannot be validated. We're already working on a fix and will restore service soon. Should services not restore within the hour, kindly get in touch with our support team."
              );
            })
            .then((e) => {
              if ("valid" === e.status) return e.license;
              throw "expired" === e.status
                ? new Error(
                    "Thanks for using IMG.LY for creative editing. Please note that your license file or commercial use is expired. Please get in touch with our sales team to discuss extension of your commercial license."
                  )
                : new Error(
                    "The License Key (API Key) you are using to access the IMG.LY SDK is invalid. Please ensure that you are using the license key tied to your subscription and get in touch with our support team."
                  );
            })
        : Promise.resolve(e.license);
    })(t),
    u = a
      ? await fetch(i, { credentials: "same-origin" })
          .then((e) => e.arrayBuffer())
          .then(
            (e) =>
              function (t, r) {
                if (t !== i) return null;
                if (r === e.byteLength) return e;
                throw new Error(
                  `Attempt to get preloaded package of unknown name or size: ${t} ${r}`
                );
              }
          )
      : void 0;
  return new Promise((r, a) => {
    const c = {
      getPreloadedPackage: u,
      locateFile: (e, t) =>
        e.endsWith(".wasm") ? o : e.endsWith(".data") ? i : t + e,
      print: (e) => {
        e && "undefined" !== e && n(e, "Info");
      },
      printErr: (e) => {
        e && "undefined" !== e && n(e, "Error");
      },
      logReadFiles: !1,
      printWithColors: !0,
      wasmMemory: Il(),
    };
    Ll(c)
      .then(async (n) => {
        n.specialHTMLTargets["!canvas"] = e;
        n.emscripten_ubq_settings_forceWebGL1 = Ml || !!t?.forceWebGL1;
        const o = St(n.createEngine("!canvas", t.audioOutput ?? "auto"));
        !(function (e, t) {
          if (!t) throw new Error("Missing license key");
          St(e.unlockWithLicense(t));
        })(o, await s),
          (function (e, t) {
            const r = new EditorAPI(e),
              n = new AssetAPI(e);
            if ((r.setRole(t.role ?? "Creator"), xl)) {
              const t = new kl(e);
              t.execute("cesdk/getVersionInfo").then((e) => console.debug(e)),
                t
                  .execute("cesdk/getCapabilitiesInfo")
                  .then((e) => console.debug(e)),
                t.dispose();
            }
            r.setSettingString("basePath", t.baseURL),
              r.setSettingBool("showBuildVersion", xl || !1),
              t.featureFlags?.preventScrolling &&
                (r.setSettingBool("touch/singlePointPanning", !1),
                r.setSettingBool("touch/dragStartCanSelect", !1)),
              n.addLocalSource("ly.img.text"),
              (function () {
                xl &&
                  (r.setSettingBool(
                    "features/hspSelectiveAdjustmentsEnabled",
                    !1
                  ),
                  r.setSettingBool("features/templatingEnabled", !0));
                const e = !!t.featureFlags?.singlePageMode;
                r.setSettingBool("features/singlePageModeEnabled", e),
                  r.setSettingBool("features/effectsEnabled", !0);
              })(),
              (function () {
                const t = new VariableAPI(e);
                (xl || ("undefined" != typeof window && window.Cypress)) &&
                  (t.setString("company_name", "img.ly"),
                  t.setString("first_name", "Charly"),
                  t.setString("last_name", "Williams"),
                  t.setString("address", "742 Evergreen Terrace"),
                  t.setString("city", "Springfield"));
              })(),
              r.startTracking(t.license, t.userId ?? "");
          })(o, t),
          r(o);
      })
      .catch(a);
  });
}
var $l = class {
    _reactor;
    _updateHandler = null;
    debugName;
    dirty = !0;
    readCalls = new Set();
    constructor(e, t) {
      (this.debugName = t), (this._reactor = e);
    }
    dispose() {
      (this._updateHandler = null),
        this._reactor._unregisterReaction(this),
        (this._reactor = null);
    }
    track(e) {
      return this._reactor._trackReaction(this, e);
    }
    subscribe(e) {
      return (
        this._reactor._registerReaction(this),
        (this._updateHandler = e),
        () => {
          (this._updateHandler = null), this._reactor._unregisterReaction(this);
        }
      );
    }
    update() {
      this._updateHandler?.();
    }
  },
  ql = cloneWithPrototypeAndProperties(lodashIsEqual()),
  Hl = Symbol("NO_VALUE"),
  Nl = class {
    callId;
    _value = Hl;
    _lastUpdateValue = Hl;
    _readFromEngine;
    constructor(e, t) {
      (this.callId = e),
        (this._readFromEngine = t),
        this.read(),
        (this._lastUpdateValue = this._value);
    }
    readCachedValue() {
      return this._value === Hl || this.revalidate ? this.read() : this._value;
    }
    revalidate = !1;
    invalidate() {
      this.revalidate = !0;
    }
    read() {
      const e = this._readFromEngine();
      return (
        (this.revalidate = !1),
        (0, ql.default)(this._value, e) ? this._value : ((this._value = e), e)
      );
    }
    updateValueAndCheckDirty() {
      try {
        const e = this.read(),
          t = this._lastUpdateValue !== e;
        return (this._lastUpdateValue = e), t;
      } catch {
        return (this._lastUpdateValue = Hl), !0;
      }
    }
    update(e) {
      this._readFromEngine = e;
    }
  },
  Vl = class {
    readCalls = new Map();
    _createOrUpdateReadCall(e, t) {
      if (this.readCalls.has(e)) {
        this.readCalls.get(e).update(t);
      } else this.readCalls.set(e, new Nl(e, t));
    }
    registeredReactions = new Set();
    activeReactions = new Set();
    get isTracking() {
      return this.activeReactions.size > 0;
    }
    _nextReaction;
    _resolveNextReaction;
    _createNextReaction() {
      this._nextReaction = new Promise((e) => {
        this._resolveNextReaction = e;
      });
    }
    constructor() {
      this._createNextReaction();
    }
    get nextReaction() {
      return this._nextReaction;
    }
    _getterCalled(e, t) {
      if (this.isTracking) {
        this._createOrUpdateReadCall(e, t);
        for (const t of this.activeReactions) t.readCalls.add(e);
      }
    }
    _setterCalled() {
      for (const e of this.readCalls.values()) e.invalidate();
    }
    read(e, t) {
      return this.isTracking && this.readCalls.has(e)
        ? this.readCalls.get(e).readCachedValue()
        : t();
    }
    createReaction(e) {
      return new $l(this, e);
    }
    _registerReaction(e) {
      this.registeredReactions.add(e);
    }
    _unregisterReaction(e) {
      this.registeredReactions.delete(e);
    }
    _cleanupReadCalls() {
      const e = new Set();
      for (const t of this.registeredReactions)
        for (const r of t.readCalls) e.add(r);
      for (const [t] of this.readCalls) e.has(t) || this.readCalls.delete(t);
    }
    #s = new Set();
    updateDirtyReactions() {
      const e = new Set();
      for (const [t, r] of this.readCalls)
        r.updateValueAndCheckDirty() && e.add(t);
      if (e.size > 0)
        for (const t of this.registeredReactions)
          if (!t.dirty)
            for (const r of t.readCalls)
              if (e.has(r)) {
                t.dirty = !0;
                break;
              }
      for (const e of this.registeredReactions)
        if (!this.#s.has(e) && e.dirty)
          try {
            this.#s.add(e), e.update();
          } finally {
            (e.dirty = !1), this.#s.delete(e);
          }
      this._cleanupReadCalls(),
        this._resolveNextReaction(),
        this._createNextReaction();
    }
    _trackReaction(e, t) {
      try {
        return this.activeReactions.add(e), e.readCalls.clear(), t();
      } finally {
        (e.dirty = !1), this.activeReactions.delete(e);
      }
    }
    decorateFunction(e, t) {
      return (function (e, t, r = t.name) {
        tr[r] ??= 0;
        const n = tr[r]++;
        return function (...o) {
          const i = this,
            a = `${r}${n}-${JSON.stringify(o, null, 0)}`;
          function s() {
            return Reflect.apply(t, i, o);
          }
          return e._getterCalled(a, s), e.read(a, s);
        };
      })(this, e, t);
    }
    decorateObject(e) {
      return (function (e, t) {
        const r = t.constructor?.name ?? crypto.randomUUID(),
          n = [];
        let o = !1;
        const i = Object.getOwnPropertyNames(t.constructor.prototype).concat(
          Object.getOwnPropertyNames(t)
        );
        for (const s of i) {
          const i = t[s];
          if ("function" == typeof (a = i) && Qt in a)
            if ("getter" === i[Qt].type) {
              let a = function (...t) {
                if (o) throw new Error("Disposed @getter proxy called");
                const n = this,
                  a = `${r}-${s.toString()}-${JSON.stringify(t, null, 0)}`;
                function u() {
                  return Reflect.apply(i, n, t);
                }
                return e._getterCalled(a, u), e.read(a, u);
              };
              n.push(rr(t, s, i)), (t[s] = a);
            } else if ("setter" === i[Qt].type) {
              let r = function (...t) {
                if (o) throw new Error("Disposed @setter proxy called");
                const r = this;
                return e._setterCalled(), Reflect.apply(i, r, t);
              };
              n.push(rr(t, s, i)), (t[s] = r);
            }
        }
        var a;
        return function () {
          o = !0;
          for (const e of n) e();
          n.length = 0;
        };
      })(this, e);
    }
    dispose() {
      this.registeredReactions.forEach((e) => e.dispose()),
        this.registeredReactions.clear(),
        this.readCalls.clear(),
        this.activeReactions.clear();
    }
  },
  zl =
    'url("data:image/svg+xml,%3Csvg width=%2722%27 height=%2725%27 viewBox=%270 0 22 25%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg filter=%27url(%23filter0_d)%27%3E%3Cpath d=%27M18 11.1071C18 14.5637 15.5566 17.4515 12.3314 18.0846V20L7.20308 17.0145L12.3314 14.0289V15.7825C14.3292 15.1951 15.7946 13.3221 15.7946 11.107C15.7946 8.42285 13.6437 6.23908 11 6.23908C8.35629 6.23908 6.20542 8.42285 6.20542 11.107C6.20542 11.8299 6.35745 12.5252 6.65738 13.1736L4.66118 14.1255C4.22245 13.1771 4 12.1616 4 11.1071C4.00007 7.18825 7.1403 4 11.0001 4C14.8599 4 18 7.18825 18 11.1071Z%27 fill=%27black%27/%3E%3Cpath d=%27M12.8314 15.0559V14.0289V13.1593L12.0799 13.5968L6.95152 16.5824L6.20927 17.0145L6.95152 17.4466L12.0799 20.4321L12.8314 20.8696V20V18.4841C16.0889 17.6521 18.5 14.6573 18.5 11.1071C18.5 6.9193 15.1431 3.5 11.0001 3.5C6.85702 3.5 3.50008 6.91929 3.5 11.1071V11.1071C3.5 12.2334 3.73793 13.3206 4.20739 14.3354L4.41978 14.7946L4.8764 14.5768L6.8726 13.6249L7.31866 13.4122L7.11118 12.9637C6.84206 12.3819 6.70542 11.7584 6.70542 11.107C6.70542 8.69181 8.63956 6.73908 11 6.73908C13.3604 6.73908 15.2946 8.69181 15.2946 11.107C15.2946 12.8513 14.2837 14.3564 12.8314 15.0559Z%27 stroke=%27white%27/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id=%27filter0_d%27 x=%270.0599999%27 y=%270.0599999%27 width=%2721.88%27 height=%2724.6193%27 filterUnits=%27userSpaceOnUse%27 color-interpolation-filters=%27sRGB%27%3E%3CfeFlood flood-opacity=%270%27 result=%27BackgroundImageFix%27/%3E%3CfeColorMatrix in=%27SourceAlpha%27 type=%27matrix%27 values=%270 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0%27/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation=%271.47%27/%3E%3CfeColorMatrix type=%27matrix%27 values=%270 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0%27/%3E%3CfeBlend mode=%27normal%27 in2=%27BackgroundImageFix%27 result=%27effect1_dropShadow%27/%3E%3CfeBlend mode=%27normal%27 in=%27SourceGraphic%27 in2=%27effect1_dropShadow%27 result=%27shape%27/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E") 12 12, pointer';
function Wl(e, t) {
  let r;
  return t.onStateChanged(() => {
    const n = (function (e, t) {
      switch (e) {
        case "Arrow":
          return "default";
        case "Move":
          return "move";
        case "MoveNotPermitted":
          return "auto";
        case "Resize": {
          const e = (180 * t) / Math.PI + 45;
          if (!Dl && !Bl)
            return `url("data:image/svg+xml,%3Csvg style='transform: rotate(${e}deg)' width ='22' height ='22' viewBox ='0 0 22 22' fill ='none' xmlns ='http://www.w3.org/2000/svg'%3E%3Cg filter ='url(%23filter0_d)'%3E%3Cpath d ='M13.7 11.1L9.7 15.2L12.5 18H4V9.5L6.9 12.3L10.9 8.3L12.3 6.9L9.5 4H18V12.5L15.2 9.7L13.7 11.1Z' fill ='white'/%3E%3C/g%3E%3Cpath d ='M12.7 10.7L8.3 15.2L10.1 17H5V11.9L6.9 13.8L11.3 9.3L13.8 6.9L11.9 5H17V10.1L15.2 8.3L12.7 10.7Z' fill ='black'/%3E%3Cdefs%3E%3Cfilter id ='filter0_d' x ='0' y ='0' width ='22' height ='22' filterUnits ='userSpaceOnUse' color-interpolation-filters ='sRGB'%3E%3CfeFlood flood-opacity ='0' result ='BackgroundImageFix'/%3E%3CfeColorMatrix in ='SourceAlpha' type ='matrix' values ='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation ='2'/%3E%3CfeColorMatrix type ='matrix' values ='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'/%3E%3CfeBlend mode ='normal' in2 ='BackgroundImageFix' result ='effect1_dropShadow'/%3E%3CfeBlend mode ='normal' in ='SourceGraphic' in2 ='effect1_dropShadow' result ='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E") 12 12, pointer`;
          switch (e) {
            case 90:
            case 270:
              return "nwse-resize";
            case 135:
            case 315:
              return "ns-resize";
            case 180:
            case 360:
              return "nesw-resize";
            case 225:
              return "ew-resize";
            default:
              return "move";
          }
        }
        case "Rotate":
          return zl;
        case "Text":
          return "text";
        default:
          return "auto";
      }
    })(t.getCursorType(), t.getCursorRotation());
    if (n !== r) {
      r = n;
      const t = new CustomEvent("cesdk-cursor", {
        composed: !0,
        bubbles: !0,
        cancelable: !0,
        detail: n,
      });
      e.dispatchEvent(t) && e.style.setProperty("cursor", n);
    }
  });
}
var Gl = function (e, t, r, n, o) {
  let i,
    a = null;
  const s = n.onStateChanged(() => {
    (i = n.getEditMode()),
      "Text" !== i || a
        ? "Text" !== i && a && (a(), (a = null))
        : (a = (function () {
            const i = a();
            return () => {
              i?.();
            };
            function a() {
              let i = !1,
                a = "";
              if (null == e.parentElement)
                return (
                  console.warn(
                    'Could not attach hidden text input to the DOM: Canvas has no parentElement. This can happen if edit mode is switched to "Text", while the canvas is removed from the DOM.'
                  ),
                  () => {}
                );
              const s = c();
              d();
              const u = h();
              return (
                e.parentElement.appendChild(s),
                f(),
                () => {
                  u(), l();
                }
              );
              function c() {
                const e = document.createElement("textarea");
                return (
                  (e.id =
                    "ubq_internal-inline_text_editing_html_representation"),
                  e.setAttribute("data-cy", "inline-text-editing-input"),
                  (e.autocapitalize = "none"),
                  (e.spellcheck = !1),
                  (e.cols = 4096),
                  (e.style.contain = "strict"),
                  (e.style.opacity = "0"),
                  (e.style.pointerEvents = "none"),
                  (e.style.zIndex = "-1"),
                  (e.style.position = "fixed"),
                  (e.style.width = "1px"),
                  (e.style.height = "1px"),
                  (e.style.padding = "0"),
                  (e.style.margin = "-1px"),
                  (e.style.overflow = "hidden"),
                  (e.style.clip = "rect(0, 0, 0, 0)"),
                  (e.style.border = "0"),
                  e
                );
              }
              function l() {
                s.blur(), s.remove();
              }
              function d() {
                const t = n.getTextCursorPositionInScreenSpaceX(),
                  r = n.getTextCursorPositionInScreenSpaceY(),
                  { left: o, top: i } = e.getBoundingClientRect();
                (s.style.left = `${o + t / window.devicePixelRatio}px`),
                  (s.style.top = `${i + r / window.devicePixelRatio}px`);
              }
              function h() {
                const t = e.getRootNode();
                s.addEventListener("input", w),
                  s.addEventListener("keydown", E),
                  s.addEventListener("copy", v),
                  s.addEventListener("cut", y),
                  s.addEventListener("compositionstart", C),
                  s.addEventListener("compositionend", S),
                  s.addEventListener("beforeinput", A),
                  s.addEventListener("focusout", P),
                  t.addEventListener("touchend", T),
                  t.addEventListener("mousedown", T),
                  t.addEventListener("mouseup", x);
                const r = n.onStateChanged(() => {
                  d();
                });
                return () => {
                  s.removeEventListener("input", w),
                    s.removeEventListener("keydown", E),
                    s.removeEventListener("copy", v),
                    s.removeEventListener("cut", y),
                    s.removeEventListener("compositionstart", C),
                    s.removeEventListener("compositionend", S),
                    s.removeEventListener("beforeinput", A),
                    s.removeEventListener("focusout", P),
                    t.removeEventListener("mousedown", T),
                    t.removeEventListener("mouseup", x),
                    t.removeEventListener("touchend", T),
                    r();
                };
              }
              function f() {
                null !== s.parentElement &&
                  (s.focus(), p() || setTimeout(() => s.focus(), 0));
              }
              function p() {
                return s.getRootNode().activeElement === s;
              }
              function m(e) {
                return [...e].length;
              }
              function g(e) {
                const t = e.selectionEnd ?? e.selectionStart ?? 0;
                return m(e.value.substring(0, t));
              }
              function v(e) {
                try {
                  const r = t.getSelectedText();
                  "" !== r &&
                    e.clipboardData &&
                    (e.clipboardData.setData("text/plain", r),
                    e.preventDefault());
                } catch (e) {
                  console.error(e);
                }
              }
              function y(e) {
                try {
                  const r = t.getSelectedText();
                  if ("" !== r && e.clipboardData) {
                    e.clipboardData.setData("text/plain", r),
                      e.preventDefault();
                    const n = {
                      key: 44,
                      characters: "",
                      shiftIsHeld: !1,
                      commandIsHeld: !1,
                      optionIsHeld: !1,
                      timestamp: Date.now(),
                    };
                    t.execute("ubq/inputs/keyboardkey", n);
                  }
                } catch (e) {
                  console.error(e);
                }
              }
              async function b() {
                return (
                  !(!i || r.unstable_isTextCursorInCompositionRange()) &&
                  (await S(), !0)
                );
              }
              function w(e) {
                const r = e.target,
                  { value: n } = r;
                if (i) {
                  const e = g(s);
                  t.execute("ubq/text/compositionUpdate", {
                    value: n,
                    cursorPosition: e,
                  });
                } else n.length > 0 && (r.value = "");
              }
              function _(e) {
                const r = {
                  key: 255,
                  characters: e,
                  shiftIsHeld: !1,
                  commandIsHeld: !1,
                  optionIsHeld: !1,
                  timestamp: Date.now(),
                };
                t.execute("ubq/inputs/keyboardkey", r);
              }
              async function E(e) {
                if (
                  (b(),
                  1 === e.key.length && (a = e.key),
                  "a" === e.key && (e.metaKey || e.ctrlKey))
                )
                  return (
                    i && S(), void (await t.execute("ubq/text/selectAllText"))
                  );
                if ("Escape" === e.key) return void B();
                if (
                  "Backspace" !== e.key &&
                  "Delete" !== e.key &&
                  "ArrowLeft" !== e.key &&
                  "ArrowRight" !== e.key &&
                  "ArrowUp" !== e.key &&
                  "ArrowDown" !== e.key &&
                  "Enter" !== e.key
                )
                  return;
                const r = Sl(e);
                await t.execute("ubq/inputs/keyboardkey", r),
                  e.currentTarget && (s.value = "");
              }
              async function C() {
                (i = !0), await t.execute("ubq/text/compositionStart");
              }
              async function S() {
                i
                  ? ((i = !1),
                    (s.value = ""),
                    t.execute("ubq/text/compositionEnd"))
                  : (s.value = "");
              }
              async function k() {
                if (!i) return;
                o();
                if (await b()) return;
                const e = r.unstable_getCursorPosition(),
                  t = r.unstable_getCompositionRange(),
                  n = e.end - t.start,
                  a = g(s);
                e.start >= t.start && e.start <= 1 + t.end && n !== a && S();
              }
              async function x() {
                k();
              }
              async function T(t) {
                k(),
                  t.target === e &&
                    "Text" === n.getEditMode() &&
                    (f(), t.preventDefault());
              }
              async function A(e) {
                if ((i && !e.isComposing && S(), null === e.data)) return;
                const r = e.target,
                  n = e.data;
                if (await b()) _(a);
                else if (i) {
                  const e = m(n);
                  t.execute("ubq/text/compositionUpdate", {
                    value: n,
                    cursorPosition: e,
                  });
                } else n.length > 0 && ("\n" !== n[0] && _(n), (r.value = ""));
              }
              function P(e) {
                if (R(e.relatedTarget) && F(e.relatedTarget));
                else {
                  L(e);
                }
              }
              function F(t) {
                const r = new CustomEvent("cesdk-blur", {
                  composed: !0,
                  bubbles: !0,
                  cancelable: !0,
                  detail: t,
                });
                return e.dispatchEvent(r);
              }
              function L(t) {
                const r = new CustomEvent("cesdk-refocus", {
                    composed: !0,
                    bubbles: !0,
                    cancelable: !0,
                    detail: t.relatedTarget,
                  }),
                  n = e.dispatchEvent(r);
                return n && f(), n;
              }
              function R(e) {
                return (
                  null != e &&
                  e instanceof HTMLElement &&
                  (e instanceof HTMLTextAreaElement ||
                    (e instanceof HTMLInputElement &&
                      e.type.match("^(text|number|url|email|search|tel)$")) ||
                    e.isContentEditable)
                );
              }
              async function B() {
                n.setEditMode("Transform");
              }
            }
          })());
  });
  return () => {
    a?.(), s();
  };
};
function Xl(e, t, r) {
  const n = [],
    o = (r) => {
      if ("touch" === r.pointerType) return;
      const n = Yl(e, r);
      t.execute("ubq/inputs/mousemove", n);
    },
    i = (o) => {
      if ("touch" === o.pointerType) return;
      const i = {
        ...Yl(e, o),
        button: Kl(o.button),
        state: 0,
        shiftIsHeld: !!o.shiftKey,
      };
      (n[o.button] = !1),
        o.currentTarget.releasePointerCapture(o.pointerId),
        t.execute("ubq/inputs/mousebutton", i),
        r();
    },
    a = (r) => {
      if ("touch" === r.pointerType) return;
      const o = {
        ...Yl(e, r),
        button: Kl(r.button),
        state: 1,
        shiftIsHeld: !!r.shiftKey,
      };
      (n[r.button] = !0),
        r.currentTarget.setPointerCapture(r.pointerId),
        t.execute("ubq/inputs/mousebutton", o);
    },
    s = (r) => {
      if ("touch" === r.pointerType) return;
      const o = { ...Yl(e, r), shiftIsHeld: !!r.shiftKey };
      n.forEach((e, r) => {
        if (e) {
          const e = { ...o, button: r, state: 0 };
          t.execute("ubq/inputs/mousebutton", e);
        }
      }),
        (n.length = 0);
    },
    u = (e) => {
      e.cancelable && e.preventDefault();
    };
  return (
    e.addEventListener("pointerdown", a),
    e.addEventListener("pointerup", i),
    e.addEventListener("pointercancel", i),
    e.addEventListener("pointermove", o),
    e.addEventListener("lostpointercapture", s),
    e.addEventListener("touchmove", u, { passive: !1 }),
    () => {
      e.removeEventListener("pointerdown", a),
        e.removeEventListener("pointerup", i),
        e.removeEventListener("pointercancel", i),
        e.removeEventListener("pointermove", o),
        e.removeEventListener("lostpointercapture", s),
        e.removeEventListener("touchmove", u),
        (e = null);
    }
  );
}
function Yl(e, t) {
  const r = e.getBoundingClientRect(),
    n = r?.top ?? 0,
    o = r?.left ?? 0;
  return {
    position: {
      x: (t.clientX - o) * window.devicePixelRatio,
      y: (t.clientY - n) * window.devicePixelRatio,
    },
    isTouch: !1,
    timestamp: t.timeStamp,
  };
}
function Kl(e) {
  switch (e) {
    case 0:
      return 0;
    case 1:
      return 2;
    case 2:
      return 1;
    default:
      return 255;
  }
}
var Zl = class {
    ubq;
    enabled;
    initialTarget;
    target;
    dispose;
    constructor(e, t) {
      (this.ubq = t),
        (this.enabled = cl(e.editor.onSettingsChanged, () => {
          const t = e.editor.getSettingBool("mouse/enableZoom"),
            r = e.editor.getSettingBool("mouse/enableScroll");
          return t || r;
        })),
        (this.target = il(() => {})),
        (this.dispose = () => {
          this.target.update(void 0),
            (this.target = null),
            (this.enabled = null),
            (this.ubq = null),
            (this.initialTarget = null),
            (e = null),
            (t = null);
        });
    }
    initialize(e) {
      let t;
      this.initialTarget = e;
      const r = tl(
        this.enabled.subscribe,
        this.target.subscribe
      )(() => {
        t?.(), (t = void 0);
        const e = this.target.value();
        this.enabled.value() && e && (t = this.addWheelListener(e));
      });
      this.target.update(e);
      return () => {
        r(), t?.();
      };
    }
    setTarget(e) {
      this.target.update(e);
      return () => {
        this.target.update(this.initialTarget);
      };
    }
    addWheelListener(e) {
      const t = (e) => {
        if (!this.initialTarget) throw new Error("initialTarget is not set");
        const t = {
          ...Yl(this.initialTarget, e),
          deltaX: e.deltaX,
          deltaY: e.deltaY,
          deltaMode: e.deltaMode,
          shiftIsHeld: !!e.shiftKey,
          ctrlOrMetaIsHeld: !!e.ctrlKey || !!e.metaKey,
        };
        this.ubq.mouseWheel(t) && (e.stopPropagation(), e.preventDefault());
      };
      e.addEventListener("wheel", t, { passive: !1, capture: !0 });
      return () => {
        e.removeEventListener("wheel", t, { capture: !0 }), (e = null);
      };
    }
  },
  Ql = class {
    active = !1;
    enableDebug = !1;
    timestamp = 0;
    baseTouches = [];
    touches = [];
    currentTransform;
    constructor() {
      this.currentTransform = this.emptyTransform();
    }
    touchAddRemove(e) {
      const t = new Array(e.touches.length);
      for (let r = 0; r < e.touches.length; r++) {
        const n = e.touches.item(r);
        t[r] = Jl(n);
      }
      this.touches = t;
    }
    touchUpdate(e) {
      for (let t = 0; t < e.touches.length; t++) {
        const r = e.touches.item(t),
          n = this.touches.find((e) => e.identifier === r.identifier);
        if (!n) return;
        (n.x = r.clientX), (n.y = r.clientY);
      }
    }
    listen(e) {
      return (
        e.addEventListener("touchstart", this.touchstart, { passive: !0 }),
        e.addEventListener("touchend", this.touchend),
        e.addEventListener("touchcancel", this.touchcancel),
        e.addEventListener("touchmove", this.touchmove, { passive: !0 }),
        () => {
          e.removeEventListener("touchstart", this.touchstart),
            e.removeEventListener("touchend", this.touchend),
            e.removeEventListener("touchcancel", this.touchcancel),
            e.removeEventListener("touchmove", this.touchmove);
        }
      );
    }
    touchstart = (e) => {
      this.touchAddRemove(e),
        (this.timestamp = e.timeStamp),
        this.process("touchstart");
    };
    touchend = (e) => {
      this.touchAddRemove(e),
        (this.timestamp = e.timeStamp),
        this.process("touchend");
    };
    touchcancel = (e) => {
      this.touchAddRemove(e),
        (this.timestamp = e.timeStamp),
        this.process("touchcancel");
    };
    touchmove = (e) => {
      this.touchUpdate(e),
        (this.timestamp = e.timeStamp),
        this.process("touchmove");
    };
    debugState;
    debug() {
      if (!this.enableDebug) return;
      const e = JSON.stringify(this.currentTransform);
      function t(e, [t, r, n], o) {
        const i = document.createElement("div");
        return (
          (i.style.position = "fixed"),
          (i.style.top = "-25px"),
          (i.style.left = "-25px"),
          (i.style.width = "50px"),
          (i.style.height = "50px"),
          (i.style.border = `3px ${o} rgb(${t},${r},${n})`),
          (i.style.borderRadius = "50%"),
          (i.style.borderStyle = o),
          (i.style.backgroundColor = `rgba(${t},${r},${n}, 0.5)`),
          (i.style.transformOrigin = "center"),
          (i.style.textAlign = "center"),
          (i.innerHTML = e),
          (i.style.display = "none"),
          document.body.appendChild(i),
          i
        );
      }
      this.debugState ||
        (this.debugState = {
          touches: [
            t("T1", [218, 212, 104], "solid"),
            t("T2", [218, 212, 104], "solid"),
          ],
          value: this.debugValueDiv(void 0, e, this.touches, [218, 212, 104]),
          baseTouches: [
            t("B1", [128, 128, 128], "solid"),
            t("B2", [128, 128, 128], "solid"),
          ],
        }),
        (this.debugState.touches[0].style.display = this.touches[0]
          ? "block"
          : "none"),
        (this.debugState.touches[1].style.display = this.touches[1]
          ? "block"
          : "none"),
        (this.debugState.baseTouches[0].style.display = this.baseTouches[0]
          ? "block"
          : "none"),
        (this.debugState.baseTouches[1].style.display = this.baseTouches[1]
          ? "block"
          : "none"),
        this.touches[0] &&
          (this.debugState.touches[0].style.transform = `translate(${this.touches[0]?.x}px, ${this.touches[0]?.y}px)`),
        this.touches[1] &&
          (this.debugState.touches[1].style.transform = `translate(${this.touches[1]?.x}px, ${this.touches[1]?.y}px)`),
        this.baseTouches[0] &&
          (this.debugState.baseTouches[0].style.transform = `translate(${this.baseTouches[0]?.x}px, ${this.baseTouches[0]?.y}px)`),
        this.baseTouches[1] &&
          (this.debugState.baseTouches[1].style.transform = `translate(${this.baseTouches[1]?.x}px, ${this.baseTouches[1]?.y}px)`),
        (this.debugState.value = this.debugValueDiv(
          this.debugState.value,
          e,
          this.touches
        ));
    }
    debugValueDiv(e, t, r, n) {
      if (!e) {
        const [t, r, o] = n ?? [128, 128, 128];
        ((e = document.createElement("div")).style.position = "fixed"),
          (e.style.top = "50px"),
          (e.style.left = "50px"),
          (e.style.width = "300px"),
          (e.style.height = "100px"),
          (e.style.border = `3px solid rgb(${t},${r},${o})`),
          (e.style.borderStyle = "dashed"),
          (e.style.backgroundColor = `rgba(${t},${r},${o}, 0.5)`),
          (e.style.transformOrigin = "center"),
          (e.style.overflow = "visible"),
          (e.style.textOverflow = "visible"),
          (e.style.display = "none"),
          document.body.appendChild(e);
      }
      return (
        this.active
          ? (e.style.borderStyle = "solid")
          : (e.style.borderStyle = "dashed"),
        0 === r.length
          ? ((e.style.display = "none"), e)
          : ((e.style.display = "block"), (e.innerHTML = t), e)
      );
    }
    resetBaseTouches() {
      this.baseTouches = this.touches.map(Jl);
    }
    process(e) {
      if ("touchcancel" === e)
        return (
          this.resetBaseTouches(), this.reset(), this.debug(), void this.emit(2)
        );
      ("touchstart" !== e && "touchend" !== e) ||
        (this.resetBaseTouches(), this.debug()),
        !this.active &&
          this.shouldStart() &&
          ((this.active = !0), this.emit(0)),
        "touchmove" === e &&
          ((this.currentTransform = this.calculateTransform()),
          this.active && this.emit(1)),
        this.debug(),
        this.active &&
          this.shouldStop() &&
          ((this.active = !1), this.emit(2), this.reset());
    }
    shouldStart() {
      return 2 === this.touches.length;
    }
    shouldStop() {
      return 2 !== this.touches.length;
    }
    emit(e) {
      const t = {
          timestamp: this.timestamp,
          state: e,
          touchPoints: this.touches,
        },
        r = this.makeEvent(t);
      for (const e of this.handlers) e(r);
    }
    handlers = new Set();
    addListener(e) {
      return (
        this.handlers.add(e),
        () => {
          this.handlers.delete(e);
        }
      );
    }
    reset() {
      (this.active = !1), (this.currentTransform = this.emptyTransform());
    }
  };
function Jl(e) {
  if (null != e)
    return e instanceof Touch
      ? { identifier: e.identifier, x: e.clientX, y: e.clientY }
      : { identifier: e.identifier, x: e.x, y: e.y };
}
var ed = class _PanRecognizer extends Ql {
  static PAN_THRESHOLD = 10;
  makeEvent(e) {
    const t = 0 === e.state ? { x: 0, y: 0 } : this.currentTransform;
    return { ...e, panDistance: t };
  }
  calculateTransform() {
    const e = rd(this.touches),
      t = rd(this.baseTouches);
    return { x: e.x - t.x, y: e.y - t.y };
  }
  emptyTransform() {
    return { x: 0, y: 0 };
  }
  shouldStart() {
    return (
      super.shouldStart() &&
      td(this.calculateTransform()) > _PanRecognizer.PAN_THRESHOLD
    );
  }
};
function td(e) {
  return Math.sqrt(e.x ** 2 + e.y ** 2);
}
function rd(e) {
  let t = 0,
    r = 0;
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    (t += o.x), (r += o.y);
  }
  return (t /= e.length), (r /= e.length), { x: t, y: r };
}
var nd = class _PinchRecognizer extends Ql {
    static PINCH_THRESHOLD = 0.2;
    makeEvent(e) {
      return { ...e, scale: this.currentTransform };
    }
    calculateTransform() {
      const e = this.baseTouches,
        t = this.touches;
      if (2 !== e.length || 2 !== t.length) return 1;
      const r = Math.sqrt(
        Math.pow(e[0].x - e[1].x, 2) + Math.pow(e[0].y - e[1].y, 2)
      );
      return (
        Math.sqrt(Math.pow(t[0].x - t[1].x, 2) + Math.pow(t[0].y - t[1].y, 2)) /
        r
      );
    }
    emptyTransform() {
      return 1;
    }
    shouldStart() {
      return (
        super.shouldStart() &&
        Math.abs(this.calculateTransform() - 1) >
          _PinchRecognizer.PINCH_THRESHOLD
      );
    }
  },
  od = class _PointRecognizer extends Ql {
    static DISTANCE_THRESHOLD = 5;
    static TAP_MAX_TIME = 250;
    lastPosition = { x: 0, y: 0 };
    makeEvent(e) {
      const t = this.tapDetected ? this.tapLocation : e.touchPoints[0];
      return 0 === e.state
        ? ((this.lastPosition = t),
          {
            button: 0,
            state: 1,
            position: t,
            shiftIsHeld: !1,
            isTouch: !0,
            timestamp: e.timestamp,
          })
        : 2 === e.state
        ? {
            button: 0,
            state: 0,
            position: t ?? this.lastPosition,
            shiftIsHeld: !1,
            isTouch: !0,
            timestamp: e.timestamp,
          }
        : ((this.lastPosition = t),
          { position: t, isTouch: !0, timestamp: e.timestamp });
    }
    previousNumTouches = 0;
    fingerDownTimestamp = 0;
    tapDetected = !1;
    tapLocation = { x: 0, y: 0 };
    process(e) {
      if ("touchstart" === e || "touchend" === e) {
        this.tapDetected = !1;
        const e = 1 === this.touches.length && 0 === this.previousNumTouches,
          t = 0 === this.touches.length && 1 === this.previousNumTouches;
        e &&
          ((this.fingerDownTimestamp = performance.now()),
          (this.tapLocation = this.touches[0])),
          t &&
            performance.now() - this.fingerDownTimestamp <
              _PointRecognizer.TAP_MAX_TIME &&
            (this.tapDetected = !0),
          (this.previousNumTouches = this.touches.length);
      }
      super.process(e);
    }
    calculateTransform() {
      if (0 === this.touches.length || 0 === this.baseTouches.length)
        return { x: 0, y: 0 };
      const e = this.touches[0],
        t = this.baseTouches[0];
      return { x: e.x - t.x, y: e.y - t.y };
    }
    emptyTransform() {
      return { x: 0, y: 0 };
    }
    shouldStart() {
      return (
        this.tapDetected ||
        (1 === this.touches.length &&
          td(this.calculateTransform()) > _PointRecognizer.DISTANCE_THRESHOLD)
      );
    }
    shouldStop() {
      return 1 !== this.touches.length;
    }
  },
  id = class _RotateRecognizer extends Ql {
    static ROTATE_THRESHOLD = 0.1;
    makeEvent(e) {
      return { ...e, rotation: this.currentTransform };
    }
    calculateTransform() {
      const e = this.baseTouches,
        t = this.touches;
      if (e.length < 2 || t.length < 2) return 0;
      const r = Math.atan2(e[1].y - e[0].y, e[1].x - e[0].x);
      return Math.atan2(t[1].y - t[0].y, t[1].x - t[0].x) - r;
    }
    emptyTransform() {
      return 0;
    }
    shouldStart() {
      return (
        super.shouldStart() &&
        Math.abs(this.calculateTransform()) > _RotateRecognizer.ROTATE_THRESHOLD
      );
    }
  };
function ad(e, t, r) {
  const n = [],
    o = new od();
  n.push(o.listen(e)),
    n.push(
      o.addListener((n) => {
        "button" in n
          ? (t.execute("ubq/inputs/mousebutton", sd(e, n)), r.update())
          : t.execute("ubq/inputs/mousemove", sd(e, n));
      })
    );
  const i = new ed();
  n.push(i.listen(e)),
    n.push(
      i.addListener((r) => {
        t.execute("ubq/inputs/touchpan", sd(e, r));
      })
    );
  const a = new nd();
  n.push(a.listen(e)),
    n.push(
      a.addListener((r) => {
        t.execute("ubq/inputs/touchpinch", sd(e, r));
      })
    );
  const s = new id();
  return (
    n.push(s.listen(e)),
    n.push(
      s.addListener((r) => {
        t.execute("ubq/inputs/touchrotate", sd(e, r));
      })
    ),
    () => {
      n.forEach((e) => e());
    }
  );
}
function sd(e, t) {
  const r = window.devicePixelRatio ?? 1,
    { top: n, left: o } = e.getBoundingClientRect();
  if (1 === r && 0 === n && 0 === o) return t;
  const i = (e) => ({ x: (e.x - o) * r, y: (e.y - n) * r });
  if ("position" in t) return { ...t, position: i(t.position) };
  const a = t.touchPoints.map(i);
  return "panDistance" in t
    ? { ...t, touchPoints: a, panDistance: i(t.panDistance) }
    : { ...t, touchPoints: a };
}
function ud(e, t, r = Number.EPSILON) {
  return Math.abs(e - t) < r;
}
var cd = "assets/core/worker-host-v1.37.0.js",
  ld = "application/javascript";
var dd,
  hd,
  fd = { Info: "Info", Warning: "Warning", Error: "Error" };
((hd = dd || (dd = {})).start = function (e) {
  return { ...e, msg: "exportVideo" };
}),
  (hd.abort = function () {
    return { msg: "exportVideoAbort" };
  }),
  (hd.finished = function (e) {
    return { ...e, msg: "exportVideoFinished" };
  }),
  (hd.error = function (e) {
    return { ...e, msg: "exportVideoError" };
  }),
  (hd.progress = function (e) {
    return { ...e, msg: "exportVideoProgress" };
  }),
  (hd.log = function (e) {
    return { ...e, msg: "exportLog" };
  });
var pd = class {
  configuration;
  constructor(e) {
    this.configuration = e;
  }
  async exportVideo(e, t, r, n, o) {
    const { abortSignal: i, inactivityTimeout: a } = n ?? {},
      s = await (async function (e) {
        const t = cd.toString().split("/").pop(),
          r = await (async function (e) {
            if (
              !(e = e.toString()).includes("://") ||
              e.includes(window.location.origin)
            )
              return e;
            const t = `const _importScripts = importScripts;\n     const _fixImports = (url) => new URL(url, '${new URL(
              e
            ).href
              .split("/")
              .slice(0, -1)
              .join(
                "/"
              )}/').href;\n     importScripts = (...urls) => _importScripts(...urls.map(_fixImports));`;
            return URL.createObjectURL(
              new Blob([`${t}importScripts("${e}")`], { type: ld })
            );
          })(new URL(t, e.core.baseURL));
        return new Worker(r);
      })(this.configuration),
      u = (function (e) {
        return {
          baseURL: e.baseURL,
          license: e.license,
          core: e.core,
          role: e.role,
          presets: e.presets,
          featureFlags: e.featureFlags,
          forceWebGL1: e.forceWebGL1,
          audioOutput: e.audioOutput,
        };
      })(this.configuration),
      c = new Promise((e, t) => {
        if (
          ((s.onmessage = ({ data: r }) => {
            if ("exportVideoFinished" === r.msg) {
              const t = new Blob([r.data], { type: r.mimeType });
              e(t);
            } else
              "exportVideoError" === r.msg
                ? t(r.error)
                : "exportVideoProgress" === r.msg
                ? n?.onProgress?.(
                    r.renderedFrames,
                    r.encodedFrames,
                    r.totalFrames
                  )
                : "exportLog" === r.msg
                ? this.configuration.logger(r.message, r.logLevel)
                : console.error("Unknown message received ", r);
          }),
          i)
        ) {
          let e = !1;
          const t = () => {
            e || ((e = !0), s.postMessage(dd.abort()));
          };
          i.addEventListener("abort", t, { once: !0 });
        }
      });
    s.postMessage(
      dd.start({
        sceneString: e,
        engineSettings: t,
        config: u,
        exportOptions: r,
        workerOptions: o,
        inactivityTimeout: a,
      })
    );
    const l = () => {
      s.postMessage({
        msg: "setVisibility",
        visible: "visible" === document.visibilityState,
      });
    };
    document.addEventListener("visibilitychange", l);
    try {
      return await c;
    } finally {
      s.terminate(), document.removeEventListener("visibilitychange", l);
    }
  }
};
var md = 10;
globalThis.ubq_browserTabHidden = !0;
var gd = {
  value: () =>
    "undefined" == typeof document || "visible" === document.visibilityState,
  subscribe(e) {
    if ("undefined" == typeof document) return () => {};
    {
      const t = () => {
        e("visible" === document.visibilityState);
      };
      return (
        document.addEventListener("visibilitychange", t),
        () => {
          document.removeEventListener("visibilitychange", t);
        }
      );
    }
  },
};
function vd(e, t, r) {
  return async (n, o, i, a) => {
    const s = t.scene.get();
    if (null == s || !t.block.isValid(s))
      throw new Error("No valid scene available.");
    const u = await t.scene.saveToString([
        "blob",
        "bundle",
        "file",
        "http",
        "https",
        "buffer",
      ]),
      c = (function (e) {
        const t = new Map(),
          r = e.findAllSettings();
        for (const n of r)
          switch (e.getSettingType(n)) {
            case "Bool":
              t.set(n, e.getSettingBool(n));
              break;
            case "Int":
              t.set(n, e.getSettingInt(n));
              break;
            case "Float":
              t.set(n, e.getSettingFloat(n));
              break;
            case "String":
              t.set(n, e.getSettingString(n));
              break;
            case "Color":
              t.set(n, e.getSettingColor(n));
              break;
            case "Enum":
              t.set(n, e.getSettingEnum(n));
          }
        return t;
      })(t.editor),
      l = r(),
      d = t.editor.getActiveLicense(),
      h = {
        scopes: Object.fromEntries(
          t.editor.findAllScopes().map((e) => [e, t.editor.getGlobalScope(e)])
        ),
        uriResolver: t.editor.unstable_getURIResolver()?.toString(),
      };
    try {
      h.trackingMetadata = t.editor.getTrackingMetadata();
    } catch {
      h.trackingMetadata = void 0;
    }
    h.buffers = t.editor.cloneBuffers();
    const f = {
      block: n,
      width: a.targetWidth,
      height: a.targetHeight,
      duration: a.duration,
      framerate: a.framerate,
      h264Level: a.h264Level,
      h264Profile: a.h264Profile,
      videoBitrate: a.videoBitrate,
      audioBitrate: a.audioBitrate,
      timeOffset: a.timeOffset,
    };
    if (e.featureFlags?.exportWorker ?? 1) {
      return new pd({ ...e, license: d }).exportVideo(
        u,
        c,
        f,
        { abortSignal: a.abortSignal, inactivityTimeout: l, onProgress: i },
        h
      );
    }
    return (async function (e, t, r, n, o, i) {
      let a,
        s,
        u = 0,
        c = null;
      const l = i.visibility ?? gd,
        d = i.inactivityTimeout,
        h = l.subscribe(() => {
          null !== c && (c = Date.now()),
            (globalThis.ubq_browserTabHidden = !l.value());
        });
      let f = null;
      function p() {
        clearTimeout(s), h(), f?.();
      }
      try {
        let h = function () {
          !0 === l.value() && null !== c && Date.now() - c > d
            ? a(new Error("Video export timed out due to inactivity."))
            : (u < md && g.update(), (s = setTimeout(h, 1)));
        };
        const m = new OffscreenCanvas(64, 64),
          g = await Ul(m, { ...e, audioOutput: "none" }),
          v = new SceneAPI(g),
          y = new BlockAPI(g),
          b = new EditorAPI(g);
        if (
          ((f = () => {
            g.delete();
          }),
          (function (e, t) {
            for (const [r, n] of t)
              switch (e.getSettingType(r)) {
                case "Bool":
                  e.setSettingBool(r, n);
                  break;
                case "Int":
                  e.setSettingInt(r, n);
                  break;
                case "Float":
                  e.setSettingFloat(r, n);
                  break;
                case "String":
                  e.setSettingString(r, n);
                  break;
                case "Color":
                  e.setSettingColor(r, n);
                  break;
                case "Enum": {
                  const t = r,
                    o = n;
                  e.setSettingEnum(t, o);
                }
              }
          })(b, t),
          o?.trackingMetadata && b.setTrackingMetadata(o.trackingMetadata),
          o?.uriResolver)
        ) {
          let e = function (e, r) {
            try {
              return t(e, r);
            } catch (t) {
              return (
                console.warn(
                  `Error during execution of URI resolver: ${t}.\nMake sure the url resolver function does not reference any external variables. Falling back to default URI resolver.`
                ),
                r(e)
              );
            }
          };
          const t = (0, eval)(`'use strict';(${o.uriResolver})`);
          b.setURIResolver(e);
        }
        if (o?.scopes)
          for (const [e, t] of Object.entries(o.scopes)) b.setGlobalScope(e, t);
        o?.buffers && b.restoreBuffers(o.buffers);
        const w = await v.loadFromString(r),
          _ = n.block
            ? y.getDuration(n.block)
            : y.getTotalSceneDuration(v.get());
        h();
        const E = await new Promise((t, r) => {
            (a = r),
              e.abortSignal?.addEventListener("abort", () => {
                r(new Error("AbortSignal received"));
              }),
              g.exportVideoToBuffer(
                n.block ?? w,
                n.timeOffset ?? 0,
                n.duration ?? _,
                ir.Mp4,
                (e, t, r) => {
                  (u = e - t), (c = Date.now()), i?.onProgress?.(e, t, r);
                },
                (e) => {
                  "error" in e ? r(e.error) : t(e);
                },
                {
                  h264Profile: n.h264Profile ?? 77,
                  h264Level: n.h264Level ?? 52,
                  framerate: n.framerate ?? 30,
                  videoBitrate: n.videoBitrate ?? 0,
                  audioBitrate: n.audioBitrate ?? 0,
                  useTargetSize: void 0 !== n.width && void 0 !== n.height,
                  targetWidth: n.width ?? 0,
                  targetHeight: n.height ?? 0,
                }
              );
          }),
          C = new Uint8Array(E.byteLength);
        return C.set(E), p(), C;
      } catch (e) {
        throw (p(), e);
      }
    })(a.abortSignal ? { ...e, abortSignal: a.abortSignal } : e, c, u, f, h, {
      onProgress: i,
      visibility: wd,
      inactivityTimeout: l,
    }).then((e) => new Blob([e], { type: ir.Mp4 }));
  };
}
var yd,
  bd,
  wd = {
    value: () => "visible" === document.visibilityState,
    subscribe: el(
      ((yd = document),
      (bd = "visibilitychange"),
      function (e) {
        return (
          yd.addEventListener(bd, e),
          function () {
            yd.removeEventListener(bd, e);
          }
        );
      }),
      Kc(() => "visible" === document.visibilityState)
    ),
  },
  CreativeEngine = class {
    asset;
    block;
    editor;
    event;
    scene;
    variable;
    reactor;
    #u;
    #c;
    #l;
    #d;
    #e;
    #h;
    #f = [];
    constructor(e, t, r) {
      (this.#e = e),
        (this.#h = new kl(e)),
        (this.asset = new AssetAPI(e)),
        (this.block = new BlockAPI(e)),
        (this.editor = new EditorAPI(e)),
        (this.event = new EventAPI(e)),
        (this.scene = new SceneAPI(e)),
        (this.variable = new VariableAPI(e)),
        (this.#d = new Zl(this, e)),
        this.#f.push(this.#d.dispose);
      const n = new Vl();
      this.reactor = n;
      const o = [
          n.decorateObject(this.#h),
          n.decorateObject(this.block),
          n.decorateObject(this.editor),
          n.decorateObject(this.scene),
          n.decorateObject(this.variable),
        ],
        i = this.addPostUpdateCallback(n.updateDirtyReactions.bind(n));
      this.#f.push(() => {
        o.forEach((e) => e()), i(), this.reactor.dispose();
      }),
        (this.block.exportVideo = vd(
          r,
          { block: this.block, scene: this.scene, editor: this.editor },
          () => this._unstable_videoExportInactivityTimeout
        )),
        "getInternalCanvas" in t
          ? ((this.#c = t.getInternalCanvas()), (this.#l = t))
          : (this.#c = t),
        (this.#u = new ll(this)),
        this.#p(),
        "undefined" != typeof window &&
          window.Cypress &&
          ((this.config = r), (this.legacyAPI = this.#h));
    }
    addPlugin(e) {
      if (e.initialize) {
        const t = {
          engine: {
            asset: this.asset,
            block: this.block,
            scene: this.scene,
            editor: this.editor,
            event: this.event,
            variable: this.variable,
          },
        };
        e.initialize(t);
      }
    }
    unstable_setVideoExportInactivityTimeout(e) {
      this._unstable_videoExportInactivityTimeout = e;
    }
    _unstable_videoExportInactivityTimeout = 1e4;
    #m() {
      if (!this.#l) return;
      const e = this.#l.getInternalCanvas(),
        t = e.getBoundingClientRect();
      if (0 === t.width || 0 === t.height) return;
      const r = "undefined" != typeof window ? window.devicePixelRatio : 1,
        n = t.width * r,
        o = t.height * r;
      e.width !== n && (e.width = n), e.height !== o && (e.height = o);
    }
    #g() {
      const { width: e, height: t } = this.#c,
        r = "undefined" != typeof window ? window.devicePixelRatio : 1,
        { height: n, width: o, pixelRatio: i } = this.#u.settings.value();
      if (!ud(o, e, 1e-4) || !ud(n, t, 1e-4) || !ud(i, r, 1e-4)) {
        this.#u.settings.update({ height: t, width: e, pixelRatio: r });
        const n = this.scene.get();
        if (
          !ud(i, r, 1e-4) &&
          null !== n &&
          !1 === this.scene.isZoomAutoFitEnabled(n)
        ) {
          const e = this.scene.getZoomLevel();
          this.scene.setZoomLevel(e * (r / i));
        }
      }
    }
    #v = [];
    #y = [];
    addPostUpdateCallback(e) {
      return (
        this.#v.push(e),
        () => {
          const t = this.#v.indexOf(e);
          -1 !== t && this.#v.splice(t, 1);
        }
      );
    }
    addPreUpdateCallback(e) {
      return (
        this.#y.push(e),
        () => {
          const t = this.#y.indexOf(e);
          -1 !== t && this.#y.splice(t, 1);
        }
      );
    }
    #b;
    #p(e = !0) {
      this.#w(e), this.#_();
    }
    #w(e = !0) {
      let t,
        r = !1,
        n = 0;
      if (this.#b) return;
      const o = () => {
        if (((this.#b = requestAnimationFrame(o)), !r))
          try {
            this.#E(e), (n = 0);
          } catch (e) {
            throw (
              (n++,
              n >= 10 &&
                (console.error(
                  "Repeated exceptions in update loop. Stopping loop."
                ),
                t?.(),
                this.#C()),
              e)
            );
          }
      };
      this.#b = requestAnimationFrame(o);
    }
    #_() {
      if (
        ((e = this.#c),
        !(
          "undefined" != typeof HTMLCanvasElement &&
          e instanceof HTMLCanvasElement
        ))
      )
        return;
      var e;
      const t = this.#l ?? this.#c,
        r = this.#E.bind(this, !1),
        n = [
          Xl(t, this.#h, r),
          this.#d.initialize(t),
          Gl(t, this.#h, this.#e, this.editor, r),
          Wl(t, this.editor),
          ad(t, this.#h, this.#e),
          Cl(this.#c, this.#e, () => {
            this.#c.width = this.#c.width;
          }),
          Gc(t, this.#S),
        ];
      this.#k = () => {
        n.reverse().forEach((e) => e());
      };
    }
    setWheelEventTarget(e) {
      return this.#d.setTarget(e);
    }
    #S = (0, Et.default)(
      function () {
        this.#E();
      }.bind(this),
      100,
      { leading: !0, trailing: !1 }
    );
    #k;
    #C() {
      this.#k?.(),
        (this.#k = void 0),
        this.#b && (cancelAnimationFrame(this.#b), (this.#b = 0));
    }
    #E(e = !0) {
      for (const e of this.#y) e();
      if (e) {
        1 === this.block.findByType("scene").length && this.#x();
      }
      this.#m(), this.#g(), this.#e.update();
      for (const e of this.#v) e();
    }
    #x() {
      if (this.#u.clampCamera) {
        const e = {
          sceneSize: { x: 0, y: 0 },
          scrollPercentage: { x: NaN, y: NaN },
        };
        this.#h
          .execute("cesdk/clampCameraAndRender", {
            horizontalPaddingInPixels: this._camera.viewportPadding.value().x,
            verticalPaddingInPixels: this._camera.viewportPadding.value().y,
          })
          .then(
            (e) => {
              (0, Ct.default)(this.#u.clampResult.value(), e) ||
                this.#u.clampResult.update(e);
            },
            () => {
              (0, Ct.default)(this.#u.clampResult.value(), e) ||
                this.#u.clampResult.update(e);
            }
          );
      } else this.#h.execute("ubq/render");
    }
    get element() {
      return this.#l;
    }
    dispose() {
      this.#f.forEach((e) => e()),
        this.#C(),
        this.asset.dispose(),
        (this.#c = null),
        this.#l?.dispose(),
        (this.#l = void 0),
        (this.block = null),
        (this.scene = null),
        (this.variable = null),
        (this.asset = null),
        (this.editor = null),
        (this.event = null),
        (this.#v.length = 0),
        this.#h.dispose(),
        (this.#h = null),
        this.#e.delete(),
        (this.#e = null);
    }
    static async init(e, t) {
      let r = (function (e, t) {
        if (r(t?.canvas)) return t?.canvas;
        if (r(e))
          return (
            console.warn(
              "Passing an existing HTMLCanvasElement as a second parameter to CreativeEngine.init() is deprecated. Use the element property on the CreativeEngine instance to access a fully managed canvas to append into the DOM instead. For more information, have a look into our documentation at https://img.ly/docs/cesdk/next/engine/quickstart/#initialization."
            ),
            e
          );
        return;
        function r(e) {
          return (
            ("undefined" != typeof OffscreenCanvas &&
              e instanceof OffscreenCanvas) ||
            ("undefined" != typeof HTMLCanvasElement &&
              e instanceof HTMLCanvasElement)
          );
        }
      })(t, e);
      const n = "0aacf25c06e",
        o = "1.37.0";
      if (n || o) {
        const e = ["[CreativeEngine]"];
        o && e.push(`v${o}`),
          n && e.push(`Revision ${n}`),
          console.log(e.join(" "));
      }
      let i;
      r ||
        ((i = (function () {
          customElements.get("cesdk-canvas") ||
            customElements.define(
              "cesdk-canvas",
              class HTMLCreativeEngineCanvasElement extends HTMLElement {
                #c;
                constructor() {
                  super(), (this.#c = document.createElement("canvas"));
                  const e = document.createElement("style");
                  (e.textContent =
                    ":host {display: block; width: 100%; height: 100%; contain: content;} canvas {position: absolute; inset: 0; width: 100%; height:100%; display: block; touch-action: none;}"),
                    this.attachShadow({ mode: "closed" }).append(e, this.#c);
                }
                getInternalCanvas() {
                  if (!this.#c)
                    throw new Error("Internal canvas element is undefined");
                  return this.#c;
                }
                dispose() {
                  this.#c?.remove(), (this.#c = void 0);
                }
                clear() {
                  if (!this.#c) return;
                  const e = this.#c.width;
                  (this.#c.width = 1), (this.#c.width = e);
                }
              }
            );
          return document.createElement("cesdk-canvas");
        })()),
        (r = i.getInternalCanvas()));
      const a = fl(vl(El, e));
      if (
        !(function (e) {
          return !0 === e?._skipConfigWarnings;
        })(e)
      )
        for (const t of ml(El, e)) a.logger(t, "Warning");
      const s = new this(await Ul(r, a), i ?? r, a);
      return gl(El, a, s), s;
    }
    async addDefaultAssetSources({
      baseURL: e = "https://cdn.img.ly/assets/v3",
      excludeAssetSourceIds: t = [],
    } = {}) {
      return Nc(this.asset, e, t);
    }
    async addDemoAssetSources({
      baseURL: e = "https://cdn.img.ly/assets/demo/v2",
      excludeAssetSourceIds: t = [],
      sceneMode: r = "Design",
      withUploadAssetSources: n = !1,
    } = {}) {
      return Wc(this.asset, this.scene, t, r, n, void 0, e);
    }
    get _camera() {
      return this.#u;
    }
    get _legacyApi() {
      return this.#h;
    }
  };
var _d = function () {
    try {
      if (
        "object" == typeof WebAssembly &&
        "function" == typeof WebAssembly.instantiate
      ) {
        const e = new WebAssembly.Module(
          Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0)
        );
        if (e instanceof WebAssembly.Module)
          return new WebAssembly.Instance(e) instanceof WebAssembly.Instance;
      }
    } catch (e) {
      return console.error(e), !1;
    }
    return !1;
  },
  Ed = 1e4,
  Cd = 1e6,
  Sd = 8;
async function kd() {
  if ("undefined" == typeof window) throw new Error("Window is undefined");
  if (
    !(
      "VideoFrame" in window &&
      "VideoDecoder" in window &&
      "VideoEncoder" in window
    )
  )
    throw new Error("Missing required web video APIs");
  const e = {
    codec: "avc1.4D0034",
    width: 1920,
    height: 1080,
    avc: { format: "annexb" },
    framerate: 30,
  };
  if (!(await VideoEncoder.isConfigSupported(e)))
    throw new Error("Encoder config not supported");
  const t = new OffscreenCanvas(e.width, e.height),
    r = t.getContext("webgl2");
  if (!r) throw new Error("Could not create WebGL2 context");
  return (
    r.clearColor(1, 0, 1, 1),
    r.clear(r.COLOR_BUFFER_BIT),
    new Promise((r, n) => {
      setTimeout(() => {
        n(new Error("Timed out during video export"));
      }, Ed);
      const o = new VideoEncoder({ output: () => r(!0), error: (e) => n(e) });
      o.configure(e);
      for (let r = 0; r < Sd; ++r) {
        const n = new VideoFrame(t, {
          timestamp: r * (Cd / e.framerate),
          duration: Cd / e.framerate,
        });
        o.encode(n, { keyFrame: !0 }), n.close();
      }
      o.flush().then(
        () => {
          "closed" !== o.state && o.close();
        },
        (e) => {
          n(new Error(`Error during video export: ${e}`));
        }
      );
    })
  );
}
async function xd() {
  if ("undefined" == typeof window) throw new Error("Window is undefined");
  if (!("AudioDecoder" in window && "AudioEncoder" in window))
    throw new Error("Missing required web audio APIs");
  const e = {
    codec: "mp4a.40.02",
    sampleRate: 48e3,
    numberOfChannels: 2,
    bitrate: 128e3,
  };
  if (!(await AudioEncoder.isConfigSupported(e)))
    throw new Error("Encoder config not supported");
  return new Promise((t, r) => {
    setTimeout(() => {
      r(new Error("Timed out during audio export"));
    }, Ed);
    const n = new AudioEncoder({ output: () => t(!0), error: r });
    n.configure(e);
    const o = 1024,
      i = new Float32Array(o * e.numberOfChannels);
    for (let e = 0; e < o; ++e) {
      const t = e / o;
      (i[2 * e + 0] = Math.sin(880 * Math.PI * t)),
        (i[2 * e + 1] = Math.sin(888 * Math.PI * t));
    }
    for (let t = 0; t < 10; ++t) {
      const r = new AudioData({
        format: "f32",
        sampleRate: e.sampleRate,
        numberOfFrames: o,
        numberOfChannels: e.numberOfChannels,
        timestamp: ((t * o) / e.sampleRate) * Cd,
        data: i,
      });
      n.encode(r), r.close();
    }
    n.flush().then(
      () => {
        "closed" !== n.state && n.close();
      },
      (e) => {
        r(new Error(`Error during audio export: ${e}`));
      }
    );
  });
}
function Td() {
  if ("undefined" == typeof window) return !1;
  return (
    "VideoFrame" in window &&
    "VideoDecoder" in window &&
    "VideoEncoder" in window &&
    "AudioDecoder" in window &&
    "AudioEncoder" in window
  );
}
function Ad() {
  return Promise.all([kd(), xd()]).then(
    (e) => e.every((e) => e),
    () => !1
  );
}
var Pd,
  Fd,
  Ld = function () {
    try {
      const e = !0,
        t = !0,
        r = "globalThis" in window,
        n = "BigInt" in window,
        o = "allSettled" in Promise,
        i = "matchAll" in String.prototype,
        a = CSS.supports("contain: content"),
        s =
          "MediaRecorder" in window &&
          "pause" in window.MediaRecorder.prototype,
        u = CSS.supports("color: lab(29.2345% 39.3825 20.0664)");
      return _d() && e && t && r && n && o && i && a && s && u;
    } catch {
      return !1;
    }
  };
((Fd = Pd || (Pd = {})).combineLatest = nl),
  (Fd.fan = Jc),
  (Fd.makeSource = Yc),
  (Fd.map = Kc),
  (Fd.memo = Qc),
  (Fd.merge = tl),
  (Fd.pipe = el),
  (Fd.startWith = Zc),
  (Fd.switchAll = rl);
export {
  fd as LogLevel,
  ir as MimeType,
  pd as WorkerClient,
  gl as _applyFallback,
  sl as _getBlockStream,
  fl as _initWithDefaults,
  cl as _makeEngineChannel,
  il as _makeValueChannel,
  ul as _memoizeResult,
  vl as _migrateConfigObject,
  Pd as _streams,
  ml as _warnKeys,
  CreativeEngine as default,
  dl as defaultLogger,
  ur as isCMYKColor,
  ar as isRGBAColor,
  sr as isSpotColor,
  hl as normalizeBaseURL,
  Ld as supportsBrowser,
  Td as supportsVideo,
  Ad as supportsVideoExport,
  _d as supportsWasm,
};
