export const initialForRankingState = {
  cards:{},       //   { { "_id": "ingeCard1", "idTheme": "theme1", "schoolList": ["ingeSchoole1", "ingeSchoole19",],"idGroupe": "groupe1"},
                  //     {"_id": "ingeCard2", "idTheme": "theme1", "schoolList": ["ingeSchoole1"], "idGroupe": "groupe4"}, }
  schoolIdObj: {},
  showRankingPopup: true,
  activeFilterObject: {formation: [], concours: [], ville: [], exemple1: [], exemple2: []},  // {formation: ["aeronautique"], concours: ["CCINP", "mines pont"] ville: ["paris", "Albi"],  }
  loading: null,
  error: false,
};