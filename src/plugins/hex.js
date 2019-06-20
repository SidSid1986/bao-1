var writeUTF = function (str, isGetBytes) {
  var back = [];
  var byteSize = 0;
  for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i);
      if (0x00 <= code && code <= 0x7f) {
          byteSize += 1;
          back.push(code);
      } else if (0x80 <= code && code <= 0x7ff) {
          byteSize += 2;
          back.push((192 | (31 & (code >> 6))));
          back.push((128 | (63 & code)))
      } else if ((0x800 <= code && code <= 0xd7ff)
          || (0xe000 <= code && code <= 0xffff)) {
          byteSize += 3;
          back.push((224 | (15 & (code >> 12))));
          back.push((128 | (63 & (code >> 6))));
          back.push((128 | (63 & code)))
      }
  }
  for (i = 0; i < back.length; i++) {
      back[i] &= 0xff;
  }
  if (isGetBytes) {
      return back
  }
  if (byteSize <= 0xff) {
      return [0, byteSize].concat(back);
  } else {
      return [byteSize >> 8, byteSize & 0xff].concat(back);
  }
}


var readUTF = function (arr) {
  if (typeof arr === 'string') {
      return arr;
  }
  var UTF = '', _arr = arr;
  for (var i = 0; i < _arr.length; i++) {
      var one = _arr[i].toString(2),
          v = one.match(/^1+?(?=0)/);
      if (v && one.length === 8) {
          var bytesLength = v[0].length;
          var store = _arr[i].toString(2).slice(7 - bytesLength);
          for (var st = 1; st < bytesLength; st++) {
              store += _arr[st + i].toString(2).slice(2)
          }
          UTF += String.fromCharCode(parseInt(store, 2));
          i += bytesLength - 1
      } else {
          UTF += String.fromCharCode(_arr[i])
      }
  }
  return UTF
}

var toUTF8Hex = function(str){
  var charBuf = writeUTF(str, true);
  var re = '';
  for(var i = 0; i < charBuf.length; i ++){
      var x = (charBuf[i] & 0xFF).toString(16);
      if(x.length === 1){
          x = '0' + x;
      }
      re += x;
  }
  return re;
}


var utf8HexToStr = function (str) {
  var buf = [];
  for(var i = 0; i < str.length; i += 2){
      buf.push(parseInt(str.substring(i, i+2), 16));
  }
  return readUTF(buf);
}

// if (!atob) {
//     var tableStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
//     var table = tableStr.split("");

//     atob = function (base64) {
//         if (/(=[^=]+|={3,})$/.test(base64)) throw new Error("String contains an invalid character");
//         base64 = base64.replace(/=/g, "");
//         var n = base64.length & 3;
//         if (n === 1) throw new Error("String contains an invalid character");
//         for (var i = 0, j = 0, len = base64.length / 4, bin = []; i < len; ++i) {
//             var a = tableStr.indexOf(base64[j++] || "A"), b = tableStr.indexOf(base64[j++] || "A");
//             var c = tableStr.indexOf(base64[j++] || "A"), d = tableStr.indexOf(base64[j++] || "A");
//             if ((a | b | c | d) < 0) throw new Error("String contains an invalid character");
//             bin[bin.length] = ((a << 2) | (b >> 4)) & 255;
//             bin[bin.length] = ((b << 4) | (c >> 2)) & 255;
//             bin[bin.length] = ((c << 6) | d) & 255;
//         };
//         return String.fromCharCode.apply(null, bin).substr(0, bin.length + n - 4);
//     };

//     btoa = function (bin) {
//         for (var i = 0, j = 0, len = bin.length / 3, base64 = []; i < len; ++i) {
//             var a = bin.charCodeAt(j++), b = bin.charCodeAt(j++), c = bin.charCodeAt(j++);
//             if ((a | b | c) > 255) throw new Error("String contains an invalid character");
//             base64[base64.length] = table[a >> 2] + table[((a << 4) & 63) | (b >> 4)] +
//                 (isNaN(b) ? "=" : table[((b << 2) & 63) | (c >> 6)]) +
//                 (isNaN(b + c) ? "=" : table[c & 63]);
//         }
//         return base64.join("");
//     };

// }

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}

function base64ToHex(str) {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
        var tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join(" ");
}
 
export default { hexString: toUTF8Hex, hexParser: utf8HexToStr, hexToBase64, base64ToHex }