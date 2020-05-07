function generateSocialImage({
  title,
  tagline,
  cloudName,
  imagePublicID,
  cloudinaryUrlBase = 'https://res.cloudinary.com',
  version = null,
  titleFont = 'arial',
  titleExtraConfig = '',
  taglineExtraConfig = '',
  taglineFont = 'arial',
  imageWidth = 1280,
  imageHeight = 669,
  textAreaWidth = 760,
  textLeftOffset = 480,
  titleBottomOffset = 254,
  taglineTopOffset = 445,
  textColor = '000000',
  titleFontSize = 64,
  taglineFontSize = 48,
}) {
  // configure social media image dimensions, quality, and format
  const imageConfig = [
    `w_${imageWidth}`,
    `h_${imageHeight}`,
    'c_fill',
    'q_auto',
    'f_auto',
  ].join(',')
  // configure the title text
  const titleConfig = [
    `w_${textAreaWidth}`,
    'c_fit',
    `co_rgb:${textColor}`,
    'g_south_west',
    `x_${textLeftOffset}`,
    `y_${titleBottomOffset}`,
    `l_text:${titleFont}_${titleFontSize}${titleExtraConfig}:${encodeURIComponent(
      title
    )}`,
  ].join(',')
  // configure the tagline text
  const taglineConfig = [
    `w_${textAreaWidth}`,
    'c_fit',
    `co_rgb:${textColor}`,
    'g_north_west',
    `x_${textLeftOffset}`,
    `y_${taglineTopOffset}`,
    `l_text:${taglineFont}_${taglineFontSize}${taglineExtraConfig}:${encodeURIComponent(
      tagline
    )}`,
  ].join(',')
  // combine all the pieces required to generate a Cloudinary URL
  const urlParts = [
    cloudinaryUrlBase,
    cloudName,
    'image',
    'upload',
    imageConfig,
    titleConfig,
    taglineConfig,
    version,
    imagePublicID,
  ]

  // remove any falsy sections of the URL (e.g. an undefined version)
  const validParts = urlParts.filter(Boolean)

  // join all the parts into a valid URL to the generated image
  return validParts.join('/')
}
