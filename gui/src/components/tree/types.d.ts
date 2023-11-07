export interface RawItem {
  pmenuId: string;
  menuId: string;
}

export interface NodeItem extends RawItem {
  children: NodeItem[];
}
