import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function FlowValidationAlerts(props: { errorMessages: string[] }) {
    return (
        <div>
            {props.errorMessages.map((err, index) => {
                return (
                    <div className="alert alert-warning mb-4 mx-8" key={index}>
                        <div className="flex-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 mx-2 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                ></path>
                            </svg>
                            <label>{err}</label>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
export function ValidFlowNotification(props: { action?: { label: string; url: string } }) {
    const router = useRouter();
    return (
        <div className="alert alert-info mb-4 mx-8">
            <div className="flex-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#2196f3"
                    className="w-6 h-6 mx-2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                <label>Flow looks ok!</label>
            </div>
            {props && (
                <div className="flex-none">
                    <Link href={props.action.url}>
                        <a>{props.action.label}</a>
                    </Link>
                </div>
            )}
        </div>
    );
}
