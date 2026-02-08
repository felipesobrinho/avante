export type Category = {
    id: string;
    name: string;
    description?: string;
    parentId?: string;
    _count?: {
        products: number;
    };
    createdAt: Date;
    updatedAt: Date;
};