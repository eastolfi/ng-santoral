export type TreeElement = {
    id: string;
    label: string;
    parent?: string;
    children?: TreeElement[];
    checked?: boolean;
};
