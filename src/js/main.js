!(function ($) {
  $('.phone').cntr()
  $('.flags').cntr({flagInSelect: true})
  $('.flag').cntr({flagInInput: true})
  $('.select').cntr({select: true})
  $('.search').cntr({search: true})
  $('.choose').cntr({select: true, list: true, countryAll: ['ar', 'fr']})
  $('.delete').cntr({select: true, delete: true, countryAll: ['ar', 'ua']})
})(jQuery)
