import {SubProps} from "./types";
import {Checkbox, rem} from "@mantine/core";

export function TableHeader({ files, selection, setSelection }: SubProps) {
  const toggleAll = () => {
    return setSelection(current => {
      return (current.length === files.length
        ? []
        : files.map((item) => item.name))
    });
  }

  return (
    <thead>
    <tr>
      <th style={{ width: rem(40) }}>
        <Checkbox
          onChange={toggleAll}
          checked={selection.length === files.length}
          indeterminate={selection.length > 0 && selection.length !== files.length}
          transitionDuration={0}
        />
      </th>
      <th>TYPE</th>
      <th>NAME</th>
      <th>MODIFIED</th>
      <th>SIZE</th>
    </tr>
    </thead>
  )
}
