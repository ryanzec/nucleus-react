(function(G){G['i18n']={lc:{"en":function(n){return n===1?"one":"other"}},
c:function(d,k){if(!d)throw new Error("MessageFormat: Data required for '"+k+"'.")},
n:function(d,k,o){if(isNaN(d[k]))throw new Error("MessageFormat: '"+k+"' isn't a number.");return d[k]-(o||0)},
v:function(d,k){i18n.c(d,k);return d[k]},
p:function(d,k,o,l,p){i18n.c(d,k);return d[k] in p?p[d[k]]:(k=i18n.lc[l](d[k]-o),k in p?p[k]:p.other)},
s:function(d,k,p){i18n.c(d,k);return d[k] in p?p[d[k]]:p.other}}
i18n["components/character-counter"]={
"charactersLeft":function(d){return "You have "+i18n.p(d,"CHARACTERS_LEFT",0,"en",{"one":"1 character","other":i18n.n(d,"CHARACTERS_LEFT")+" characters"})+" left"},
"charactersOver":function(d){return "You are "+i18n.p(d,"CHARACTERS_OVER",0,"en",{"one":"1 character","other":i18n.n(d,"CHARACTERS_OVER")+" characters"})+" over the limit"}}
})(this);
