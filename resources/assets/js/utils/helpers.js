export function bem(string) {
  const obj = string.split("/");
  const baseClass = obj[0];
  let classString = baseClass;
  obj.map((className) => {
    if (className.includes(":")) {
      if (className[0] === ":") {
        classString = (className !== baseClass) ? `${classString} ${baseClass}${className}` : classString;
      } else {
        classString = (className !== baseClass) ? `${classString} ${baseClass}--${className}` : classString;
      }
    } else {
      classString = (className !== baseClass) ? `${classString} ${baseClass}--${className}` : classString;
    }
  });

  return classString;
}
