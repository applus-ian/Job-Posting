"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type Country = {
  name: string
  flag: string
  callingCode: string
}

type PhoneInputProps = {
  value?: string
  onChange?: (val: string) => void
}

export default function PhoneInput({ value = "", onChange }: PhoneInputProps) {
  const [countries, setCountries] = useState<Country[]>([])
  const [selected, setSelected] = useState<Country | null>(null)
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data: any[]) => {
        const list = data
          .map((c) => {
            const code =
              c.idd?.root && c.idd?.suffixes?.[0]
                ? c.idd.root + c.idd.suffixes[0]
                : null
            return code
              ? {
                  name: c.name.common,
                  flag: c.flags?.svg || "",
                  callingCode: code,
                }
              : null
          })
          .filter(Boolean)
          .filter(
            (c, i, self) =>
              self.findIndex((x) => x!.callingCode === c!.callingCode) === i
          )
          .sort((a, b) => a!.name.localeCompare(b!.name)) as Country[]

        setCountries(list)

        // auto-detect based on initial value (e.g. 639...)
        const matched = list.find((c) =>
          value.startsWith(c.callingCode.replace("+", ""))
        )

        if (matched) {
          setSelected(matched)
          setInputValue(value.replace(matched.callingCode.replace("+", ""), ""))
        } else {
          setInputValue(value)
        }
      })
  }, [value])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberOnly = e.target.value
    setInputValue(numberOnly)
    onChange?.(numberOnly)
  }

  const handleSelect = (country: Country) => {
    setSelected(country)
    // We are no longer modifying the input field
  }

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="phone">Phone</Label>
      <div className="flex items-center border rounded-md px-2 py-1.5 bg-muted/50 w-full">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="flex items-center gap-2 pr-2 border-r min-w-[150px] text-sm"
              type="button"
            >
              {selected?.flag && (
                <Image
                  src={selected.flag}
                  alt={selected.name}
                  width={20}
                  height={14}
                  className="rounded-sm"
                />
              )}
              {selected?.callingCode || "+--"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-64">
            <Command>
              <CommandInput placeholder="Search country or code..." />
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.callingCode}
                    value={`${country.name} ${country.callingCode}`}
                    onSelect={() => handleSelect(country)}
                  >
                    <Image
                      src={country.flag}
                      alt={country.name}
                      width={20}
                      height={14}
                      className="rounded-sm mr-2"
                    />
                    {country.name} ({country.callingCode})
                    {selected?.callingCode === country.callingCode && (
                      <Check className="ml-auto h-4 w-4 text-primary" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Input
          id="phone"
          value={inputValue}
          onChange={handleInput}
          className="border-none bg-transparent focus-visible:ring-0 ml-2"
        />
      </div>
    </div>
  )
}
