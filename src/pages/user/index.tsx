/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AccessDenied from '../../components/access-denied';
import { ApiUserData, ApiUserResponse } from '../../utils/api-types';
import BaseLayout from '../../components/pageLayouts/base';
import { UserProfilePageModel, SiteConfigModel } from '../../utils/model-types';
import { staticPropsBySlug } from '../../utils/common/props-helper';

function isClientSide() {
    return typeof window !== 'undefined';
}

export default function Page(props: { page: UserProfilePageModel; site: SiteConfigModel }) {
    const { data: session, status } = useSession();

    return (
        <BaseLayout page={props.page} site={props.site}>
            {session ? <UserProfile session={session} status={status} /> : <AccessDenied />};
        </BaseLayout>
    );
}

function UserProfile({ session, status }) {
    const loading = status === 'loading';
    const [apiUserResponse, setApiUserResponse] = useState<ApiUserResponse>();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/user');
            const json = await res.json();
            if (json) {
                setApiUserResponse(json);
            }
        };
        fetchData();
    }, [session]);

    // TODO nicer error handling
    if (isClientSide && loading) {
        return null;
    } else if (!apiUserResponse || !apiUserResponse.success || !apiUserResponse.user) {
        return null;
    } else {
        return (
            <div className="flex justify-center mt-6 mb-2">
                <div className="max-w-md">
                    <UserProfileCard userData={apiUserResponse.user} />
                </div>
            </div>
        );
    }
}

function UserProfileCard(props: { userData: ApiUserData }) {
    return (
        <>
            <div className="grid items-center gap-4 p-4 py-8 shadow-xl bg-base-100 rounded-box place-items-center">
                <div className="avatar">
                    <div className="w-24 h-24 p-px rounded-box bg-base-content bg-opacity-10">
                        <img
                            src={props.userData.image}
                            width="94"
                            height="94"
                            className="rounded-box"
                            alt="User profile picture"
                        />
                    </div>
                </div>
                <div>
                    <div className="text-center">
                        <div className="text-lg font-extrabold">{props.userData.name}</div>
                        <div className="my-3 text-sm text-base-content text-opacity-60">
                            I do things, and sometimes they are good.
                        </div>
                    </div>
                    <div className="mt-2 text-center">
                        <div className="badge badge-accent mr-1">Sushi</div>
                        <div className="badge badge-accent mr-1">Clean Code</div>
                        <div className="badge badge-accent">More Cliches</div>
                    </div>
                </div>
                <button className="btn btn-sm">CLOSE DOOR</button>
            </div>
        </>
    );
}

export async function getStaticProps({ params }) {
    const slug = ['user']; // TODO abstract this?
    return await staticPropsBySlug(slug);
}
