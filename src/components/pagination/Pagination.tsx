import Pagination from "@mui/material/Pagination";
import { useIsMobile } from "../../utils/hooks/useIsMobile";
import BoxCenter from "../box-center/BoxCenter";
import DropDownFilter from "../drop-down-filter/DropDownFilter";
import type { ChangeEvent, ReactNode } from "react";

type Props = {
  page: number;
  totalPages: number;
  totalResult: number;
  paginationHandler: (event: ChangeEvent<unknown>, page: number) => void;
  dropdownFilterProps?: {
    link?: string;
    setFilterPayload: (value: string) => void;
    dropDownItems: { label: ReactNode; value: string }[];
    filterValue: string;
  };
  hideRowsPerPage?: boolean;
};

const PaginationComponent = ({
  page,
  totalPages,
  paginationHandler,
  dropdownFilterProps,
  totalResult,
  hideRowsPerPage = false,
}: Props) => {
  const isMobile = useIsMobile();

  return (
    <>
      <Pagination
        size={isMobile ? "small" : "medium"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px 0",
          "& .MuiPagination-ul": {
            "& button": { fontSize: isMobile ? "12.5px" : "13px" },
          },
        }}
        page={page}
        count={totalPages}
        onChange={paginationHandler}
      />
      <BoxCenter sx={{ flexWrap: "wrap", "& p": { fontSize: "14px" } }}>
        {!hideRowsPerPage && dropdownFilterProps && (
          <BoxCenter>
            <p>Items per page:</p>
            <DropDownFilter
              link={dropdownFilterProps.link}
              setFilterPayload={dropdownFilterProps.setFilterPayload}
              dropDownItems={dropdownFilterProps.dropDownItems}
              filterValue={dropdownFilterProps.filterValue}
              noMinWidth
            />
          </BoxCenter>
        )}
        <BoxCenter>
          <p>
            Total Results : <span>{totalResult || 0}</span>
          </p>
        </BoxCenter>
      </BoxCenter>
    </>
  );
};

export default PaginationComponent;
