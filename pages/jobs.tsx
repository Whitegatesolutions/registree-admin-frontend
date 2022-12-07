import { NextPage } from "next";
import Head from "next/head";
import {Fragment} from 'react';
import JobsComponent from "../components/modules/jobs-module/jobs-component";

const JobsPage : NextPage = () => {
    return(
        <Fragment>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <JobsComponent/>
        </Fragment>
    );
}

export default JobsPage;