import { pull, push } from "@/utils/fetch";

const getDataValues = async (dataSet, orgUnit, period) => {
  let url = `/api/dataValueSets.json?dataSet=${dataSet}&orgUnit=${orgUnit}&period=${period}&children=true`;
  const result = await pull(url);
  return result.dataValues ? result.dataValues : [];
};

const saveDataValue = async (dataSet, orgUnit, period, dataElement, coc, value) => {
  let url = `/api/dataValues?de=${dataElement}&co=${coc}&ds=${dataSet}&ou=${orgUnit}&pe=${period}&value=${value}`;
  const response = await push(url, {}, "POST");
  if (response.ok) return { ok: response.ok };
  else {
    const json = await response.json();
    return { ok: false, json };
  }
};

export { getDataValues, saveDataValue };
