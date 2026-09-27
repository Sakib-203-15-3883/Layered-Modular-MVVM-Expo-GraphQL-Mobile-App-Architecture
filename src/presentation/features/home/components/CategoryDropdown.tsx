import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import type { ProductCategory } from "@/graphql/queries/products/products";

type CategoryOption = {
  label: string;
  value: ProductCategory | undefined;
};

type CategoryDropdownProps = {
  options: readonly CategoryOption[];
  value: ProductCategory | undefined;
  onChange: (value?: ProductCategory) => void;
};

export function CategoryDropdown({
  options,
  value,
  onChange,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  return (
    <View>
      <Pressable onPress={() => setIsOpen((current) => !current)}>
        <Text>{selectedOption.label} ▼</Text>
      </Pressable>

      {isOpen && (
        <View>
          {options.map((option) => (
            <Pressable
              key={option.label}
              onPress={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <Text>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
