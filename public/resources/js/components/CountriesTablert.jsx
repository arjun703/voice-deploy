import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const CountriesTable = () => {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const getCountries = async () => {
        try {
            const response = await axios.get(
                "https://restcountries.com/v2/all"
            );
            setCountries(response.data);
            setFilteredCountries(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const customStyles = {
        rows: {
            style: {
                fontSize: "14px",
                backgroundColor: "black",
                color: "grey",
            },
        },
        headCells: {
            style: {
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "black",
                color: "white",
            },
        },
        table: {
            style: {
                borderRadius: "15px",
            },
        },
    };
    const columns = [
        {
            name: "Name ",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Mobile#",
            selector: (row) => row.nativeName,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.capital,
            sortable: true,
        },
        {
            name: "Rating",
            selector: (row) => <img width={50} height={50} src={row.flag} />,
        },
        {
            name: "Factor",
            selector: (row) => <img width={50} height={50} src={row.flag} />,
        },
        {
            name: "Feedback",
            selector: (row) => <img width={50} height={50} src={row.flag} />,
        },
        {
            name: "Topic",
            selector: (row) => <img width={50} height={50} src={row.flag} />,
        },
        // {
        //     name: "Factor",
        //     cell: (row) => (
        //         <button
        //             className="btn btn-primary"
        //             onClick={() => alert(row.alpha2Code)}
        //         >
        //             Edit
        //         </button>
        //     ),
        // },
    ];
    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        const result = countries.filter((country) => {
            return country.name.toLowerCase().match(search.toLowerCase());
        });
        setFilteredCountries(result);
    }, [search]);
    return (
        <DataTable
            columns={columns}
            data={filteredCountries}
            fixedHeader
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            customStyles={customStyles}
            style={{
                ...customStyles,
            }}
        />
    );
};

export default CountriesTable;
