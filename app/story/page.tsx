'use server';


import HomeLayout from '../components/HomeLayout';
import Story from "../components/story";

export default async function Travel() {

    return <HomeLayout>
        <Story/>
    </HomeLayout>;
}