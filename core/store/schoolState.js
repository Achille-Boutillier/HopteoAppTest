export const initialSchoolState = {
  rankIdList: null,     // [ingeSchool1, ingeSchool120, ingeSchool154, ...]
  rankSchoolList: [],   // [{"id": "ingeSchool1", "rank": 1}, {"id": "ingeSchool120", "rank": 2}, {"id": "ingeSchool154", "rank": 3}, ...]
  schoolByArea: null,   // {schoolPack: null, listFormation: null},
  schoolsData: {},  
  likedSchoolObject: {},   // {ingeSchool5: true, ingeSchool22: true, ingeSchool2: true} 
  schoolLikeToUpdate: [],     // [ingeSchool22, ingeSchool2]
  loading: null,
  error: false,
};


