import React from "react";
import { formatLocaleCurrency } from "country-currency-map";

interface ICurrency {
  price: number;
}

export function Currency({ price }: ICurrency) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: formatLocaleCurrency(price, "NGN").replace("NGN", "&#8358;"),
      }}
    />
  );
}

export const CurrencyPostions = {
  left: "Left",
  right: "Right",
};
