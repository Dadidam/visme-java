import moment from "moment";

export default (dateISO) => {
  return moment(dateISO).format("MM/DD/YYYY @ hh:mm:ss");
};
