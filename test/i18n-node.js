var number = function (value, offset) {
  if (isNaN(value)) throw new Error("'" + value + "' isn't a number.");
  return value - (offset || 0);
};
var plural = function (value, offset, lcfunc, data, isOrdinal) {
  if ({}.hasOwnProperty.call(data, value)) return data[value]();
  if (offset) value -= offset;
  var key = lcfunc(value, isOrdinal);
  if (key in data) return data[key]();
  return data.other();
};
var select = function (value, data) {
  if ({}.hasOwnProperty.call(data, value)) return data[value]();
  return data.other()
};
var pluralFuncs = {
  en: function (n, ord) {
    var s = String(n).split('.'), v0 = !s[1], t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1), n100 = t0 && s[0].slice(-2);
    if (ord) return (n10 == 1 && n100 != 11) ? 'one'
        : (n10 == 2 && n100 != 12) ? 'two'
        : (n10 == 3 && n100 != 13) ? 'few'
        : 'other';
    return (n == 1 && v0) ? 'one' : 'other';
  }
};
var fmt = {};

module.exports = {
  "components/form": {
    textboxCounterLeftCount: function(d) { return "You have " + plural(d.CHARACTERS_LEFT, 0, pluralFuncs.en, { one: function() { return "1 character";}, zero: function() { return "no characters";}, other: function() { return number(d.CHARACTERS_LEFT) + " characters";} }) + " left"; },
    textboxCounterOverCount: function(d) { return "You are " + plural(d.CHARACTERS_OVER, 0, pluralFuncs.en, { one: function() { return "1 character";}, other: function() { return number(d.CHARACTERS_OVER) + " characters";} }) + " over the limit"; }
  },
  "desktop/desktop": {
    header: function(d) { return "Desktop"; }
  },
  "desktop/prevent-double-click": {
    header: function(d) { return "Prevent Double Click"; },
    button1: function(d) { return "test"; },
    button2: function(d) { return "Prevent Double Click Other Buttons"; }
  },
  "desktop/with-resolves": {
    header: function(d) { return "With Resolves"; }
  },
  "menu/menu": {
    desktop: function(d) { return "Desktop"; },
    preventDoubleClick: function(d) { return "Prevent Double Click"; },
    withResolves: function(d) { return "With Resolves"; }
  }
}
