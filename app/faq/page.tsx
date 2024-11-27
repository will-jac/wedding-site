'use server';


import HomeLayout from '../components/HomeLayout';
import FAQ from "../components/faq";

export default async function Travel() {

    return <HomeLayout>
        <FAQ/>
    </HomeLayout>;
}