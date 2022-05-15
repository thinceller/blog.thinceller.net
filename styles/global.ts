import { css } from '@emotion/react';

export const globalStyles = css`
  /**
   * This will hide the focus indicator if the element receives focus    via the mouse,
   * but it will still show up on keyboard focus.
   */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }

  /**
   * Headings anchor link
   */
  .header-anchor-link {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-100%, 20%);
    padding-right: 4px;
  }

  h1 .header-anchor-link svg,
  h2 .header-anchor-link svg,
  h3 .header-anchor-link svg,
  h4 .header-anchor-link svg,
  h5 .header-anchor-link svg,
  h6 .header-anchor-link svg {
    fill: currentColor;
    visibility: hidden;
  }

  h1:hover .header-anchor-link svg,
  h2:hover .header-anchor-link svg,
  h3:hover .header-anchor-link svg,
  h4:hover .header-anchor-link svg,
  h5:hover .header-anchor-link svg,
  h6:hover .header-anchor-link svg {
    visibility: visible;
  }
`;
