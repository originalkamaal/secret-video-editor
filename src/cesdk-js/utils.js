import { allAnimationStates, unknownBool2 } from "./constants/constants";
import { renderPipelineStages } from "./constants/constants";
import { TaskScheduler } from "./classes/TaskScheduler";

export function setupRenderingProcessor(scheduleNextFrame, onRenderComplete) {
  let isFramePending = false,
    useFixedDeltaTime = true;
  const renderState = { delta: 0, timestamp: 0, isProcessing: false };
  const renderStageProcessors = renderPipelineStages.reduce(
    (accumulatedStages, stage) => (
      (accumulatedStages[stage] = (function (callback) {
        let scheduledTasks = new TaskScheduler(),
          bufferTasks = new TaskScheduler(),
          taskCount = 0,
          isProcessing = false,
          reprocessRequired = false;
        const permanentTasks = new WeakSet();
        const stageProcessor = {
          schedule: (task, isPermanent = false, prioritizeBuffer = false) => {
            const useScheduled = prioritizeBuffer && isProcessing;
            const targetScheduler = useScheduled ? scheduledTasks : bufferTasks;
            return (
              isPermanent && permanentTasks.add(task),
              targetScheduler.add(task) &&
                useScheduled &&
                isProcessing &&
                (taskCount = scheduledTasks.order.length),
              task
            );
          },
          cancel: (task) => {
            bufferTasks.remove(task), permanentTasks.delete(task);
          },
          process: (timestamp) => {
            if (isProcessing) reprocessRequired = true;
            else {
              if (
                ((isProcessing = true),
                ([scheduledTasks, bufferTasks] = [bufferTasks, scheduledTasks]),
                bufferTasks.clear(),
                (taskCount = scheduledTasks.order.length),
                taskCount)
              )
                for (let i = 0; i < taskCount; i++) {
                  const task = scheduledTasks.order[i];
                  permanentTasks.has(task) &&
                    (stageProcessor.schedule(task), callback()),
                    task(timestamp);
                }
              (isProcessing = false),
                reprocessRequired &&
                  ((reprocessRequired = false),
                  stageProcessor.process(timestamp));
            }
          },
        };
        return stageProcessor;
      })(() => (isFramePending = true))),
      accumulatedStages
    ),
    {}
  );
  let processStage = (stage) => {
    renderStageProcessors[stage].process(renderState);
  };
  let renderLoop = () => {
    const currentTime = unknownBool2
      ? renderState.timestamp
      : performance.now();
    (isFramePending = false),
      (renderState.delta = useFixedDeltaTime
        ? 1e3 / 60
        : Math.max(Math.min(currentTime - renderState.timestamp, 40), 1)),
      (renderState.timestamp = currentTime),
      (renderState.isProcessing = true),
      renderPipelineStages.forEach(processStage),
      (renderState.isProcessing = false),
      isFramePending &&
        onRenderComplete &&
        ((useFixedDeltaTime = false), scheduleNextFrame(renderLoop));
  };
  return {
    schedule: renderPipelineStages.reduce((scheduler, stage) => {
      const l = renderStageProcessors[stage];
      return (
        (scheduler[stage] = (
          task,
          isPermanent = false,
          prioritizeBuffer = false
        ) => (
          isFramePending ||
            ((isFramePending = true),
            (useFixedDeltaTime = true),
            renderState.isProcessing || scheduleNextFrame(renderLoop)),
          l.schedule(task, isPermanent, prioritizeBuffer)
        )),
        scheduler
      );
    }, {}),
    cancel: (task) =>
      renderPipelineStages.forEach((t) =>
        renderStageProcessors[t].cancel(task)
      ),
    state: renderState,
    steps: renderStageProcessors,
  };
}
export var generateSlug = (e) =>
    e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
  framerAppearId = "data-" + generateSlug("framerAppearId");
export function isStringOrArray(e) {
  return "string" == typeof e || Array.isArray(e);
}
export function isObjHasStartFunc(e) {
  return null !== e && "object" == typeof e && "function" == typeof e.start;
}
export function hasAnimationProperties(e) {
  return (
    isObjHasStartFunc(e.animate) ||
    allAnimationStates.some((t) => isStringOrArray(e[t]))
  );
}
export function hasVariants(e) {
  return Boolean(hasAnimationProperties(e) || e.variants);
}export function formatArray(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
export function isString(e) {
  return "string" == typeof e;
}

