import { useMemo, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRowParams,
  GridSortModel,
} from '@mui/x-data-grid';
import { getFormattedCurrency } from 'helpers/get-formatted-currency';
import { Avatar, Box } from '@mui/material';
import { useModal } from 'hooks/use-modal';
import { ModalInfo } from 'components/modal-info';
import { Row } from 'types/entities';
import { ModalImage } from 'components/modal-image';
import { useDidUpdateEffect } from 'hooks/use-did-update-effect';
import { LOCAL_STORAGE_FILTER_KEY, LOCAL_STORAGE_SORT_KEY } from 'constants/local-storage';

import styles from './table.module.css';

const tableStyles = {
  '.MuiDataGrid-row': {
    minHeight: '100px !important',
    maxHeight: '300px !important',
    cursor: 'pointer',
  },
  '.MuiDataGrid-cell': {
    minHeight: '100px !important',
    maxHeight: '300px !important',
  },
};

const rows: Row[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  image: 'https://mui.com/static/images/avatar/1.jpg',
  title: 'Название книги',
  description: 'Описание книги',
  date: new Date(),
  price: Math.floor(Math.random() * 100),
}));

export function Table() {
  const [sortModel, setSortModel] = useState<GridSortModel>(
    () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_SORT_KEY) as string) ?? [],
  );
  const [filterModel, setFilterModel] = useState<GridFilterModel | undefined>(
    () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_FILTER_KEY) as string) ?? undefined,
  );
  const [openedModalImage, { open: openModalImage, close: closeModalImage }] = useModal();
  const [clickedImage, setClickedImage] = useState<string | null>(null);

  const [openedModalInfo, { open: openModalInfo, close: closeModalInfo }] = useModal();
  const [clickedRow, setClickedRow] = useState<Row | null>(null);

  const onRowClick = ({ row }: GridRowParams) => {
    setClickedRow(row);
    openModalInfo();
  };

  const onImageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, value: string) => {
    e.stopPropagation();

    setClickedImage(value);
    openModalImage();
  };

  const columns: GridColDef[] = useMemo(() => {
    return [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'image',
        headerName: 'Фото',
        renderCell: ({ value }) => (
          <Avatar
            onClick={(e) => onImageClick(e, value)}
            alt="book image"
            src={value}
            sx={{ width: 56, height: 56, cursor: 'pointer' }}
            variant="rounded"
          />
        ),
        sortable: false,
        width: 150,
      },
      {
        field: 'title',
        headerName: 'Название',
        sortable: false,
        headerClassName: styles.cell_Blue,
        cellClassName: styles.cell_Blue,
        width: 150,
      },
      {
        field: 'description',
        headerName: 'Описание',
        sortable: false,
        width: 150,
      },
      {
        field: 'date',
        headerName: 'Дата',
        type: 'date',
        headerClassName: styles.cell_Purple,
        cellClassName: styles.cell_Purple,
        width: 110,
      },
      {
        field: 'price',
        headerName: 'Цена',
        type: 'number',
        valueFormatter: ({ value }) => getFormattedCurrency(value),
        width: 160,
      },
    ];
  }, []);

  useDidUpdateEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_SORT_KEY, JSON.stringify(sortModel));
  }, [sortModel]);

  useDidUpdateEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_FILTER_KEY, JSON.stringify(filterModel));
  }, [filterModel]);

  return (
    <Box className={styles.tableContainer}>
      <DataGrid
        sx={tableStyles}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        // rowHeight={100}
        onRowClick={onRowClick}
        filterModel={filterModel}
        onFilterModelChange={(model) => setFilterModel(model)}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        disableRowSelectionOnClick
        disableColumnSelector
      />
      {clickedRow && (
        <ModalInfo book={clickedRow} open={openedModalInfo} onClose={closeModalInfo} />
      )}
      {clickedImage && (
        <ModalImage image={clickedImage} open={openedModalImage} onClose={closeModalImage} />
      )}
    </Box>
  );
}
