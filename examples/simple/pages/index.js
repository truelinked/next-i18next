import React from 'react'
import PropTypes from 'prop-types'

import { i18n, Link, withTranslation } from '../i18n'

import Header from '../components/Header'
import Footer from '../components/Footer'

const Homepage = ({ t }) => (
  <React.Fragment>
    <main>
      <Header title={t('h1')} />
      <div>
        <button
          type='button'
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en')}
        >
          change-locale
        </button>
        <Link href='/second-page'>
          <button
            type='button'
          >
            to-second-page
          </button>
        </Link>

        <Link href='/employees'>
          <button
            type='button'
          >
            employees
          </button>
        </Link>
        <Link as="/employees/[id]" href='/employees/123456'>
          <button
              type='button'
          >
            employees / 123456
          </button>
        </Link>
        <div>
          {i18n.language}
        </div>
      </div>
    </main>
    <Footer />
  </React.Fragment>
)

Homepage.getInitialProps = async () => ({
  namespacesRequired: ['translation'],
})

Homepage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('translation')(Homepage)
