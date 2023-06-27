import React from 'react';
import { forwardRef, useRef, useState } from 'react';
import {
   border,
   getSelectButtonColors,
   hasValue,
   makeClassName,
   mergeRefs,
   sizing,
   spacing,
   tremorTwMerge,
} from './tremor/tremorAll';

const ExclamationFilledIcon = ({ ...props }) => (
   <svg {...props} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
      <path
         fillRule='evenodd'
         d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
         clipRule='evenodd'
      />
   </svg>
);

const makeTextInputClassName = makeClassName('TextInput');

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   type?: 'number' | 'password' | 'text';
   defaultValue?: string;
   value?: string;
   icon?: React.ElementType | React.JSXElementConstructor<any>;
   error?: boolean;
   errorMessage?: string;
   disabled?: boolean;
}

const NumberInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
   const {
      type = 'number',
      placeholder = 'Type...',
      icon,
      error = false,
      errorMessage,
      disabled = false,
      className,
      ...other
   } = props;

   const [isFocused, setIsFocused] = useState(false);

   const Icon = icon;
   const inputRef = useRef<HTMLInputElement>(null);

   const hasSelection = hasValue(props.value || props.defaultValue);

   const handleFocusChange = (isFocused: boolean) => {
      if (isFocused === false) {
         inputRef.current?.blur();
      } else {
         inputRef.current?.focus();
      }
      setIsFocused(isFocused);
   };

   return (
      <>
         <div
            className={tremorTwMerge(
               makeTextInputClassName('root'),
               // common
               'relative w-full flex items-center min-w-[10rem] outline-none rounded-tremor-default',
               // light
               'shadow-tremor-input',
               // dark
               'dark:shadow-dark-tremor-input',
               getSelectButtonColors(hasSelection, disabled, error),
               isFocused &&
                  tremorTwMerge(
                     // common
                     'ring-2 transition duration-100',
                     // light
                     'border-tremor-brand-subtle ring-tremor-brand-muted',
                     // light
                     'dark:border-dark-tremor-brand-subtle dark:ring-dark-tremor-brand-muted',
                  ),
               border.sm.all,
               className,
            )}
            onClick={() => {
               if (!disabled) {
                  handleFocusChange(true);
               }
            }}
            onFocus={() => {
               handleFocusChange(true);
            }}
            onBlur={() => {
               handleFocusChange(false);
            }}
         >
            {Icon ? (
               <Icon
                  className={tremorTwMerge(
                     makeTextInputClassName('icon'),
                     // common
                     'shrink-0',
                     // light
                     'text-tremor-content-subtle',
                     // light
                     'dark:text-dark-tremor-content-subtle',
                     sizing.lg.height,
                     sizing.lg.width,
                     spacing.xl.marginLeft,
                  )}
               />
            ) : null}
            <input
               ref={mergeRefs([ref, inputRef])}
               type={type}
               className={tremorTwMerge(
                  makeTextInputClassName('input'),
                  // common
                  'w-full focus:outline-none focus:ring-0 border-none bg-transparent text-tremor-default',
                  // light
                  'text-tremor-content-emphasis',
                  // dark
                  'dark:text-dark-tremor-content-emphasis',
                  Icon ? spacing.lg.paddingLeft : spacing.twoXl.paddingLeft,
                  error ? spacing.lg.paddingRight : spacing.twoXl.paddingRight,
                  spacing.sm.paddingY,
                  disabled
                     ? 'placeholder:text-tremor-content-subtle dark:placeholder:text-dark-tremor-content-subtle'
                     : 'placeholder:text-tremor-content dark:placeholder:text-dark-tremor-content',
               )}
               placeholder={placeholder}
               disabled={disabled}
               {...other}
            />
            {error ? (
               <ExclamationFilledIcon
                  className={tremorTwMerge(
                     makeTextInputClassName('errorIcon'),
                     'text-rose-500',
                     spacing.xl.marginRight,
                     sizing.lg.height,
                     sizing.lg.width,
                  )}
               />
            ) : null}
         </div>
         {errorMessage ? (
            <p
               className={tremorTwMerge(
                  makeTextInputClassName('errorMessage'),
                  'text-sm text-rose-500 mt-1',
               )}
            >
               {errorMessage}
            </p>
         ) : null}
      </>
   );
});

NumberInput.displayName = 'NumberInput';

export default NumberInput;
