import { ComponentProps } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ThemeToggle(props: ComponentProps<typeof ToggleGroup>) {
  return (
    <ToggleGroup {...props}>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  );
}
