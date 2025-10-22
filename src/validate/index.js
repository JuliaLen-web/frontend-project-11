import * as yup from 'yup'

export default function validate(data, array) {
  const schema = yup.object().shape({
    url: yup.string().trim()
      .url('form.errors.url')
      .notOneOf(array.map(el => el.url), 'form.errors.duplicate')
  })

  try {
    schema.validateSync({url: data}, { abortEarly: false })
    return ''
  }
  catch (e) {
    return e.message
  }
}
