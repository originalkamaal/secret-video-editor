export class PercentageHelper {
  static isPercentageSlider(e, t) {
    return Math.abs(e) <= 1 && Math.abs(t) <= 1 && e !== t;
  }
  static isSymmetricalPercentageSlider(e, t) {
    const n = 0 !== e && 0 !== t, s = Math.abs(e) === Math.abs(t);
    return this.isPercentageSlider(e, t) && n && s;
  }
  static valueToPercentage = (e, t, n) => {
    const s = (s) => (e - t) / ((n - t) / s);
    return this.isSymmetricalPercentageSlider(t, n) ? s(200) - 100 : s(100);
  };
  static percentageToValue = (e, t, n) => this.isSymmetricalPercentageSlider(t, n)
    ? ((n - t) / 200) * (e + 100) + t
    : ((n - t) / 100) * e + t;
  static stepFromMinMax = (e, t) => this.isSymmetricalPercentageSlider(e, t) ? (t - e) / 200 : (t - e) / 100;
}
