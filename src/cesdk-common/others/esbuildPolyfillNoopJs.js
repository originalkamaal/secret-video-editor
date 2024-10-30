import { createLazyModule } from "./createLazyModule";

export var esbuildPolyfillNoopJs = createLazyModule({ "../../../esbuild/polyfill.noop.js"() { } });
