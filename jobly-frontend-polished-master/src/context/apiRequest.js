/**
 * Utitily function for making requests to the api
 *
 * @param {Object}
 *  - dispatch - method for dispatch action types
 *  - types - object containing the request initializing type, the request failure type, and the request success type
 *  - promise - the promise used to call the api
 * @returns { success, data?, error? }
 */
export const apiRequest = async ({ dispatch, types, promise }) => {
  dispatch({ type: types.REQUEST });
  console.debug(`dispatching ${types.REQUEST}`);

  try {
    const { data, error } = await promise();
    if (error) {
      dispatch({ type: types.FAILURE, error });
      console.debug(`dispatching ${types.FAILURE}`);
      return { success: false, data: null, error };
    } else {
      dispatch({ type: types.SUCCESS, data });
      console.debug(`dispatching ${types.SUCCESS}`);
      return { success: true, data, error: null };
    }
  } catch (error) {
    dispatch({ type: types.FAILURE, error });
    console.debug(`dispatching ${types.FAILURE}`);
    return { success: false, data: null, error };
  }
};
