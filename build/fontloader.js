function loadFont(a,b,c){function d(d,j){var k="sans-serif",l=h.createElement("div"),m=l.style;l.innerHTML="AsdfQwerMXox159",m.fontFamily=k,m.fontWeight=d,m.fontSize="14px",m.fontStyle=j,m.position="absolute",m.left="-9999px",e(function(){h.body.appendChild(l);var d=l.clientWidth;m.fontFamily=a+","+k,e(function j(){l.clientWidth===d?e(j):--f||(h.body.removeChild(l),localStorage[g]=b,i.className+=" "+c)})})}var e=window.requestAnimationFrame||function(a){setTimeout(a,16)},f=0,g="-font-"+a,h=document,i=h.documentElement;if(localStorage[g]===""+b)return i.className+=" "+c;for(var j=0,k=b.length;k>j;j++){var l=(""+b[j]).split("-"),m=l[0]||400,n=l[1]||"normal";f++,d(m,n)}}