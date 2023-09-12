import { css } from '@emotion/react';

export default class MiscStyleHelper {
  public a_base = css`
    a {
      color: inherit;
      text-decoration: none;
    }
  `;

  public readonly cursor_pnt = css({ cursor: 'pointer' });
}
