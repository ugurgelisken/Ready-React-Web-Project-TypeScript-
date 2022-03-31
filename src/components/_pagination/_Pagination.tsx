import { useDispatch, useSelector } from "react-redux";

import TablePagination from "@mui/material/TablePagination";

import { setPage, setRowsPerPage } from "../../store/pagination.store";

import "./_Pagination.scss";

const _Pagination = () => {
  const dispatch = useDispatch();

  const { count, page, rowsPerPage } = useSelector(
    (state: any) => state.pagination
  );

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  return (
    <TablePagination
      labelRowsPerPage=""
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
export default _Pagination;
