import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { PageContainer } from 'theme'
import { mapStateToProps, mapDispatchToProps } from '../containerProps'

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PageContainer)
)
