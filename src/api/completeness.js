import { pull, push } from "@/utils/fetch";

const getCompleteness = async (dataSet, orgUnit, period) => {
  const result = await pull(`/api/completeDataSetRegistrations.json?dataSet=${dataSet}&orgUnit=${orgUnit}&period=${period}`);
  if (result.completeDataSetRegistrations) {
    if (result.completeDataSetRegistrations[0].completed) {
      return result.completeDataSetRegistrations[0];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const postCompleteness = async (completeness) => {
  const result = await push(`/api/completeDataSetRegistrations`, completeness, "POST");
  return result;
};

export { getCompleteness, postCompleteness };
