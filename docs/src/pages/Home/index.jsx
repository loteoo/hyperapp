import intro from '../../../../README.md'
import tutorial from '../../../tutorial.md'
import api from '../../../api.md'

export default (state) => (
  <div>
    <div innerHTML={intro} />
    <hr />
    <div innerHTML={api} />
    <hr />
    <div innerHTML={tutorial} />
  </div>
)
