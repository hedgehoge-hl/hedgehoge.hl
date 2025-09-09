import { useId } from "react";

import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

export default function InputNumber({
  label,
  placeholder,
  value,
  onChange,
  currency,
  currencySymbol,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  currency: string;
  currencySymbol: string;
}) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          className="peer ps-6 pe-12"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
        />
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
          {currencySymbol}
        </span>
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
          {currency}
        </span>
      </div>
    </div>
  );
}
