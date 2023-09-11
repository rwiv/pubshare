import {Checkbox, createStyles} from "@mantine/core";
import {SubProps} from "./types";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export function TableRows({ files, selection, setSelection }: SubProps) {
  const { classes, cx } = useStyles();
  const toggleRow = (id: string) => {
    return setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return files.map(item => {
    const selected = selection.includes(item.name);
    return (
      <tbody>
      <tr key={item.name } className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.name)}
            onChange={() => toggleRow(item.name)}
            transitionDuration={0}
          />
        </td>
        <td>{item.type}</td>
        <td>{item.name}</td>
        <td>{item.modified}</td>
        <td>{item.size}</td>
      </tr>
      </tbody>
    );
  })
}
