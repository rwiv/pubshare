import { css } from '@emotion/react';
import { Property } from 'csstype';

export default class LayoutHelper {
  public readonly row = css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  });
  public readonly col = css({ display: 'flex', flexDirection: 'column' });

  public readonly box_border = css({ boxSizing: 'border-box' });
  public readonly box_content = css({ boxSizing: 'content-box' });

  public readonly static = css({ position: 'static' });
  public readonly fixed = css({ position: 'fixed' });
  public readonly absolute = css({ position: 'absolute' });
  public readonly relative = css({ position: 'relative' });
  public readonly sticky = css({ position: 'sticky' });

  /**
   * Justify-content
   */
  public jc = (value: Property.JustifyContent) =>
    css({ justifyContent: value });
}
