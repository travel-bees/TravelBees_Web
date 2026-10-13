/** Image helpers — swap this file for your CMS media URLs later. */

export const px = (id: number, w = 1200, h?: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}${h ? `&h=${h}` : ""}`;

export const pxSrcSet = (id: number, h?: number) =>
  [480, 768, 1080, 1440, 1920].map((w) => `${px(id, w, h)} ${w}w`).join(", ");
