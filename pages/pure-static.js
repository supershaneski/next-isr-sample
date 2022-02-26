import Link from 'next/link'
import classes from '../styles/utils.module.css'

function Banner() {
    return (
        <>
            <div className="banner">
                <img className="image" src={'/images/hotspring-monkeys.jpg'} alt="Onsen Monkeys" />
            </div>
            <style jsx>{`
                .banner {
                    position: relative;
                    width: 100%;
                }
                .image {
                    position: relative;
                    width: 100%;
                    height: auto;
                    max-width: 600px;
                }
            `}</style>
        </>
    )
}

export default function Page() {

    return (
        <>
            <div className={classes.container}>
                <section>
                    <h4>Next.js Page Rendering</h4>
                </section>
                <section>
                    <Link href="/">
                        <a className={classes.link}>Back to home</a>
                    </Link>
                </section>
                <section>
                    <h4>Pure Static Page</h4>
                    <Banner img="/images/hotspring-monkeys.jpg" alt="Monkeys Enjoying Hotspring" />
                    <p>
                        Lorem ipsum dolor sir amet, consectetur adipiscing elit, sed do eiusmod temport incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </section>
            </div>
        </>
    )

}