import { pull } from "../utils/fetch";

const getPrograms = async () => {
  const result = await pull(
    "/api/programs?paging=false&fields=id,name,displayName,access,organisationUnits[id,path],attributeValues,programStages[id,name,featureType,executionDateLabel,displayExecutionDateLabel,programStageDataElements[dataElement,compulsory,displayInReports,allowFutureDate],programStageSections[id,displayName,dataElements]],programRuleVariables[id,name,dataElement,trackedEntityAttribute,programRuleVariableSourceType],style&filter=registration:eq:false"
  );
  return result.programs;
};

const getProgramIndicators = async () => {
  const result = await pull("/api/programIndicators?paging=false&fields=id,displayName,expression,filter,program");
  return result.getProgramIndicators;
};

const getDataSets = async () => {
  const result = await pull(
    "/api/dataSets?paging=false&fields=id,name,displayName,access,organisationUnits[id,path],dataSetElements[dataElement[id],categoryCombo],periodType,style,expiryDays,openFuturePeriods,sections[id,displayName,greyedFields,dataElements]"
  );
  return result.dataSets;
};

const getMe = async () => {
  const result = await pull("/api/me?fields=*,settings[*],organisationUnits[id,name,displayName,ancestors]");
  const settingResult = await pull("/api/userSettings");
  if (!result.settings) {
    result.settings = settingResult;
  }
  return result;
};

const getUserRoles = async () => {
  const result = await pull("/api/userRoles.json?fields=*,!users&paging=false");
  return result.userRoles;
};

const getOrgUnits = async () => {
  const result = await pull("/api/organisationUnits?fields=id,name,displayName,code,path,ancestors[id,code],parent,level&paging=false");
  const geoJsonResult = await pull("/api/organisationUnits.geojson?level=1");
  result.organisationUnits.forEach((ou) => {
    if (ou.level === 1) {
      ou.geoJson = geoJsonResult;
    }
  });
  return result.organisationUnits;
};

const getDataElements = async () => {
  const result = await pull(
    "/api/dataElements?fields=id,name,displayName,displayFormName,code,valueType,optionSetValue,optionSet,aggregationType,domainType,categoryCombo&paging=false"
  );
  return result.dataElements;
};
const getCategoryCombos = async () => {
  const result = await pull(
    "/api/categoryCombos.json?paging=false&fields=id,displayName,isDefault,categories[id,displayName,categoryOptions[id,displayName]],categoryOptionCombos[id,displayName,categoryOptions[id]"
  );
  return result.categoryCombos;
};

const getOptionSets = async () => {
  const result = await pull("/api/optionSets?fields=id,displayName,options[id,displayName,code,attributeValues]&paging=false");
  return result.optionSets;
};

const getProgramRules = async () => {
  const result = await pull(
    "/api/programRules?paging=false&fields=id,displayName,programRuleActions[*,option[id,name,code]],program,condition,description"
  );
  return result.programRules;
};

const getOptionGroups = async () => {
  const result = await pull("/api/optionGroups.json?fields=id,name,options[id,name,code]");
  return result.optionGroups;
};

const getHeaderBarData = async () => {
  const headerBarDataObject = {};
  const results = await Promise.all([
    pull("/api/systemSettings"),
    pull("/api/me/dashboard"),
    pull("/api/me?fields=authorities,avatar,email,name,settings"),
    pull("/dhis-web-commons/menu/getModules.action"),
    pull("/api/systemSettings/helpPageLink")
  ]);
  headerBarDataObject.applicationTitle = results[0].applicationTitle;
  headerBarDataObject.notifications = results[1];
  headerBarDataObject.user = results[2];
  headerBarDataObject.apps = results[3];
  headerBarDataObject.help = results[4];
  return headerBarDataObject;
};

const ping = async () => {
  try {
    const result = await pull("/api/me?fields=id");
    return true;
  } catch (err) {
    return false;
  }
};

export {
  getPrograms,
  getProgramIndicators,
  getDataSets,
  getMe,
  getUserRoles,
  getOrgUnits,
  getDataElements,
  getCategoryCombos,
  getOptionSets,
  getProgramRules,
  getOptionGroups,
  getHeaderBarData,
  ping
};
