export const extractFieldValue = (value) => {
  if (value && value.length) {
    return value[0].value;
  }
  return null;
};

export const forgeFieldValue = (value) => (value ? [{ value }] : []);

export const forgeMultipleFieldValues = (values) =>
  values ? values.map((value) => ({ value })) : [];

export const pickableOptionValuesFromResult = (result) =>
  result.feed.entry.map((value) => ({
    avatarUrl: value.avatarUrl ? value.avatarUrl.$t : undefined,
    title: value.title ? value.title.$t : undefined,
    value: value.id ? value.id.$t : undefined,
  }));

export const filterSublistCardCreationTemplate = (cardCreationTemplate) => {
  const {
    data: { fields },
  } = cardCreationTemplate;
  const filteredFields = {};
  Object.entries(fields).forEach(([key, value]) => {
    if (value.length && !value[0].value) {
      filteredFields[key] = [];
      return;
    }
    filteredFields[key] = value;
  });

  return {
    ...cardCreationTemplate,
    data: {
      fields: filteredFields,
    },
  };
};

export const forgeAddFavoriteRequestBody = (payload) => {
  const { appUri = null, viewUri = null, cardUri } = payload;
  return {
    targetUri: cardUri || viewUri,
    appUri,
    viewUri,
    type: cardUri ? 'object' : 'view',
  };
};

export const classToObjectModelAsset = (classToObjectModel = {}, objectModelToAsset = {}) =>
  Object.keys(classToObjectModel).reduce((result, className) => {
    const objectModel = classToObjectModel[className];
    const asset = objectModelToAsset[objectModel] || {};
    const { icon, image, colorPrimary, colorSecondary, translations = {} } = asset;
    const [labelSingular, labelPlural] = translations[className] || [];

    result[className] = {
      icon,
      image,
      colorPrimary,
      colorSecondary,
      labelSingular,
      labelPlural,
      objectModel,
    };

    return result;
  }, {});
