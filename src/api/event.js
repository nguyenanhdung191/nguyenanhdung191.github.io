import { pull, push } from "@/utils/fetch";

const getEvents = async (program, orgUnit, page, period, filters) => {
  let url = `/api/events/query?programStage=${program.programStages[0].id}&orgUnit=${orgUnit}&paging=true&page=${page}&pageSize=10&fields=*,dataValues&totalPages=true`;
  if (period && period.startDate && period.endDate && period.dhis2Period) {
    url += `&startDate=${period.startDate}&endDate=${period.endDate}`;
  }
  const specialFilterIds = ["status", "eventDate"];
  let hasFilter = false;
  filters.map((f) => {
    if (f.value !== "" && !specialFilterIds.includes(f.id)) {
      url += `&filter=${f.id}:like:${f.value}`;
      hasFilter = true;
    }
    if (f.id === "status") url += `&status=${f.value}`;
    if (f.id === "eventDate") url += `&startDate=${f.value}&endDate=${f.value}`;
  });
  if (!hasFilter) {
    url += "&order=status:asc";
  }
  url += "&order=eventDate:desc";

  const result = await pull(url);
  return result;
};

const getEventById = async (event) => {
  let url = `/api/events/${event}`;
  const result = await pull(url);
  return result;
};

const saveEvent = async (event) => {
  const response = await push("/api/events?mergeMode=REPLACE", {
    events: [event]
  });
  const json = await response.json();
  return { ok: response.ok, result: json };
};

const deleteEvent = async (event) => {
  const response = await push("/api/events?strategy=DELETE", {
    events: [event]
  });
  const json = await response.json();
  return { ok: response.ok, result: json };
};

export { getEvents, getEventById, saveEvent, deleteEvent };
