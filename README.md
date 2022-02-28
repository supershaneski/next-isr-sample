next-isr-app
============

This exercise will try to explore [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)(ISR) in Next.js which lets the developer to update static pages ***without the need to rebuild the entire site***.

### Usage

```javascript
export async function getStaticProps() {
    const res = await fetch('https://...')
    const posts = await res.json()

    return {
        props: {
            posts,
        },
        revalidate: 10, // 10 seconds
    }
}
```



## Project Notes

- *2022-02-28*: Changed mock data using JSON file to remote server to clearly show on-demand ISR.

- *2022-02-26*: Added On-Demand ISR sample.

- *2022-02-26*: Added more contents to illustrate the basic types of page rendering.


## Installation

Clone the project and install dependencies by running:

```
npm install
```

Then to run the app,

```
npm run dev
```

Open your browser and go to [http://localhost:8080](http://localhost:8080) to view the app.


To change the port number, please open `package.json`, and edit the line 

```
"dev": "next dev -p 8080",
```
