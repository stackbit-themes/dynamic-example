/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { HeaderModel } from '../../../utils/model-types';
import Link from 'next/link';

// TODO work on this
export default function Header(props: HeaderModel) {
    return (
        <>
            <div className="navbar mb-2 shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-neutral-content">
                <div className="flex-none hidden lg:flex">
                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0}>
                            <button className="btn btn-square btn-ghost">
                                <HamburgerIcon />
                            </button>
                        </div>
                        <ul
                            tabIndex={0}
                            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-48 !text-neutral"
                        >
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/user/">
                                    <a>User profile</a>
                                </Link>
                            </li>
                            <li>
                                <a href="https://twitter.com/stackbit">More to come...</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-1 hidden px-2 mx-2 lg:flex">
                    <span className="text-lg font-bold">
                        <Link href="/">
                            <a>Stackbit Dynamic Example App</a>
                        </Link>
                    </span>
                </div>
                <div className="flex-1 lg:flex-none">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-ghost" />
                    </div>
                </div>
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                        <SearchIcon />
                    </button>
                </div>
                <div className="flex-none">
                    <SessionControls />
                </div>
            </div>
        </>
    );
}

function SessionControls() {
    const { data: session } = useSession();
    if (session) console.log('Session', session);
    return session ? (
        <>
            <div className="mr-2">{session.user.name}</div>
            <div className="dropdown dropdown-hover dropdown-end">
                <div tabIndex={0}>
                    <UserAvatar session={session} />
                </div>
                <ul
                    tabIndex={0}
                    className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-36 !text-neutral"
                >
                    <li>
                        <Link href="/user/">
                            <a>User profile</a>
                        </Link>
                    </li>
                    <li>
                        <a onClick={() => signOut()}>Sign out</a>
                    </li>
                </ul>
            </div>
        </>
    ) : (
        <>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
}

function UserAvatar({ session }) {
    return (
        <div className="avatar">
            <div className="rounded-box w-10 h-10 m-1">
                <Link href="/user/">
                    <a>
                        <img
                            src={session.user.image}
                            referrerPolicy="no-referrer"
                            alt="Profile picture"
                        />
                    </a>
                </Link>
            </div>
        </div>
    );
}

function SearchIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
        </svg>
    );
}

function HamburgerIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
            ></path>
        </svg>
    );
}
