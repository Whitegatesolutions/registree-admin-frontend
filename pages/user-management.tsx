import { NextPage } from "next";
import Head from "next/head";
import UserManagement from "../components/modules/user-management-module/user-management";
import {Fragment} from 'react';

const UserManagementPage : NextPage = () => {
    return(
        <Fragment>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <UserManagement/>
        </Fragment>
    );
}

export default UserManagementPage;