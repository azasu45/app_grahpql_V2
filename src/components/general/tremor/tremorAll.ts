import { extendTailwindMerge } from 'tailwind-merge';

export function mergeRefs<T = any>(
   refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>,
): React.RefCallback<T> {
   return (value) => {
      refs.forEach((ref) => {
         if (typeof ref === 'function') {
            ref(value);
         } else if (ref != null) {
            (ref as React.MutableRefObject<T | null>).current = value;
         }
      });
   };
}

export const sizing = {
   none: {
      height: 'h-0',
      width: 'w-0',
   },
   threeXs: {
      height: 'h-0.5',
      width: 'w-0.5',
   },
   twoXs: {
      height: 'h-1',
      width: 'w-1',
   },
   xs: {
      height: 'h-2',
      width: 'w-2',
   },
   sm: {
      height: 'h-3',
      width: 'w-3',
   },
   md: {
      height: 'h-4',
      width: 'w-4',
   },
   lg: {
      height: 'h-5',
      width: 'w-5',
   },
   xl: {
      height: 'h-6',
      width: 'w-6',
   },
   twoXl: {
      height: 'h-7',
      width: 'w-7',
   },
   threeXl: {
      height: 'h-9',
      width: 'w-9',
   },
};

export const spacing = {
   none: {
      paddingLeft: 'pl-0',
      paddingTop: 'pt-0',
      paddingRight: 'pr-0',
      paddingBottom: 'pb-0',
      paddingX: 'px-0',
      paddingY: 'py-0',
      paddingAll: 'p-0',
      marginLeft: 'ml-0',
      marginTop: 'mt-0',
      marginRight: 'mr-0',
      marginBottom: 'mb-0',
      negativeMarginLeft: '-ml-0',
      negativeMarginRight: '-mr-0',
      negativeMarginTop: '-mt-0',
      negativeMarginBottom: '-mb-0',
      left: 'left-0',
      right: 'right-0',
      top: 'top-0',
      bottom: 'bottom-0',
      spaceX: 'space-x-0',
   },
   px: {
      paddingLeft: 'pl-px',
      paddingTop: 'pt-px',
      paddingRight: 'pr-px',
      paddingBottom: 'pb-px',
      paddingX: 'px-px',
      paddingY: 'py-px',
      paddingAll: 'p-px',
      marginLeft: 'ml-px',
      marginTop: 'mt-px',
      marginRight: 'mr-px',
      marginBottom: 'mb-px',
      negativeMarginLeft: '-ml-px',
      negativeMarginRight: '-mr-px',
      negativeMarginTop: '-mt-px',
      negativeMarginBottom: '-mb-px',
      left: 'left-px',
      right: 'right-px',
      top: 'top-px',
      bottom: 'bottom-px',
      spaceX: 'space-x-px',
   },
   threeXs: {
      paddingLeft: 'pl-0.5',
      paddingTop: 'pt-0.5',
      paddingRight: 'pr-0.5',
      paddingBottom: 'pb-0.5',
      paddingX: 'px-0.5',
      paddingY: 'py-0.5',
      paddingAll: 'p-0.5',
      marginLeft: 'ml-0.5',
      marginTop: 'mt-0.5',
      marginRight: 'mr-0.5',
      marginBottom: 'mb-0.5',
      negativeMarginLeft: '-ml-0.5',
      negativeMarginRight: '-mr-0.5',
      negativeMarginTop: '-mt-0.5',
      negativeMarginBottom: '-mb-0.5',
      left: 'left-0.5',
      right: 'right-0.5',
      top: 'top-0.5',
      bottom: 'bottom-0.5',
      spaceX: 'space-x-0.5',
   },
   twoXs: {
      paddingLeft: 'pl-1',
      paddingTop: 'pt-1',
      paddingRight: 'pr-1',
      paddingBottom: 'pb-1',
      paddingX: 'px-1',
      paddingY: 'py-1',
      paddingAll: 'p-1',
      marginLeft: 'ml-1',
      marginTop: 'mt-1',
      marginRight: 'mr-1',
      marginBottom: 'mb-1',
      negativeMarginLeft: '-ml-1',
      negativeMarginRight: '-mr-1',
      left: 'left-1',
      right: 'right-1',
      top: 'top-1',
      bottom: 'bottom-1',
      spaceX: 'space-x-1',
   },
   xs: {
      paddingLeft: 'pl-1.5',
      paddingTop: 'pt-1.5',
      paddingRight: 'pr-1.5',
      paddingBottom: 'pb-1.5',
      paddingX: 'px-1.5',
      paddingY: 'py-1.5',
      paddingAll: 'p-1.5',
      marginLeft: 'ml-1.5',
      marginTop: 'mt-1.5',
      marginRight: 'mr-1.5',
      marginBottom: 'mb-1.5',
      negativeMarginLeft: '-ml-1.5',
      negativeMarginRight: '-mr-1.5',
      negativeMarginTop: '-mt-1.5',
      negativeMarginBottom: '-mb-1.5',
      left: 'left-1.5',
      right: 'right-1.5',
      top: 'top-1.5',
      bottom: 'bottom-1.5',
      spaceX: 'space-x-1.5',
   },
   sm: {
      paddingLeft: 'pl-2',
      paddingTop: 'pt-2',
      paddingRight: 'pr-2',
      paddingBottom: 'pb-2',
      paddingX: 'px-2',
      paddingY: 'py-2',
      paddingAll: 'p-2',
      marginLeft: 'ml-2',
      marginTop: 'mt-2',
      marginRight: 'mr-2',
      marginBottom: 'mb-2',
      negativeMarginLeft: '-ml-2',
      negativeMarginRight: '-mr-2',
      negativeMarginTop: '-mt-2',
      negativeMarginBottom: '-mb-2',
      left: 'left-2',
      right: 'right-2',
      top: 'left-2',
      bottom: 'bottom-2',
      spaceX: 'space-x-2',
   },
   md: {
      paddingLeft: 'pl-2.5',
      paddingTop: 'pt-2.5',
      paddingRight: 'pr-2.5',
      paddingBottom: 'pb-2.5',
      paddingX: 'px-2.5',
      paddingY: 'py-2.5',
      paddingAll: 'p-2.5',
      marginLeft: 'ml-2.5',
      marginTop: 'mt-2.5',
      marginRight: 'mr-2.5',
      marginBottom: 'mb-2.5',
      negativeMarginLeft: '-ml-2.5',
      negativeMarginRight: '-mr-2.5',
      negativeMarginTop: '-mt-2.5',
      negativeMarginBottom: '-mb-2.5',
      left: 'left-2.5',
      right: 'right-2.5',
      top: 'top-2.5',
      bottom: 'bottom-2.5',
      spaceX: 'space-x-2.5',
   },
   lg: {
      paddingLeft: 'pl-3',
      paddingTop: 'pt-3',
      paddingRight: 'pr-3',
      paddingBottom: 'pb-3',
      paddingX: 'px-3',
      paddingY: 'py-3',
      paddingAll: 'p-3',
      marginLeft: 'ml-3',
      marginTop: 'mt-3',
      marginRight: 'mr-3',
      marginBottom: 'mb-3',
      negativeMarginLeft: '-ml-3',
      negativeMarginRight: '-mr-3',
      negativeMarginTop: '-mt-3',
      negativeMarginBottom: '-mb-3',
      left: 'left-3',
      right: 'right-3',
      top: 'top-3',
      bottom: 'bottom-3',
      spaceX: 'space-x-3',
   },
   xl: {
      paddingLeft: 'pl-3.5',
      paddingTop: 'pt-3.5',
      paddingRight: 'pr-3.5',
      paddingBottom: 'pb-3.5',
      paddingX: 'px-3.5',
      paddingY: 'py-3.5',
      paddingAll: 'p-3.5',
      marginLeft: 'ml-3.5',
      marginTop: 'mt-3.5',
      marginRight: 'mr-3.5',
      marginBottom: 'mb-3.5',
      negativeMarginLeft: '-ml-3.5',
      negativeMarginRight: '-mr-3.5',
      negativeMarginTop: '-mt-3.5',
      negativeMarginBottom: '-mb-3.5',
      left: 'left-3.5',
      right: 'right-3.5',
      top: 'top-3.5',
      bottom: 'bottom-3.5',
      spaceX: 'space-x-3.5',
   },
   twoXl: {
      paddingLeft: 'pl-4',
      paddingTop: 'pt-4',
      paddingRight: 'pr-4',
      paddingBottom: 'pb-4',
      paddingX: 'px-4',
      paddingY: 'py-4',
      paddingAll: 'p-4',
      marginLeft: 'ml-4',
      marginTop: 'mt-4',
      marginRight: 'mr-4',
      marginBottom: 'mb-4',
      negativeMarginLeft: '-ml-4',
      negativeMarginRight: '-mr-4',
      negativeMarginTop: '-mt-4',
      negativeMarginBottom: '-mb-4',
      left: 'left-4',
      right: 'right-4',
      top: 'top-4',
      bottom: 'bottom-4',
      spaceX: 'space-x-4',
   },
   threeXl: {
      paddingLeft: 'pl-6',
      paddingTop: 'pt-6',
      paddingRight: 'pr-6',
      paddingBottom: 'pb-6',
      paddingX: 'px-6',
      paddingY: 'py-6',
      paddingAll: 'p-6',
      marginLeft: 'ml-6',
      marginTop: 'mt-6',
      marginRight: 'mr-6',
      marginBottom: 'mb-6',
      negativeMarginLeft: '-ml-6',
      negativeMarginRight: '-mr-6',
      negativeMarginTop: '-mt-6',
      negativeMarginBottom: '-mb-6',
      left: 'left-6',
      right: 'right-6',
      top: 'top-6',
      bottom: 'bottom-6',
      spaceX: 'space-x-6',
   },
   fourXl: {
      paddingLeft: 'pl-8',
      paddingTop: 'pt-8',
      paddingRight: 'pr-8',
      paddingBottom: 'pb-8',
      paddingX: 'px-8',
      paddingY: 'py-8',
      paddingAll: 'p-8',
      marginLeft: 'ml-8',
      marginTop: 'mt-8',
      marginRight: 'mr-8',
      marginBottom: 'mb-8',
      negativeMarginLeft: '-ml-8',
      negativeMarginRight: '-mr-8',
      negativeMarginTop: '-mt-8',
      negativeMarginBottom: '-mb-8',
      left: 'left-8',
      right: 'right-8',
      top: 'top-8',
      bottom: 'bottom-8',
      spaceX: 'space-x-8',
   },
};

export function hasValue<T>(value: T | null | undefined) {
   return value !== null && value !== undefined && value !== '';
}

export const tremorTwMerge = extendTailwindMerge({
   classGroups: {
      boxShadow: [
         {
            shadow: [
               {
                  tremor: ['input', 'card', 'dropdown'],
                  'dark-tremor': ['input', 'card', 'dropdown'],
               },
            ],
         },
      ],
      borderRadius: [
         {
            rounded: [
               {
                  tremor: ['small', 'default', 'full'],
                  'dark-tremor': ['small', 'default', 'full'],
               },
            ],
         },
      ],
      fontSize: [
         {
            text: [
               {
                  tremor: ['default', 'title', 'metric'],
                  'dark-tremor': ['default', 'title', 'metric'],
               },
            ],
         },
      ],
   },
});

export function makeClassName(componentName: string) {
   return (className: string) => {
      return `tremor-${componentName}-${className}`;
   };
}

export const border = {
   none: {
      left: 'border-l-0',
      top: 'border-t-0',
      right: 'border-r-0',
      bottom: 'border-b-0',
      all: 'border-0',
   },
   sm: {
      left: 'border-l',
      top: 'border-t',
      right: 'border-r',
      bottom: 'border-b',
      all: 'border',
   },
   md: {
      left: 'border-l-2',
      top: 'border-t-2',
      right: 'border-r-2',
      bottom: 'border-b-2',
      all: 'border-2',
   },
   lg: {
      left: 'border-l-4',
      top: 'border-t-4',
      right: 'border-r-4',
      bottom: 'border-b-4',
      all: 'border-4',
   },
};

export const getSelectButtonColors = (
   hasSelection: boolean,
   isDisabled: boolean,
   hasError = false,
) => {
   return tremorTwMerge(
      isDisabled
         ? 'bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle'
         : 'bg-tremor-background dark:bg-dark-tremor-background',
      !isDisabled && 'hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted',
      hasSelection
         ? 'text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis'
         : 'text-tremor-content dark:text-dark-tremor-content',
      isDisabled && 'text-tremor-content-subtle dark:text-dark-tremor-content-subtle',
      hasError && 'text-rose-500',
      hasError ? 'border-rose-500' : 'border-tremor-border dark:border-dark-tremor-border',
   );
};
