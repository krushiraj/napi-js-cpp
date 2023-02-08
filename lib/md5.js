function func0(abcd) {
  const a = abcd[1] >>> 0;
  const b = abcd[2] >>> 0;
  const c = abcd[3] >>> 0;
  let val = (a & b) | (~a & 0xffffffff & c);
  val = val >>> 0;
  return val;
}

function func1(abcd) {
  const a = abcd[3] >>> 0;
  const b = abcd[1] >>> 0;
  const c = abcd[2] >>> 0;
  const val = (a & b) | (~a & 0xffffffff & c);
  return val >>> 0;
}

function func2(abcd) {
  const a = abcd[1] >>> 0;
  const b = abcd[2] >>> 0;
  const c = abcd[3] >>> 0;
  const val = a ^ b ^ c;
  return val >>> 0;
}

function func3(abcd) {
  const a = abcd[2] >>> 0;
  const b = abcd[1] >>> 0;
  const c = abcd[3] >>> 0;
  const val = a ^ (b | (~c & 0xffffffff));
  return val >>> 0;
}

function calctable(k) {
  let s, pwr;
  pwr = Math.pow(2, 32);
  for (let i = 0; i < 64; i++) {
    s = Math.abs(Math.sin(1.0 + i));
    k[i] = (s * pwr) >>> 0;
  }
  return k;
}

function rol(r, N) {
  const mask1 = (1 << N) - 1;
  return ((r >>> (32 - N)) & mask1) | ((r << N) & (~mask1 & 0xffffffff));
}

function int32(value) {
  this.value = value >>> 0;
}

int32.prototype.add = function (other) {
  return new int32((this.value + other.value) >>> 0);
};

function algorithmsHashMD5(msg, mlen) {
  var h0 = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];
  var ff = [func0, func1, func2, func3];
  var M = [1, 5, 3, 7];
  var O = [0, 1, 5, 0];
  var rot0 = [7, 12, 17, 22];
  var rot1 = [5, 9, 14, 20];
  var rot2 = [4, 11, 16, 23];
  var rot3 = [6, 10, 15, 21];
  var rots = [rot0, rot1, rot2, rot3];
  var kspace = [];
  var k = null;

  var h = [];
  var abcd = [];
  var fctn;
  var m, o, g;
  var f;
  var rotn;
  var mm = { w: [], b: [] };
  var os = 0;
  var grp, grps, q, p;
  var msg2;

  if (k === null) k = calctable(kspace);

  for (q = 0; q < 4; q++) {
    h[q] = h0[q];
  }

  grps = Math.floor(1 + (mlen + 8) / 64);
  msg2 = msg.split("");
  msg2[mlen] = String.fromCharCode(0x80);
  q = mlen + 1;
  while (q < 64 * grps) {
    msg2[q] = "\0";
    q++;
  }
  var u = { w: 0, b: [] };
  u.w = 8 * mlen;
  q -= 8;
  mlen = msg2.length;
  var slice2 = msg2.slice(q + 4, mlen);
  msg2 = msg2
    .slice(0, q)
    .concat(String.fromCharCode(u.w))
    .concat(
      slice2.some((char) => char !== "\0")
        ? slice2
        : Array(mlen - 1 - q).fill("\0")
    );

  for (grp = 0; grp < grps; grp++) {
    mm.b = msg2.slice(os, os + 64);
    for (q = 0; q < 4; q++) abcd[q] = h[q];
    for (p = 0; p < 4; p++) {
      fctn = ff[p];
      rotn = rots[p];
      m = M[p];
      o = O[p];
      for (q = 0; q < 16; q++) {
        g = (m * q + o) % 16;
        if (mm.w[g] === undefined) {
          mm.w[g] = [
            mm.b[4 * q],
            mm.b[4 * q + 1],
            mm.b[4 * q + 2],
            mm.b[4 * q + 3],
          ]
            .map((char) => ((char && char.charCodeAt(0)) || 0).toString(16))
            .reduce((a, b) => a + b, "");
          mm.w[g] = parseInt(
            (mm.w[g][6] || "") +
              (mm.w[g][7] || "") +
              (mm.w[g][4] || "") +
              (mm.w[g][5] || "") +
              (mm.w[g][2] || "") +
              (mm.w[g][3] || "") +
              (mm.w[g][0] || "") +
              (mm.w[g][1] || ""),
            16
          );
          mm.w[g] = mm.w[g] === NaN ? 0 : mm.w[g];
        }
        var w = new int32(abcd[0]);
        var x = new int32(fctn(abcd));
        var y = new int32(k[q + 16 * p]);
        var z = new int32(mm.w[g]);
        var wxyz = w.add(x).add(y).add(z).value;
        f = new int32(abcd[1]).add(new int32(rol(wxyz, rotn[q % 4]))).value;

        abcd[0] = abcd[3];
        abcd[3] = abcd[2];
        abcd[2] = abcd[1];
        abcd[1] = f;
      }
    }
    for (p = 0; p < 4; p++)
      h[p] = new int32(h[p]).add(new int32(abcd[p])).value;
    os += 64;
  }
  return h;
}

function padLeft(nr, n, str) {
  return Array(n - String(nr).length + 1).join(str || "0") + nr;
}

function getMD5String(msg) {
  var str = new String();
  var j;
  var d = algorithmsHashMD5(msg, msg.length);
  for (j = 0; j < 4; j++) {
    var hex = d[j].toString(16).padStart(8, "0");
    str +=
      hex[6] + hex[7] + hex[4] + hex[5] + hex[2] + hex[3] + hex[0] + hex[1];
  }

  return str;
}

module.exports = getMD5String;
