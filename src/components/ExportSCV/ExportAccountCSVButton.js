import { data } from "jquery";
import React from "react";
import { useState, useEffect } from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import * as request from "Until/request";

const ExportAccountCSVButton = ({ children, prop, idExam,dataExport, className }) => {

    const [data, setdata] = useState({
        listOfUsers: [],
        loading: false
    });
    const [datas, setdatas] = useState(data);
    const getUsers = async (event, done) => {
        if (!data.loading) {
            try {
                console.log(done)
                setdata(pre => ({ ...pre, loading: true }));
                const response = await request.getAPI(`Examination/${idExam}/student-accounts-for-export`)
                console.log(response)
                const accounts = [];
                response.data.map((user) => {
                    var { name, ...rest } = user;
                    console.log(typeof name)
                    accounts.push({
                        ...rest,
                        firstname: name.lastIndexOf(" ") != -1 ? name.slice(name.lastIndexOf(" ") + 1) : name,
                        lastname: name.lastIndexOf(" ") != -1 ? name.slice(0, name.lastIndexOf(" ")) : name
                    })
                })
                setdata({
                    listOfUsers: accounts,
                    loading: false
                });
                console.log(data)
                done(true)
            } catch (e) {
                console.log(e)
                setdata(pre => ({
                    ...pre,
                    loading: false
                }));
            };
        }
    }

    const headers = [
        { label: "firstname", key: "firstname" },
        { label: "lastname", key: "lastname" },
        // { label: "name", key: "name" },
        { label: "email", key: "email" },
        { label: "username", key: "userName" },
        { label: "password", key: "password" },
        { label: "course1", key: "examCode" },
        { label: "group1", key: "testScheduleName" }
    ];
    const csvData = () => {
        // const accounts = [];
        // data.listOfUsers.map((user) => {
        //     var { name, ...rest } = user;
        //     console.log(typeof name)
        //     accounts.push({
        //         ...rest,
        //         firstname: name.lastIndexOf(" ") != -1 ? name.slice(name.lastIndexOf(" ") + 1) : name,
        //         lastname: name.lastIndexOf(" ") != -1 ? name.slice(0, name.lastIndexOf(" ")) : name
        //     })
        // })
        // console.log(accounts)
        //accounts.userName = accounts.userName.toLowerCase()
        console.log(dataExport)
        return dataExport.listOfUsers

    }
    return <CSVLink
        separator={","}
        headers={headers}
        data={csvData()}
        //asyncOnClick={true}
        //onClick={getUsers}
        className={className}
    >
        {children}
    </CSVLink >;
}
export default ExportAccountCSVButton;