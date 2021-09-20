import dynamic from "next/dynamic";

import { Fragment } from 'react';
import OverviewCardGrid from '../../components/card-dashboard/OverviewCardGrid';
import SocialCardGrid from '../../components/card-dashboard/SocialCardGrid';
// import Header from '../../components/layout/Header';
const Header = dynamic(() => import('../../components/layout/Header.js'), {
    ssr: false,
});

import Image from 'next/image';

import img from '../../public/images/untitled-1.svg';

function SocialMediaDashboard() {
    return (<Fragment>
        <Header title="Social Media Dashboard" subtitle="Comptage des followers" />
        <SocialCardGrid />
        <OverviewCardGrid title="Overview card title" />
    </Fragment>
    )
}

export default SocialMediaDashboard;