import { css } from '@emotion/react';

export default class DefaultStyleHelper {
  public p = (value: number) => css({ padding: `${value}rem` });
  public px = (value: number) =>
    css({ paddingLeft: `${value}rem`, paddingRight: `${value}rem` });
  public py = (value: number) =>
    css({ paddingTop: `${value}rem`, paddingBottom: `${value}rem` });
  public pt = (value: number) => css({ paddingTop: `${value}rem` });
  public pb = (value: number) => css({ paddingBottom: `${value}rem` });
  public pl = (value: number) => css({ paddingLeft: `${value}rem` });
  public pr = (value: number) => css({ paddingRight: `${value}rem` });

  public border = (value: number) => css({ border: `${value}rem` });
  public rounded = (value: number) => css({ borderRadius: `${value}rem` });
  public border_color = (value: string) => css({ borderColor: value });
  public border_st = (
    value: 'solid' | 'dashed' | 'dotted' | 'double' | 'hidden' | 'none',
  ) => css({ borderStyle: value });

  public m = (value: number) => css({ margin: `${value}rem` });
  public mx = (value: number) =>
    css({ marginLeft: `${value}rem`, marginRight: `${value}rem` });
  public my = (value: number) =>
    css({ marginTop: `${value}rem`, marginBottom: `${value}rem` });
  public mt = (value: number) => css({ marginTop: `${value}rem` });
  public mb = (value: number) => css({ marginBottom: `${value}rem` });
  public ml = (value: number) => css({ marginLeft: `${value}rem` });
  public mr = (value: number) => css({ marginRight: `${value}rem` });

  public w = (value: number) => css({ width: `${value}rem` });
  public wp = (value: number) => css({ width: `${value}%` });
  public readonly w_full = css({ width: '100%' });
  public readonly w_screen = css({ width: '100vw' });
  public readonly w_min = css({ width: 'min-content' });
  public readonly w_max = css({ width: 'max-content' });
  public readonly w_fit = css({ width: 'fit-content' });

  public h = (value: number) => css({ height: `${value}rem` });
  public hp = (value: number) => css({ height: `${value}%` });
  public readonly h_full = css({ height: '100%' });
  public readonly h_screen = css({ height: '100vw' });
  public readonly h_min = css({ height: 'min-content' });
  public readonly h_max = css({ height: 'max-content' });
  public readonly h_fit = css({ height: 'fit-content' });
}
