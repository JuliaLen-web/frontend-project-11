import * as yup from 'yup'

const schema = yup.object().shape({
  url: yup.string().trim().url('form.errors.url')
})

export default function validate(data) {
  try {
    schema.validateSync({url: data}, { abortEarly: false })
    return ''
  }
  catch (e) {
    return e.message
  }
}
