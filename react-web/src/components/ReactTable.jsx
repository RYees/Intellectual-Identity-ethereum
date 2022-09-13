import React, { useState, useEffect, useMemo } from "react";
import { FaCheck } from "react-icons/fa";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import '../css/App.css';
import axios from "axios";
import GlobalFilter  from "./GlobalFilter.jsx";

const ReactTable = () => {
  const[products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const response = await axios.get("https://fakestoreapi.com/products")
    .catch(err => console.log(err));
    if(response) {
      const products = response.data;
      console.log("Products:", products);
      setProducts(products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const data = useMemo(() => 
    [
      {
          "id": 1,
          "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          "price": 109.95,
          "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
          "category": "men's clothing",
          "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          "rating": {
            "rate": 3.9,
            "count": 120
          }
        },
        {
          "id": 2,
          "title": "Mens Casual Premium Slim Fit T-Shirts ",
          "price": 22.3,
          "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
          "category": "men's clothing",
          "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          "rating": {
            "rate": 4.1,
            "count": 259
          }
        },
        {
          "id": 3,
          "title": "Mens Casual Premium Slim Fit T-Shirts ",
          "price": 22.3,
          "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
          "category": "men's clothing",
          "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          "rating": {
            "rate": 4.1,
            "count": 259
          }
        },
        {
          "id": 4,
          "title": "Mens Casual Premium Slim Fit T-Shirts ",
          "price": 22.3,
          "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
          "category": "men's clothing",
          "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          "rating": {
            "rate": 4.1,
            "count": 259
          }
        }
    ], []
  );

  const columns = useMemo(() => ([
    {
      Header: "Id",
      accessor: "id"
    },
    {
      Header: "Price",
      accessor: "price"
    },
    {
      Header: "Title",
      accessor: "title"
    }
  ]));

  const productsData = useMemo(() => [...products], [products]);

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== "rating")
            .map((key) => {
              if (key === "image")
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => <img src={value} />,
                  maxWidth: 30,
                };

              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <button onClick={() => alert("Editing: " + row.values.price)}>
            Edit
          </button>
        ),
      },
    ]);
  };


  const tableInstance = useTable({
    columns: productsColumns,
    data: productsData,
    },  
    useGlobalFilter,
    tableHooks,
    useSortBy
    );
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  return (
    <>
    <GlobalFilter
      preGlobalFilteredRows={preGlobalFilteredRows}
      setGlobalFilter={setGlobalFilter}
      globalFilter={state.globalFilter}
    />
        
      <table {...getTableProps()}>
       <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
           {headerGroup.headers.map((column) => (
             <th {...column.getHeaderProps(column.getSortByToggleProps())}>
             { column.render("Header")}
             {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
             </th>
           ))}
          </tr>
        ))}
       </thead>

       <tbody {...getTableBodyProps()}>
         {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
         })}
        
       </tbody>
      </table>
  </>
  )
}

export default ReactTable