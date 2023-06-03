export const initialForRankingState = {
  cards:{},       //   { { "_id": "ingeCard1", "idTheme": "theme1", "schoolList": ["ingeSchoole1", "ingeSchoole19",],"idGroupe": "groupe1"},
                  //     {"_id": "ingeCard2", "idTheme": "theme1", "schoolList": ["ingeSchoole1"], "idGroupe": "groupe4"}, }
  schoolIdObj: {},
  rankingScreenNeedReload: false,
  exploreScreenNeedReload: false,
  loading: null,
  error: false,
};