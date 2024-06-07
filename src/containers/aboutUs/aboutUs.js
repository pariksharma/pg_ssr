import React, { useEffect, useState } from 'react'
import { aboutUsService } from '../../services';
import { resHandler } from '../../utils/helper';
import Header from '../../components/header/header';
import LinkSend from '../../components/linkSend/linkSend';
import Footer from '../../components/footer/footer';
import { useQuery } from 'react-query';

export default function AboutUs() {
    const [aboutData, setAboutData] = useState();


    /*
    useEffect(() => {
        getAboutFetch()
    }, [])

    const getAboutFetch = async () => {
        await aboutUsService().then(res => {
            let { data, status, message } = resHandler(res);
            console.log(res, "aboutUs")
            // setAboutData(res.data);
        })
    }
    */

     //////////////Caching on aboutUsService (about)////////////////////////

     const fetchAboutService = async () => {
        const responseAboutService = await aboutUsService();
        // console.log("aboutUs", responseAboutService);
        return responseAboutService.data
     }

     const {data : about_Data, isFetched} = useQuery("about_Service", fetchAboutService, {
        refetchOnMount: false,
        refetchOnWindowFocus: false
     })
     useEffect(() => {
        if(isFetched){
            setAboutData(about_Data)
        }
    }, [isFetched])

    /////////////////////////////////////////////////////////////////////////


    return (
        <>
            <Header />
            <section className='pg-privacypolicy pb-4'>
                <div className='container'>
                    <div className='bg-white py-4 shadow'>
                        <div className='p-4 pg-privacypolicy-text' dangerouslySetInnerHTML={{ __html: aboutData && aboutData }} />
                    </div>
                </div>
            </section>
            <LinkSend />
            <Footer />
        </>
    )
}
