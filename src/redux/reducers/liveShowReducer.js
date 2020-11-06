const {
  // LOADING_ALL_LIVESHOW,
  LOADING_LIVESHOW_DETAIL,
  // GET_ALL_LIVESHOW,
  GET_LIVESHOW_DETAIL,
  CREATE_LIVESHOW,
  LOADING_CREATE_LIVESHOW,
  Action,
  Adventure,
  Comedy,
  Horror,
  Music,
  SciFi,
  Thriller,
  Drama,
  Crime,
  LOADING_Action,
  LOADING_Adventure,
  LOADING_Comedy,
  LOADING_Crime,
  LOADING_Drama,
  LOADING_Horror,
  LOADING_Music,
  LOADING_SciFi,
  LOADING_Thriller,
  MY_FAMILY_SHOW,
  LOADING_MY_FAMILY_SHOW,
} = require("../types");

const intialState = {
  liveShowDetail: {},
  actionShow: [],
  adventureShow: [],
  comedyShow: [],
  crimeShow: [],
  dramaShow: [],
  horrorShow: [],
  musicShow: [],
  sciFiShow: [],
  thrillerShow: [],
  myFamilyShow: [],
  loadingMyFamilyShow: false,
  loadingActionShow: false,
  loadingAdventureShow: false,
  loadingComedyShow: false,
  loadingCrimeShow: false,
  loadingDramaShow: false,
  loadingHorrorShow: false,
  loadingMusicShow: false,
  loadingSciFiShow: false,
  loadingThrillerShow: false,
  loading: false,
  loadingCreateLiveShow: false,
};

const liveShowReducer = (state = intialState, action) => {
  switch (action.type) {
    case Action:
      return {
        ...state,
        actionShow: [...action.payload],
        loadingActionShow: false,
      };
    case Adventure:
      return {
        ...state,
        adventureShow: [...action.payload],
        loadingAdventureShow: false,
      };
    case Comedy:
      return {
        ...state,
        comedyShow: [...action.payload],
        loadingComedyShow: false,
      };
    case Crime:
      return {
        ...state,
        crimeShow: [...action.payload],
        loadingCrimeShow: false,
      };
    case Drama:
      return {
        ...state,
        dramaShow: [...action.payload],
        loadingDramaShow: false,
      };
    case Horror:
      return {
        ...state,
        horrorShow: [...action.payload],
        loadingHorrorShow: false,
      };
    case Music:
      return {
        ...state,
        musicShow: [...action.payload],
        loadingMusicShow: false,
      };
    case SciFi:
      return {
        ...state,
        sciFiShow: [...action.payload],
        loadingSciFiShow: false,
      };
    case Thriller:
      return {
        ...state,
        thrillerShow: [...action.payload],
        loadingThrillerShow: false,
      };
    case MY_FAMILY_SHOW:
      return {
        ...state,
        myFamilyShow: [...action.payload],
        loadingMyFamilyShow: false,
      };
    case LOADING_MY_FAMILY_SHOW:
      return {
        ...state,
        loadingMyFamilyShow: true,
      };
    case LOADING_Action:
      return {
        ...state,
        loadingActionShow: true,
      };
    case LOADING_Adventure:
      return {
        ...state,
        loadingAdventureShow: true,
      };
    case LOADING_Comedy:
      return {
        ...state,
        loadingComedyShow: true,
      };
    case LOADING_Crime:
      return {
        ...state,
        loadingCrimeShow: true,
      };
    case LOADING_Drama:
      return {
        ...state,
        loadingDramaShow: true,
      };
    case LOADING_Horror:
      return {
        ...state,
        loadingHorrorShow: true,
      };
    case LOADING_Music:
      return {
        ...state,

        loadingMusicShow: true,
      };
    case LOADING_SciFi:
      return {
        ...state,

        loadingSciFiShow: true,
      };
    case LOADING_Thriller:
      return {
        ...state,

        loadingThrillerShow: true,
      };

    // case LOADING_ALL_LIVESHOW:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    case LOADING_CREATE_LIVESHOW:
      return {
        ...state,
        loadingCreateLiveShow: true,
      };
    case LOADING_LIVESHOW_DETAIL:
      return {
        ...state,
        loading: true,
      };
    // case GET_ALL_LIVESHOW:
    //   return {
    //     ...state,
    //     liveShows: [...action.payload],
    //     loading: false,
    //   };
    case GET_LIVESHOW_DETAIL:
      return {
        ...state,
        liveShowDetail: { ...action.payload },
        loading: false,
        loadingCreateLiveShow: false,
      };
    case CREATE_LIVESHOW:
      return {
        ...state,
        // liveShows: [...state.liveShows, action.payload],
        liveShowDetail: action.payload,
        loadingCreateLiveShow: false,
      };
    default:
      break;
  }
  return state;
};

export default liveShowReducer;
