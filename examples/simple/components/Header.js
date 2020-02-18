import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

import Head from 'next/head'
import { i18n, Link, withTranslation } from '../i18n'

const Header = ({ title }) => {
    const [ language, setLanguage] = useState(i18n.language);

    useEffect(() => {
        i18n.changeLanguage(language)
    }, [language])

    return (
        <React.Fragment>
            <Head>
                <title>next-i18next</title>

                <link href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" rel="stylesheet" />
                <link href="/static/app.css" rel="stylesheet" />

                <link href="https://cdnjs.cloudflare.com/ajax/libs/typicons/2.0.9/typicons.min.css" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400|Oswald:600" rel="stylesheet" />
                <link data-react-helmet="true" rel="icon" href="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-L9iS6Wm2hynS5H9Gj7j%2Favatar.png?generation=1523462254548780&amp;alt=media" />
            </Head>
            <div>
                <div style={{display: 'flex'}}>

                    <Link href='/'>
                        <button
                            type='button'
                        >
                            home/index
                        </button>
                    </Link>

                    <Link href='/second-page'>
                        <button
                            type='button'
                        >
                            to-second-page
                        </button>
                    </Link>
                    <div>
                        <Link href='/employees-old'>
                            <button
                                type='button'
                            >
                                employees-old
                            </button>
                        </Link>
                        <hr/>
                        <Link href="/employees-old/1234">
                            <button
                                type='button'
                            >
                                employees-old/[id]
                            </button>
                        </Link>
                        <hr/>
                        <Link href={{ pathname: '/employees-old/1234', query: { name: 'ferret', color: 'purple'}}}>
                            <button
                                type='button'
                            >
                                employees-old/[id]?name=ferret&color=purple
                            </button>
                        </Link>
                    </div>
<div>
                    <Link href='/employees'>
                        <button
                            type='button'
                        >
                            employees
                        </button>
                    </Link>
    <hr/>
                    <Link href="/employees/text">
                        <button
                            type='button'
                        >
                            employees/[test]
                        </button>
                    </Link>
    <hr/>
                    <Link href="/employees/text/1234">
                        <button
                            type='button'
                        >
                            employees/[test]/[id]
                        </button>
                    </Link>
    <hr/>
                    <Link href={{ pathname: '/employees/text/1234', query: { name: 'ferret', color: 'purple'}}}>
                        <button
                            type='button'
                        >
                            employees/[test]/[id]?name=ferret&color=purple
                        </button>
                    </Link>
</div>
                    <div style={{padding: '0 20px'}}>

                        <button
                            type='button'
                            onClick={() => setLanguage('de')}
                        >
                            de
                        </button>
                        <hr/>
                        <button
                            type='button'
                            onClick={() => setLanguage('en')}
                        >
                            en
                        </button>
                        <hr/>
                        <button
                            type='button'
                            onClick={() => setLanguage('es')}
                        >
                            es
                        </button>
                    </div>
                    <div>
                        <button
                            type='button'
                            onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
                        >
                            Current: {language}
                        </button>
                    </div>
                </div>
                <hr />
            </div>
            <h1>
                {title}
            </h1>
            <a
                className="github"
                href="//github.com/isaachinman/next-i18next"
            >
                <i className="typcn typcn-social-github-circular" />
            </a>



        </React.Fragment>
    )
}

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps ={
    title: 'default title',
};

export default Header
