import React from 'react'


import Header from '../../components/Header';
import { withTranslation } from '../../i18n';
import PropTypes from 'prop-types';



const Employees = ({t}) => {
  return(
    <React.Fragment>
        <main>
          <Header />
          <div>
              Employees
              <hr/>
              {t('text')}
          </div>
        </main>
        {/* <Footer /> */}
      </React.Fragment>
  );
  
}

Employees.getInitialProps = async () => ({
    namespacesRequired: ['translation'],
})

Employees.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('translation')(Employees)
