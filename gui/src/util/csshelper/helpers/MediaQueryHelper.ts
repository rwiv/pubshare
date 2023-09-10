export default class MediaQueryHelper {

  private bp = [ 576, 768, 992, 1200, 1400 ];
  private mq = this.bp.map(bp => `@media (min-width: ${bp}px)`);

  public df = (ratio: number) => ({ width: `${this.ratioToPercent(ratio)}%` });
  public sm = (ratio: number) => this.getMediaQuery(0, this.ratioToPercent(ratio));
  public md = (ratio: number) => this.getMediaQuery(1, this.ratioToPercent(ratio));
  public lg = (ratio: number) => this.getMediaQuery(2, this.ratioToPercent(ratio));
  public xl = (ratio: number) => this.getMediaQuery(3, this.ratioToPercent(ratio));
  public xxl = (ratio: number) => this.getMediaQuery(4, this.ratioToPercent(ratio));

  public dfp = (percent: number) => ({ width: `${percent}%` });
  public smp = (percent: number) => this.getMediaQuery(0, percent);
  public mdp = (percent: number) => this.getMediaQuery(1, percent);
  public lgp = (percent: number) => this.getMediaQuery(2, percent);
  public xlp = (percent: number) => this.getMediaQuery(3, percent);
  public xxlp = (percent: number) => this.getMediaQuery(4, percent);

  private getMediaQuery(idx: number, percent: number) {
    return {
      [this.mq[idx]]: {
        width: `${percent}%`
      }
    }
  }

  private ratioToPercent(ratio: number) {
    switch (ratio) {
      case 0: return 0
      case 1: return 8.33333333
      case 2: return 16.66666667
      case 3: return 25
      case 4: return 33.33333333
      case 5: return 41.66666667
      case 6: return 50
      case 7: return 58.33333333
      case 8: return 66.66666667
      case 9: return 75
      case 10: return 83.33333333
      case 11: return 91.66666667
      case 12: return 100
      default: return 0
    }
  }
}