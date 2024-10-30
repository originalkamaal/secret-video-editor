import { Vq, f$, Pq, Rq, Oq, wq, Mq, xq, Bq, Sq, Eq, VI, Cq, yq } from "./working";

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
        ? (0, Vq.jsx)(wq, { className: Rq })
        : (0, Vq.jsx)(wq, { className: Oq });
    case "@imgly/Video":
    case "ly.img.video":
      return "large" === t
        ? (0, Vq.jsx)(Mq, { className: Rq })
        : (0, Vq.jsx)(Mq, { className: Oq });
    case "@imgly/Audio":
    case "ly.img.audio":
      return "large" === t
        ? (0, Vq.jsx)(xq, { className: Rq })
        : (0, Vq.jsx)(xq, { className: Oq });
    case "@imgly/Text":
    case "ly.img.text":
      return "large" === t
        ? (0, Vq.jsx)(Bq, { className: Rq })
        : (0, Vq.jsx)(Bq, { className: Oq });
    case "@imgly/Shapes":
    case "ly.img.vectorpath":
      return "large" === t
        ? (0, Vq.jsx)(Sq, { className: Rq })
        : (0, Vq.jsx)(Sq, { className: Oq });
    case "@imgly/Sticker":
    case "ly.img.sticker":
      return "large" === t
        ? (0, Vq.jsx)(Eq, { className: Rq })
        : (0, Vq.jsx)(Eq, { className: Oq });
    case "@imgly/Upload":
    case "ly.img.upload":
    case "ly.img.image.upload":
    case "ly.img.audio.upload":
    case "ly.img.video.upload":
      return "large" === t
        ? (0, Vq.jsx)(VI, { className: Rq })
        : (0, Vq.jsx)(VI, { className: Oq });
    case "@imgly/Library":
    case "ly.img.dockGroupOverview":
      return "large" === t
        ? (0, Vq.jsx)(Cq, { className: Rq })
        : (0, Vq.jsx)(Cq, { className: Oq });
    default:
      return "large" === t
        ? (0, Vq.jsx)(yq, { className: Rq })
        : (0, Vq.jsx)(yq, { className: Oq });
  }
};
