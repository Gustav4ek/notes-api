
interface FindNotesQuery {
    page?: number;
    limit?: number;
    search?: string;
    tags?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
}