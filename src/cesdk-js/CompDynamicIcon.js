import { f$ } from "./working";
import { IconUpload } from "./icons/IconUpload.jsx";
import { Pq, yq } from "./icons/Icons";
import { IconPhoto } from "./icons/IconPhoto.jsx";
import { IconPlayOutline } from "./icons/IconPlayOutline.jsx";
import { IconFontT } from "./icons/IconFontT.jsx";
import { IconSticker } from "./icons/IconSticker.jsx";
import { IconShapes } from "./icons/IconShapes.jsx";
import { IconElementLayers } from "./icons/IconElementLayers.jsx";
import { IconMusic } from "./icons/IconMusic.jsx";
import { Rq, Oq } from "./vh";
import { Vq } from "./reacts";

export var CompDynamicIcon = function ({ id: e, iconSize: t, customIcon: n }) {
  if (n) return (0, Vq.jsx)(f$, { iconSize: t, customIcon: n });
  switch (e) {
    case "@imgly/Template":
    case "ly.img.video.template":
    case "ly.img.template":
      return "large" === t
        ? (0, Vq.jsx)(Pq, { className: Rq })
        : (0, Vq.jsx)(Pq, { className: Oq });
    case "@imgly/Image":
    case "ly.img.image":
      return "large" === t
        ? (0, Vq.jsx)(IconPhoto, { className: Rq })
        : (0, Vq.jsx)(IconPhoto, { className: Oq });
    case "@imgly/Video":
    case "ly.img.video":
      return "large" === t
        ? (0, Vq.jsx)(IconPlayOutline, { className: Rq })
        : (0, Vq.jsx)(IconPlayOutline, { className: Oq });
    case "@imgly/Audio":
    case "ly.img.audio":
      return "large" === t
        ? (0, Vq.jsx)(IconMusic, { className: Rq })
        : (0, Vq.jsx)(IconMusic, { className: Oq });
    case "@imgly/Text":
    case "ly.img.text":
      return "large" === t
        ? (0, Vq.jsx)(IconFontT, { className: Rq })
        : (0, Vq.jsx)(IconFontT, { className: Oq });
    case "@imgly/Shapes":
    case "ly.img.vectorpath":
      return "large" === t
        ? (0, Vq.jsx)(IconShapes, { className: Rq })
        : (0, Vq.jsx)(IconShapes, { className: Oq });
    case "@imgly/Sticker":
    case "ly.img.sticker":
      return "large" === t
        ? (0, Vq.jsx)(IconSticker, { className: Rq })
        : (0, Vq.jsx)(IconSticker, { className: Oq });
    case "@imgly/Upload":
    case "ly.img.upload":
    case "ly.img.image.upload":
    case "ly.img.audio.upload":
    case "ly.img.video.upload":
      return "large" === t
        ? (0, Vq.jsx)(IconUpload, { className: Rq })
        : (0, Vq.jsx)(IconUpload, { className: Oq });
    case "@imgly/Library":
    case "ly.img.dockGroupOverview":
      return "large" === t
        ? (0, Vq.jsx)(IconElementLayers, { className: Rq })
        : (0, Vq.jsx)(IconElementLayers, { className: Oq });
    default:
      return "large" === t
        ? (0, Vq.jsx)(yq, { className: Rq })
        : (0, Vq.jsx)(yq, { className: Oq });
  }
};
