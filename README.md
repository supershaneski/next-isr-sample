next-isr-app
============

This app will try to explore [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)(ISR) in Next.js which lets the developer to update static pages ***without the need to rebuild the entire site***.

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
