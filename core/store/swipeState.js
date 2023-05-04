export const initialSwipeState = {
  swipeTypeObj: {},         // {ingeCard1: "like", ingeCard2: "dislike", ingeCard3: "dontKnow"}
  // answeredCardList: [],     // [ingeCard1, ingeCard2, ingeCard3]
  idCardsList: [],          // [ingeCard1, ingeCard2, ingeCard3, ingeCard4, ingeCard5, ...]
  sentToBackAnswers: [],    // [ingeCard1, ingeCard2]
  minSwipeForRanking: null,
  swipeSettings: {},        // {"superlike": {"bonus": 5,"nbAnswer": 5}, "like": {"bonus": 1,"nbAnswer": 1 }, ... },
  answerByTheme: {},        // "answerByTheme": {"theme1": 19, "theme3": 10, "theme2": 1}
  rankingAbsoluteIndex: 0,  
  loading: null,
  error: null,
};
