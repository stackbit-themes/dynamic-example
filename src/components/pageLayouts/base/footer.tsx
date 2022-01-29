import * as React from 'react';
// TODO work on this

export default function Footer(props) {
    return (
        <footer className="p-10 footer bg-base-200 text-base-content footer-center">
            <div className="grid grid-flow-col gap-4">
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </div>
            <div>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current"
                        >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current"
                        >
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current"
                        >
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                    </a>
                </div>
            </div>
            <div>
                <p>Copyright © 2021 - All right reserved by ACME Industries Ltd</p>
            </div>
        </footer>
    );
}

/*
export default function Footer(props) {
    const colors = props.colors || 'colors-a';
    const footerStyles = props.styles?.self || {};
    const footerWidth = footerStyles.width || 'narrow';
    const primaryLinks = props.primaryLinks || [];
    const socialLinks = props.socialLinks || [];
    const legalLinks = props.legalLinks || [];
    return (
        <footer
            className={classNames('sb-component', 'sb-component-footer', colors, footerStyles.padding || 'py-16 px-4')}
            data-sb-field-path={`${props.annotationPrefix}:footer`}
        >
            <div className={classNames('mx-auto', mapMaxWidthStyles(footerWidth))}>
                {(props.logo || props.title || props.text) && (
                    <div className="mb-12">
                        <Link href="/" className="sb-footer-logo flex items-center" data-sb-field-path=".title#span[1] .logo#img[1]">
                            {props.logo && <ImageBlock {...props.logo} className={classNames('max-h-12', { 'mr-2': props.title })} />}
                            {props.title && <span className="text-2xl tracking-wide">{props.title}</span>}
                        </Link>
                        {props.text && (
                            <Markdown options={{ forceBlock: true, forceWrapper: true }} className={classNames('sb-markdown', 'max-w-xl', { 'mt-8': props.title || props.logo })} data-sb-field-path=".text">
                                {props.text}
                            </Markdown>
                        )}
                    </div>
                )}
                {(primaryLinks.length > 0 || socialLinks.length > 0 || props.contacts) && (
                    <div className="sm:flex sm:justify-between sm:items-end">
                        {primaryLinks.length > 0 && (
                            <div className="mb-6">
                                <ul className="flex flex-col items-start mb-6 space-y-6 text-lg" data-sb-field-path=".primaryLinks">
                                    {primaryLinks.map((link, index) => (
                                        <li key={index}>
                                            <Action {...link} data-sb-field-path={`.${index}`} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {(socialLinks.length > 0 || props.contacts) && (
                            <div className="mb-6">
                                {socialLinks.length > 0 && (
                                    <ul className="flex items-center mb-6 space-x-10" data-sb-field-path=".socialLinks">
                                        {socialLinks.map((link, index) => (
                                            <li key={index}>
                                                <Social {...link} data-sb-field-path={`.${index}`} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {props.contacts && <Contacts {...props.contacts} />}
                            </div>
                        )}
                    </div>
                )}
                <div className="sb-divider" />
                <div className="flex flex-col-reverse justify-between pt-6 lg:flex-row">
                    {props.copyrightText && (
                        <Markdown
                            options={{ forceInline: true, forceWrapper: true, wrapper: 'p' }}
                            className={classNames('sb-markdown')}
                            data-sb-field-path=".copyrightText"
                        >
                            {props.copyrightText}
                        </Markdown>
                    )}
                    {legalLinks.length > 0 && (
                        <ul className="flex flex-col mb-6 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row" data-sb-field-path=".legalLinks">
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <Action {...link} data-sb-field-path={`.${index}`} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </footer>
    );
}

function Contacts(props) {
    return (
        <div className="mb-6 space-y-4 text-lg" data-sb-field-path=".contacts">
            {props.phoneNumber && (
                <p>
                    <a
                        href={`tel:${props.phoneNumber}`}
                        aria-label={props.phoneAltText}
                        title={props.phoneAltText}
                        data-sb-field-path=".phoneNumber .phoneNumber#@href .phoneAltText#@title"
                    >
                        {props.phoneNumber}
                    </a>
                </p>
            )}
            {props.email && (
                <p>
                    <a
                        href={`mailto:${props.email}`}
                        aria-label={props.emailAltText}
                        title={props.emailAltText}
                        data-sb-field-path=".email .email#@href .emailAltText#@title"
                    >
                        {props.email}
                    </a>
                </p>
            )}
            {props.address && (
                <p>
                    <a
                        href={`https://www.google.com/maps/search/${props.address}`}
                        aria-label={props.addressAltText}
                        title={props.addressAltText}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-sb-field-path=".address .address#@href .addressAltText#@title"
                    >
                        {props.address}
                    </a>
                </p>
            )}
        </div>
    );
}

function mapMaxWidthStyles(width) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-xl';
        case 'wide':
            return 'max-w-screen-2xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}
*/
