import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import AccessDenied from '../../components/access-denied';
import { ApiUserResponse } from '../../utils/api-types';
import BaseLayout from '../../components/pageLayouts/base/base';
import { SiteConfigModel } from '../../utils/model-types';
import { urlPathOfContent } from '../../utils/common/page-props-helper';
import UserProfileCard from '../../components/user/user-profile-card';
import { getContentCommonProps } from '../../utils/utils';

interface UserPageProps {
    site: SiteConfigModel;
    defaultFlowUrl: string | null;
}

const UserPage: React.FC<UserPageProps> = ({ site, defaultFlowUrl }: UserPageProps) => {
    const { data: session } = useSession();
    return (
        <BaseLayout page={null} site={site}>
            {session ? (
                <UserProfile defaultFlowUrl={defaultFlowUrl} session={session} />
            ) : (
                <AccessDenied />
            )}
        </BaseLayout>
    );
};

function UserProfile({ session, defaultFlowUrl }: { session: Session; defaultFlowUrl: string }) {
    const [apiUserResponse, setApiUserResponse] = useState<ApiUserResponse>();
    const [refresher, setRefresher] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/userInfo');
            const json = await res.json();
            if (json) {
                setApiUserResponse(json);
            }
        };
        fetchData();
    }, [session, refresher]);

    // Make the above useEffect() run again to re-fetch user info
    function handleRefresh() {
        setRefresher(refresher + 1);
    }

    if (!apiUserResponse) {
        return null;
    } else if (!apiUserResponse.success || !apiUserResponse.user) {
        return null;
    } else {
        return (
            <div className="flex justify-center m-6">
                <div>
                    <UserProfileCard
                        userData={apiUserResponse.user}
                        defaultFlowUrl={defaultFlowUrl}
                        onRefresh={handleRefresh}
                    />
                </div>
            </div>
        );
    }
}

export default UserPage;

export async function getStaticProps() {
    const commonProps = await getContentCommonProps();
    const defaultFlow = commonProps.site.defaultFlow;
    const defaultFlowUrl = defaultFlow ? await urlPathOfContent(defaultFlow) : null;

    const pageProps: UserPageProps = {
        site: commonProps.site,
        defaultFlowUrl: defaultFlowUrl
    };
    return { props: pageProps };
}
