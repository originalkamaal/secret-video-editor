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
export var createLazyModule = (module, exportsCache) =>
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
  
export var cloneWithPrototypeAndProperties = (
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
export var createMetadataArray = (target) => [
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
export var assignMetadata = (metadata, target) =>
  definePropertyIfAbsent(target, getOrCreateSymbol("metadata"), metadata[3]);
export var executeInitializers = (
  initializers,
  flags,
  context,
  initialValue
) => {
  for (var o = 0, i = initializers[flags >> 1], a = i && i.length; o < a; o++)
    1 & flags
      ? i[o].call(context)
      : (initialValue = i[o].call(context, initialValue));
  return initialValue;
};
export var defineMember = (
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

var validatePropertyAccess = (targetObject, propertyDescriptor, action) =>
  propertyDescriptor.has(targetObject) || throwTypeError("Cannot " + action);
var isObjectMember = (object, member) =>
  Object(member) !== member
    ? throwTypeError('Cannot use the "in" operator on this value')
    : object.has(member);
var accessPrivateMethod = (target, method, result) => (
  validatePropertyAccess(target, method, "access private method"), result
);
export var defineGetter = (target, properties) => {
  for (var key in properties)
    Object.defineProperty(target, key, {
      get: properties[key],
      enumerable: !0,
    });
};
export var accessPrivateField = (instance, fieldDescriptor, fallback) => (
  validatePropertyAccess(instance, fieldDescriptor, "read from private field"),
  fallback ? fallback.call(instance) : fieldDescriptor.get(instance)
);
export var addPrivateMember = (instance, privateMembersSet, value) =>
  privateMembersSet.has(instance)
    ? throwTypeError("Cannot add the same private member more than once")
    : privateMembersSet instanceof WeakSet
    ? privateMembersSet.add(instance)
    : privateMembersSet.set(instance, value);
export var writePrivateField = (target, property, value, setter) => (
  validatePropertyAccess(target, property, "write to private field"),
  setter ? setter.call(target, value) : property.set(target, value),
  value
);
export var defineProperty = (target, propertyKey, value) =>
  definePropertyIfAbsent(
    target,
    "symbol" != typeof propertyKey ? propertyKey + "" : propertyKey,
    value
  );
export function hasCurrentProperty(obj) {
  return (
    obj &&
    "object" == typeof obj &&
    Object.prototype.hasOwnProperty.call(obj, "current")
  );
}
