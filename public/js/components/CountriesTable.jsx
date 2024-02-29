import React, { useEffect, useState } from "react";

import { useTable, useSortBy } from "react-table";
import axios from "axios";

function Table({ columns, data }) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data,
            },
            useSortBy
        );

    return (
        <div>
            <table className="table" {...getTableProps()}>
                <thead style={{ color: "white" }}>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " 🔽"
                                                : " 🔼"
                                            : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody
                    {...getTableBodyProps()}
                    style={{
                        backgroundColor: "black",
                        color: "white",
                    }}
                >
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br />
            <div>
                {/* Showing the first{rows.length} results of {rows.length} rows */}
            </div>
        </div>
    );
}

function CountriesTable({ surveyId, newdata, update }) {
    const userid = sessionStorage.getItem("merchantId");
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getSessionData = async () => {
            try {
                const response = await axios.get(`/api/session/${userid}`);
                const apiResponse = response.data.user.merchantName;
                // console.log(apiResponse);
                setUser(apiResponse);
            } catch (error) {
                console.error("Error fetching session data", error);
            }
        };
        getSessionData();
    }, []);
    const columns = React.useMemo(
        () => [
            {
                Header: () => <div></div>,
                accessor: "columnName",
                columns: [
                    {
                        Header: () => <div>S No.</div>,
                        accessor: "d",
                        Cell: ({ row }) => {
                            const serialNumber = row.index + 1;
                            return `${serialNumber}.`;
                        },
                    },
                    {
                        Header: () => (
                            <div style={{ color: "#e3daed" }}>Survey Name</div>
                        ),
                        accessor: "surveyName",
                    },
                    {
                        Header: () => <div>Survey Channel</div>,
                        accessor: "surveyChannel",
                    },

                    {
                        Header: () => <div>Questions</div>,
                        accessor: "questionText",
                        // Cell: ({ value }) => {
                        //     if (value.includes("[Company_name]")) {
                        //         return (
                        //             <span>
                        //                 {value.replace(
                        //                     /\[Company_name\]/g,
                        //                     user
                        //                 )}
                        //             </span>
                        //         );
                        //     } else {
                        //         return <span>{value}</span>;
                        //     }
                        // },
                    },
                    {
                        Header: "Rating",
                        accessor: "numericResponse",
                    },

                    {
                        Header: "Response ",
                        accessor: "responseText",
                        Cell: ({ value }) => {
                            if (value === "Null") {
                                return "";
                            }
                            return value;
                        },
                    },
                ],
            },
        ],
        []
    );
    const customStyles = {
        columns: {
            style: {
                backgroundColor: "black",
            },
        },
    };
    const [data1, setData1] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const result = await axios(`/api/disResponse/${surveyId}`);
                const firstTenData = result.data.responseDetails.slice(0, 5);
                if (newdata.length === 0) {
                    setData1(firstTenData);
                } else {
                    setData1(newdata);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, [update]);

    return (
        <Table
            columns={columns}
            // data={newdata
            data={newdata.slice(0, 5)}
            customStyles={customStyles}
        />
    );
}

export default CountriesTable;
