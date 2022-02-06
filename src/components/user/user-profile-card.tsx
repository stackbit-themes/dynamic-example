/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ApiUserData, deleteUserFlowData } from '../../utils/api-types';

interface UserProfileCardProps {
    userData: ApiUserData;
    defaultFlowUrl: string | null;
    onRefresh: Function;
}

const UserProfileCard: React.FunctionComponent<UserProfileCardProps> = ({
    userData,
    defaultFlowUrl,
    onRefresh
}) => {
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
                        <div className="flex gap-2">
                            <Link href={`${defaultFlowUrl}/run?to=/user`}>
                                <a>
                                    <button className="btn btn-sm">Run again</button>
                                </a>
                            </Link>
                            <button
                                className="btn btn-sm btn-outline"
                                onClick={async () => {
                                    await deleteUserFlowData();
                                    if (onRefresh) onRefresh();
                                }}
                            >
                                Forget me
                            </button>
                        </div>
                    </>
                ) : (
                    <Link href="/flows/uno/run?to=/user">
                        <a>
                            <button className="btn btn-primary">OMG Onboard me!</button>
                        </a>
                    </Link>
                )}
            </div>
        </>
    );
};

function UserFlowData({ userData }: { userData: ApiUserData }) {
    return (
        <>
            <div className="text-md font-bold">My answers to the flow:</div>
            <div className="card shadow-xl bg-accent text-primary-content">
                <div className="card-body p-6" style={{ fontFamily: 'menlo,monaco,monospace' }}>
                    {Object.entries(userData.flowData).map((entry, index) => {
                        const [k, v] = entry;
                        return (
                            <div key={index}>
                                <span>{`${k}: `}</span>
                                <span>{JSON.stringify(v)}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default UserProfileCard;
