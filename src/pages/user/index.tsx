/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AccessDenied from '../../components/access-denied';
import { ApiUserData, ApiUserResponse } from '../../utils/api-types';
import BaseLayout from '../../components/pageLayouts/base';
import { UserProfilePageModel, SiteConfigModel } from '../../utils/model-types';
import { staticPropsBySlug } from '../../utils/common/props-helper';
import Link from 'next/link';
import { WizardControlValue } from '../../components/wizard/controls/types';
import { VariableValuesMap } from '../../components/wizard/types';

function isClientSide() {
    return typeof window !== 'undefined';
}

export default function Page(props: {
    page: UserProfilePageModel;
    site: SiteConfigModel;
    flowIds?: string;
}) {
    const { data: session, status } = useSession();
    console.log('flowIds: ', props.flowIds); //TODO
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
            const res = await fetch('/api/userInfo');
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
                </div>
                {props.userData.flowData ? (
                    <>
                        <UserFlowData userData={props.userData} />
                        <Link href="/flows/uno/run?to=/user">
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

// TODO get flow definition for max value, labels, etc.
function UserFlowData(props: { userData: ApiUserData }) {
    console.log(props.userData.flowData);
    return (
        <>
            <div className="text-md font-extrabold">My answers to the flow</div>
            <UserFlowVariables variables={props.userData.flowData} />
        </>
    );
}

function UserFlowVariables(props: { variables: VariableValuesMap; onlyType?: string }) {
    return (
        <div className="flex flex-col text-center gap-2">
            {Object.entries(props.variables).map((o, index) => {
                const [varName, varValue] = o;
                const text = `${varName}: ${varValue}`;
                return (
                    <div key={varName} className="flex justify-center">
                        <div className="badge badge-accent badge-lg">{text}</div>
                    </div>
                );
            })}
        </div>
    );
}

export async function getStaticProps({ params }) {
    const slug = ['user']; // TODO abstract this?
    return await staticPropsBySlug(slug);
}
