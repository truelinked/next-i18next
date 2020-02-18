import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header';
import { withTranslation } from '../../i18n';



const Page = ({t}) => {
  return(
    <React.Fragment>
        <main>
          <Header />
          <div>
                <h1>Employee</h1>
              {t('text')}
          </div>
        </main>
        {/* <Footer /> */}
      </React.Fragment>
  );
  
}


Page.getInitialProps = async () => ({
    namespacesRequired: ['translation'],
})

Page.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('translation')(Page)
