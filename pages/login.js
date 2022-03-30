import Head from 'next/head'
import styles from '../styles/login.module.css'
import { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import { magic } from '../lib/magic-client';

const Login = () => {

    const [email, setEmail] = useState('');
    const [userMsg, setUserMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const handleComplete = () => {
            setIsLoading(false)
        }
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
        return () => {
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        }
    }, [router])


    const handleLoginWithEmail = async (e) => {

        console.log('handleLoginWithEmail')
        e.preventDefault();
        setIsLoading(true);

        if (email) {
            if (email === 'a.icevalley@gmail.com') {
                // log in a user by their email
                try {
                    setIsLoading(true)
                    const didToken = await magic.auth.loginWithMagicLink({ email });
                    console.log(didToken);
                    if (didToken) {  
                        router.push('/')
                    }
                } catch (error) {
                    // Handle errors if required!
                    console.error('Something worng', error)
                    setIsLoading(false)
                }
                
            } else {
                setIsLoading(false)
                setUserMsg('Something went wrong')
            }
        } else {
            // show user msg
            setIsLoading(false)
            setUserMsg('Enter a valid email address')
        }


    }

    const handleOnChangeEmail = (e) => {
        setUserMsg('');
        const email = e.target.value;
        setEmail(email)
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Youflix Sign In</title>
            </Head>

            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <a className={styles.logoLink} href='/'>
                        <div className={styles.logoWrapper}>Youflix</div>
                    </a>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <h1 className={styles.signinHeader}>Sign In</h1>

                    <input
                        type='text'
                        placeholder='Email Address'
                        className={styles.emailInput}
                        onChange={handleOnChangeEmail} />

                    <p className={styles.userMsg}>{userMsg}</p>
                    <button
                        onClick={handleLoginWithEmail}
                        className={styles.loginBtn}>{isLoading ? 'Loading...' : 'Sign In'}</button>
                </div>
            </main>


        </div>
    )
}

export default Login;