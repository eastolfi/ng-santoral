type PrismaOrder = { [field: string]: 'asc' | 'desc' };
export type ApiResponse<M> = {
    data: M[];
    totalRecords: number;
    pageCount: number;
    page: number;
    pageSize: number;
    orderBy: PrismaOrder[];
}
