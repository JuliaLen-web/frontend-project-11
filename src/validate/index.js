import * as yup from 'yup'

const schema = yup.object().shape({
  url: yup.string().trim().url('form.errorUrl')
})

export default function validate(fields) {
  try {
    schema.validateSync(fields, { abortEarly: false })
    return {}
  }
  catch (e) {
    return e.message
  }
}
