const source = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
};

type State = {
    selectedStore: {};
    source: {};
};

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

type Selector<T extends State> = (Equal<keyof T['source'], keyof T['selectedStore']> extends false
    ? {
          select: <K extends Exclude<keyof T['source'], keyof T['selectedStore']>>(
              key: K
          ) => Selector<
              Pick<T, 'source'> & {
                  selectedStore: T['selectedStore'] & { [X in K]: true };
              }
          >;
          selectAll: () => Selector<
              { source: T['source'] } & {
                  selectedStore: { [X in keyof T['source']]: true };
              }
          >;
      }
    : {}) &
    (Equal<{}, T['selectedStore']> extends false
        ? {
              unselect: <K extends keyof T['selectedStore']>(
                  key: K
              ) => Selector<
                  Pick<T, 'source'> & {
                      selectedStore: Omit<T['selectedStore'], K>;
                  }
              >;
              clear: () => Selector<Omit<T, 'selectedStore'> & { selectedStore: {} }>;
              selected: Pick<T['source'], keyof T['selectedStore']>;
          }
        : {});

function useSelect<T extends State, K extends Selector<T>>(selector: 'selected' extends keyof K ? K : never) {
    return null as never;
}

function createSelector<T>(source: T): Selector<{ source: T; selectedStore: {} }> {
    return null as never;
}

// @ts-expect-error
useSelect(createSelector(source));

useSelect(createSelector(source).select('a').unselect('a').select('a').selectAll());

useSelect(createSelector(source).select('a').select('b'));

useSelect(createSelector(source).select('a').select('b').unselect('a').clear().select('a'));

createSelector(source).select('a').selectAll().selected;
