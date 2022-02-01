import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import AccessDenied from '../../components/access-denied';
import { ApiUserResponse } from '../../utils/api-types';
import BaseLayout from '../../components/pageLayouts/base';
import { UserProfilePageModel, PageComponentCommonProps } from '../../utils/model-types';
import { staticPropsFor, urlPathOfContent } from '../../utils/common/page-props-helper';
import { UserProfileCard } from '../../components/user/user-profile-card';

interface UserProfilePageProps extends PageComponentCommonProps {
    page: UserProfilePageModel;
    defaultFlowUrl: string | null;
}

export default function Page({ page, site, defaultFlowUrl }: UserProfilePageProps) {
    const { data: session } = useSession();
    return (
        <BaseLayout page={page} site={site}>
            {session ? (
                <UserProfile defaultFlowUrl={defaultFlowUrl} session={session} />
            ) : (
                <AccessDenied />
            )}
            ;
        </BaseLayout>
    );
}

function UserProfile({ session, defaultFlowUrl }: { session: Session; defaultFlowUrl: string }) {
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

    if (!apiUserResponse) {
        return null;
    } else if (!apiUserResponse.success || !apiUserResponse.user) {
        return null; // TODO show more informative alert (and handle fetch failures above)
    } else {
        return (
            <div className="flex justify-center m-6">
                <div>
                    <UserProfileCard
                        userData={apiUserResponse.user}
                        defaultFlowUrl={defaultFlowUrl}
                    />
                </div>
            </div>
        );
    }
}

/*
    TODO document this case (specific route w/content object + adding content props)
*/
export async function getStaticProps() {
    let staticProps = await staticPropsFor('/user');

    const defaultFlow = staticProps.props.site.defaultFlow;
    staticProps.props.defaultFlowUrl = defaultFlow ? await urlPathOfContent(defaultFlow) : null;
    return staticProps;
}
