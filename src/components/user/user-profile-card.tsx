/* eslint-disable @next/next/no-img-element */
import { ApiUserData } from '../../utils/api-types';
import Link from 'next/link';

export function UserProfileCard({
    userData,
    defaultFlowUrl
}: {
    userData: ApiUserData;
    defaultFlowUrl: string | null;
}) {
    return (
        <>
            <div className="grid items-center max-w-md gap-4 p-4 py-8 shadow-xl bg-base-100 rounded-box place-items-center">
                <div className="avatar">
                    <div className="w-24 h-24 p-px rounded-box bg-base-content bg-opacity-10">
                        <img
                            src={userData.image}
                            width="94"
                            height="94"
                            className="rounded-box"
                            alt="User profile picture"
                        />
                    </div>
                </div>
                <div>
                    <div className="text-center">
                        <div className="text-lg font-extrabold">{userData.name}</div>
                        <div className="my-3 text-sm text-base-content text-opacity-60">
                            I do things, and sometimes they are good.
                        </div>
                    </div>
                </div>
                {userData.flowData ? (
                    <>
                        <UserFlowData userData={userData} />
                        <Link href={`${defaultFlowUrl}/run?to=/user`}>
                            <a>
                                <button className="btn btn-sm">Onboard again</button>
                            </a>
                        </Link>
                    </>
                ) : (
                    <Link href="/flows/uno/run?to=/user">
                        <a>
                            <button className="btn btn-sm">Onboard me</button>
                        </a>
                    </Link>
                )}
            </div>
        </>
    );
}

function UserFlowData({ userData }: { userData: ApiUserData }) {
    console.log(userData.flowData);
    return (
        <>
            <div className="text-md font-extrabold">My answers to the flow</div>
            <div className="flex flex-col text-center gap-2">
                {Object.entries(userData.flowData).map((o, index) => {
                    const [varName, varValue] = o;
                    const text = `${varName}: ${varValue}`;
                    return (
                        <div key={varName} className="flex justify-center">
                            <div className="badge badge-accent badge-lg">{text}</div>
                        </div>
                    );
                })}
            </div>{' '}
        </>
    );
}
