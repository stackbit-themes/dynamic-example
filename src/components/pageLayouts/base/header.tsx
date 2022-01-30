/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { HeaderModel } from '../../../utils/model-types';

// TODO work on this
export default function Header(props: HeaderModel) {
    return (
        <>
            <div className="navbar mb-2 shadow-lg bg-blue-500 text-neutral-content">
                <div className="flex-none hidden lg:flex">
                    <button className="btn btn-square btn-ghost">
                        <HamburgerIcon />
                    </button>
                </div>
                <div className="flex-1 hidden px-2 mx-2 lg:flex">
                    <span className="text-lg font-bold">Stackbit Dynamic Example App</span>
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
            <div className="mr-6">{session.user.name}</div>
            <button onClick={() => signOut()}>Sign out</button>
            <div className="avatar">
                <div className="rounded-full w-10 h-10 m-1">
                    <img
                        src={session.user.image}
                        referrerPolicy="no-referrer"
                        alt="Profile picture"
                    />
                </div>
            </div>
        </>
    ) : (
        <>
            <button onClick={() => signIn()}>Sign in</button>
        </>
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
