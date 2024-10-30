import type CreativeEngine from '@cesdk/engine';
import type * as React_2 from 'react';
import type { Reaction } from '@cesdk/engine';

/**
 * Takes a selector function and returns its result. The selector function will
 * be re-run whenever the values returned by the engine api methods inside it change.
 * If the value returned from the selector function changes, the component this hook
 * is used in will be re-rendered.
 *
 * For determining whether a value has changed, objects are compared deeply,
 * using lodash's isEqual function.
 *
 * @example
 *
 * ```tsx
 * function MyComponent() {
 *  // Get the engine instance from the context.
 *  // You could also pass it in via props.
 *  const engine = useEngine();
 *
 *  const type = useEngineSelector(engine, () => {
 *    const selectedBlock = engine.block.findAllSelected()[0];
 *    return selectedBlock ? engine.block.getType(selectedBlock) : null;
 *  });
 *
 *  return <div>Current block type {type}</div>
 * }
 * ```
 *
 * @param engine - An instance of the engine. This instance is passed to the selector
 * @param selector - A method that retrieves values from the engine.
 *
 * @public
 */
export declare function useEngineSelector<T>(engine: CreativeEngine, selector: (engine: CreativeEngine) => T, options?: {
    /** A string that is used internally for debugging */
    debugName?: string;
    /**
     * A method that compares two results of the selector
     * and returns true if they are considered equal.
     */
    equals?: (value: T, lastValue: T | undefined) => boolean;
}): T;

/** @public */
export declare function useEngineSelector<T>(engine: CreativeEngine | undefined, selector: (engine: CreativeEngine | undefined) => T, options?: {
    /** A string that is used internally for debugging */
    debugName?: string;
    /**
     * A method that compares two results of the selector
     * and returns true if they are considered equal.
     */
    equals?: (value: T, lastValue: T | undefined) => boolean;
}): T | undefined;

/**
 * A type helper for writing components that use the withEngine decorator.
 *
 * Makes it easier to export the props of your component without the `engine`
 * prop that is already handled by the decorator.
 *
 * @example
 * ```tsx
 * import withEngine, { type WithEngine } from '@cesdk/engine/integrations/react'
 *
 * export interface MyProps {
 *   blockId: number;
 * }
 *
 * const MyComponent = withEngine(function MyComponent({blockId, engine}: WithEngine<MyProps>) {
 *   return <div>Block {blockId} is of type {engine.block.getType(blockId)}</div>
 * });
 *
 * export default Mycomponent;
 *
 * ```
 * @public
 */
export declare type WithEngine<T> = T & {
    engine: CreativeEngine;
};

/**
 * Higher-order component for use with ReactJS
 *
 * Wrap your component with this function to make it reactive to changes in the engine.
 * Inside your component, access the engine API normally. Whenever the values returned
 * by the engine API change, your component will be re-rendered.
 *
 * For determining whether a value has changed, objects are compared deeply,
 * using lodash's isEqual function.
 *
 * This HOC needs access to a CreativeEngine instance.
 * This instance can be providedin two ways:
 *
 * - As a prop called `engine`
 * - Via a function called `useEngine` that is passed in via the options object.
 *   This function will be called during rendering to get a CreativeEngine instance.
 *   This is useful if you want to use the component in an app where the engine is
 *   available via the context, since you can use hooks inside the `useEngine` function.
 *
 * In both cases the engine instance will be passed to your decorated component
 * via the `engine` prop.
 *
 * If you pass neither an `engine` prop nor provide a `useEngine` function,
 * the component will
 * - render normally
 * - not be reactive to changes in the engine
 * - receive `undefined` in the `engine` prop
 *
 * @example
 * ```tsx
 * function MyComponent({engine}) {
 *  const selectedBlock = engine.block.findAllSelected()[0];
 *  const type = selectedBlock ? engine.block.getType(selectedBlock) : null;
 *  return <div>Current block type {type}</div>
 * }
 *
 * const MyComponentWithEngine = withEngine(MyComponent)
 *
 * // When no `useEngine` is provided, you need to pass the engine in via props
 * <MyComponentWithEngine engine={engine}/>
 * ```
 *
 * If a function is provided via the `useEngine` option, that function will be used
 * to retrieve the engine instance. This is useful if you want to use the component
 * in an app where the engine is not available via the context.
 *
 * ```tsx
 * import useEngine from './hooks/useEngine'
 *
 * function MyComponent({ engine }) {
 *  const selectedBlock = engine.block.findAllSelected()[0];
 *  const type = selectedBlock ? engine.block.getType(selectedBlock) : null;
 *  return <div>Current block type {type}</div>
 * }
 *
 * const MyComponentWithEngine = withEngine(MyComponent, {useEngine})
 *
 * // Since `useEngine` has been provided, engine does not need to be passed in via props
 * <MyComponentWithEngine/>
 * ```
 *
 * ### Combining with `forwardRef`
 *
 * If you want to decorate a function with both `withEngine` and `forwardRef`,
 * apply `withEngine` first, then `forwardRef`:
 *
 * ```tsx
 * forwardRef(withEngine(MyComponent))
 * ```
 *
 * @param Component - the component you want to make reactive
 * @param options - If you pass `useEngine` in this object, that function will
 *                  be called during rendering to obtain the engine instance.
 *                  This instance will be passed to your component via the
 *                  `engine` prop. Since `useEngine` is called during rendering,
 *                  you can use hooks inside it to retrieve the engine instance
 *                  from your app's context.
 *
 * @public
 */
export declare function withEngine<P extends {
    engine?: CreativeEngine;
}, O extends WithEngineOptions, R>(Component: React_2.ForwardRefRenderFunction<R, P>, options?: O): O extends {
    useEngine: () => CreativeEngine;
} ? React_2.ForwardRefRenderFunction<R, Omit<P, 'engine'>> : React_2.ForwardRefRenderFunction<R, P>;

/** @public */
export declare function withEngine<P extends {
    engine?: CreativeEngine;
}, O extends WithEngineOptions>(Component: React_2.FunctionComponent<P>, options?: O): O extends {
    useEngine: () => CreativeEngine;
} ? React_2.FunctionComponent<Omit<P, 'engine'>> : React_2.FunctionComponent<P>;

declare interface WithEngineOptions<E = CreativeEngine> {
    debugName?: string;
    useEngine?: () => E;
}

export { }
