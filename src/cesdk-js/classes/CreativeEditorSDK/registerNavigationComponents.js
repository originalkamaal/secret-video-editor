import { backNavigationComponent, closeNavigationComponent, undoRedoNavigationComponent, zoomNavigationComponent, previewNavigationComponent, actionsNavigationComponent } from "../../working";


export var registerNavigationComponents = function (
  editor,
  componentRegistry,
  config
) {
  componentRegistry.unstable_registerReactComponent(
    "ly.img.back.navigationBar",
    backNavigationComponent
  ),
    componentRegistry.unstable_registerReactComponent(
      "ly.img.close.navigationBar",
      closeNavigationComponent
    ),
    componentRegistry.unstable_registerReactComponent(
      "ly.img.undoRedo.navigationBar",
      undoRedoNavigationComponent
    ),
    componentRegistry.unstable_registerReactComponent(
      "ly.img.zoom.navigationBar",
      zoomNavigationComponent
    ),
    componentRegistry.unstable_registerReactComponent(
      "ly.img.preview.navigationBar",
      previewNavigationComponent
    ),
    componentRegistry.unstable_registerReactComponent(
      "ly.img.actions.navigationBar",
      actionsNavigationComponent
    ),
    editor.ui.registerComponent(
      "ly.img.title.navigationBar",
      ({
        builder: { Heading: title }, payload: params = {}, renderOptimizedSmallViewport: isOptimizedViewport,
      }) => {
        if (isOptimizedViewport) return;
        const { title: headerTitle } = params, defaultTitle = headerTitle ?? config?.ui?.elements?.navigation?.title;
        defaultTitle &&
          title("ly.img.title.navigationBar", { content: defaultTitle });
      }
    );
};
