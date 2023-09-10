import {Property} from "csstype";
import {css} from "@emotion/react";

export default class DesignHelper {

  public bg = (value: Property.BackgroundColor) => css({ backgroundColor: value });
  public color = (value: string) => css({ color: value });

  public readonly shadow = css`box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`;
  public readonly shadow_sm = css`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`;
  public readonly shadow_md = css`box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`;
  public readonly shadow_lg = css`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`;
  public readonly shadow_xl = css`box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`;
  public readonly shadow_2xl = css`box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)`;
  public readonly shadow_inner = css`box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)`;
  public readonly shadow_none = css`box-shadow: 0 0 #0000`;

}