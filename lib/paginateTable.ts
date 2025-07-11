export const paginateTable = <T>(
    items: T[],
    currentPage: number,
) => {
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    return {
        indexOfFirstItem,
        currentItems,
        totalPages,
    };
};