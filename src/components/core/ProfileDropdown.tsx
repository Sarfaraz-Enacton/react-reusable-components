"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { SvgChevronDown, SvgTickMark } from "../generic/icons";
import { useGlobal } from "@/hooks/use-global";
import { useTranslation } from "@/translation/client";
import { translateErrorMessage } from "@/services/utils";

const ProfileDropdown = ({
  placeholder,
  data,
  onChange,
  value,
  errorMessage,
  className,
  small = false,
}: {
  placeholder?: string;
  className?: string;
  data?: any;
  onChange?: any;
  value?: any;
  errorMessage?: any;
  small?: any;
}) => {
  const { getFormattedDateTime } = useGlobal();
  const { t } = useTranslation();

  return (
    <div>
      <Listbox as={"div"} value={value} onChange={onChange}>
        <div className="relative">
          <ListboxButton
            className={`bg-tertiary-background text-15px focus:border-primary-background caret-primary-background transition-ease group peer flex h-12 w-full items-center justify-between gap-2 rounded-lg border border-transparent px-3 pb-1.5 pt-5 outline-none placeholder:text-transparent focus:outline-0 focus:ring-0 focus:ring-offset-0 ${small && "!text-13px !h-auto !gap-1 !px-1.5 !py-2"}`}
          >
            <div className="">
              <span
                className={`text-secondary-text absolute left-0 top-0 transform px-3 transition-transform ${
                  value
                    ? "text-11px translate-y-0 pt-1.5"
                    : "pointer-events-none translate-y-3 pt-0.5 text-sm"
                } ${small && "hidden"}`}
              >
                {placeholder}
              </span>
              <span
                className={`block truncate text-left text-white ${small && "!text-xs"}`}
              >
                {value
                  ? getFormattedDateTime(value?.click_time) ||
                    value?.store?.name ||
                    value?.name ||
                    value
                  : ""}
              </span>
            </div>
            <span className={`-mt-3 flex-shrink-0 ${small && "!mt-0"}`}>
              <SvgChevronDown
                className={`size-5 text-white ${small && "!size-3"} transition-ease group-data-[open]:rotate-180`}
              />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className={`shadow-dropdown absolute z-10 mt-1 max-h-[432px] w-full overflow-auto rounded-lg bg-blue-800 text-sm focus:outline-none ${className && className} ${small && "!max-h-[200px] text-xs"}`}
            >
              {data.map((item, index) => (
                <ListboxOption
                  key={index}
                  className={({ active }) =>
                    `relative flex cursor-pointer select-none items-center gap-3 px-3 py-3.5 ${
                      active ? "bg-tertiary-background" : ""
                    } ${small && "!py-1.5 !pl-2.5 !pr-1"}`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <p
                        className={`block w-full truncate ${selected ? "" : ""} ${small && "text-left"}`}
                      >
                        {getFormattedDateTime(item?.click_time) ||
                          item?.store?.name ||
                          item?.name ||
                          item}
                      </p>
                      {selected ? (
                        <span className="flex items-center text-blue-600">
                          <SvgTickMark
                            className={`text-secondary-text size-4 ${small && "!size-2.5"}`}
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
      {errorMessage && (
        <p className="text-text-danger mt-2 text-xs">
          {translateErrorMessage(errorMessage, t)}
        </p>
      )}
    </div>
  );
};

export default ProfileDropdown;

// usage
{
  /* <ProfileDropdown
  placeholder={t('country')}
  data={countryList}
  value={countryList.find((c) => c.code === values.country)}
  onChange={(e) => handleCountryChange(setFieldValue, e)}
  errorMessage={touched.country && errors.country}
/> */
}
