const initialState = {
  allJobs: [],
  allBills: [],
  allPos: [],
  excelData: [],
  
};

function rootReducer(state = initialState, action) {
  
  switch (action.type) {
    case "GET_ALL_JOBS":
     
      return {
        ...state,
        allJobs: action.payload,
 
      };

      
      case "GET_ALL_BILLS":
      return {
        ...state,
        allBills: action.payload,
 
      };
      case "GET_ALL_PO":
      
      return {
        ...state,
        allPos: action.payload,
 
      };

      case "GET_ALL_EXCEL":
      
      return {
        ...state,
        excelData: action.payload,
 
      };

      
    case "POST_JOBS":
      return {
        ...state,
      };

      case "POST_BILLS":
      return {
        ...state,
      };

      case "POST_PO":
      return {
        ...state,
      };

      case "PO_FILTER_BY_JOB":
      
      let POFiltJob = action.payload 
      ? state.allPos
      : state.allPos.filter((g) => g.job.includes(action.payload));

      return {
        ...state,
        allPos: POFiltJob,
      };
      case "PO_FILTER_BY_PAID":
      
      let POFiltPaid = action.payload === "POJob" 
      ? state.allPos
      : state.allPos.filter((g) => g.paid.includes(action.payload));

      return {
        ...state,
        allPos: POFiltPaid,
      };
      
      case "GET_DELETE_BILLS":
        return {
          ...state,
          detail: [],
        };

        case "GET_DELETE_PO":
        return {
          ...state,
          detail: [],
        };

        case "GET_DELETE_JOBS":
        return {
          ...state,
          detail: [],
        };

        
    default:
      return { ...state };
  }

}

export default rootReducer;
