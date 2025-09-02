export type Category = {
    id: string;
    name: string;
    description?: string;
    parentId?: string;
    createdAt: Date;
    updatedAt: Date;
};