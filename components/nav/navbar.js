import styles from '../nav/navbar.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

import { magic } from '../../lib/magic-client'


const NavBar = () => {

    const [showDropdown, setShowDropdown] = useState();
    const [username, setUsername] = useState();

    const router = useRouter();

    useEffect(async () => {
        // Assumes a user is already logged in
        try {
            const { email } = await magic.user.getMetadata();
            if (email) {
                setUsername(email)
            }
        } catch (error) {
            // Handle errors if required!
            console.log('Error retrieving email', error)
        }
    }, [])

    const handleSignOut = async (e) => {
        e.preventDefault();

        try {
            await magic.user.logout();
            console.log(await magic.user.isLoggedIn()); // => `false`
            router.push('/login')
          } catch (error) {
            // Handle errors if required!
            console.log('Error logging out', error)
            router.push('/login')
        }
    }

    const handleOnClickHome = (e) => {
        e.preventDefault()
        router.push('/')
    }

    const handleShowDropdown = (e) => {
        e.preventDefault()
        setShowDropdown(!showDropdown)
    }

    const handleOnClicMyList = (e) => {
        e.preventDefault()
        router.push('/browse/my-list')
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <a className={styles.logoLink} href='/'>
                    <div className={styles.logoWrapper}>Youflix</div>
                </a>

                <ul className={styles.navItems}>
                    <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
                    <li className={styles.navItem2} onClick={handleOnClicMyList}>My List</li>
                </ul>

                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn} onClick={handleShowDropdown} >
                            <p className={styles.username}>{username}</p>
                            <Image src='/static/expand.svg' alt="expand" width='24px' height='24px' />
                        </button>
                        {showDropdown && (
                            <div className={styles.navDropdown}>
                                <div>
                                    
                                        <a className={styles.linkName} onClick={handleSignOut}>Sign out</a>
                                    
                                    <div className={styles.lineWrapper}></div>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavBar;