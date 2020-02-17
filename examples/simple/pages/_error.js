import React from 'react'
import PropTypes from 'prop-types'

import { withTranslation } from '../i18n'

const Error = ({ statusCode, t }) => (
  <div>
    Error page
    <hr/>
    <p>
      {statusCode
      ? t('error-with-status', { statusCode })
      : t('error-without-status')}
    </p>
  </div>
)

Error.getInitialProps = async ({ res, err }) => {
  let statusCode = null
  if (res) {
    ({ statusCode } = res)
  } else if (err) {
    ({ statusCode } = err)
  }
  return {
    namespacesRequired: ['translation'],
    statusCode,
  }
}

Error.defaultProps = {
  statusCode: null,
}

Error.propTypes = {
  statusCode: PropTypes.number,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translation')(Error)
