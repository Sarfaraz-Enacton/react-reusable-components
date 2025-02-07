"use client";
import { config } from "@/config";
import { translateErrorMessage } from "@/services/utils";
import { useTranslation } from "@/translation/client";
import { useEffect, useRef, useState } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { twMerge } from "tailwind-merge";
import { useDebouncedCallback } from "use-debounce";
import Loader from "./Loader";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  id: string;
  className?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: any;
  value?: any;
  required?: boolean;
  autoFocus?: boolean;
  touched?: any;
  setFieldValue?: any;
  country: any;
}

export default function LocationInput({
  placeholder,
  id,
  className,
  label,
  onChange,
  errorMessage,
  value,
  required = false,
  autoFocus = false,
  touched,
  setFieldValue,
  country,
  ...rest
}: InputProps) {
  const { t } = useTranslation();
  const [isLocationListShow, setIsLocationListShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: config.GOOGLE_LOCATION_SEARCH_API_KEY,
      options: {
        input: "",
        componentRestrictions: {
          country: String(country).toLocaleLowerCase(),
        },
      },
    });

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 400);
    }
    return () => {};
  }, [inputRef.current, autoFocus]);

  const handleOnChange = useDebouncedCallback(async (e) => {
    setIsLocationListShow(true);
    getPlacePredictions({ input: e.target.value });
  }, 300);

  return (
    <div className="relative space-y-2">
      <div className="relative">
        <input
          ref={inputRef}
          className={twMerge(
            `bg-tertiary-background focus:border-primary-background caret-primary-background transition-ease peer h-12 w-full rounded-lg border border-transparent px-3 pb-1.5 pt-5 text-base outline-none placeholder:text-transparent focus:outline-0 focus:ring-0 focus:ring-offset-0`,
            className,
          )}
          type={"text"}
          placeholder={placeholder}
          name={id}
          id={id}
          value={value?.description}
          onChange={(e) => {
            onChange && onChange(e);
            handleOnChange(e);
          }}
          autoComplete={"off"}
          {...rest}
          onWheel={(e) => {
            if (inputRef.current?.type === "number") {
              inputRef.current.blur();
            }
          }}
        />
        <label
          htmlFor={id}
          className="text-11px text-secondary-text peer-placeholder-shown:text-15px peer-placeholder-shown:text-secondary-text peer-focus:px-1s peer-focus:text-11px absolute left-0 ml-3 translate-y-1.5 duration-100 ease-linear peer-placeholder-shown:translate-y-3 peer-focus:ml-3 peer-focus:translate-y-1.5"
        >
          {label}
          {required && "*"}
        </label>
      </div>
      {errorMessage !== undefined && touched[id] && (
        <p className="text-text-danger text-xs">
          {translateErrorMessage(errorMessage, t)}
        </p>
      )}
      {isLocationListShow && (
        <>
          <div
            className={`shadow-dropdown absolute inset-x-0 z-10 mt-1 max-h-[432px] w-full overflow-auto rounded-lg bg-blue-800 text-sm focus:outline-none`}
          >
            {isPlacePredictionsLoading ? (
              <div className="animate-fade-in flex h-[200px] items-center justify-center">
                <Loader />
              </div>
            ) : (
              placePredictions.map((item, index) => {
                const isSelected = item.place_id === value.place_id;
                return (
                  <div
                    className={`animate-fade-in cursor-pointer ${isSelected && "text-primary-700"} hover:bg-tertiary-background relative block w-full cursor-pointer select-none items-center gap-3 truncate px-3 py-3.5`}
                    onClick={() => {
                      setFieldValue(id, item);
                      setIsLocationListShow(false);
                    }}
                    key={index}
                  >
                    {item.description}
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

// use case
{
  /* <LocationInput
  id="location"
  onChange={handleChange}
  value={values.location}
  country={values.country}
  label={t('location')}
  placeholder={t('location')}
  setFieldValue={setFieldValue}
  errorMessage={errors.location}
  touched={touched}
/> */
}
