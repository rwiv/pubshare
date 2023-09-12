import { css, keyframes } from '@emotion/react';

export default class AnimationHelper {
  public duration = (ms: number) => css({ transitionDuration: `${ms}ms` });

  public readonly animate_none = css({ animation: 'none' });

  public readonly animate_spin = css`
    animation: ${keyframes`
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    `} 1s linear infinite;
  `;

  public readonly animate_ping = css`
    animation: ${keyframes`
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    `} 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  `;

  public readonly animate_pulse = css`
    animation: ${keyframes`
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    `} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  `;

  public readonly animate_bounce = css`
    animation: ${keyframes`
      0%, 100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
      50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
    `} 1s infinite;
  `;
}
