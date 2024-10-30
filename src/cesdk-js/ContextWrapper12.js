import { SetUploadContext, UploadContext } from "./working";
import { qI, QI } from "./reacts";

export function ContextWrapper12({ children: e }) {
  const [t, n] = (0, qI.useState)(), [s, i] = (0, qI.useState)(), [o, r] = (0, qI.useState)(), a = (0, qI.useMemo)(
    () => ({ setUpload: n, setUploadError: i, setUploadProgress: r }),
    []
  ), l = (0, qI.useMemo)(
    () => ({ upload: t, uploadError: s, uploadProgress: o }),
    [t, s, o]
  );
  return (0, QI.jsx)(SetUploadContext.Provider, {
    value: a,
    children: (0, QI.jsx)(UploadContext.Provider, { value: l, children: e }),
  });
}
