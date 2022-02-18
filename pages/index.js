import React, { useState, useEffect } from 'react'

function Page(props)  {

    return (
        <>
            <div>Hello World</div>
        </>
    )
}

export async function getStaticProps() {

    console.log(process.env.ENV_APIKEY, process.env.ENV_APIKEY)

    return { 
        props: {
            apikey: process.env.ENV_APIKEY,
            secret: process.env.ENV_SECRET
        },
    }
}

export default Page