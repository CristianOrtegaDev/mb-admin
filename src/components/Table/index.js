import React from 'react'
import ReactTable from 'react-table'
import styled from 'styled-components'

const TableWrapper = styled.div`
  .ReactTable {
    max-height: 550px;
    width: 100% !important;
  }

  .rt-table {
    display: flex;
    width: 100% !important;
    min-width: auto !important;
    flex-direction: column;
  }

  .rt-tbody {
    max-height: 500px;
    overflow-y: auto;
    border-left: 1px solid ${({ theme }) => theme.colors.mystic};
    border-bottom: 1px solid ${({ theme }) => theme.colors.mystic};

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0;
    }

    .rt-tr-group:first-child {
      border-top: none;
      outline: none;
    }

    .rt-tr-group {
      border-top: 1px solid ${({ theme }) => theme.colors.mystic};
      outline: none;
    }
  }

  .rt-thead {
    border-top: 1px solid ${({ theme }) => theme.colors.mystic};
    border-bottom: 1px solid ${({ theme }) => theme.colors.mystic};
    border-right: 1px solid ${({ theme }) => theme.colors.mystic};
    outline: none;
  }

  .rt-thead,
  .rt-tbody {
    width: 100% !important;
    min-width: auto !important;

    .rt-tr {
      display: flex;
      width: 100% !important;
      min-width: auto !important;
      outline: none;

      .rt-th {
        flex: 1 !important;
        outline: none;
      }

      .rt-th > div {
        height: 100%;
        outline: none;
      }

      .rt-td {
        flex: 1 !important;
        outline: none;
      }
    }
  }

  .-loading {
    display: none;
  }
`

const Table = ({ data, columns }) => (
  <TableWrapper>
    <ReactTable
      data={data}
      columns={columns}
      showPagination={false}
      sortable={false}
      defaultPageSize={47}
      loading={false}
    />
  </TableWrapper>
)

export default Table
