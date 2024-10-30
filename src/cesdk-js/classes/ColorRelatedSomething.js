import { Sf, sh, Of, Ff, Df, Rf, Vf, If, jf, Cf, kf, ih, qf, eh, ph, fh, $p, ah, oh, zp, hh, _f } from "../working";

export class ColorRelatedSomething {
  constructor(e, t = {}) {
    (this._options = Sf(t, e)),
      (this.rgb = sh(e)),
      this.updateHSL(),
      this.updateLab(),
      this.updateCMYK();
  }
  updateRGB() {
    this.rgb = { ...Of(this.hsl.H, this.hsl.S, this.hsl.L), A: this.hsl.A };
  }
  updateRGBFromCMYK() {
    this.rgb = {
      ...Ff(this.cmyk.C, this.cmyk.M, this.cmyk.Y, this.cmyk.K),
      A: this.rgb.A,
    };
  }
  updateRGBFromLab() {
    this.rgb = { ...Df(this.lab.L, this.lab.a, this.lab.b), A: this.rgb.A };
  }
  updateHSL() {
    this.hsl = Rf(this.rgb.R, this.rgb.G, this.rgb.B, this.rgb.A);
  }
  updateLab() {
    this.lab = { ...Vf(this.rgb.R, this.rgb.G, this.rgb.B), A: this.rgb.A };
  }
  updateCMYK() {
    this.cmyk = If(this.rgb.R, this.rgb.G, this.rgb.B);
  }
  setOptions(e = {}) {
    return (this._options = { ...this._options, ...e }), this;
  }
  setH(e) {
    return (
      (this.hsl.H = jf(e)),
      this.updateRGB(),
      this.updateLab(),
      this.updateCMYK(),
      this
    );
  }
  setS(e) {
    return (
      (this.hsl.S = Cf(e, 0, 100)),
      this.updateRGB(),
      this.updateLab(),
      this.updateCMYK(),
      this
    );
  }
  setL(e) {
    return (
      (this.hsl.L = Cf(e, 0, 100)),
      this.updateRGB(),
      this.updateLab(),
      this.updateCMYK(),
      this
    );
  }
  setR(e) {
    (this.rgb.R = Cf(e, 0, 255)),
      this.updateHSL(),
      this.updateLab(),
      this.updateCMYK();
  }
  setG(e) {
    return (
      (this.rgb.G = Cf(e, 0, 255)),
      this.updateHSL(),
      this.updateLab(),
      this.updateCMYK(),
      this
    );
  }
  setB(e) {
    return (
      (this.rgb.B = Cf(e, 0, 255)),
      this.updateHSL(),
      this.updateLab(),
      this.updateCMYK(),
      this
    );
  }
  setCIEL(e) {
    return (
      (this.lab.L = Cf(e, 0, 100)),
      this.updateRGBFromLab(),
      this.updateHSL(),
      this.updateCMYK(),
      this
    );
  }
  setCIEa(e) {
    return (
      (this.lab.a = Cf(e, -125, 125)),
      this.updateRGBFromLab(),
      this.updateHSL(),
      this.updateCMYK(),
      this
    );
  }
  setCIEb(e) {
    return (
      (this.lab.b = Cf(e, -125, 125)),
      this.updateRGBFromLab(),
      this.updateHSL(),
      this.updateCMYK(),
      this
    );
  }
  setA(e) {
    return (this.hsl.A = this.rgb.A = Cf(e, 0, 1)), this;
  }
  setC(e) {
    return (
      (this.cmyk.C = Cf(e, 0, 100)),
      this.updateRGBFromCMYK(),
      this.updateHSL(),
      this.updateLab(),
      this
    );
  }
  setM(e) {
    return (
      (this.cmyk.M = Cf(e, 0, 100)),
      this.updateRGBFromCMYK(),
      this.updateHSL(),
      this.updateLab(),
      this
    );
  }
  setY(e) {
    return (
      (this.cmyk.Y = Cf(e, 0, 100)),
      this.updateRGBFromCMYK(),
      this.updateHSL(),
      this.updateLab(),
      this
    );
  }
  setK(e) {
    return (
      (this.cmyk.K = Cf(e, 0, 100)),
      this.updateRGBFromCMYK(),
      this.updateHSL(),
      this.updateLab(),
      this
    );
  }
  get options() {
    return this._options;
  }
  get H() {
    return kf(this.hsl.H, this.options.decimals);
  }
  get S() {
    return kf(this.hsl.S, this.options.decimals);
  }
  get L() {
    return kf(this.hsl.L, this.options.decimals);
  }
  get CIEL() {
    return kf(this.lab.L, this.options.decimals);
  }
  get CIEa() {
    return kf(this.lab.a, this.options.decimals);
  }
  get CIEb() {
    return kf(this.lab.b, this.options.decimals);
  }
  get R() {
    return kf(this.rgb.R, this.options.decimals);
  }
  get G() {
    return kf(this.rgb.G, this.options.decimals);
  }
  get B() {
    return kf(this.rgb.B, this.options.decimals);
  }
  get A() {
    return kf(this.hsl.A, this.options.decimals);
  }
  get C() {
    return kf(this.cmyk.C, this.options.decimals);
  }
  get M() {
    return kf(this.cmyk.M, this.options.decimals);
  }
  get Y() {
    return kf(this.cmyk.Y, this.options.decimals);
  }
  get K() {
    return kf(this.cmyk.K, this.options.decimals);
  }
  get HEXObject() {
    return ih.HEX(this.rgb);
  }
  get HEXAObject() {
    return ih.HEXA(this.rgb);
  }
  get RGBObject() {
    return { R: this.R, G: this.G, B: this.B };
  }
  get RGBAObject() {
    return { ...this.RGBObject, A: this.A };
  }
  get HSLObject() {
    return { H: this.H, S: this.S, L: this.L };
  }
  get HSLAObject() {
    return { ...this.HSLObject, A: this.A };
  }
  get CIELabObject() {
    return { L: this.CIEL, a: this.CIEa, b: this.CIEb };
  }
  get CIELabAObject() {
    return { ...this.CIELabObject, A: this.A };
  }
  get CMYKObject() {
    return { C: this.C, M: this.M, Y: this.Y, K: this.K };
  }
  get CMYKAObject() {
    return { ...this.CMYKObject, A: this.A };
  }
  get HEX() {
    return qf.HEX({ R: this.R, G: this.G, B: this.B });
  }
  get HEXA() {
    return qf.HEX({ R: this.R, G: this.G, B: this.B, A: 255 * this.A });
  }
  get RGB() {
    return qf.RGB({ R: this.R, G: this.G, B: this.B }, this.options);
  }
  get RGBA() {
    return qf.RGB(
      { R: this.R, G: this.G, B: this.B, A: this.A },
      this.options
    );
  }
  get HSL() {
    return qf.HSL({ H: this.H, S: this.S, L: this.L }, this.options);
  }
  get HSLA() {
    return qf.HSL(
      { H: this.H, S: this.S, L: this.L, A: this.A },
      this.options
    );
  }
  get CIELab() {
    return qf.CIELab(
      { L: this.CIEL, a: this.CIEa, b: this.CIEb },
      this.options
    );
  }
  get CIELabA() {
    return qf.CIELab(
      { L: this.CIEL, a: this.CIEa, b: this.CIEb, A: this.A },
      this.options
    );
  }
  get CMYK() {
    return qf.CMYK(
      { C: this.C, M: this.M, Y: this.Y, K: this.K },
      this.options
    );
  }
  get CMYKA() {
    return qf.CMYK(
      { C: this.C, M: this.M, Y: this.Y, K: this.K, A: this.A },
      this.options
    );
  }
  static toHEXObject(e) {
    const t = eh(e);
    return ph(e, t, 0, ih.HEX);
  }
  static toHEX(e) {
    return qf.HEX(ColorRelatedSomething.toHEXObject(e));
  }
  static toHEXAObject(e) {
    const t = eh(e);
    return ph(e, t, 0, ih.HEXA);
  }
  static toHEXA(e) {
    return qf.HEX(ColorRelatedSomething.toHEXAObject(e));
  }
  static toRGBObject(e, t = {}) {
    const n = eh(e);
    return ph(e, n, t.decimals, ih.RGB);
  }
  static toRGB(e, t = {}) {
    const n = eh(e), s = Sf(t, e), i = ph(e, n, t.decimals, ih.RGB);
    return qf.RGB(i, s);
  }
  static toRGBAObject(e, t = {}) {
    const n = eh(e);
    return ph(e, n, t.decimals, ih.RGBA);
  }
  static toRGBA(e, t = {}) {
    const n = eh(e), s = Sf(t, e), i = ph(e, n, t.decimals, ih.RGBA);
    return qf.RGB(i, s);
  }
  static toHSLObject(e, t = {}) {
    const n = eh(e);
    return ph(e, n, t.decimals, ih.HSL);
  }
  static toHSL(e, t = {}) {
    const n = eh(e), s = Sf(t, e), i = ph(e, n, t.decimals, ih.HSL);
    return qf.HSL(i, s);
  }
  static toHSLAObject(e, t = {}) {
    const n = eh(e);
    return ph(e, n, t.decimals, ih.HSLA);
  }
  static toHSLA(e, t = {}) {
    const n = eh(e), s = Sf(t, e), i = ph(e, n, t.decimals, ih.HSLA);
    return qf.HSL(i, s);
  }
  static toCIELabObject(e, t = {}) {
    const n = eh(e);
    return ph(e, n, t.decimals, ih.CIELab);
  }
  static toCIELab(e, t = {}) {
    const n = eh(e), s = Sf(t, e), i = ph(e, n, t.decimals, ih.CIELab);
    return qf.CIELab(i, s);
  }
  static toCIELabAObject(e, t = {}) {
    const n = eh(e);
    return ph(e, n, t.decimals, ih.CIELabA);
  }
  static toCIELabA(e, t = {}) {
    const n = eh(e), s = Sf(t, e), i = ph(e, n, t.decimals, ih.CIELabA);
    return qf.CIELab(i, s);
  }
  static toCMYKObject(e, t = {}) {
    const n = eh(e);
    return ph(e, n, t.decimals, ih.CMYK);
  }
  static toCMYK(e, t = {}) {
    const n = eh(e), s = Sf(t, e), i = ph(e, n, t.decimals, ih.CMYK);
    return qf.CMYK(i, s);
  }
  static toCMYKAObject(e, t = {}) {
    const n = eh(e);
    return ph(e, n, t.decimals, ih.CMYKA);
  }
  static toCMYKA(e, t = {}) {
    const n = eh(e), s = Sf(t, e), i = ph(e, n, t.decimals, ih.CMYKA);
    return qf.CMYK(i, s);
  }
  static getBlendHEXObject(e, t, n = 5) {
    return fh(e, t, n, 0, ih.HEX);
  }
  static getBlendHEX(e, t, n = 5) {
    return ColorRelatedSomething.getBlendHEXObject(e, t, n).map((e) => qf.HEX(e));
  }
  static getBlendHEXAObject(e, t, n = 5) {
    return fh(e, t, n, 0, ih.HEXA);
  }
  static getBlendHEXA(e, t, n = 5) {
    return ColorRelatedSomething.getBlendHEXAObject(e, t, n).map((e) => qf.HEX(e));
  }
  static getBlendRGBObject(e, t, n, s) {
    return "number" == typeof n
      ? fh(e, t, n, s?.decimals, ih.RGB)
      : fh(e, t, 5, n?.decimals, ih.RGB);
  }
  static getBlendRGB(e, t, n, s) {
    return "number" == typeof n
      ? fh(e, t, n, s?.decimals, ih.RGB).map((n) => qf.RGB(n, Sf(s || {}, e, t))
      )
      : fh(e, t, 5, n?.decimals, ih.RGB).map((s) => qf.RGB(s, Sf(n || {}, e, t))
      );
  }
  static getBlendRGBAObject(e, t, n, s) {
    return "number" == typeof n
      ? fh(e, t, n, s?.decimals, ih.RGBA)
      : fh(e, t, 5, n?.decimals, ih.RGBA);
  }
  static getBlendRGBA(e, t, n, s) {
    return "number" == typeof n
      ? fh(e, t, n, s?.decimals, ih.RGBA).map((n) => qf.RGB(n, Sf(s || {}, e, t))
      )
      : fh(e, t, 5, n?.decimals, ih.RGBA).map((s) => qf.RGB(s, Sf(n || {}, e, t))
      );
  }
  static getBlendHSLObject(e, t, n, s) {
    return fh(e, t, "number" == typeof n ? n : 5, s?.decimals, ih.HSL);
  }
  static getBlendHSL(e, t, n, s) {
    return "number" == typeof n
      ? fh(e, t, n, s?.decimals, ih.HSL).map((n) => qf.HSL(n, Sf(s || {}, e, t))
      )
      : fh(e, t, 5, n?.decimals, ih.HSL).map((s) => qf.HSL(s, Sf(n || {}, e, t))
      );
  }
  static getBlendHSLAObject(e, t, n, s) {
    return "number" == typeof n
      ? fh(e, t, n, s?.decimals, ih.HSLA)
      : fh(e, t, 5, n?.decimals, ih.HSLA);
  }
  static getBlendHSLA(e, t, n, s) {
    return "number" == typeof n
      ? fh(e, t, n, s?.decimals, ih.HSLA).map((n) => qf.HSL(n, Sf(s || {}, e, t))
      )
      : fh(e, t, 5, n?.decimals, ih.HSLA).map((s) => qf.HSL(s, Sf(n || {}, e, t))
      );
  }
  static getBlendCIELabObject(e, t, n, s) {
    return "number" == typeof n
      ? fh(e, t, n, s?.decimals, ih.CIELab)
      : fh(e, t, 5, n?.decimals, ih.CIELab);
  }
  static getBlendCIELab(e, t, n, s) {
    return "number" == typeof n
      ? fh(e, t, n, s?.decimals, ih.CIELab).map((n) => qf.CIELab(n, Sf(s || {}, e, t))
      )
      : fh(e, t, 5, n?.decimals, ih.CIELab).map((s) => qf.CIELab(s, Sf(n || {}, e, t))
      );
  }
  static getBlendCIELabAObject(e, t, n, s) {
    return "number" == typeof n
      ? fh(e, t, n, s?.decimals, ih.CIELabA)
      : fh(e, t, 5, n?.decimals, ih.CIELabA);
  }
  static getBlendCIELabA(e, t, n, s) {
    return "number" == typeof n
      ? fh(e, t, n, s?.decimals, ih.CIELabA).map((n) => qf.CIELab(n, Sf(s || {}, e, t))
      )
      : fh(e, t, 5, n?.decimals, ih.CIELabA).map((s) => qf.CIELab(s, Sf(n || {}, e, t))
      );
  }
  static getMixHEXObject(e, t = $p.ADDITIVE) {
    return ah.HEX(e, t, false);
  }
  static getMixHEX(e, t = $p.ADDITIVE) {
    return ah.HEX(e, t, true);
  }
  static getMixHEXAObject(e, t = $p.ADDITIVE) {
    return ah.HEXA(e, t, false);
  }
  static getMixHEXA(e, t = $p.ADDITIVE) {
    return ah.HEXA(e, t, true);
  }
  static getMixRGBObject(e, t, n) {
    return "string" == typeof t
      ? ah.RGB(e, t, false, Sf(n || {}, ...e))
      : ah.RGB(e, $p.ADDITIVE, false, Sf(t || {}, ...e));
  }
  static getMixRGB(e, t, n) {
    return "string" == typeof t
      ? ah.RGB(e, t, true, Sf(n || {}, ...e))
      : ah.RGB(e, $p.ADDITIVE, true, Sf(t || {}, ...e));
  }
  static getMixRGBAObject(e, t, n) {
    return "string" == typeof t
      ? ah.RGBA(e, t, false, Sf(n || {}, ...e))
      : ah.RGBA(e, $p.ADDITIVE, false, Sf(t || {}, ...e));
  }
  static getMixRGBA(e, t, n) {
    return "string" == typeof t
      ? ah.RGBA(e, t, true, Sf(n || {}, ...e))
      : ah.RGBA(e, $p.ADDITIVE, true, Sf(t || {}, ...e));
  }
  static getMixHSLObject(e, t, n) {
    return "string" == typeof t
      ? ah.HSL(e, t, false, Sf(n || {}, ...e))
      : ah.HSL(e, $p.ADDITIVE, false, Sf(t || {}, ...e));
  }
  static getMixHSL(e, t, n) {
    return "string" == typeof t
      ? ah.HSL(e, t, true, Sf(n || {}, ...e))
      : ah.HSL(e, $p.ADDITIVE, true, Sf(t || {}, ...e));
  }
  static getMixHSLAObject(e, t, n) {
    return "string" == typeof t
      ? ah.HSLA(e, t, false, Sf(n || {}, ...e))
      : ah.HSLA(e, $p.ADDITIVE, false, Sf(t || {}, ...e));
  }
  static getMixHSLA(e, t, n) {
    return "string" == typeof t
      ? ah.HSLA(e, t, true, Sf(n || {}, ...e))
      : ah.HSLA(e, $p.ADDITIVE, true, Sf(t || {}, ...e));
  }
  static getMixCIELabObject(e, t, n) {
    return "string" == typeof t
      ? ah.CIELab(e, t, false, Sf(n || {}, ...e))
      : ah.CIELab(e, $p.ADDITIVE, false, Sf(t || {}, ...e));
  }
  static getMixCIELab(e, t, n) {
    return "string" == typeof t
      ? ah.CIELab(e, t, true, Sf(n || {}, ...e))
      : ah.CIELab(e, $p.ADDITIVE, true, Sf(t || {}, ...e));
  }
  static getMixCIELabAObject(e, t, n) {
    return "string" == typeof t
      ? ah.CIELabA(e, t, false, Sf(n || {}, ...e))
      : ah.CIELabA(e, $p.ADDITIVE, false, Sf(t || {}, ...e));
  }
  static getMixCIELabA(e, t, n) {
    return "string" == typeof t
      ? ah.CIELabA(e, t, true, Sf(n || {}, ...e))
      : ah.CIELabA(e, $p.ADDITIVE, true, Sf(t || {}, ...e));
  }
  static getShades(e, t, n) {
    return "number" == typeof t
      ? oh(e, t, true, Sf(n || {}, e))
      : oh(e, 5, true, Sf(t || {}, e));
  }
  static getTints(e, t, n) {
    return "number" == typeof t
      ? oh(e, t, false, Sf(n || {}, e))
      : oh(e, 5, false, Sf(t || {}, e));
  }
  static getHarmony(e, t, n, s) {
    return `${t}` in zp
      ? hh(t, e, _f(n) ? n : $p.ADDITIVE, Sf(_f(n) ? s || {} : n || {}, e))
      : _f(t)
        ? hh(zp.COMPLEMENTARY, e, t, Sf(n || {}, e))
        : hh(zp.COMPLEMENTARY, e, $p.ADDITIVE, Sf(t || {}, e));
  }
}
