/** Image helpers — supports Pexels photo IDs as numbers and custom image paths/imports as strings. */

export const px = (id: number | string, w = 1200, h?: number) => {
  if (typeof id === "string") return id;
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}${h ? `&h=${h}` : ""}`;
};

export const pxSrcSet = (id: number | string, h?: number) => {
  if (typeof id === "string") return undefined;
  return [480, 768, 1080, 1440, 1920].map((w) => `${px(id, w, h)} ${w}w`).join(", ");
};
