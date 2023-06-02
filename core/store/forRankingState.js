export const initialForRankingState = {
  cards:{},       //   { { "_id": "ingeCard1", "idTheme": "theme1", "schoolList": ["ingeSchoole1", "ingeSchoole19",],"idGroupe": "groupe1"},
                  //     {"_id": "ingeCard2", "idTheme": "theme1", "schoolList": ["ingeSchoole1"], "idGroupe": "groupe4"}, }
  schoolIdObj: {},
  isRankCalculationNeeded: true,
  loading: null,
  error: false,
};